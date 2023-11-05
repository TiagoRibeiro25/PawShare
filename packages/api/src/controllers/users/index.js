const login = require("./login.controller");
const register = require("./register.controller");
const verifyUser = require("./verifyUser.controller");
const requestResetPassword = require("./requestResetPassword.controller");
const resetPassword = require("./resetPassword.controller");

module.exports = {
	login,
	register,
	verifyUser,
	requestResetPassword,
	resetPassword,
};
