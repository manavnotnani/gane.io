import Swal from "sweetalert2";
import Web3 from "web3";
import toaster from "../../components/Common/Toast/toast";

import {
  CHAIN_ID,
  EXPLORAR_LINK,
  NETWORK_DECIMALS,
  NETWORK_NAME,
  NETWORK_SYMBOL,
  RPC_URL,
} from "../../Utils";
import { storeInstance } from "../../Services/axios.service";
import { walletAddress, walletType } from "../Slices/user.slice";
import store from "../Store";

/**DECLARE ETHEREUM TYPE */
declare global {
  interface Window {
    ethereum?: any;
  }
}

const qrcodeModalOptions = {
  mobileLinks: ["rainbow", "metamask", "argent", "trust"],
};
const infuraProjectId = "e66015470726474c93dc56f99b4506e8";
const infuraRpcUrl = `https://mainnet.infura.io/v3/${infuraProjectId}`;
const walletTypeUser = store.getState().user.walletType;

let userCLosedModal = false;
// let provider = new WalletConnectProvider({
//   rpc: {
//     // @ts-ignore
//     // 1: infuraRpcUrl,
//     [CHAIN_ID]: RPC_URL,
//   },
//   qrcode: true,
//   qrcodeModalOptions: {
//     mobileLinks: ["rainbow", "metamask", "argent", "trust"],
//     // desktopLinks: ["rainbow", "metamask", "argent", "trust"],
//   },
// });
// provider.on("disconnect", (err, payload) => {
//   if (err) {
//     console.log("errr", err);
//   }
// });
export const connectWalletProvider = async () => {
  // Create a new WalletConnectProvider instance with specific configuration options
  // try {
  //   const account = await provider.enable();
  //   if (account) {
  //     const chainid = await getChainIdforWallet(provider);
  //     if (chainid != CHAIN_ID) {
  //       try {
  //         await switchWalletConnectNetwork(CHAIN_ID, provider);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     storeInstance.dispatch(walletAddress(account[0]));
  //   }
  // } catch (error: any) {
  //   provider = new WalletConnectProvider({
  //     rpc: {
  //       // @ts-ignore
  //       // 1: infuraRpcUrl,
  //       [CHAIN_ID]: RPC_URL,
  //     },
  //     qrcode: true,
  //     qrcodeModalOptions: {
  //       mobileLinks: ["rainbow", "metamask", "argent", "trust"],
  //       // desktopLinks: ["rainbow", "metamask", "argent", "trust"],
  //     },
  //   });
  //   localStorage.clear();
  //   userCLosedModal = true;
  //   return false;
  // }
};

const getChainIdforWallet = async (provider) => {
  let web3Object = new Web3(provider);
  const networkChainId = await web3Object.eth.getChainId();
  return networkChainId;
};
const switchWalletConnectNetwork = async (data: any, provider) => {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(data) }],
    });
  } catch (switchError: any) {
    if (switchError.code == 4001) {
      return switchError.message;
    }
    // This error code indicates that the chain has not been added to MetaMask.
    else {
      try {
        const res = await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: Web3.utils.toHex(CHAIN_ID),
              rpcUrls: [RPC_URL],
              chainName: NETWORK_NAME,
              nativeCurrency: {
                name: NETWORK_NAME,
                symbol: NETWORK_SYMBOL,
                decimals: 18,
              },
              blockExplorerUrls: [EXPLORAR_LINK],
            },
          ],
        });
        return res;
      } catch (addError: any) {
        return addError.message;
      }
    }
  }
};
/**CHECK WHETHER METAMASK IS INSTALLED OR NOT */
export const isMetaMaskInstalled = async () => {
  const { ethereum } = window;
  const result = await Boolean(ethereum);
  return result;
};

