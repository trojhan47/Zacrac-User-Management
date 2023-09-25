/**
 * @author Oyetunji Atilade <atiladeoyetunji@gmail.com, oyetunji.solina@gmail.com> @trojhan47
 * @desc Generate IDs
	 @access Private
 */
import { customAlphabet } from "nanoid/async";
import Log from "../middlewares/Log";

export default class UniqueGen {
	/**
	 * @description Unique reference Generator function
	 */


	private static async generateUniqueRef(label?: string, length?: number) {
		const nanoid = customAlphabet(
			"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
			15
		);

		const ref = await nanoid(length);

		if (!label) {
			return `${ref}`;
		}

		return `${label}_${ref}`;
	}

	public static async generateUserID() {
		const userID = await this.generateUniqueRef("ZAC");
		return userID;
	}

}
