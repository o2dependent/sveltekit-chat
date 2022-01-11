import { client, tokenService } from '../client';
import { user as userStore } from '../../stores/user.store';
import type { User } from './types/user';
import { accessToken } from '$stores/accessToken.store';
import { browser } from '$app/env';

export const refreshToken = async (): Promise<void> => {
	try {
		const {
			data: { accessToken: resAccessToken, user }
		} = await client.post<{ accessToken: string; user: User }>(
			'/auth/refresh',
			{},
			{
				withCredentials: true
			}
		);
		accessToken.set(resAccessToken ?? '');
		console.log({ user });
		userStore.set(user);
	} catch (error) {
		throw new Error(error);
	}
};
