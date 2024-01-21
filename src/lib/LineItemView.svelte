<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { LineDirection, LineItem, StateContext } from './types';
	import { XSolid } from 'svelte-awesome-icons';

	export let lineItem: LineItem;
	const { tw, th } = getContext<StateContext>('StateContext');

	const dispatch = createEventDispatcher<{
		addItem: null;
		removeItem: null;
		changeDirection: 'h' | 'v';
		changeColor: string;
		changeWidth: number;
		changePosition: number;
	}>();

	$: rangeMax = lineItem.direction === 'h' ? $th : $tw;

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
	<div class="line-color">
		<div class="colorpreview" style="background-color: #{lineItem.color}"></div>
	</div>
	<div>
		<p>
			<label for="direction">線の向き</label>
			<br />
			<select id="direction" bind:value={lineItem.direction} on:change={changeDirection}>
				{#each directionOption as diropt}
					<option value={diropt.value}>{diropt.text}</option>
				{/each}
			</select>
		</p>
		<p>
			<label for="color">color</label>
			<input id="color" type="text" bind:value={lineItem.color} on:input={changeColor} />
		</p>
	</div>
	<div class="width-and-position">
		<p>
			<label for="width">太さ</label>
			<input
				id="width"
				type="range"
				min="1"
				max={rangeMax}
				bind:value={lineItem.linewidth}
				on:change={changeWidth}
			/>
		</p>
		<p>
			<label for="position">位置</label>
			<input
				id="position"
				type="range"
				min="0"
				max={rangeMax}
				bind:value={lineItem.offset}
				on:change={changePosition}
			/>
		</p>
	</div>
	<div class="remove-button">
		<button type="button" on:click={remove}>
			<XSolid size="16" color="#505050" />
		</button>
	</div>
</div>

<style>
	.lineitem {
		display: grid;
		grid-template-columns: 6rem 5rem auto 3rem;
		gap: 1rem;
		border: 1px solid #ccc;
		padding: 0.25rem;

		& label {
			font-size: 0.75rem;
		}

		& p {
			text-indent: -1rem;
			padding-left: 1rem;
			line-height: 0.75rem;
		}

		& input[type='text'] {
			height: 1rem;
		}

		& .color-and-direction {
			display: flex;
			flex-direction: column;
		}

		& .width-and-position {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
		}

		& .remove-button {
			display: flex;
			flex-direction: column;
			align-items: end;
			justify-content: start;
		}

		& input {
			width: 100%;
		}

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

	.colorpreview {
		width: 6rem;
		height: 6rem;
	}
</style>
