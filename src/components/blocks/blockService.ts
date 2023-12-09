import Block from "./blockModel";

export default class BlockService {
  public blocks: any = Block;

  public saveBlockInfo = async (
    contract: string,
    lastBlock: number,
    chainType: string
  ) => {
    try {
      const response = await this.blocks.updateOne(
        { contract, chainType },
        { lastBlock: lastBlock },
        { upsert: true }
      );
      if (!response) {
        throw new Error("Failed to update block information");
      }
      return response;
    } catch (err) {
      throw err; // Rethrow the error
    }
  };

  public getBlockInfo = async (contract: string, chainType: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = this.blocks.findOne({ contract, chainType });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };

  public saveUpdateCronStatus = async (
    contract: any,
    chainType: any,
    cronInProcess: any
  ) => {
    try {
      const response = await Block.updateOne(
        { contract, chainType },
        { cronInProcess },
        { upsert: true }
      );
      if (!response) {
        throw new Error("Failed to update block information");
      }
      return response;
    } catch (err) {
      throw err;
    }
  };
}
