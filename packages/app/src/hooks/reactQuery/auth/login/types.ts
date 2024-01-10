import { APIResponse } from '../../../../api/types';
import { LoggedUser } from '../../../../context/user/types';

export type BodyData = {
	email: string;
	password: string;
	remember_me: boolean;
};

export interface LoginData extends APIResponse {
	data: {
		authToken: string;
		refreshToken: string;
		user: LoggedUser;
	};
}
