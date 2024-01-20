<script lang="ts">
	import { svggen } from '$lib/svggen';
	import LineItemView from './LineItemView.svelte';

	import { writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import type { LineDirection, StateContext } from './types';

	let tw = writable(128);
	let th = writable(128);
	let iw = writable(640);
	let ih = writable(480);
	let bgcolor = writable('ffffff');

	const { lineItems, update } = getContext<StateContext>('StateContext');

	$: tilesize = `${$tw}x${$th}`;
	$: lines = $lineItems
		.map(({ direction, color, linewidth, offset }) => `${color}${direction}${linewidth}-${offset}`)
		.join('_');
	$: imagesize = `${$iw}x${$ih}.svg`;
	$: svg = svggen({ tilesize, bgcolor: $bgcolor, lines, imagesize });
	$: relativeUrl = `${tilesize}/${$bgcolor}/${lines}/${imagesize}`;
	$: url = `https://checkered.pages.dev/${relativeUrl}`;

	function removeItem(i: number) {
		update({ message: 'removeItem', index: i });
	}

	function changeDirection(i: number, ev: CustomEvent<LineDirection>) {
		update({ message: 'changeDirection', index: i, direction: ev.detail });
	}

	function changeColor(i: number, ev: CustomEvent<string>) {
		update({ message: 'changeColor', index: i, color: ev.detail });
	}

	function changeWidth(i: number, ev: CustomEvent<number>) {
		update({ message: 'changeWidth', index: i, width: ev.detail });
	}

	function changePosition(i: number, ev: CustomEvent<number>) {
		update({ message: 'changePosition', index: i, position: ev.detail });
	}
</script>

<section class="form">
	{@html svg}
	<form>
		<label for="tw">タイル幅</label>
		<input id="tw" type="text" bind:value={$tw} />
		<label for="tw">タイル高さ</label>
		<input id="tw" type="text" bind:value={$th} />
		<label for="tw">画像幅</label>
		<input id="tw" type="text" bind:value={$iw} />
		<label for="tw">画像高さ</label>
		<input id="tw" type="text" bind:value={$ih} />

		<label for="tw">背景色</label>
		<input id="tw" type="text" bind:value={$bgcolor} />

		<div class="lines">
			<h3>線</h3>
			{#each $lineItems as lineItem, i (i)}
				<LineItemView
					{lineItem}
					on:removeItem={() => removeItem(i)}
					on:changeDirection={(dir) => changeDirection(i, dir)}
					on:changeColor={(ev) => changeColor(i, ev)}
					on:changeWidth={(ev) => changeWidth(i, ev)}
					on:changePosition={(ev) => changePosition(i, ev)}
				></LineItemView>
			{/each}
			<button type="button" on:click={() => update({ message: 'addItem' })}>追加</button>
		</div>

		<div class="result">
			<p>URL: <input type="text" bind:value={url} /></p>
			<a href={relativeUrl}>開く</a>
		</div>
	</form>
</section>

<style>
	h3 {
		margin-top: 1rem;
	}

	section {
		margin: 0 1rem;
	}

	form {
		display: grid;
		gap: 0.5rem 2rem;
		grid-template-columns: 8rem 2fr;
	}

	.form {
		border: #666 solid 1px;
		padding: 0.5rem;
	}

	.lines {
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.result {
		grid-column-start: 1;
		grid-column-end: 3;
	}
</style>
