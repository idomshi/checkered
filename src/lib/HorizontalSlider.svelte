<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let min = 8;
	export let max = 64;
	export let value = min;

	const dispatch = createEventDispatcher<{
		change: number;
	}>();

	function inc() {
		value = Math.min(value + 1, max);
	}

	function dec() {
		value = Math.max(value - 1, min);
	}

	function valInput(ev: Event) {
		ev.preventDefault();
		const target = ev.target;
		if (!(target instanceof HTMLInputElement)) return;
		value = Math.min(max, Math.max(min, parseInt(target.value)));
	}

	$: dispatch('change', value);
</script>

<div class="container">
	<input type="range" bind:value {min} {max} />
	<input type="text" bind:value on:change={valInput} class="numberinput" />
	<button type="button" class="button" on:click={dec}>-</button>
	<button type="button" class="button" on:click={inc}>+</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}

	.numberinput {
		box-sizing: border-box;
		width: 3rem;
		padding: 0 0.25rem;
		text-align: right;
	}

	.button {
		width: 2rem;
		height: 2rem;
		flex: 0 0 auto;
	}
</style>
