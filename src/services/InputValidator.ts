import Log from "../middlewares/Log";
import validator from "validator";

interface UserInput {
	first_name: string;
	last_name: string;
	username: string;
	address: string;
	phone_number: string;
	email: string
}

interface ValidationErrors {
	[key: string]: string;
}

export const validateNewUserInput = (userInput: UserInput): ValidationErrors | null => {
	const errors: ValidationErrors = {};

	// check for first_name field
			if (!userInput.first_name) {
				errors.first_name_absent = "Request object does not include first_name"
				userInput.first_name = ""
	}

	// check for empty first_name field
			if (validator.isEmpty(userInput.first_name, { ignore_whitespace: true })) {
				errors.first_name = "first_name cannot be blank"
	}

	// check for bad  first_name type
			if (typeof userInput.first_name !== "string") {
				errors.first_name = "first_name should be a string"
	}

			// check for last_name field
			if (!userInput.last_name) {
				errors.last_name_absent = "Request object does not include last_name"
				userInput.last_name = ""
	}
			// check for empty last_name field
			if (validator.isEmpty(userInput.last_name, { ignore_whitespace: true })) {
				errors.last_name = "last_name cannot be blank"
			}

			// check for bad  last_name type
			if (typeof userInput.last_name !== "string") {
				errors.last_name = "last_name should be a string"
	}

			// check for username field
			if (!userInput.username) {
				errors.username_absent = "Request object does not include username"
				userInput.username = ""
	}
			// check for empty username field
			if (validator.isEmpty(userInput.username, { ignore_whitespace: true })) {
				errors.username = "username cannot be blank"
			}

			// check for bad  username type
			if (typeof userInput.username !== "string") {
				errors.username = "username should be a string"
	}


			// check for address field
			if (!userInput.address) {
				errors.address_absent = "Request object does not include address"
				userInput.address = ""
	}
					// check for empty address field
			if (validator.isEmpty(userInput.address, { ignore_whitespace: true })) {
				errors.address = "address cannot be blank"
			}

		// check for bad  address type
			if (typeof userInput.address !== "string") {
				errors.address = "address should be a string"
	}

			// check for email field
			if (!userInput.email) {
				errors.email_absent = "Request object does not include email"
				userInput.email = ""
	}
	// check for empty email field
			if (validator.isEmpty(userInput.email, { ignore_whitespace: true })) {
				errors.email =  "E-mail field cannot be blank";
			}

			// check for bad  email type
			if (typeof userInput.email !== "string") {
				errors.email =  "email should be a string";
			}

			// check for invalid email
			if (!validator.isEmail(userInput.email)) {
				errors.email = "E-mail is not valid";
			}


			// check for phone_number field
			if (!userInput.phone_number) {
				errors.phone_number_absent = "Request object does not include phone_number"
				userInput.phone_number = ""
	}
			// check for empty phone_number field
			if (validator.isEmpty(userInput.phone_number, { ignore_whitespace: true })) {
				errors.phone_number = "phone_number cannot be blank";
			}

			// check for bad phone_number type
			if (!["string"].includes(typeof userInput.phone_number)) {
				errors.phone_number= "phone_number should be a string";
			}
			// Check for invalid phone_number
			if (
				!validator.isMobilePhone(userInput.phone_number, "any", { strictMode: true })
			) {
				errors.phone_number = "Invalid phone_number, ensure to include the country code";
			}

	return Object.keys(errors).length === 0 ? null : errors;
}

export const validateUpdateUserInput = (userInput: UserInput): ValidationErrors | null => {
	const errors: ValidationErrors = {};

	Log.info("Validation")
			// Define the fields to validate
	const fieldsToValidate: (keyof UserInput)[] = ['first_name', 'last_name', 'username', 'address', 'email', 'phone_number'];

	// Loop through the fields and validate each one
	for (const field of fieldsToValidate) {
		if (userInput[field] === undefined) {
			// The field is not present in the request body; continue to the next field
			continue;
		}


			// Check for empty field
			if (validator.isEmpty(userInput[field] as string, { ignore_whitespace: true })) {
				errors[field] = `${field} cannot be blank`;
			}

			// Check for bad type
			if (typeof userInput[field] !== 'string') {
				errors[field] = `${field} should be a string`;
			}

	}

	// Additional validations for specific fields
	if (userInput.email && !validator.isEmail(userInput.email as string)) {
		errors.email = 'E-mail is not valid';
	}

	if (userInput.phone_number && !validator.isMobilePhone(userInput.phone_number as string, 'any', { strictMode: true })) {
		errors.phone_number = 'Invalid phone_number, ensure to include the country code';
	}

	return Object.keys(errors).length === 0 ? null : errors;

}