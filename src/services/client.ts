import axios, { AxiosError } from 'axios';
import { refreshToken } from './auth/refreshToken';

class TokenService {
	accessToken = '';
}
export const tokenService = new TokenService();

// > create axios instance with access token and base url
const client = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL as string,
	headers: {
		'Content-Type': 'application/json',
		'x-access-token': tokenService.accessToken
	}
});

// > set up base access token interceptor
client.interceptors.request.use(
	(config) => {
		// > set access token in header
		if (tokenService.accessToken) {
			config.headers = {
				...config.headers,
				'x-access-token': tokenService.accessToken
			};
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// > set up 401 error interceptor
client.interceptors.response.use(
	(response) => response,
	async (err: AxiosError<{ accessToken: string }>) => {
		// > TODO: clean up this typecasting. This is a bit of a hack to assure _retry is available
		const originalConfig = err.config as unknown as typeof err.config & {
			_retry: boolean;
		};

		if (originalConfig.url !== '/auth/login' && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				// prevent retry loop
				originalConfig._retry = true;

				try {
					await refreshToken();

					return await client(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}
		9;
		return Promise.reject(err);
	}
);

export { client };
