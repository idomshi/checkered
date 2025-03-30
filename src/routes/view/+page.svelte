<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const imageProps = data.p;

	const thumbsUrl = `/${imageProps.tilesize}/${imageProps.bgcolor}/${imageProps.lines}/160x160.svg`;
	const bgUrl = `/${imageProps.tilesize}/${imageProps.bgcolor}/${imageProps.lines}/${imageProps.tilesize}.svg`;

	let screenSize = $state({ w: 0, h: 0 });

	type ImageFormat = 'svg' | 'png';

	async function download(width: number, height: number, format: ImageFormat) {
		const url = `/${imageProps.tilesize}/${imageProps.bgcolor}/${imageProps.lines}/${width}x${height}.svg`;

		/** we need to wait for loading image data. */
		async function loadImage(url: string) {
			let img = new Image();
			await new Promise<void>((resolve, reject) => {
				img.onload = () => resolve();
				img.onerror = (e) => reject(e);
				img.src = url;
			});
			return img;
		}

		let imagedata: string;
		switch (format) {
			case 'svg':
				imagedata = url;
				break;
			case 'png': {
				const img = await loadImage(url);
				const canvas = new OffscreenCanvas(width, height);
				const ctx = canvas.getContext('2d');
				ctx?.drawImage(img, 0, 0);
				const blob = await canvas.convertToBlob({ type: 'image/png' });
				imagedata = URL.createObjectURL(blob);
				break;
			}
		}

		const element = document.createElement('a');
		element.href = imagedata;
		element.download = `sample.${format}`;
		element.target = '_blank';
		element.click();
		element.remove();
	}

	function back() {
		history.back();
	}

	onMount(() => {
		const w = window.screen.width;
		const h = window.screen.height;
		screenSize = { w, h };
	});
</script>

<div class="viewerpage" style={`background-image: url(${bgUrl});`}>
	<div class="container">
		<div class="dialogheader">
			<button type="button" class="button" onclick={back}>← Back</button>
		</div>
		<div class="thumbnail">
			<img src={thumbsUrl} alt="" />
		</div>
		<ul class="downloadlist">
			<li>
				<p>画面サイズ ({screenSize.w}x{screenSize.h})</p>
				<button
					type="button"
					class="button"
					onclick={() => download(screenSize.w, screenSize.h, 'svg')}>SVG</button
				>
				<button
					type="button"
					class="button"
					onclick={() => download(screenSize.w, screenSize.h, 'png')}>PNG</button
				>
			</li>
			<li>
				<p>Full HD (1920x1080)</p>
				<button type="button" class="button" onclick={() => download(1920, 1080, 'svg')}
					>SVG</button
				>
				<button type="button" class="button" onclick={() => download(1920, 1080, 'png')}
					>PNG</button
				>
			</li>
			<li>
				<p>4K (3840x2160)</p>
				<button type="button" class="button" onclick={() => download(3840, 2160, 'svg')}
					>SVG</button
				>
				<button type="button" class="button" onclick={() => download(3840, 2160, 'png')}
					>PNG</button
				>
			</li>
		</ul>
	</div>
</div>

<style>
	.viewerpage {
		width: 100%;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.75);
		background-blend-mode: lighten;
	}

	.container {
		width: fit-content;
		height: fit-content;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-radius: 0.5rem;
		background-color: white;
		box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.35);
	}

	.thumbnail {
		width: fit-content;
		margin-left: auto;
		margin-right: auto;
	}

	.downloadlist {
		display: grid;
		grid-template-columns: auto auto auto;
		row-gap: 0.25rem;
		column-gap: 0.25rem;

		& > li {
			display: grid;
			grid-template-columns: subgrid;
			grid-column: span 3;
			align-items: center;
		}
	}

	.button {
		padding: 0.25rem 1rem;
		border: 1px solid rgba(125, 125, 125, 0.452);
		border-radius: 0.25rem;
		cursor: pointer;
		background-color: rgb(224, 224, 224);

		&:hover {
			background-color: rgb(245, 245, 245);
		}
	}
</style>
