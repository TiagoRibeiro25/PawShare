import { APIResponse } from '../../../../api/types';
import { Gender, Size } from '../../../../types';

export type Data = {
	animalId: number;
	name?: string;
	type?: string;
	gender?: Gender;
	color?: string;
	size?: Size;
	description?: string;
	picture?: string;
	dataToUpdate: string[];
};

export interface UpdateAnimalData extends APIResponse {
	data: {
		animal: {
			id: number;
			animal_id: number;
			owner_id: number;
			name: string;
			type: string;
			gender: Gender;
			color: string;
			size: Size;
			description?: string;
			picture?: string;
		};
	};
}
