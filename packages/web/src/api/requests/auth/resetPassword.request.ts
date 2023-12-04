import api from "../../index";
import { Response } from "../types";
import { handleError } from "../utils";

export default async (token: string, password: string): Promise<Response> => {
	try {
		const response: Response = await api.patch(
			`/auth/reset-password/${token}`,
			{ password }
		);
		return response;
	} catch (error) {
		return handleError(error);
	}
};
