import { APIResponse } from '../../../../api/types';
import { Gender, Size } from '../../../../types';

export type Params = {
	id: number;
};

export type Adoption = {
	id: number;
	email_contact: string;
	phone_contact: string;
	city: string;
	is_candidate: boolean;
	notes: string[];
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
		picture: string;
	};
	created_at: string;
	updated_at: string;
};

export interface GetAdoptionDetailsData extends APIResponse {
	data: {
		adoption: Adoption;
	};
}
