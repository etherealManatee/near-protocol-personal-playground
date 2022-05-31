import * as nearAPI from "near-api-js";
import { Component, createSignal, Show } from "solid-js";
import store from "./store";
import { config } from "./utils/near";

const App: Component = () => {
  const {
    wallet: { walletConnection, nearConnection },
  } = store;
  const [isSignedIn, setIsSignedIn] = createSignal<boolean>(false);
  // const initialize = async () => {
  //   //initialize connection to the NEAR testnet
  //   const connectToNearTestnet = await nearAPI.connect({
  //     deps: {
  //       keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
  //     },
  //     ...config,
  //   });
  // };

  function isConnectedToNear() {
    console.log(nearConnection());
  }

  return (
    <div class="flex bg-indigo-500">
      <Show when={isSignedIn()} fallback={<button>Sign In</button>}>
        <button>Sign Out</button>
      </Show>
    </div>
  );
};

export default App;
