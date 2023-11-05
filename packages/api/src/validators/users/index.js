const login = require("./login.validator");
const register = require("./register.validator");
const verifyUser = require("./verifyUser.validator");
const requestResetPassword = require("./requestResetPassword.validator");
const resetPassword = require("./resetPassword.validator");

module.exports = {
	login,
	register,
	verifyUser,
	requestResetPassword,
	resetPassword,
};
