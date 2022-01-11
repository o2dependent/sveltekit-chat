<script lang="ts">
	import { user } from '$stores/user.store';
	import { onMount } from 'svelte';
	import MessagesFeed from '$lib/messages/MessagesFeed.svelte';

	onMount(() => {
		console.log({
			user: $user
		});
	});
</script>

<MessagesFeed name={$user?.username} />
