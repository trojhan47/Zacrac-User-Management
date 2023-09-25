// Middleware function to check for empty request body for incoming requests

import {Request, Response, NextFunction} from "express"
const checkEmptyRequestBody = (
	req: Request,
	res: Response,
	next: NextFunction) => {
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({
			message: "Request body is empty, Input fields are required for this operation"
		})
	}

	next()
}

export default checkEmptyRequestBody
