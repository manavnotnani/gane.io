import Web3 from "web3";
import NFTAbi from "../abi/NFTAbi.json";
import NFTMarketplace from "../abi/NFTMarketplace.json";
import { RPC_URL, CHAIN_ID, NFT_ADDRESS, NFT_MARKETPLACE } from "../Utils";

var BigNumber = require("big-number");

/**ADDRESS FOR INSTANCE */

let web3Instance: any;

const callWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    const { ethereum } = window;
    const chainId = await ethereum?.networkVersion;
    /**CHECK SELECTED NETWORK IS CORRECT OR NOT */
    if (CHAIN_ID === parseInt(chainId)) {
      /**CREATE INSTANCE WITH METAMASK */
      web3Instance = new Web3(ethereum);
    } else {
      /**CREATE INSTANCE WITH RPC */
      web3Instance = new Web3(RPC_URL);
    }
    resolve(web3Instance);
  });
};

export const createInstance = async () => {
  let web3: any = await callWeb3();

  return true;
};

setTimeout(function () {
  createInstance();
}, 300);

/**SEND CONTRACT TYPE AND DYAMIC ADDRESS(OPTIONAL) FOR GET CONTRACT INSTANCE*/
export const getContractInstance = async (
  contractType: string,
  dynamicAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    switch (contractType) {
      case "NFT":
        let nftInstance = await createInstance().then(async () => {
          return await new web3Instance.eth.Contract(NFTAbi, NFT_ADDRESS);
        });
        resolve(nftInstance);
        break;
      case "Marketplace":
        let marketplaceInstance = await createInstance().then(async () => {
          return await new web3Instance.eth.Contract(
            NFTMarketplace,
            NFT_MARKETPLACE
          );
        });
        resolve(marketplaceInstance);
        break;
      default:
        return null;
    }
  });
};

/**CALL CONTRACT GET METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callGetMethod = async (
  method: string,
  data: any,
  contractType: string,
  dynamicAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      let contract: any = await getContractInstance(
        contractType,
        dynamicAddress
      );
      if (contract.methods) {
        /**CALL GET METHOD */

        contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .call()
          .then((result: object) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**CALL CONTRACT SEND METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callSendMethod = async (
  method: string,
  data: any,
  walletAddress: string,
  contractType: string,
  value: any,
  dynamicAddress: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**CHECK WALLET IS CONNECTED */
      if (walletAddress === "") {
        reject(new Error("Please connect wallet"));
      }

      /**CREATE DATA FOR CALL SEND METHOD */
      let dataForSend: any = { from: walletAddress };

      /**CHECK IF WE NEED TO SEND VALUE IN SEND METHOD */
      if (value > 0) {
        dataForSend.value = value;
      }

      /**GET SELECTED CONTRACT INSTANCE */
      let contract: any = await getContractInstance(
        contractType,
        dynamicAddress
      );

      /**CHECK IF WE NEED TO GIVE APPROVAL TO CONTRACT FOR TOKEN */
      //   if (method === "buyTokens" && value === 0) {
      //     let allowanceRes = await giveTokenAllowance({
      //       walletAddress,
      //       contract: dynamicAddress,
      //       tokenAddress: USDT_ADDRESS,
      //     });
      //     if (!allowanceRes) {
      //       return false;
      //     }
      //   }

      if (contract.methods) {
        console.log("2222", data);
        /**ESTIMATE GAS FOR TRANSACTION */
        const gasLimit = await contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .estimateGas(dataForSend);
        dataForSend.gasLimit = gasLimit;

        console.log("111", dataForSend);

        /**CALL SEND METHOD */
        contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .send(dataForSend)
          .then((result: object) => {
            resolve(result);
          })
          .catch((error: Error) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**FUNCTION FOR GIVE ALLOWANCE TO CONTRACT FOR TOKEN SPEND */
const giveTokenAllowance = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      let allowance: any = await callGetMethod(
        "allowance",
        [data.walletAddress, data.contract],
        "dynamic",
        data.tokenAddress
      );

      /**CHECK ALLOWANCE IS ALREADY GIVEN OR NOT */
      if (parseInt(allowance) === 0) {
        /**SET ALLOWANCE VALUE AS 10**40 */
        // let maxlimit = BigNumber(10).power(40);

        let maxlimit: any = BigNumber(10).pow(BigNumber(40)).toString();

        /**CALL SEND METHOD */
        let allowanceRes: any = await callSendMethod(
          "approve",
          [data.contract, maxlimit],
          data.walletAddress,
          "dynamic",
          null,
          data.tokenAddress
        );
        if (!(allowanceRes && allowanceRes.status)) {
          return false;
        }
      }
      resolve(allowance);
    } catch (error) {
      reject(error);
    }
  });
};
