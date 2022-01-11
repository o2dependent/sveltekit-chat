<script lang="ts">
	import Input from '$lib/Input.svelte';

	export let name: string;
	import { accessToken } from '$stores/accessToken.store';

	interface Message {
		name: string;
		id: string;
		text: string;
		success: boolean;
	}

	import io from 'socket.io-client';
	const socket = io(import.meta.env.VITE_SERVER_URL as string, {
		extraHeaders: {
			'x-access-token': $accessToken
		}
	});

	let text = '';
	let currentRoom = '';
	let previousRoom = '';
	let messages: Record<string, Message[]> = {};

	$: {
		console.log(previousRoom, currentRoom);
		if (previousRoom) {
			socket.emit('leaveRoom', { room: previousRoom });
		}
		if (currentRoom) {
			messages[currentRoom] = [];
			socket.emit('joinRoom', { room: currentRoom });
		}
		previousRoom = currentRoom;
	}

	socket.on('chatToClient', (message: Message, room: string) => {
		console.log(message);
		messages[room] = [message, ...messages[room]];
		messages = { ...messages };
	});

	const sendMessage = () => {
		if (!text || !currentRoom) return;
		socket.emit('chatToServer', { text, name, room: currentRoom });
		text = '';
	};
</script>

<div class="flex flex-col h-full flex-grow max-h-screen p-4">
	<label class="text-gray-300" for="animals">
		Rooms
		<select
			id="rooms"
			bind:value={currentRoom}
			class="block w-52 py-2 px-3 border border-slate-700 bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
			name="animals"
		>
			<option value=""> Select a room </option>
			{#each ['general', 'fun'] as roomId}
				<option value={roomId}>{roomId}</option>
			{/each}
		</select>
	</label>
	<div class="flex overflow-y-scroll flex-col-reverse gap-2 py-4 max-w-lg flex-grow max-h-full">
		{#if currentRoom}
			{#each messages[currentRoom] as message}
				<div
					class={`rounded-3xl shadow-sm px-4 w-fit h-fit max-w-full py-2 border-slate-200 dark:border-slate-600 border-2 bg-slate-50 dark:bg-slate-700 ${
						message.name === name ? 'self-user-message' : 'other-user-message'
					}`}
				>
					<p class="max-w-full break-all">
						{message.text}
					</p>
				</div>
			{/each}
		{/if}
	</div>

	<form class="flex gap-2" on:submit|preventDefault={sendMessage}>
		<Input
			className="flex-grow"
			name="message"
			placeholder="Send a message"
			type="text"
			bind:value={text}
		/>
		<button type="submit" class="p-2 border-2 border-slate-700 bg-slate-800 rounded-full"
			><svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12"
					stroke="#F1F5F9"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</form>
</div>

<style>
	.self-user-message {
		@apply bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 ml-4 self-end rounded-br;
	}

	.self-user-message ~ .self-user-message {
		@apply ml-4;
	}

	.other-user-message {
		@apply mr-4 rounded-bl;
	}
</style>