const { ethereum }: any = window;
// const type = walletTypeUser == "MetaMask" ? ethereum : provider;
if (ethereum) {
  ethereum.on("chainChanged", function () {
    approveNetwork();
  });
  ethereum.on("accountsChanged", function (account: any) {
    if (!account.length) {
      storeInstance.dispatch(walletAddress(""));
      Swal.fire({
        icon: "info",
        title: "Wallet Disconnected",
        text: "Please connect wallet to continue",
        showCancelButton: false,
        confirmButtonText: "Ok",
      });
    } else {
      storeInstance.dispatch(walletAddress(account[0]));
    }
  });
}
// if (provider && !userCLosedModal) {
//   try {
//     provider.on("networkChanged", function () {
//       switchWalletConnectNetwork(CHAIN_ID, provider);
//     });
//     provider.on("accountsChanged", function (account: any) {
//       if (!account.length) {
//         storeInstance.dispatch(walletAddress(""));
//         Swal.fire({
//           icon: "info",
//           title: "Wallet Disconnected",
//           text: "Please connect wallet to continue",
//           showCancelButton: false,
//           confirmButtonText: "Ok",
//         });
//       } else {
//         storeInstance.dispatch(walletAddress(account[0]));
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

/**CONNECT WITH METAMASK */
export const connectmetamask = (init = false) => {
  return (dispatch: DispatchType, getState: any) =>
    new Promise(async (resolve, reject) => {
      /**CHECK METAMASK IN INSTALLED OR NOT */
      const installed = await isMetaMaskInstalled();

      try {
        let address;
        if (installed) {
          const { ethereum } = window;
          let validNetwork: any;

          /**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
          if (ethereum.networkVersion !== CHAIN_ID) {
            validNetwork = await approveNetwork();
          } else {
            validNetwork = true;
          }

          if (validNetwork.code != 4001) {
            /**METHOD CALL WHEN ACCOUNT CHANGED IN METAMASK */
            ethereum.on("accountsChanged", async function (accounts: string[]) {
              address = accounts[0];
              
              /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
              dispatch(walletType("MetaMask"));

              return dispatch(walletAddress(address));
            });

            /**METHOD CALL WHEN NETWORK CHANGED IN METAMASK */
            ethereum.on("chainChanged", function (networkId: number) {
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            });

            /**GET ACCOUNT DETAILS */
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            address = accounts[0];

            /**SAVE WALLET ADDRESS AND WALLET TYPE IN REDUX */
            dispatch(walletType("MetaMask"));
            resolve(address);
            return dispatch(walletAddress(address));
          } else {
            if (init) dispatch(walletAddress(""));
            resolve(false);
          }
        } else {
          /**IF METAMASK NOT INSTALLED */
          reject(false);
          return toaster.error("Please install Metamask.");
        }
      } catch (error: any) {
        // reject(error);
        return toaster.error(error.message);
      }
    });
};

/**VERIFY METAMASK HAVE OUR NETWORK AND METAMASK SHOULD BE ON OUR NETWORK */
export const approveNetwork = async () => {
  return new Promise(async (resolve, reject) => {
    const { ethereum } = window;
    /**IF METAMASK IS ON DIFFRENT NETWORK */
    if (ethereum.networkVersion !== CHAIN_ID) {
      try {
        /**SWITCH METAMASK TO OUR NETWORK */

        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Web3.utils.toHex(CHAIN_ID) }],
        });
        resolve(true);
      } catch (err: any) {
        /**IF METAMASK DON'T HAVE OUR NETWORK. ADD NEW NETWORK */
        if (err.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: Web3.utils.toHex(CHAIN_ID),
                  chainName: NETWORK_NAME,
                  nativeCurrency: {
                    name: NETWORK_NAME,
                    symbol: NETWORK_SYMBOL,
                    decimals: NETWORK_DECIMALS,
                  },
                  rpcUrls: [RPC_URL],
                  blockExplorerUrls: [EXPLORAR_LINK],
                },
              ],
            });
            resolve(true);
          } catch (error) {
            resolve(error);
          }
        } else {
          resolve(err);
        }
      }
    } else {
      resolve(true);
    }
  });
};

export const metamaskDisconnect = async (dispatch: DispatchType) => {
  window?.ethereum.on("disconnect", () => {
    dispatch(walletAddress(""));
  });
};

/**DISCONNECT WALLET */
export const disconnectWallet = () => {
  try {
    storeInstance.dispatch(walletType(""));
    storeInstance.dispatch(walletAddress(""));
  } catch (error: any) {
    // return toaster.error(error.message);
  }
};
function getState() {
  throw new Error("Function not implemented.");
}
