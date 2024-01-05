import { APIResponse } from '../../../../api/types';

export type BodyData = {
	email: string;
	password: string;
	remember_me: boolean;
};

export type LoginData = APIResponse & {
	data: {
		authToken: string;
		refreshToken: string;
		user: {
			id: number;
			coins: number;
		};
	};
};
