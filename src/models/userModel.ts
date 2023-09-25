import IUser from "../interfaces/models/user";
import mongoose from "../providers/Database";


// Create the model schema
export interface IUserModel
	extends IUser,
		mongoose.Document{
	gravatar(size: number): string;
}

// Define the User Schema
export const UserSchema = new mongoose.Schema({

	first_name: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},

	last_name: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},

	email: {
		type: String,
		unique: true,
		trim: true,
		required: true,
		lowercase: true,
	},

	username: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},

	userID: {
		type: String,
		required: true,
		unique: true,
		immutable: true
	},

	phone_number: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},

	address: {
		type: String,
		lowercase: true,
		required: true
	},
	createdAt: { type: Date, default: Date.now },
});




const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;
