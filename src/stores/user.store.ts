import { browser } from '$app/env';
import type { User } from '$services/auth/types/user';
import { writable } from 'svelte/store';

export const user = writable<User | undefined>();

user.subscribe((value) => {
	if (browser) {
		localStorage.setItem('user', JSON.stringify(value));
	}
});
