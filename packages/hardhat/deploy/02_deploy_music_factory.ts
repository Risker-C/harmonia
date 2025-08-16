import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const deployment = await deploy("MusicNFTFactory", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  log(`MusicNFTFactory deployed at: ${deployment.address}`);
};

export default deployFactory;

deployFactory.tags = ["MusicFactory"];
