<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { LineItem } from '$lib/types';

	let lineItems: Writable<LineItem[]> = writable([]);

	function addLine() {
		lineItems.update((v) => [...v, { direction: 'h', color: 'ccccccff', linewidth: 8, offset: 4 }]);
	}

	function removeItem(idx: number) {
		lineItems.update((v) => {
			v.splice(idx, 1);
			return v;
		});
	}

	setContext('lineItems', { value: lineItems, addItem: addLine, removeItem });
</script>

<slot />
