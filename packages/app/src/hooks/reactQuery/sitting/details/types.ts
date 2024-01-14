import { APIResponse } from '../../../../api/types';
import { Gender, Size } from '../../../../types';

export type Params = {
	id: number;
};

export type Sitting = {
	id: number;
	email_contact: string;
	phone_contact: string;
	city: string;
	is_candidate: boolean;
	notes: string[];
	coins: number;
	rating: number;
	start_date: string;
	end_date: string;
	animal: {
		id: number;
		owner: {
			id: number;
			display_name: string;
			picture: string;
		};
		name: string;
		type: string;
		gender: Gender;
		color: string;
		size: Size;
		description?: string;
		picture?: string;
	};
	created_at: string;
	updated_at: string;
};

export interface GetSittingDetailsData extends APIResponse {
	data: {
		sitting: Sitting;
	};
}
