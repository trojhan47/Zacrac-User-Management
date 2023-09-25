/**
 *@author Oyetunji Atilade <atiladeoyetunji@gmail.com, oyetunji.solina@gmail.come> @trojan47
 *@desc User Controller
 @access inApp
 */

import { Request, Response } from "express"
import  validator  from "validator";
import User, { IUserModel } from "../../models/userModel"
import UniqueID from "../../utils/GenerateId";
import { validateNewUserInput, validateUpdateUserInput } from "../..//services/InputValidator";


class UserController {

	// Method to create new User Profile
	public static async createUser(req: Request, res: Response) {


		try {

			const validationErrors = validateNewUserInput(req.body)
			if (validationErrors) {
				return res.status(422).json({
					message: "Validation failed",
					errors: validationErrors
				})
			}

			// Check if user exists
			const userExists = await User.findOne({
				$or: [ {email: req.body.email},{username: req.body.username}],
			});

			if (userExists) {
				return res.status(409).json({
					message: "user already exists",
				});
				}
			const userID = await UniqueID.generateUserID()
			const newUser = new User({
				...req.body,
				userID,
			})

			const userData = await newUser.save()

			if (!userData) {
				return res.status(400).json({
					message: "Unable to create new user"
				})
			}

			const userDoc = userData.toObject()
			delete userDoc._id;
			delete userDoc.__v;
			return res.status(201).json({
				message: "User created successfully",
				data: userDoc
			})
		} catch (error: any) {
			return res.status(500).json({
				message : error?.message || 'Something went wrong' ,
			})
		}
	}

	// Method to get all user profiles
	public static async getAllUsers(req: Request, res: Response) {

		try {
			const usersData = await User.find().select("-_id -__v")
			if (!usersData) {
				return res.status(400).json({
					message: "Unable to fetch User Profiles from the Database, Try again later",
					data: []
				})
			}

			if (usersData.length===0) {
					return res.status(400).json({
					message: "No user profiles found in the database",
					data: []
				})

			}

			return res.status(200).json({
				message: "User Profiles fetched successfully from the Database",
				data: usersData
			})

		} catch (error: any) {
			return res.status(500).json({
				message: error?.message || "Something went wrong",
				data: []
			})
		}
	}

	// Method to get a single user by email, username or ID
	public static async getUser(req: Request, res: Response) {

		const {param} = req.params
		try {
			const user = (await User.findOne({userID: param}).select("-_id -__v")) ||
				((await User.findOne({ email: param }).select("-_id -__v")) as unknown as IUserModel) ||
				(await User.findOne({ username: param }).select("-_id -__v"));

			if (!user) {
				return res.status(404).json({
					message: "User not found",
					data: []
				})
			}


			return res.status(200).json({
				message: "User Profile fetched successfully",
				data: user
			})
		} catch (error:any) {
			return res.status(500).json({
				message: error?.message || "Something went wrong",
				data: []
			})
		}
	}

	// Method to update existing user profile
	public static async updateUserProfile(req: Request, res: Response){

		const {param} = req.params
		try {
			const validationErrors = validateUpdateUserInput(req.body)
			if (validationErrors) {
				return res.status(422).json({
					message: "Validation failed",
					errors: validationErrors
				})
			}
			const user: any = await User.findOne({
				$or: [{userID: param}, {email: param},{username: param}],
			})
			if (!user) {
				return res.status(404).json({
					message: "User not found"
				})
			}
			const updatedUserDoc = await User.findByIdAndUpdate(
			{_id: user._id},
			{ $set: req.body }, // Use $set to update specific fields without replacing the entire document
			{ new: true }
			).select("-_id -__v")
				.exec();
			 if (!updatedUserDoc) {
				 return res.status(404).json({
					 message: "Unable to update User Profile",
					 data: []
				})
			}

			return res.status(200).json({
				message: "User profile updated successfully",
				data: updatedUserDoc
			})

		} catch (error: any) {
			return res.status(500).json({
				message: error?.message || "Something went wrong",
				data: []
			})
		}

	}

	// Method to delete user profile by ID, email or username
	public static async deleteUserProfile(req: Request, res: Response) {

		const {param} = req.params
		try {
			const user: any = await User.findOne({
				$or: [{userID: param}, {email: param},{username: param}],
			})
			if (!user) {
				return res.status(404).json({
					message: "User not found"
				})
			}

			const deletedProfile = await User.findByIdAndDelete({
				_id: user._id})

			if (!deletedProfile) {
				return res.status(404).json({
					message: "Unable to delete User Profile",
					data: []
				})
			}

			return res.status(200).json({
				message: "User Profile deleted successfully"
			})
		} catch (error: any) {
			return res.status(500).json({
				message: error?.message || "Something went wrong",
				data: []
			})
		}
	}
}

export default UserController