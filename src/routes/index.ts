import { Router } from "express";
import Locals from "../providers/Locals";

const port: number = Number(Locals.config().port);
const router = Router();


router.get("/", (req, res) => {
	return res.status(200).json({
		message: `welcome to ZACRAC server :: Running @ 'http://localhost:${port}' `
	});
});






export default router;
