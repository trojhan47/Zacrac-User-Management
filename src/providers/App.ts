import * as dotenv from "dotenv";

import Express from "./Express";
import { Database } from "./Database";

import Log from "../middlewares/Log";
// import Cron from "../utils/NewJob";

class App {
/* 	public clearConsole(): void {
		// instantiate queue
		const checkoutQueue = new Queue("checkout_queue");

		process.stdout.write("\x1B[2J\x1B[0f");

		checkoutQueue.dispatch(
			"checkout",
			{ data: { foo: "bar", fizz: "buzz" } },
			async (job: any) => {
				Log.info(`>> here is the data object', ${job}`);
			}
		);
	} */


	// Loads your dotenv file
	public loadConfiguration(): void {
		Log.info("Configuration :: Booting @ Master...");

		dotenv.config();
	}

		// Loads the Database Pool
	public loadDatabase(): void {
		Log.info("Database :: Booting @ Master...");

		Database.init();
	}

	// Loads your Server
	public loadServer(): void {
		Log.info("Server :: Booting @ Master...");

		Express.init();
	}

}

export default new App();
