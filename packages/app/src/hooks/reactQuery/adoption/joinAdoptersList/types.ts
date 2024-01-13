import { APIResponse } from '../../../../api/types';

export type Params = {
	adoptionId: number;
};

export interface JoinAdoptersListData extends APIResponse {
	data: {
		candidate: {
			id: number;
			user_id: number;
			adoption_id: number;
			is_confirmed: boolean;
			created_at: string;
			updated_at: string;
		};
	};
}
