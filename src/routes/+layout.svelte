<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { LineItem, Command, StateContext, LineDirection } from '$lib/types';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let tw = writable(128);
	let th = writable(128);
	let iw = writable(640);
	let ih = writable(480);
	let bgcolor = writable('ffffff');
	let lineItems = writable<LineItem[]>([]);

	function addLine() {
		if ($lineItems.length === 0) {
			lineItems.update((v) => [
				...v,
				{ direction: 'h', color: 'ccccccff', linewidth: 8, offset: 4 }
			]);
		} else {
			lineItems.update((v) => [...v, { ...v[v.length - 1] }]);
		}
	}

	function removeItem(idx: number) {
		lineItems.update((v) => {
			v.splice(idx, 1);
			return v;
		});
	}

	function changeDirection(idx: number, direction: LineDirection) {
		lineItems.update((v) => {
			const tmp = { ...v[idx], direction };
			v[idx] = tmp;
			return v;
		});
	}

	function changeColor(idx: number, color: string) {
		lineItems.update((v) => {
			const tmp = { ...v[idx], color };
			v[idx] = tmp;
			return v;
		});
	}

	function changeWidth(idx: number, width: number) {
		lineItems.update((v) => {
			const tmp = { ...v[idx], lineWidth: width };
			v[idx] = tmp;
			return v;
		});
	}

	function changePosition(idx: number, position: number) {
		lineItems.update((v) => {
			const tmp = { ...v[idx], offset: position };
			v[idx] = tmp;
			return v;
		});
	}

	function update(command: Command) {
		const cmd = command;
		switch (cmd.message) {
			case 'addItem':
				addLine();
				break;

			case 'removeItem':
				removeItem(cmd.index);
				break;

			case 'changeDirection':
				changeDirection(cmd.index, cmd.direction);
				break;

			case 'changeColor':
				changeColor(cmd.index, cmd.color);
				break;

			case 'changeWidth':
				changeWidth(cmd.index, cmd.width);
				break;

			case 'changePosition':
				changePosition(cmd.index, cmd.position);
				break;
		}
	}

	setContext<StateContext>('StateContext', {
		tw,
		th,
		iw,
		ih,
		bgcolor,
		lineItems,
		update
	});
</script>

{@render children?.()}
