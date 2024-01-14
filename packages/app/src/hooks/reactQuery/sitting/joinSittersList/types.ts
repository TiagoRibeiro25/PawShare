import { APIResponse } from '../../../../api/types';

export type Params = {
	sittingId: number;
};

export interface JoinSittersListData extends APIResponse {
	data: {
		candidate: {
			id: number;
			user_id: number;
			sitting_id: number;
			is_confirmed: boolean;
		};
	};
}
