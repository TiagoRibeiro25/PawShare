import { APIResponse } from '../../../../api/types';
import { Gender, Size } from '../../../../types';

export type Params = {
	page: number;
	limit: number;
	city: string;
	type: string;
	size: Size;
	gender: Gender;
	color: string;
};

export type Adoption = {
	id: number;
	city: string;
	animal: {
		id: number;
		name: string;
		gender: 'Male' | 'Female' | 'Other';
		description: string;
		picture: string | null;
	};
	updated_at: string;
	created_at: string;
};

export interface GetAdoptionFeedData extends APIResponse {
	data: {
		adoptions: Adoption[];
		total: number;
	};
}
