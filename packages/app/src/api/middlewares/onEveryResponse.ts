import { AxiosInstance, AxiosResponse } from 'axios';
import utils from '../../utils';

export default (api: AxiosInstance): void => {
	// Check if the tokens have been updated (if so, update them in the storage)
	api.interceptors.response.use(
		(res: AxiosResponse): AxiosResponse => {
			const authToken: string | undefined = res.headers['x-auth-token'];
			const refreshToken: string | undefined = res.headers['x-refresh-token'];

			if (authToken) {
				utils.storage.set('authToken', authToken);
			}

			if (refreshToken) {
				utils.storage.set('refreshToken', refreshToken);
			}

			return res;
		},

		// If the response is a 401, delete the tokens from the storage
		async (err: any) => {
			if (err.response?.status === 401) {
				utils.storage.delete('authToken');
				utils.storage.delete('refreshToken');
			}

			return Promise.reject(err);
		},
	);
};
