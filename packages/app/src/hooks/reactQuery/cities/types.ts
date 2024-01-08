import { APIResponse } from '../../../api/types';

export type Params = {
	search: string;
};

export interface GetCitiesData extends APIResponse {
	data: {
		cities: string[];
	};
}
