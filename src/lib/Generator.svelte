<script lang="ts">
	import { svggen } from '$lib/svggen';

	interface LineItem {
		direction: 'h' | 'v';
		color: string;
		linewidth: number;
		offset: number;
	}

	const directionOption = [
		{ value: 'h', text: 'ヨコ' },
		{ value: 'v', text: 'タテ' }
	];

	let tw = 128;
	let th = 128;
	let iw = 640;
	let ih = 480;
	let bgcolor = 'ffffff';
	let lineItems: LineItem[] = [];

	$: tilesize = `${tw}x${th}`;
	$: lines = lineItems
		.map(({ direction, color, linewidth, offset }) => `${color}${direction}${linewidth}-${offset}`)
		.join('_');
	$: imagesize = `${iw}x${ih}.svg`;
	$: svg = svggen({ tilesize, bgcolor, lines, imagesize });
	$: relativeUrl = `${tilesize}/${bgcolor}/${lines}/${imagesize}`;
	$: url = `https://checkered.pages.dev/${relativeUrl}`;

	function addLine() {
		lineItems = [...lineItems, { direction: 'h', color: 'ccccccff', linewidth: 8, offset: 4 }];
	}

	function removeItem(i: number) {
		lineItems.splice(i, 1);
		lineItems = lineItems;
	}
</script>

<section class="form">
	{@html svg}
	<form>
		<label for="tw">タイル幅</label>
		<input id="tw" type="text" bind:value={tw} />
		<label for="tw">タイル高さ</label>
		<input id="tw" type="text" bind:value={th} />
		<label for="tw">画像幅</label>
		<input id="tw" type="text" bind:value={iw} />
		<label for="tw">画像高さ</label>
		<input id="tw" type="text" bind:value={ih} />

		<label for="tw">背景色</label>
		<input id="tw" type="text" bind:value={bgcolor} />

		<div class="lines">
			<h3>線</h3>
			{#each lineItems as lineItem, i}
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
					<button type="button" on:click={() => removeItem(i)}>削除</button>
				</div>
			{/each}
			<button type="button" on:click={addLine}>追加</button>
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

	.result {
		grid-column-start: 1;
		grid-column-end: 3;
	}
</style>
