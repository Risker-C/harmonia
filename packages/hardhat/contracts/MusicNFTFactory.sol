// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Music721.sol";
import "./MusicRevenueVault.sol";

/**
 * @title MusicNFTFactory
 * @dev 音乐NFT系统工厂合约，用于一键部署完整系统
 */
contract MusicNFTFactory {
    event MusicNFTSystemDeployed(
        address indexed creator,
        address nftContract,
        address vault,
        string name,
        string symbol
    );

    struct DeployedSystem {
        address nftContract;
        address vault;
        uint256 timestamp;
    }

    mapping(address => DeployedSystem[]) public deployedSystems;

    /**
     * @dev 部署完整的音乐NFT系统
     */
    function deployMusicNFTSystem(
        string memory name,
        string memory symbol,
        string memory baseURI
    ) external returns (address nftContract, address vault) {
        // 1. 部署收益金库
        vault = address(new MusicRevenueVault(address(0))); // 先传入零地址，稍后更新

        // 2. 部署NFT合约
        nftContract = address(new Music721(name, symbol, baseURI));

        // 3. 更新金库的NFT合约地址
        MusicRevenueVault(payable(vault)).transferOwnership(msg.sender);
        
        // 4. 转移NFT合约所有权
        Music721(payable(nftContract)).transferOwnership(msg.sender);

        // 5. 记录部署信息
        deployedSystems[msg.sender].push(DeployedSystem({
            nftContract: nftContract,
            vault: vault,
            timestamp: block.timestamp
        }));

        emit MusicNFTSystemDeployed(msg.sender, nftContract, vault, name, symbol);

        return (nftContract, vault);
    }

    /**
     * @dev 获取用户部署的系统
     */
    function getDeployedSystems(address user) external view returns (DeployedSystem[] memory) {
        return deployedSystems[user];
    }

    /**
     * @dev 获取用户部署的系统数量
     */
    function getDeployedSystemsCount(address user) external view returns (uint256) {
        return deployedSystems[user].length;
    }
}