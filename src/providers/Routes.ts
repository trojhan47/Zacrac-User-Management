import { Application } from "express";

import apiRouter from "../routes/api";
import serverRouter from "../routes"
import Log from "../middlewares/Log";

class Routes {


	public mountApi(app: Application): Application {
		Log.info("Routes :: Mounting API Routes...");

		return app.use("/api", apiRouter), app.use("/", serverRouter);
	}
}

export default new Routes();
