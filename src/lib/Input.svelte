<script lang="ts">
	export let className: string = '';
	export let label: string = '';
	export let name: string;
	export let value: string;
	export let placeholder: string = '';
	export let type:
		| 'text'
		| 'password'
		| 'email'
		| 'number'
		| 'tel'
		| 'url'
		| 'search'
		| 'date'
		| 'time'
		| 'datetime'
		| 'datetime-local'
		| 'month'
		| 'week'
		| 'color'
		| 'file'
		| 'range'
		| 'radio'
		| 'checkbox'
		| 'hidden'
		| 'submit'
		| 'reset'
		| 'button' = 'text';

	const handleInput = (e) => {
		// in here, you can switch on type and implement
		// whatever behaviour you need
		value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
	};
</script>

<div class={className}>
	{#if label}
		<label for="name-with-label" class="text-slate-300"> {label} </label>
	{/if}
	<input
		class=" rounded-lg border-transparent flex-1 appearance-none border border-slate-700 w-full py-2 px-4 bg-slate-800 text-slate-50 placeholder-slate-500 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
		{value}
		{type}
		on:input={handleInput}
		{name}
		{placeholder}
	/>
</div>
