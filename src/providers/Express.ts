import express, { Application } from "express";

import Routes from "./Routes";
import Bootstrap from "../middlewares/Kernel";
import Http from "../middlewares/Http";
import Log from "../middlewares/Log";
import Locals from "./Locals";

class Express {
	public app: Application;

	public server: any;

	constructor() {
		this.app = express();

		this.mountDotEnv();
		this.mountMiddlewares();
		this.mountRoutes();
	}

	private mountDotEnv(): void {
		this.app = Locals.init(this.app);
	}

	private mountMiddlewares(): void {
		this.app = Bootstrap.init(this.app);
	}

	private mountRoutes(): void {
		this.app = Routes.mountApi(this.app);
	}

	private mountWinston(): void {
		this.app = Http.mountWinston(this.app);
	}

	public init(): any {
		const port: number = Number(Locals.config().port);

		this.server = this.app.listen(port, () => {
			return Log.info(
				`\x1b[33m%s\x1b[0m', Server :: Running @ 'http://localhost:${port}', API :: Running @ 'http://localhost:${port}/api'`
			);
		});
	}
}

export default new Express();
