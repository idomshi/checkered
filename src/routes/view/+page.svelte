<script>
	import { onMount } from 'svelte';

	const imageProps = {
		tilesize: '128x128',
		bgcolor: '414954',
		lines: 'ebeff2ech8-5_ebeff2ech2-13_ebeff2ech2-18_ebeff2ach16-54_ebeff2ach16-74_ebeff2ech2-111_ebeff2ech2-115_ebeff2ech8-123_ebeff2ecv8-5_ebeff2ecv2-13_ebeff2ecv2-18_ebeff2acv16-54_ebeff2acv16-74_ebeff2ecv2-111_ebeff2ecv2-115_ebeff2ecv8-123',
	}

	const thumbsUrl = `/${imageProps.tilesize}/${imageProps.bgcolor}/${imageProps.lines}/160x160.svg`
	const bgUrl = `/${imageProps.tilesize}/${imageProps.bgcolor}/${imageProps.lines}/${imageProps.tilesize}.svg`

	let screenSize = { w: 0, h: 0 };

	function download() {}

	onMount(() => {
		const w = window.screen.width;
		const h = window.screen.height;
		screenSize = { w, h };
	});
</script>

<div class="viewerpage" style={`background-image: url(${bgUrl});`}>
	<div class="container">
		<div class="thumbnail">
			<img src={thumbsUrl} alt="checkered image thumbnail" />
		</div>
		<ul class="downloadlist">
			<li>
				<p>画面サイズ ({screenSize.w}x{screenSize.h})</p>
				<button type="button" class="button">SVG</button>
				<button type="button" class="button">PNG</button>
			</li>
			<li>
				<p>Full HD (1920x1080)</p>
				<button type="button" class="button">SVG</button>
				<button type="button" class="button">PNG</button>
			</li>
			<li>
				<p>4K (3840x2160)</p>
				<button type="button" class="button">SVG</button>
				<button type="button" class="button">PNG</button>
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
		margin-top: 1.5rem;
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
