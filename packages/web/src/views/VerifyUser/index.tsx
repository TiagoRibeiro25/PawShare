import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../../api/requests";
import { LoadingIcon } from "../../components/LoadingIcon";

const VerifyUser: React.FC = () => {
	// Get the token from the url
	const { token } = useParams();

	const [loading, setLoading] = useState<boolean>(true);
	const [status, setStatus] = useState<string>("");

	useEffect(() => {
		const verifyUser = async (): Promise<void> => {
			setLoading(true);
			setStatus("");

			if (!token) {
				setLoading(false);
				setStatus("No token provided");
				return;
			}

			const res = await requests.users.verifyUser(token);

			setStatus(res.data.message || "Error verifying user");
			setLoading(false);
		};

		verifyUser();
	}, [token]);

	return (
		<>
			{loading ? (
				<LoadingIcon fill="#2B2A63" />
			) : (
				<h1 className="text-2xl font-semibold text-secondaryColor">{status}</h1>
			)}
		</>
	);
};

export default VerifyUser;
