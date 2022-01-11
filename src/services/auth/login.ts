import { validate } from 'class-validator';
import { client } from '../client';
import { user as userStore } from '../../stores/user.store';
import type { LoginCredentialsDto } from './dtos/login-credentials.dto';
import type { User } from './types/user';
import { accessToken } from '$stores/accessToken.store';

export const login = async (loginCredentialsDto: LoginCredentialsDto): Promise<void> => {
	const errors = await validate(loginCredentialsDto);
	console.log(errors);
	const {
		data: { accessToken: resAccessToken, user }
	} = await client.post<{ accessToken: string; user: User }>('/auth/login', loginCredentialsDto, {
		withCredentials: true
	});
	accessToken.set(resAccessToken);
	userStore.set(user);
};
