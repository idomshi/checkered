<script lang="ts">
	import { svggen } from '$lib/svggen';
	import LineItemView from './LineItemView.svelte';

	import { writable, type Writable } from 'svelte/store';
	import { getContext } from 'svelte';
	import type { LineItem } from './types';

	let tw = writable(128);
	let th = writable(128);
	let iw = writable(640);
	let ih = writable(480);
	let bgcolor = writable('ffffff');

	const {
		value: lineItems,
		addItem,
		removeItem
	} = getContext<{
		value: Writable<LineItem[]>;
		addItem: () => void;
		removeItem: (idx: number) => void;
	}>('lineItems');

	$: tilesize = `${$tw}x${$th}`;
	$: lines = $lineItems
		.map(({ direction, color, linewidth, offset }) => `${color}${direction}${linewidth}-${offset}`)
		.join('_');
	$: imagesize = `${$iw}x${$ih}.svg`;
	$: svg = svggen({ tilesize, bgcolor: $bgcolor, lines, imagesize });
	$: relativeUrl = `${tilesize}/${$bgcolor}/${lines}/${imagesize}`;
	$: url = `https://checkered.pages.dev/${relativeUrl}`;
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
			{#each $lineItems as _lineItem, i}
				<!-- lineItemをLineItemViewに与えないのはなんか気持ち悪いな。 -->
				<LineItemView idx={i}></LineItemView>
			{/each}
			<button type="button" on:click={addItem}>追加</button>
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
