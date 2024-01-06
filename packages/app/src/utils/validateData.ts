type Type = 'email' | 'password';

const regexRules = {
	// Must be a valid email address
	email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,

	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};

const isValid = (data: string | number, type: Type) => {
	return regexRules[type].test(data.toString());
};

export default { isValid };
