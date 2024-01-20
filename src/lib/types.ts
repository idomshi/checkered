import type { Writable } from 'svelte/store';

export type LineDirection = 'h' | 'v';

export interface LineItem {
	direction: LineDirection;
	color: string;
	linewidth: number;
	offset: number;
}

export type Command =
	| { message: 'addItem' }
	| { message: 'removeItem'; index: number }
	| { message: 'changeDirection'; index: number; direction: LineDirection }
	| { message: 'changeColor'; index: number; color: string }
	| { message: 'changeWidth'; index: number; width: number }
	| { message: 'changePosition'; index: number; position: number };

export interface StateContext {
	lineItems: Writable<LineItem[]>;
	update: (command: Command) => void;
}
