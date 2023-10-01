import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const SEPOLIA_URL = process.env.SEPOLIA_URL as string;
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  networks: {
    sepolia: {
      url: SEPOLIA_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
