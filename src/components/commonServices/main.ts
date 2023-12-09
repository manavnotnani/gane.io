import * as cron from "node-cron";
import { BlockService } from "../blocks";
import CronService from "../../config/server/cron";
import * as dotenv from "dotenv";
dotenv.config();

class MainService {
  public cronService = new CronService();
  public blockService = new BlockService();

  public getEvents = async () => {
    cron.schedule("*/5 * * * * *", () => {
      this.setAllCronStatus();
      this.cronService.handleAllEvents();
    });
  };

  public setAllCronStatus = async () => {
    try {
      await this.blockService.saveUpdateCronStatus("marketplace", "POLYGON", false);
    } catch (error) {
      console.error("An error occurred in setAllCronStatus:", error);
      throw error;
    }
  };
}

export default new MainService();
