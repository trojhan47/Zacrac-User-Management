import { Application } from "express";
import * as dotenv from "dotenv";

type config = {
	NODE_ENV: string;
	url: string | undefined;
	port: string | number;
	csrfSecret: string;
	mongoDBUri?: string;
	maxUploadLimit: string;
	maxParameterLimit: string | number;
	isCORSEnabled: boolean | string;
	logDays: string | number;
	queueMonitor: boolean | string;
	queueMonitorHttpPort: string | number;
	expoAccessToken: string;
};

class Locals {
	public static config(): config {
		dotenv.config();

		const NODE_ENV = process.env.NODE_ENV || 'development'
		const url = process.env.APP_url /* || `http://localhost:8080` */;
		const port = process.env.PORT || 8080;
		const mongoDBUri =
			process.env.NODE_ENV === "development"
				? process.env.MONGO_TEST_DB_URI
				: process.env.MONGO_DB_URI;
		const csrfSecret = process.env.CSRF_SECRET || "This is your responsibility";
		const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || "30mb";
		const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || "5000";
		const isCORSEnabled = process.env.CORS_ENABLED || true;
		const logDays = process.env.LOG_DAYS || 10;
		const queueMonitor = process.env.QUEUE_HTTP_ENABLED || true;
		const queueMonitorHttpPort = process.env.QUEUE_HTTP_PORT || 5550;
		const expoAccessToken = process.env.EXPO_ACCESS_TOKEN || "";

		return {
			NODE_ENV,
			url,
			port,
			mongoDBUri,
			csrfSecret,
			maxUploadLimit,
			maxParameterLimit,
			isCORSEnabled,
			logDays,
			queueMonitor,
			queueMonitorHttpPort,
			expoAccessToken,
		};
	}

	public static init(app: Application): Application {
		app.locals.app = this.config;
		return app;
	}
}

export default Locals;
