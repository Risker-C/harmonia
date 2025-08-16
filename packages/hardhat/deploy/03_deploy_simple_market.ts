import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMarket: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, log } = hre.deployments;

  const deployment = await deploy("SimpleFixedPriceMarket", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  log(`SimpleFixedPriceMarket deployed at: ${deployment.address}`);
};

export default deployMarket;

deployMarket.tags = ["Market", "SimpleFixedPriceMarket"];
