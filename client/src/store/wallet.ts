// import * as nearAPI from "near-api-js";
// import { Near } from "near-api-js";
// import { createEffect, createSignal, on, onMount } from "solid-js";
// import { config } from "../utils/near";

// const { keyStores, connect, WalletConnection, Contract } = nearAPI;

// type User = { accountId: any; balance: string };

// function setUpWalletStore() {
//   const [nearConnection, setNearConnection] = createSignal<Near | null>(null);
//   const [walletConnection, setWalletConnection] =
//     createSignal<nearAPI.WalletConnection | null>(null);
//   const [currentUser, setCurrentUser] = createSignal<User | null>(null);
//   const [contract, setContract] = createSignal<nearAPI.Contract | null>(null);

//   createEffect(
//     on(nearConnection, () => {
//       // access wallet
//       const wallet = new WalletConnection(near()!, null);
//       setWalletConnection(wallet);
//     })
//   );

//   createEffect(
//     on(walletConnection, async () => {
//       if (walletConnection()!.getAccountId()) {
//         setCurrentUser({
//           accountId: walletConnection()!.getAccountId(),
//           balance: (await walletConnection()!.account().state()).amount,
//         });
//       }
//       // initializing our contract APIs by contract name and configuration
//       const contract = await new Contract(
//         walletConnection()!.account(),
//         config.contractName,
//         {
//           // View methods are read-only – they don't modify the state, but usually return some value
//           viewMethods: ["getMessages"],
//           // Change methods can modify the state, but you don't receive the returned value when called
//           changeMethods: ["addMessage"],
//         }
//       );
//       setContract(contract);
//     })
//   );

//   onMount(async () => {
//     // initialize connection to the NEAR testnet
//     const connectToNearTestnet = await connect({
//       deps: {
//         keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//       },
//       ...config,
//     });
//     setNearConnection(connectToNearTestnet);
//   });

//   return {
//     currentUser,
//     contract,
//     nearConnection,
//     walletConnection,
//   };
// }

// export default setUpWalletStore;
