// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SimpleFixedPriceMarket
 * @dev 极简定价挂单市场：
 * - 卖家创建挂单（仅记录，不托管 NFT），购买时校验所有权/授权
 * - 支持 ETH 或 ERC20 结算
 * - 若 NFT 支持 ERC-2981，则在成交时自动支付版税
 */
contract SimpleFixedPriceMarket is ReentrancyGuard, ERC165 {
    using SafeERC20 for IERC20;

    struct Listing {
        address nft;
        uint256 tokenId;
        address seller;
        address currency; // address(0) = ETH, otherwise ERC20 token address
        uint256 price; // in wei or token smallest unit
        bool active;
    }

    // key: keccak256(nft, tokenId)
    mapping(bytes32 => Listing) private listings;

    event Listed(address indexed nft, uint256 indexed tokenId, address indexed seller, address currency, uint256 price);
    event ListingUpdated(address indexed nft, uint256 indexed tokenId, uint256 newPrice, address newCurrency);
    event ListingCanceled(address indexed nft, uint256 indexed tokenId);
    event Purchased(
        address indexed nft,
        uint256 indexed tokenId,
        address indexed buyer,
        address seller,
        address currency,
        uint256 price,
        address royaltyReceiver,
        uint256 royaltyAmount
    );

    function getListingKey(address nft, uint256 tokenId) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(nft, tokenId));
    }

    function getListing(address nft, uint256 tokenId) external view returns (Listing memory) {
        return listings[getListingKey(nft, tokenId)];
    }

    /**
     * @dev 创建挂单（不托管 NFT）。要求：
     * - msg.sender 是当前所有者，或已被授权为 operator（setApprovalForAll 或 approve）
     * - price > 0
     */
    function list(address nft, uint256 tokenId, address currency, uint256 price) external {
        require(price > 0, "Invalid price");
        address owner = IERC721(nft).ownerOf(tokenId);
        require(owner == msg.sender, "Not token owner");
        require(
            IERC721(nft).getApproved(tokenId) == address(this) ||
                IERC721(nft).isApprovedForAll(owner, address(this)),
            "Market not approved"
        );

        bytes32 key = getListingKey(nft, tokenId);
        listings[key] = Listing({
            nft: nft,
            tokenId: tokenId,
            seller: msg.sender,
            currency: currency,
            price: price,
            active: true
        });

        emit Listed(nft, tokenId, msg.sender, currency, price);
    }

    /**
     * @dev 更新价格或币种（仅卖家）
     */
    function update(address nft, uint256 tokenId, address newCurrency, uint256 newPrice) external {
        bytes32 key = getListingKey(nft, tokenId);
        Listing storage l = listings[key];
        require(l.active, "Not listed");
        require(l.seller == msg.sender, "Not seller");
        require(newPrice > 0, "Invalid price");
        l.currency = newCurrency;
        l.price = newPrice;
        emit ListingUpdated(nft, tokenId, newPrice, newCurrency);
    }

    /**
     * @dev 取消挂单（仅卖家）
     */
    function cancel(address nft, uint256 tokenId) external {
        bytes32 key = getListingKey(nft, tokenId);
        Listing storage l = listings[key];
        require(l.active, "Not listed");
        require(l.seller == msg.sender, "Not seller");
        delete listings[key];
        emit ListingCanceled(nft, tokenId);
    }

    /**
     * @dev 购买：
     * - 校验仍由卖家持有且市场仍被授权
     * - 若 NFT 支持 ERC-2981，则计算并支付版税
     * - 将剩余款项支付给卖家
     * - 完成 NFT 转移
     */
    function buy(address nft, uint256 tokenId) external payable nonReentrant {
        bytes32 key = getListingKey(nft, tokenId);
        Listing memory l = listings[key];
        require(l.active, "Not listed");
        require(l.seller != address(0), "Invalid listing");
        require(l.seller != msg.sender, "Seller cannot buy");

        // 校验当前所有权与授权
        address owner = IERC721(nft).ownerOf(tokenId);
        require(owner == l.seller, "Seller no longer owns token");
        require(
            IERC721(nft).getApproved(tokenId) == address(this) ||
                IERC721(nft).isApprovedForAll(owner, address(this)),
            "Market not approved"
        );

        // 版税查询（若支持 ERC-2981）
        (address royaltyReceiver, uint256 royaltyAmount) = _royaltyInfoIfSupported(nft, tokenId, l.price);

        if (l.currency == address(0)) {
            // ETH 支付
            require(msg.value >= l.price, "Insufficient ETH");
            // 支付版税
            if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
                (bool okRoy, ) = payable(royaltyReceiver).call{value: royaltyAmount}("");
                require(okRoy, "Royalty transfer failed");
            }
            // 支付给卖家
            uint256 sellerAmount = l.price - royaltyAmount;
            (bool okSeller, ) = payable(l.seller).call{value: sellerAmount}("");
            require(okSeller, "Seller transfer failed");
            // 找零
            uint256 refund = msg.value - l.price;
            if (refund > 0) {
                (bool okRefund, ) = payable(msg.sender).call{value: refund}("");
                require(okRefund, "Refund failed");
            }
        } else {
            // ERC20 支付：买家需先 approve 给市场合约
            if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
                IERC20(l.currency).safeTransferFrom(msg.sender, royaltyReceiver, royaltyAmount);
            }
            uint256 sellerAmount = l.price - royaltyAmount;
            IERC20(l.currency).safeTransferFrom(msg.sender, l.seller, sellerAmount);
        }

        // 转移 NFT 给买家
        IERC721(nft).safeTransferFrom(l.seller, msg.sender, tokenId);

        // 删除挂单
        delete listings[key];

        emit Purchased(nft, tokenId, msg.sender, l.seller, l.currency, l.price, royaltyReceiver, royaltyAmount);
    }

    function _royaltyInfoIfSupported(
        address nft,
        uint256 tokenId,
        uint256 salePrice
    ) internal view returns (address, uint256) {
        try IERC165(nft).supportsInterface(type(IERC2981).interfaceId) returns (bool supported) {
            if (supported) {
                try IERC2981(nft).royaltyInfo(tokenId, salePrice) returns (address receiver, uint256 amount) {
                    return (receiver, amount);
                } catch {
                    return (address(0), 0);
                }
            }
            return (address(0), 0);
        } catch {
            return (address(0), 0);
        }
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return super.supportsInterface(interfaceId);
    }
} 