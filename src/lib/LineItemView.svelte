<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { LineItem } from './types';

	export let idx: number;

	const directionOption = [
		{ value: 'h', text: 'ヨコ' },
		{ value: 'v', text: 'タテ' }
	];

	const { value: lineItems, removeItem } = getContext<{
		value: Writable<LineItem[]>;
		addItem: () => void;
		removeItem: (idx: number) => void;
	}>('lineItems');

	const remove = (i: number) => removeItem(i);

	$: lineItem = $lineItems[idx];
</script>

<div class="lineitem">
	<p>
		線の向き：<select bind:value={lineItem.direction}>
			{#each directionOption as diropt, i}
				<option value={diropt.value} selected={i === 0}>{diropt.text}</option>
			{/each}
		</select>
	</p>
	<div>
		色：
		<div class="colorpreview" style="background-color: #{lineItem.color}"></div>
		<input type="text" bind:value={lineItem.color} />
	</div>
	<p>太さ：<input type="number" bind:value={lineItem.linewidth} /></p>
	<p>位置：<input type="number" bind:value={lineItem.offset} /></p>
	<button type="button" on:click={() => remove(idx)}>削除</button>
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
