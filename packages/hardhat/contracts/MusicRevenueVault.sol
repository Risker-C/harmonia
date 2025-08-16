// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MusicRevenueVault
 * @dev 简化的音乐收益分配金库合约
 * 收集销售款项、二级市场版税、外部收入，并按比例分配给团队和持有人
 */
contract MusicRevenueVault is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct TeamMember {
        address account;
        uint256 basisPoints; // 基点，10000 = 100%
        string role; // "artist", "producer", "composer" etc.
    }

    struct RevenuePool {
        uint256 totalRevenue;
        uint256 teamClaimed;
        uint256 holdersClaimed;
        mapping(address => uint256) holderClaimed;
    }

    // 团队分账配置
    TeamMember[] public teamMembers;
    uint256 public teamTotalBps; // 团队总分成基点
    uint256 public holdersBps; // 持有人分成基点

    // 收益池 - 简化为单一池子（editionId = 1）
    mapping(uint256 => RevenuePool) public revenuePools;
    
    // NFT合约地址
    address public nftContract;
    
    // 支持的代币
    mapping(address => bool) public supportedTokens;

    event RevenueReceived(uint256 indexed editionId, address token, uint256 amount, string source);
    event TeamClaimed(address indexed member, uint256 indexed editionId, address token, uint256 amount);
    event HolderClaimed(address indexed holder, uint256 indexed editionId, address token, uint256 amount);
    event TeamMemberAdded(address indexed account, uint256 basisPoints, string role);

    constructor(address _nftContract) Ownable(msg.sender) {
        nftContract = _nftContract;
        supportedTokens[address(0)] = true; // ETH
    }

    /**
     * @dev 添加团队成员
     */
    function addTeamMember(address account, uint256 basisPoints, string memory role) external onlyOwner {
        require(account != address(0), "Invalid address");
        require(basisPoints > 0, "Invalid basis points");
        require(teamTotalBps + basisPoints <= 10000, "Exceeds 100%");
        
        teamMembers.push(TeamMember({
            account: account,
            basisPoints: basisPoints,
            role: role
        }));
        
        teamTotalBps += basisPoints;
        holdersBps = 10000 - teamTotalBps;
        
        emit TeamMemberAdded(account, basisPoints, role);
    }

    /**
     * @dev 设置支持的代币
     */
    function setSupportedToken(address token, bool supported) external onlyOwner {
        supportedTokens[token] = supported;
    }

    /**
     * @dev 接收收益（由NFT合约或预言机调用）
     */
    function receiveRevenue(uint256 editionId, address token, uint256 amount, string memory source) external payable {
        require(msg.sender == nftContract || msg.sender == owner(), "Unauthorized");
        require(supportedTokens[token], "Token not supported");
        
        if (token == address(0)) {
            require(msg.value == amount, "ETH amount mismatch");
        } else {
            IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        }
        
        revenuePools[editionId].totalRevenue += amount;
        
        emit RevenueReceived(editionId, token, amount, source);
    }

    /**
     * @dev 团队成员提取收益
     */
    function claimTeamRevenue(uint256 editionId, address token) external nonReentrant {
        uint256 memberIndex = _findTeamMemberIndex(msg.sender);
        require(memberIndex < teamMembers.length, "Not a team member");
        
        TeamMember memory member = teamMembers[memberIndex];
        RevenuePool storage pool = revenuePools[editionId];
        
        uint256 totalClaimable = (pool.totalRevenue * member.basisPoints) / 10000;
        uint256 alreadyClaimed = pool.holderClaimed[msg.sender];
        uint256 claimable = totalClaimable - alreadyClaimed;
        
        require(claimable > 0, "Nothing to claim");
        
        pool.holderClaimed[msg.sender] = totalClaimable;
        pool.teamClaimed += claimable;
        
        _transfer(token, msg.sender, claimable);
        
        emit TeamClaimed(msg.sender, editionId, token, claimable);
    }

    /**
     * @dev 持有人提取收益
     */
    function claimHolderRevenue(uint256 editionId, address token) external nonReentrant {
        // 获取持有数量（直接调用ERC721的balanceOf）
        uint256 holderBalance = IERC721(nftContract).balanceOf(msg.sender);
        require(holderBalance > 0, "No tokens held");
        
        // 获取总供应量
        uint256 totalSupply = IERC721Enumerable(nftContract).totalSupply();
        require(totalSupply > 0, "No tokens minted");
        
        RevenuePool storage pool = revenuePools[editionId];
        
        // 计算持有人应得的总收益
        uint256 holdersTotal = (pool.totalRevenue * holdersBps) / 10000;
        uint256 holderShare = (holdersTotal * holderBalance) / totalSupply;
        uint256 alreadyClaimed = pool.holderClaimed[msg.sender];
        uint256 claimable = holderShare - alreadyClaimed;
        
        require(claimable > 0, "Nothing to claim");
        
        pool.holderClaimed[msg.sender] = holderShare;
        pool.holdersClaimed += claimable;
        
        _transfer(token, msg.sender, claimable);
        
        emit HolderClaimed(msg.sender, editionId, token, claimable);
    }

    /**
     * @dev 查看可提取的收益
     */
    function getClaimableRevenue(address account, uint256 editionId, address token) 
        external view returns (uint256) {
        RevenuePool storage pool = revenuePools[editionId];
        
        // 检查是否为团队成员
        uint256 memberIndex = _findTeamMemberIndex(account);
        if (memberIndex < teamMembers.length) {
            TeamMember memory member = teamMembers[memberIndex];
            uint256 totalClaimable = (pool.totalRevenue * member.basisPoints) / 10000;
            return totalClaimable - pool.holderClaimed[account];
        }
        
        // 持有人收益计算
        uint256 holderBalance = IERC721(nftContract).balanceOf(account);
        if (holderBalance == 0) return 0;
        
        uint256 totalSupply = IERC721Enumerable(nftContract).totalSupply();
        if (totalSupply == 0) return 0;
        
        uint256 holdersTotal = (pool.totalRevenue * holdersBps) / 10000;
        uint256 holderShare = (holdersTotal * holderBalance) / totalSupply;
        
        return holderShare - pool.holderClaimed[account];
    }

    /**
     * @dev 内部函数：查找团队成员索引
     */
    function _findTeamMemberIndex(address account) internal view returns (uint256) {
        for (uint256 i = 0; i < teamMembers.length; i++) {
            if (teamMembers[i].account == account) {
                return i;
            }
        }
        return type(uint256).max; // 未找到
    }

    /**
     * @dev 内部函数：转账
     */
    function _transfer(address token, address to, uint256 amount) internal {
        if (token == address(0)) {
            payable(to).transfer(amount);
        } else {
            IERC20(token).safeTransfer(to, amount);
        }
    }

    /**
     * @dev 获取团队成员信息
     */
    function getTeamMembers() external view returns (TeamMember[] memory) {
        return teamMembers;
    }

    /**
     * @dev 获取收益池信息
     */
    function getRevenuePool(uint256 editionId) external view returns (
        uint256 totalRevenue,
        uint256 teamClaimed,
        uint256 holdersClaimed
    ) {
        RevenuePool storage pool = revenuePools[editionId];
        return (pool.totalRevenue, pool.teamClaimed, pool.holdersClaimed);
    }

    // 接收ETH
    receive() external payable {}
}