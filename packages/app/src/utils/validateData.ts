export type Type = 'email' | 'password' | 'name' | 'description' | 'phone';

const regexRules = {
	// Must be a valid email address
	email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,

	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,

	// Minimum two characters, only letters
	name: /^[a-zA-Z\s]{2,}$/,

	// Minimum ten characters, maximum 100 characters
	description: /^.{10,100}$/,

	// Must be a valid phone number
	phone: /^(\+?)(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/,
};

const isValid = (data: string | number, type: Type) => {
	return regexRules[type].test(data.toString());
};

export default { isValid };
