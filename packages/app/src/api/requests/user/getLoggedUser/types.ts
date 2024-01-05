import { APIResponse } from '../../../types';

type User = {
	id: number;
	display_name: string;
	email: string;
	type: string;
	country: {
		name: string;
		code: string;
	};
	description: string;
	coins: number;
	badges: number[];
	selected_frame: number | null;
	selected_banner: number | null;
	created_at: string;
	updated_at: string;
	picture: string;

	//TODO(tiago): Check if it's returning an array in the API (backend)
	animals?: {
		id: number;
		name: string;
		picture: string;
	}[];
};

export type Response = APIResponse & {
	data: {
		id: number;
		email: string;
		display_name: string;
		user_verified: boolean;
		currency: string;
		created_at: string;
	};
};

export type GetLoggedUserData = APIResponse & {
	data: User;
};
