export interface IUser {
	first_name: string;
	last_name: string;
	address: string;
	phone_number?: string;
	username: string;
	email: string;
	userID: string;
	createdAt?: Date;
}

export default IUser;
