import { ValidationError } from "./api_error.js";

export default function requiredFieldValidation(obj) {
	// check for all required fields except desc & tags
	Object.values(obj).forEach((field) => {
		if (!field || field === " ") {
			throw new ValidationError();
		}
	});
}