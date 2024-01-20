<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { LineDirection, LineItem } from './types';

	export let lineItem: LineItem;

	const dispatch = createEventDispatcher<{
		addItem: null;
		removeItem: null;
		changeDirection: 'h' | 'v';
		changeColor: string;
		changeWidth: number;
		changePosition: number;
	}>();

	const directionOption = [
		{ value: 'h', text: 'ヨコ' },
		{ value: 'v', text: 'タテ' }
	];

	function remove() {
		dispatch('removeItem');
	}

	function changeDirection(ev: Event) {
		const target = ev.target;
		if (!(target instanceof HTMLSelectElement)) return;
		dispatch('changeDirection', target.value as LineDirection);
	}

	function changeColor(ev: Event) {
		const target = ev.target;
		if (!(target instanceof HTMLInputElement)) return;
		dispatch('changeColor', target.value);
	}

	function changeWidth(ev: Event) {
		const target = ev.target;
		if (!(target instanceof HTMLInputElement)) return;
		const width = parseInt(target.value);
		if (isNaN(width)) return;
		dispatch('changeWidth', width);
	}

	function changePosition(ev: Event) {
		const target = ev.target;
		if (!(target instanceof HTMLInputElement)) return;
		const position = parseInt(target.value);
		if (isNaN(position)) return;
		dispatch('changePosition', position);
	}
</script>

<div class="lineitem">
	<p>
		線の向き：<select bind:value={lineItem.direction} on:change={changeDirection}>
			{#each directionOption as diropt}
				<option value={diropt.value}>{diropt.text}</option>
			{/each}
		</select>
	</p>
	<div>
		色：
		<div class="colorpreview" style="background-color: #{lineItem.color}"></div>
		<input type="text" bind:value={lineItem.color} on:input={changeColor} />
	</div>
	<p>太さ：<input type="number" bind:value={lineItem.linewidth} on:change={changeWidth} /></p>
	<p>位置：<input type="number" bind:value={lineItem.offset} on:change={changePosition} /></p>
	<button type="button" on:click={remove}>削除</button>
</div>

<style>
	.lineitem {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr 1fr 1fr 4rem;
		align-items: end;

		& input {
			width: 100%;
		}

		& button {
			padding: 0.25rem;
			height: 2.5rem;
			border-radius: 0.25rem;
		}
	}

	.colorpreview {
		width: 2rem;
		height: 2rem;
	}
</style>
