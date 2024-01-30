import { APIResponse } from '../../../../api/types';

export type RequestData = {
	animalId: number;
	bodyData: {
		city: string;
		email_contact: string;
		phone_contact: string;
		start_date: string;
		end_date: string;
		notes: string[];
		coins: number;
	};
};

export interface AddSittingData extends APIResponse {
	data: {
		sitting: {
			id: number;
			animal_id: number;
			owner_id: number;
			email_contact: string;
			phone_contact: string;
			start_date: string;
			end_date: string;
			notes: string[];
			city: string;
			coins: number;
			created_at: string;
			updated_at: string;
		};
	};
}
