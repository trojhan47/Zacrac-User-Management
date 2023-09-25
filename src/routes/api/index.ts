import { Router } from "express";
import Locals from "../../providers/Locals";
import UserController from "../../controllers/api/userController";
import checkEmptyRequestBody from "../../middlewares/Routes/RequestBody";

const port: number = Number(Locals.config().port);
const router = Router();


router.get("/", (req, res) => {
	return res.status(200).json({
		message: `welcome to ZACRAC API :: Running @ 'http://localhost:${port}' `	});
});

// Route methods for Api operations
router.post("/users", checkEmptyRequestBody, UserController.createUser)
router.get("/users", UserController.getAllUsers)
router.get("/users/:param", UserController.getUser)
router.put("/users/:param", checkEmptyRequestBody, UserController.updateUserProfile)
router.delete("/users/:param", UserController.deleteUserProfile)






export default router;
