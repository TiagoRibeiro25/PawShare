import { APIResponse } from '../../../../api/types';

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
	animals?: {
		id: number;
		name: string;
		picture: string;
	}[];
};

export type GetLoggedUserData = APIResponse & {
	data: User;
};
