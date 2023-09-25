import cors from "cors";
import { Application, Request, Response } from "express";
import compress from "compression";
import * as bodyParser from "body-parser";
import winston from "winston";
import * as expressWinston from "express-winston";
import morgan from "morgan";
// import helmet from "helmet";
import favicon from "serve-favicon";
import responseTime from "response-time";
import path from "path";
import * as rfs from "rotating-file-stream"; // version 2.x
import Locals from "../providers/Locals";

import Log from "./Log";

class Http {
	public static mount(app: Application): Application {
		const accessLogStream = rfs.createStream("access.log", {
			interval: "1d",
			path: path.join(__dirname, "../../logs"),
		});

		Log.info(`Booting the \'HTTP\' middleware...`);

		app.use(
			responseTime({
				digits: 5,
			})
		);

		// Enables the request body parser
		app.use(
			bodyParser.urlencoded({
				limit: Locals.config().maxUploadLimit,
				parameterLimit: Number(Locals.config().maxParameterLimit),
				extended: false,
			})
		);

		app.use(
			bodyParser.json({
				limit: process.env.maxUploadLimit,
			})
		);

		app.use(
			morgan(
				":date[iso] :method :url :status :res[content-length] - :response-time ms",
				{ skip: () => app.get("env") === "test" }
			)
		);

		app.use(
			morgan(
				":date[iso] :method :url :status :res[content-length] - :response-time ms",
				{ stream: accessLogStream }
			)
		);

		// Disable the x-powered-by header in response
		app.disable("x-powered-by");

		// set favicon
		app.use(
			favicon(path.join(__dirname, "../../public/images", "zacrac.jpeg"))
		);


		// Enables the CORS
		app.use(cors());

		// Enables the "gzip" / "deflate" compression for response
		app.use(compress());

		return app;
	}

	public static mountWinston(app: Application): Application {
		const loggerMsg = (req: Request, res: Response) => {
			const date = new Date();
			const method = req.method;
			const url = req.originalUrl;
			const status = res.statusCode;
			const resContentLength = res.getHeader("content-length") || "";
			const responseTime = res.getHeader("X-Response-Time") || "";

			return `${date} ${method} ${url} ${status} ${resContentLength} - ${responseTime} ms`;
		};

		app.use(
			expressWinston.logger({
				transports: [
					new winston.transports.File({
						filename: "./logs/error.log",
						level: "error",
					}),
					// new winston.transports.Console(),
				],
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.json()
				),
				msg: loggerMsg,
				colorize: true,
			})
		);

		app.use(
			expressWinston.errorLogger({
				transports: [
					new winston.transports.File({
						filename: "./logs/error.log",
						level: "error",
					}),
					// new winston.transports.Console(),
				],
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.json()
				),
				msg: loggerMsg,
			})
		);

		return app;
	}
}

export default Http;
