<script>
	import { onMount } from 'svelte';

	const src =
		'/128x128/414954/ebeff2ech8-5_ebeff2ech2-13_ebeff2ech2-18_ebeff2ach16-54_ebeff2ach16-74_ebeff2ech2-111_ebeff2ech2-115_ebeff2ech8-123_ebeff2ecv8-5_ebeff2ecv2-13_ebeff2ecv2-18_ebeff2acv16-54_ebeff2acv16-74_ebeff2ecv2-111_ebeff2ecv2-115_ebeff2ecv8-123/160x160.svg';

	let screenSize = { w: 0, h: 0 };

	function download() {}

	onMount(() => {
		const w = window.screen.width;
		const h = window.screen.height;
		screenSize = { w, h };
	});
</script>

<div class="viewerpage">
	<div>
		<img {src} alt="checkered image" />
		<p>download</p>
		<ul>
			<li><a>Full HD (1920x1080)</a></li>
			<li><a>4K (3840x2160)</a></li>
			<li><a>スマホ ()</a></li>
		</ul>
		<pre>{JSON.stringify(screenSize)}</pre>
		<button type="button" on:click={download}>ダウンロード</button>
	</div>
</div>

<style>
	.viewerpage {
		width: 100%;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
