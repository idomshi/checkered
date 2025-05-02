<script lang="ts">
	import { svggen } from '$lib/svggen';
	import { SquarePlusRegular } from 'svelte-awesome-icons';
	import LineItemView from './LineItemView.svelte';

	import { getContext } from 'svelte';
	import type { LineDirection, StateContext } from './types';
	import { goto } from '$app/navigation';

	const { tw, th, iw, ih, bgcolor, lineItems, update } = getContext<StateContext>('StateContext');

	let tilesize = $derived(`${$tw}x${$th}`);
	let lines = $derived(
		$lineItems
			.map(
				({ direction, color, linewidth, offset }) => `${color}${direction}${linewidth}-${offset}`
			)
			.join('_')
	);
	let imagesize = $derived(`${$iw}x${$ih}.svg`);
	let svg = $derived(svggen({ tilesize, bgcolor: $bgcolor, lines, imagesize }));
	let relativeUrl = $derived(`${tilesize}/${$bgcolor}/${lines}/${imagesize}`);
	let url = $derived(`https://checkered.pages.dev/${relativeUrl}`);

	function removeItem(i: number) {
		update({ message: 'removeItem', index: i });
	}

	function changeDirection(i: number, ev: LineDirection) {
		update({ message: 'changeDirection', index: i, direction: ev });
	}

	function changeColor(i: number, ev: string) {
		update({ message: 'changeColor', index: i, color: ev });
	}

	function changeWidth(i: number, ev: number) {
		update({ message: 'changeWidth', index: i, width: ev });
	}

	function changePosition(i: number, ev: number) {
		update({ message: 'changePosition', index: i, position: ev });
	}

	function showViewer() {
		const url = `/view?p=${relativeUrl}`;
		goto(url);
	}
</script>

<section class="form">
	<div class="header">
		<div>
			タイル：
			<input id="tw" type="text" bind:value={$tw} />
			×
			<input id="tw" type="text" bind:value={$th} />
		</div>

		<div>
			<label for="tw">背景色：</label>
			<input id="tw" type="text" bind:value={$bgcolor} />
		</div>

		<div class="buttonarea">
			<button type="button" class="linkbutton" onclick={showViewer}>View & DL →</button>
		</div>
	</div>
	<div class="workarea">
		<div class="preview">
			{@html svg}
		</div>

		<div class="lines">
			<div class="lines-header">
				<h3>線</h3>
				<button type="button" onclick={() => update({ message: 'addItem' })}>
					<SquarePlusRegular size="16" color="#505050" />
				</button>
			</div>
			<div class="lineproperties">
				{#each $lineItems as lineItem, i (lineItem.id)}
					<LineItemView
						{lineItem}
						removeItem={() => removeItem(i)}
						changeDirection={(dir) => changeDirection(i, dir)}
						changeColor={(ev) => changeColor(i, ev)}
						changeWidth={(ev) => changeWidth(i, ev)}
						changePosition={(ev) => changePosition(i, ev)}
					></LineItemView>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	h3 {
		margin-top: 1rem;
	}

	.form {
		height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.header {
		flex: none;
		height: 2.5rem;
		background-color: #ccc;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		align-items: center;
	}

	.buttonarea {
		padding: 0 0.5rem;
		flex: 1 1 0%;
		text-align: end;
	}

	.linkbutton {
		padding: 0.1rem 0.5rem;
		border: 1px #ccc solid;
		border-radius: 0.25rem;
		background-color: #eee;
		cursor: pointer;

		&:hover {
			background-color: #fff;
		}
	}

	.workarea {
		height: calc(100% - 2.5rem);
		flex: none;
		display: flex;
		flex-direction: row;
	}

	.preview {
		background-color: #eee;
		flex: 1 1 0%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lines {
		width: 29rem;
		flex: none;
		display: flex;
		flex-direction: column;
	}

	.lines-header {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: baseline;
		justify-content: start;
		height: 3rem;
		padding: 0 0.5rem;
		flex: none;

		& button {
			width: 1.5rem;
			height: 1.5rem;
			border: 1px solid #777;
			border-radius: 0.15rem;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.lineproperties {
		overflow-y: scroll;
		flex: 1 1 0%;
		display: flex;
		flex-direction: column-reverse;
		justify-content: start;
		gap: 0.25rem;
	}
</style>
