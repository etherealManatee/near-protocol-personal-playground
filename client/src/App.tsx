import * as nearAPI from "near-api-js";
import { Component, createSignal, For, onMount, Show } from "solid-js";
import store from "./store";
import { CONTRACT_NAME } from "./store/wallet";
import { config } from "./utils/near";

const GAS = Math.round(3 * Math.pow(10, 13));

const App: Component = () => {
  const {
    wallet: {
      contract,
      currentUser,
      walletConnection,
      isSignedIn,
      setIsSignedIn,
    },
  } = store;

  const [messageText, setMessageText] = createSignal<string>("");
  const [messages, setMessages] = createSignal<[]>([]);

  console.log(currentUser());
  function test() {
    console.log(currentUser());
    console.log(GAS);
    console.log(messages());
  }
  function signIn() {
    walletConnection()!.requestSignIn(CONTRACT_NAME, "NEAR frontend test");
    setIsSignedIn(true);
  }

  function signOut() {
    walletConnection()!.signOut();
    setIsSignedIn(false);
  }

  function submitMessage() {
    if (messageText()) {
      contract()!
        .addMessage({ text: messageText() }, GAS, 0)
        .then(() => {
          contract()!
            .getMessages()
            .then((messages) => {
              setMessages(messages);
            });
        });
    } else {
      console.log("empty");
    }
  }

  onMount(async () => {
    contract()!
      .getMessages()
      .then((mes) => {
        setMessages(mes);
      });
  });

  return (
    <div class="flex flex-col bg-orange-200 min-h-screen">
      <div class="flex justify-center">
        <div class="font-bold text-lg">NEAR Testnet Message Store</div>
      </div>
      <div class="flex px-64">
        <p class="text-justify">
          This app demonstrates a key element of NEAR’s UX: once an app has
          permission to make calls on behalf of a user (that is, once a user
          signs in), the app can make calls to the blockhain for them without
          prompting extra confirmation. So you’ll see that if you don’t include
          a donation, your message gets posted right to the guest book.
        </p>
      </div>
      <button class="rounded bg-red-500 p-2" onClick={test}>
        Test
      </button>
      <div>
        <Show
          when={isSignedIn()}
          fallback={
            <button class="rounded bg-white p-1" onClick={signIn}>
              Sign In
            </button>
          }
        >
          <button class="rounded bg-gray-400 p-1" onClick={signOut}>
            Sign Out
          </button>
        </Show>
      </div>
      <div>
        <input onChange={(e) => setMessageText(e.target.value)}></input>
        <button class="rounded bg-gray-400 p-1" onClick={submitMessage}>
          Submit Message
        </button>
      </div>
      <div>
        <div>Messages</div>
      </div>
    </div>
  );
};

export default App;
