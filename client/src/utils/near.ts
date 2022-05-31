import { ConnectConfig } from "near-api-js";

export const config: ConnectConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  // contractName: "dev-1653378276193-76018301669841",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  headers: { "Content-Type": "application/json" },
};
