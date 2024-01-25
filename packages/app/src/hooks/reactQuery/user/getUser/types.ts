import { APIResponse } from '../../../../api/types';
import { UserType } from '../../../../types';

export type Params = {
	id: number | 'me';
};

type User = {
	id: number;
	display_name: string;
	email?: string;
	type: UserType;
	country: {
		name: string;
		code: string;
	};
	description?: string;
	coins?: number;
	badges: number[];
	selected_frame: number | null;
	selected_banner: number | null;
	created_at: string;
	updated_at: string;
	picture: string;
	animals?: {
		id: number;
		name: string;
		picture: string | null;
	}[];
};

export interface GetUserData extends APIResponse {
	data: User;
}
