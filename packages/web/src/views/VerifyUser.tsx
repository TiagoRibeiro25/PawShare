import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import requests from "../api/requests";
import { LoadingIcon } from "../components/icons/LoadingIcon";

const VerifyUser: React.FC = () => {
	// get the token from the url
	const { token } = useParams();

	const [loading, setLoading] = useState<boolean>(true);
	const [status, setStatus] = useState<string>("");

	const verifyUser = useCallback(async (): Promise<void> => {
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
	}, [token]);

	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	return (
		<div>
			{loading ? (
				<LoadingIcon style={{ scale: 1.5 }} />
			) : (
				<div>
					<h1>{status}</h1>
				</div>
			)}
		</div>
	);
};

export default VerifyUser;
