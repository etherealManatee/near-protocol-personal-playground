import {
  keyStores,
  connect,
  WalletConnection,
  Contract,
  WalletAccount,
} from "near-api-js";
import { batch, createEffect, createSignal, on, onMount } from "solid-js";
import { config } from "../utils/near";

type User = { accountId: any; balance: string };

// This contract was deployed using the steps in this example https://github.com/near-examples/guest-book-tutorial
export const CONTRACT_NAME = "dev-1653378276193-76018301669841";

function setUpWalletStore() {
  // const [nearConnection, setNearConnection] = createSignal<Near | null>(null);
  const [walletConnection, setWalletConnection] =
    createSignal<WalletConnection | null>(null);
  const [currentUser, setCurrentUser] = createSignal<User | null>(null);
  const [contract, setContract] = createSignal<Contract | null>(null);
  const [isSignedIn, setIsSignedIn] = createSignal<boolean>(false);

  async function initContract() {
    // Initializing connection to the NEAR Testnet
    const connectToNearTestnet = await connect({
      deps: {
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      },
      ...config,
    });

    // Needed to access wallet
    const walletConnection = new WalletConnection(
      connectToNearTestnet,
      "this-can-be-anything"
    );

    // Load in account data
    let currentUser;
    // You can check whether a user has connected before with the following
    if (walletConnection.getAccountId()) {
      currentUser = {
        accountId: walletConnection.getAccountId(),
        balance: (await walletConnection.account().state()).amount,
      };
      setIsSignedIn(true);
    }

    // Initializing our contract APIs by contract name and configuration
    const contract = await new Contract(
      walletConnection.account(),
      CONTRACT_NAME,
      {
        // View methods are read-only – they don't modify the state, but usually return some value
        viewMethods: ["getMessages"],
        // Change methods can modify the state, but you don't receive the returned value when called
        changeMethods: ["addMessage"],
      }
    );

    return { contract, currentUser, walletConnection };
  }

  onMount(async () => {
    const init = await initContract();

    batch(() => {
      setContract(init.contract);
      setCurrentUser(init.currentUser!);
      setWalletConnection(init.walletConnection);
    });
  });

  return {
    currentUser,
    contract,
    // nearConnection,
    walletConnection,

    isSignedIn,
    setIsSignedIn,
  };
}

export default setUpWalletStore;
