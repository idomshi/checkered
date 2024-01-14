<script lang="ts">
	import Generator from '$lib/Generator.svelte';
	import Spec from '$lib/Spec.svelte';
</script>

<header>
	<div class="title">
		<h1>Checkered</h1>
		<p>チェック柄画像生成</p>
	</div>

	<p>Checkeredはチェック柄画像を生成するツールです。</p>
	<p>URLをパラメータにしてSVG形式の画像を自由に作り出すことができます。</p>
</header>

<Generator />
<Spec />

<section>
	<h2>sample</h2>
	<div>
		<h3>01</h3>
		<img
			alt="sample checkerd 01"
			src="/128x128/003069/0054b666h64-32_0054b666v64-32_fff6v4-32_fff6h4-32_fad93f80v2-92_fad93f80v2-100_fad93f80h2-92_fad93f80h2-100/320x240.svg"
		/>
		<a
			href="/128x128/003069/0054b666h64-32_0054b666v64-32_fff6v4-32_fff6h4-32_fad93f80v2-92_fad93f80v2-100_fad93f80h2-92_fad93f80h2-100/1920x1080.svg"
			>1920x1080</a
		>
		<a
			href="/128x128/003069/0054b666h64-32_0054b666v64-32_fff6v4-32_fff6h4-32_fad93f80v2-92_fad93f80v2-100_fad93f80h2-92_fad93f80h2-100/800x600.svg"
			>800x600</a
		>
	</div>
	<div>
		<h3>02</h3>
		<img alt="sample checkerd 02" src="/40x40/fcfcfc/ef000080h20-20_ef000080v20-20/320x240.svg" />
		<a href="/40x40/fcfcfc/ef000080h20-20_ef000080v20-20/1920x1080.svg">1920x1080</a>
		<a href="/40x40/fcfcfc/ef000080h20-20_ef000080v20-20/800x600.svg">800x600</a>
	</div>
</section>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		color: #333;
		line-height: 1.7rem;
	}

	h1,
	h2,
	h3 {
		margin-top: 1rem;
	}

	header {
		margin: 1rem;
	}

	section {
		margin: 0 1rem;
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
