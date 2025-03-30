<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	interface Props {
		min?: number;
		max?: number;
		value?: any;
	}

	let { min = 8, max = 64, value = $bindable(min) }: Props = $props();

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

	run(() => {
		dispatch('change', value);
	});
</script>

<div class="container">
	<input type="range" class="rangeinput" bind:value {min} {max} />
	<input type="text" class="numberinput" bind:value onchange={valInput} />
	<button type="button" class="button" onclick={dec}>-</button>
	<button type="button" class="button" onclick={inc}>+</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}

	.rangeinput {
		flex: 1 1 100%;
	}

	.numberinput {
		width: 3rem;
		padding: 0 0.25rem;
		text-align: right;
		flex: 0 0 auto;
	}

	.button {
		width: 2rem;
		height: 2rem;
		flex: 0 0 auto;
	}
</style>
