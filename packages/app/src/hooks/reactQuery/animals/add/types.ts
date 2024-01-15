import { APIResponse } from '../../../../api/types';
import { Gender, Size } from '../../../../types';

export type BodyData = {
	name: string;
	type: string;
	gender: Gender;
	color: string;
	size: Size;
	description: string;
	picture: string;
};

export interface AddAnimalData extends APIResponse {
	data: {
		animal: {
			id: number;
			owner_id: number;
			name: string;
			type: string;
			gender: string;
			color: string;
			size: string;
			description: string;
			picture: string;
		};
	};
}
