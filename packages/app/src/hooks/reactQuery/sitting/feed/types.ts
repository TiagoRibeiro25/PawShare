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
	coins: number;
};

export type Sitting = {
	id: number;
	city: string;
	coins: number;
	start_date: string;
	end_date: string;
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

export interface GetSittingFeedData extends APIResponse {
	data: {
		sittings: Sitting[];
		total: number;
	};
}
