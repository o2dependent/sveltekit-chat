import { validate } from 'class-validator';
import { client } from '../client';
import { user as userStore } from '../../stores/user.store';
import type { User } from './types/user';
import type { RegisterCredentialsDto } from './dtos/register-credentials.dto';
import { accessToken } from '$stores/accessToken.store';

export const register = async (registerCredentialsDto: RegisterCredentialsDto): Promise<void> => {
	try {
		const errors = await validate(registerCredentialsDto);
		console.log(errors);
		const {
			data: { accessToken: resAccessToken, user }
		} = await client.post<{ accessToken: string; user: User }>(
			'/auth/register',
			registerCredentialsDto,
			{ withCredentials: true }
		);
		accessToken.set(resAccessToken);
		userStore.set(user);
	} catch (error) {
		throw new Error(error);
	}
};
