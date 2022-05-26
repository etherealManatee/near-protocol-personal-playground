import * as nearAPI from "near-api-js";

const { keyStores, connect, WalletConnection } = nearAPI;

const config = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: "dev-1653378276193-76018301669841",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  headers: {},
};

// initialize connection to the NEAR testnet
export const near = await connect({
  deps: {
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  },
  ...config,
});

// access wallet
export const walletConnection = new WalletConnection(near, null);

let currentUser;
if (walletConnection.getAccountId()) {
  currentUser = {
    accountId: walletConnection.getAccountId(),
    balance: (await walletConnection.account().state()).amount,
  };
}

// initializing our contract APIs by contract name and configuration
const contract = await 