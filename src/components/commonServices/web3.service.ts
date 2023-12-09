import Web3 from "web3";
import { BlockService } from "../blocks";

import { marketPlaceAbi } from "../../utils/abi/marketplace";
import * as dotenv from 'dotenv';
dotenv.config();

export default new (class web3Service {
  public web3Instance: any;
  public blockService = new BlockService();

  public getInstance = async (
    contract: string,
  ): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        let contractInstance: any;
        this.web3Instance = new Web3(process.env.POLYGON_RPC);
        if (contract === "marketplace") {
          contractInstance = new this.web3Instance.eth.Contract(
            marketPlaceAbi,
            process.env.POLYGON_BRIDGE_ADDRESS
          );
        }
        resolve(contractInstance);
      } catch (err) {
        reject(err);
      }
    });
  };

  public getStartEndBlock = async (
    type: string,
    contractStartBlock: number,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let fromBlock: any = contractStartBlock;
        let eventBatchSize;
        
          eventBatchSize = 1000 ;
      
        
        let blockInfo: any = await this.blockService.getBlockInfo(
          type,
          'POLYGON'
        );

        if (blockInfo) {
          if (blockInfo?.cronInProcess) {
            resolve(false);
          }
          if (blockInfo.lastBlock) {
            fromBlock = (parseInt(blockInfo.lastBlock) + 1).toString();
          }
        }
        const startBlock = fromBlock;
        this.web3Instance = new Web3(process.env.POLYGON_RPC);
        const currentBlock = await this.web3Instance.eth.getBlockNumber();
        let endBlock = parseInt(startBlock) + eventBatchSize;
        if (parseInt(startBlock) + eventBatchSize > parseInt(currentBlock)) {
          endBlock = parseInt(currentBlock);
        }
        console.log('cronInProcess',blockInfo?.cronInProcess);
        
        resolve({
          startBlock,
          endBlock: endBlock,
          cronInProcess: blockInfo?.cronInProcess,
        });
      } catch (err) {
        reject(err);
      }
    });
  };
})();
