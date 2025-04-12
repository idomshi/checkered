<script lang="ts">
	import { getContext } from 'svelte';
	import type { LineDirection, LineItem, StateContext } from './types';
	import { XSolid } from 'svelte-awesome-icons';
	import HorizontalSlider from './HorizontalSlider.svelte';
	import { writable } from 'svelte/store';

	interface Props {
		lineItem: LineItem;
		removeItem: () => void;
		changeDirection: (dir: LineDirection) => void;
		changeColor: (color: string) => void;
		changeWidth: (width: number) => void;
		changePosition: (position: number) => void;
	}

	let {
		lineItem: initialLineItem,
		removeItem,
		changeDirection,
		changeColor,
		changeWidth,
		changePosition
	}: Props = $props();
	const lineItem = writable(initialLineItem);
	const { tw, th } = getContext<StateContext>('StateContext');

	let rangeMax = $derived($lineItem.direction === 'h' ? $th : $tw);

	const directionOption = [
		{ value: 'h', text: 'ヨコ' },
		{ value: 'v', text: 'タテ' }
	];

	function remove() {
		removeItem();
	}

	function onChangeDirection(ev: Event) {
		const target = ev.target;
		if (!(target instanceof HTMLSelectElement)) return;
		changeDirection(target.value as LineDirection);
	}

	function onChangeColor(ev: Event) {
		const target = ev.target;
		if (!(target instanceof HTMLInputElement)) return;
		changeColor(target.value);
	}

	function onChangeWidth(ev: number) {
		const width = ev;
		if (isNaN(width)) return;
		changeWidth(width);
	}

	function onChangePosition(ev: number) {
		const position = ev;
		if (isNaN(position)) return;
		changePosition(position);
	}
</script>

<div class="lineitem">
	<div class="line-color">
		<div class="colorpreview" style="background-color: #{$lineItem.color}"></div>
	</div>
	<div>
		<p class="propertyitem">
			<label for="direction">線の向き</label>
			<br />
			<select id="direction" bind:value={$lineItem.direction} onchange={onChangeDirection}>
				{#each directionOption as diropt}
					<option value={diropt.value}>{diropt.text}</option>
				{/each}
			</select>
		</p>
		<p class="propertyitem">
			<label for="color">color</label>
			<input
				id="color"
				class="colorinput"
				type="text"
				bind:value={$lineItem.color}
				oninput={onChangeColor}
			/>
		</p>
	</div>
	<div class="width-and-position">
		<p class="propertyitem">
			<label for="width">太さ</label>
			<HorizontalSlider
				min={1}
				max={rangeMax}
				bind:value={$lineItem.linewidth}
				change={onChangeWidth}
			/>
		</p>
		<p class="propertyitem">
			<label for="position">位置</label>
			<HorizontalSlider
				min={0}
				max={rangeMax}
				bind:value={$lineItem.offset}
				change={onChangePosition}
			/>
		</p>
	</div>
	<div class="remove-button">
		<button class="closebutton" type="button" onclick={remove}>
			<XSolid size="16" color="#505050" />
		</button>
	</div>
</div>

<style>
	.lineitem {
		display: grid;
		grid-template-columns: 1rem 5rem auto 2rem;
		gap: 1rem;
		border: 1px solid #ccc;
		padding: 0.25rem;

		& label {
			font-size: 0.75rem;
		}

		& .propertyitem {
			text-indent: -1rem;
			padding-left: 1rem;
			line-height: 0.75rem;
		}

		& .width-and-position {
			min-width: 16rem;
			flex: 1 1 100%;
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

		& .colorinput {
			width: 100%;
			padding: 0 0.25rem;
		}

		& .closebutton {
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
		width: 0.5rem;
		height: 100%;
	}
</style>
