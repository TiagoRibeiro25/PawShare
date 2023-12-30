import axios, { type AxiosInstance } from 'axios';
import config from '../config';
import middlewares from './middlewares';

const api: AxiosInstance = axios.create(config.api);

// Apply middlewares
middlewares.onEveryRequest(api);
middlewares.onEveryResponse(api);

export default api;
