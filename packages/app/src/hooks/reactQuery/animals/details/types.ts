import { APIResponse } from '../../../../api/types';
import { Gender, Size } from '../../../../types';

export type Params = {
	id: number;
};

export type Animal = {
	id: number;
	name: string;
	type: string;
	gender: Gender;
	color: string;
	size: Size;
	description?: string;
	picture?: string;
	is_placed_for_adoption: boolean;
	is_requested_for_sitting: boolean;
	user: {
		id: number;
		display_name: string;
		picture: string;
	};
	created_at: string;
	updated_at: string;
};

export interface GetAnimalProfileData extends APIResponse {
	data: {
		animal: Animal;
	};
}
