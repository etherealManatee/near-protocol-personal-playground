import * as nearAPI from "near-api-js";
import type { Component } from "solid-js";
import { config } from "./utils/near";

const App: Component = () => {
  const initialize = async () => {
    //initialize connection to the NEAR testnet
    const connectToNearTestnet = await nearAPI.connect({
      deps: {
        keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
      },
      ...config,
    });
  };

  return (
    <div class="flex bg-indigo-500">
      <button>test</button>
    </div>
  );
};

export default App;
