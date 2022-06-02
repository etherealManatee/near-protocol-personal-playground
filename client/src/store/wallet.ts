import {
  keyStores,
  connect,
  WalletConnection,
  Contract,
  WalletAccount,
} from "near-api-js";
import { Near } from "near-api-js";
import { batch, createEffect, createSignal, on, onMount } from "solid-js";
import { config } from "../utils/near";

type User = { accountId: any; balance: string };

// This contract was deployed using the steps in this example https://github.com/near-examples/guest-book-tutorial
const CONTRACT_NAME = "dev-1653378276193-76018301669841";

function setUpWalletStore() {
  // const [nearConnection, setNearConnection] = createSignal<Near | null>(null);
  const [walletConnection, setWalletConnection] =
    createSignal<WalletConnection | null>(null);
  const [currentUser, setCurrentUser] = createSignal<User | null>(null);
  const [contract, setContract] = createSignal<Contract | null>(null);

  async function initContract() {
    // Initializing connection to the NEAR Testnet
    const connectToNearTestnet = await connect({
      deps: {
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      },
      ...config,
    });

    // Needed to access wallet
    const walletConnection = new WalletConnection(connectToNearTestnet, null);

    // Load in account data
    let currentUser;
    if (walletConnection.getAccountId()) {
      currentUser = {
        accountId: walletConnection.getAccountId(),
        balance: (await walletConnection.account().state()).amount,
      };
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
  };
}

export default setUpWalletStore;
