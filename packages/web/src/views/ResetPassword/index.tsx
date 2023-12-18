import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../api/requests";
import Input from "../../components/Input";
import { LoadingIcon } from "../../components/LoadingIcon";

const ResetPassword: React.FC = (): JSX.Element => {
	// Get the token from the url
	const { token } = useParams();

	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [arePasswordsValid, setArePasswordsValid] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [status, setStatus] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);

		if (!token) {
			setLoading(false);
			setStatus("No token provided");
			return;
		}

		const res = await requests.auth.resetPassword(token, password);

		setStatus(res.data.message || "Error resetting password");
		setLoading(false);
	};

	useEffect(() => {
		// Regex for checking if the password has at least 1 lowercase, 1 uppercase and 1 number
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

		setArePasswordsValid(
			passwordRegex.test(password) && // Test if the password matches the regex
				password.trim().length >= 8 && // Check if it has at least 8 characters
				password.trim() === confirmPassword.trim() // Check if both passwords match
		);
	}, [password, confirmPassword]);

	return (
		<>
			<h1 className="text-2xl font-semibold text-center text-secondaryColor">
				Reset Password
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col mt-4">
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="flex flex-col mt-4">
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<div className="flex items-center justify-center h-14">
					{loading && <LoadingIcon className="scale-75" fill="#2B2A63" />}
					{!loading && status && (
						<span className="text-sm font-semibold text-secondaryColor">{status}</span>
					)}
				</div>

				<button
					type="submit"
					className="w-full px-16 py-2 text-base font-semibold transition duration-200 ease-in border border-transparent rounded-lg shadow bg-quaternaryColor hover:bg-quinaryColor focus:bg-quinaryColor focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
					disabled={!arePasswordsValid}
				>
					Reset Password
				</button>
			</form>
		</>
	);
};

export default ResetPassword;
