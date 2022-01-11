<script lang="ts">
	import { browser } from '$app/env';
	import { refreshToken } from '$services/auth/refreshToken';
	import { tokenService } from '$services/client';
	import { accessToken } from '$stores/accessToken.store';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		refreshToken();

		accessToken.subscribe((value) => {
			if (browser) {
				tokenService.accessToken = value;
			}
		});
	});
</script>

<main class="flex flex-col flex-grow h-full">
	<slot />
</main>
