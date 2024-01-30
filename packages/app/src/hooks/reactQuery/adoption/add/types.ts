import { APIResponse } from '../../../../api/types';

export type RequestData = {
	animalId: number;
	bodyData: {
		city: string;
		email_contact: string;
		phone_contact: string;
		notes: string[];
	};
};

export interface AddAdoptionData extends APIResponse {
	data: {
		adoption: {
			id: number;
			animal_id: number;
			owner_id: number;
			email_contact: string;
			phone_contact: string;
			notes: string[];
			city: string;
			created_at: string;
			updated_at: string;
		};
	};
}
