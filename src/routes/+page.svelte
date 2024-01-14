<script lang="ts">
	import Generator from '$lib/Generator.svelte';
	import Spec from '$lib/Spec.svelte';
	import Gallery from '$lib/Gallery.svelte';
</script>

<header>
	<div class="title">
		<h1>Checkered</h1>
		<p>チェック柄画像生成</p>
	</div>

	<p>Checkeredはチェック柄画像を生成するツールです。</p>
	<p>URLをパラメータにしてSVG形式の画像を自由に作り出すことができます。</p>
</header>

<Gallery />
<Generator />
<Spec />

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		color: #333;
		line-height: 1.7rem;
	}

	h1 {
		margin-top: 1rem;
	}

	header {
		margin: 1rem;
	}

	.title {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: baseline;
		background-image: url(https://checkered.pages.dev/128x128/003069/0054b666h64-32_0054b666v64-32_fff6v16-32_fff6h16-32_fad93f80v8-88_fad93f80v8-104_fad93f80h8-88_fad93f80h8-104/128x128.svg);
		background-repeat: no-repeat;
		background-size: contain;
		padding-left: 4rem;
	}
</style>
