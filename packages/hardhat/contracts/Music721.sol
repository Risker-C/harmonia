// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./MusicRevenueVault.sol";

/**
 * @title Music721
 * @dev 简化的音乐NFT合约，单一音乐作品的多份NFT
 */
contract Music721 is
    ERC721,
    ERC721Enumerable,
    IERC2981,
    Ownable,
    ReentrancyGuard
{
    using SafeERC20 for IERC20;

    // 音乐作品信息
    struct MusicInfo {
        string title; // 歌曲标题
        string artist; // 艺术家
        string uriCID; // IPFS/Arweave CID
        uint256 maxSupply; // 最大供应量
        uint256 price; // 单价
        address currency; // ETH or ERC20
        uint96 royaltyBps; // ERC-2981 二级市场分成 (基点)
        address vault; // RevenueVault 地址
        bool mintActive; // 是否可铸造
    }

    // 音乐作品信息
    MusicInfo public musicInfo;

    // 下一个可用的 tokenId
    uint256 public nextTokenId = 1;

    // 基础URI
    string private _baseTokenURI;

    event MusicInfoSet(
        string title,
        string artist,
        uint256 maxSupply,
        uint256 price,
        address currency
    );

    event TokenMinted(
        uint256 indexed tokenId,
        address indexed to,
        uint256 quantity
    );

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev 设置音乐作品信息（仅限owner，只能设置一次）
     */
    function setMusicInfo(
        string memory title,
        string memory artist,
        string memory uriCID,
        uint256 maxSupply,
        uint256 price,
        address currency,
        uint96 royaltyBps,
        address vault
    ) external onlyOwner {
        require(bytes(musicInfo.title).length == 0, "Music info already set");
        require(maxSupply > 0, "Max supply must be > 0");
        require(royaltyBps <= 1000, "Royalty too high"); // 最大10%
        require(vault != address(0), "Invalid vault address");

        musicInfo = MusicInfo({
            title: title,
            artist: artist,
            uriCID: uriCID,
            maxSupply: maxSupply,
            price: price,
            currency: currency,
            royaltyBps: royaltyBps,
            vault: vault,
            mintActive: true
        });

        emit MusicInfoSet(title, artist, maxSupply, price, currency);
    }

    /**
     * @dev 铸造NFT
     */
    function mint(uint256 quantity) external payable nonReentrant {
        require(musicInfo.mintActive, "Minting not active");
        require(quantity > 0, "Quantity must be > 0");
        require(
            nextTokenId + quantity - 1 <= musicInfo.maxSupply,
            "Exceeds max supply"
        );

        uint256 totalCost = musicInfo.price * quantity;

        // 处理支付
        if (musicInfo.currency == address(0)) {
            require(msg.value >= totalCost, "Insufficient ETH");
            if (msg.value > totalCost) {
                payable(msg.sender).transfer(msg.value - totalCost);
            }
        } else {
            IERC20(musicInfo.currency).safeTransferFrom(
                msg.sender,
                address(this),
                totalCost
            );
        }

        // 铸造NFT
        uint256 startTokenId = nextTokenId;
        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = nextTokenId++;
            _safeMint(msg.sender, tokenId);
        }

        // 将收益发送到金库
        _sendRevenueToVault(musicInfo.currency, totalCost, "mint");

        emit TokenMinted(startTokenId, msg.sender, quantity);
    }

    /**
     * @dev 批量铸造（仅限owner）
     */
    function mintBatch(
        address[] memory recipients,
        uint256[] memory quantities
    ) external onlyOwner {
        require(
            recipients.length == quantities.length,
            "Arrays length mismatch"
        );
        require(musicInfo.mintActive, "Minting not active");

        uint256 totalQuantity = 0;
        for (uint256 i = 0; i < quantities.length; i++) {
            totalQuantity += quantities[i];
        }
        require(
            nextTokenId + totalQuantity - 1 <= musicInfo.maxSupply,
            "Exceeds max supply"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 quantity = quantities[i];

            for (uint256 j = 0; j < quantity; j++) {
                uint256 tokenId = nextTokenId++;
                _safeMint(recipient, tokenId);
            }
        }
    }

    /**
     * @dev 设置铸造状态
     */
    function setMintActive(bool active) external onlyOwner {
        require(bytes(musicInfo.title).length > 0, "Music info not set");
        musicInfo.mintActive = active;
    }

    /**
     * @dev 更新价格
     */
    function updatePrice(uint256 newPrice) external onlyOwner {
        require(bytes(musicInfo.title).length > 0, "Music info not set");
        musicInfo.price = newPrice;
    }

    /**
     * @dev 获取已铸造数量
     */
    function getMintedSupply() external view returns (uint256) {
        return nextTokenId - 1;
    }

    /**
     * @dev 获取剩余可铸造数量
     */
    function getRemainingSupply() external view returns (uint256) {
        return musicInfo.maxSupply - (nextTokenId - 1);
    }

    /**
     * @dev 重写_increaseBalance以支持ERC721Enumerable
     */
    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    /**
     * @dev 重写_update以支持ERC721Enumerable
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev ERC-2981 版税信息
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view override returns (address, uint256) {
        require(_ownerOf(tokenId) != address(0), "Token not exists");

        uint256 royaltyAmount = (salePrice * musicInfo.royaltyBps) / 10000;
        return (musicInfo.vault, royaltyAmount);
    }

    /**
     * @dev 支持的接口
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable, IERC165) returns (bool) {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev 获取token URI
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token not exists");

        return string(abi.encodePacked(_baseTokenURI, musicInfo.uriCID));
    }

    /**
     * @dev 设置基础URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev 内部函数：发送收益到金库
     */
    function _sendRevenueToVault(
        address currency,
        uint256 amount,
        string memory source
    ) internal {
        if (currency == address(0)) {
            // ETH
            MusicRevenueVault(payable(musicInfo.vault)).receiveRevenue{
                value: amount
            }(
                1,
                currency,
                amount,
                source // 使用固定的editionId = 1
            );
        } else {
            // ERC20
            IERC20(currency).forceApprove(musicInfo.vault, amount);
            MusicRevenueVault(payable(musicInfo.vault)).receiveRevenue(
                1,
                currency,
                amount,
                source
            );
        }
    }

    /**
     * @dev 紧急提取函数（仅限owner）
     */
    function emergencyWithdraw(
        address token,
        uint256 amount
    ) external onlyOwner {
        if (token == address(0)) {
            payable(owner()).transfer(amount);
        } else {
            IERC20(token).safeTransfer(owner(), amount);
        }
    }

    // 接收ETH
    receive() external payable {}
}
