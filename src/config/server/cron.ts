import { saveEventDetails, updateEventDetails } from "../../components/User/service";
import BlockService from "../../components/blocks/blockService";
import web3Service from "../../components/commonServices/web3.service";
import * as dotenv from "dotenv";
dotenv.config();

export default class CronService {
  public blockService = new BlockService();

  public getEvents = async () => {
    let blockInfo: any = await web3Service.getStartEndBlock(
      "marketplace",
      Number(process.env.START_BLOCK_POLYGON)
    );
    if (
      parseInt(blockInfo.startBlock) < parseInt(blockInfo.endBlock) &&
      !blockInfo.cronInProcess
    ) {
      try {
        await this.blockService.saveUpdateCronStatus(
          "marketplace",
          "POLYGON",
          true
        );
        console.log("here");

        let bridgeInstance: any = await web3Service.getInstance("marketplace");
        const getAllEvents = await bridgeInstance.getPastEvents("allEvents", {
          fromBlock: blockInfo.startBlock,
          toBlock: blockInfo.endBlock,
        });
        console.log("block", blockInfo.startBlock, blockInfo.endBlock);

        if (getAllEvents.length > 0) {
          console.log("here2");

          await this.blockService.saveBlockInfo(
            "marketplace",
            parseInt(getAllEvents[getAllEvents.length - 1].blockNumber),
            "POLYGON"
          );
          for (const eventInformation of getAllEvents) {
            if (eventInformation.event) {
              switch (eventInformation.event) {
                case "OrderListed":
                  console.log("event return", eventInformation.returnValues);
                    const newData = {
                     OrderId: BigInt(eventInformation.returnValues.OrderId.toString()),
                     TokenContract: eventInformation.returnValues.TokenContract,
                     TokenId: BigInt(eventInformation.returnValues.TokenId.toString()),
                     Price: BigInt(eventInformation.returnValues.Price.toString()),
                     isListed: true,
                     isBought: false
                    };
                  //   await saveEventDetails(newData);
                  await saveEventDetails(newData);
                  break;
                  case "OrderCompleted":
                    console.log("event return", eventInformation.returnValues);
                      const data = {
                       OrderId: BigInt(eventInformation.returnValues.OrderId.toString()),
                    //    TokenContract: eventInformation.returnValues.TokenContract,
                    //    TokenId: BigInt(eventInformation.returnValues.TokenId.toString()),
                    //    Price: BigInt(eventInformation.returnValues.Price.toString()),
                    //    isListed: true,
                    //    isBought: false
                      };
                    //   await saveEventDetails(newData);
                    await updateEventDetails(data.OrderId);
                    break;
                default:
                  break;
              }
            }
          }
        } else {
          await this.blockService.saveBlockInfo(
            "marketplace",
            blockInfo.endBlock,
            "POLYGON"
          );
        }
        await this.blockService.saveUpdateCronStatus(
          "marketplace",
          "POLYGON",
          false
        );
      } catch (error) {
        await this.blockService.saveUpdateCronStatus(
          "marketplace",
          "POLYGON",
          false
        );
      }
    }
  };

  public handleAllEvents = async () => {
    this.getEvents();
  };
}
