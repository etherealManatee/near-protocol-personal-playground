import * as nearAPI from "near-api-js";
import { Component, createSignal, Show } from "solid-js";
import store from "./store";
import { config } from "./utils/near";

const App: Component = () => {
  const {
    wallet: { contract, currentUser, walletConnection },
  } = store;
  const [isSignedIn, setIsSignedIn] = createSignal<boolean>(false);

  function signIn() {
    console.log(contract());
    console.log(currentUser());
    console.log(walletConnection());

  }

  return (
    <div class="flex bg-indigo-500">
      <Show
        when={isSignedIn()}
        fallback={<button onClick={signIn}>Sign In</button>}
      >
        <button>Sign Out</button>
      </Show>
    </div>
  );
};

export default App;
