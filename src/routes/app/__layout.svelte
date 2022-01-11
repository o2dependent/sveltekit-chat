<script lang="ts">
	import { accessToken } from '$stores/accessToken.store';
</script>

{#if $accessToken}
	<slot />
{:else}
	<h1>Loading...</h1>
{/if}
