<header>
	<div class="title">
		<h1>Checkered</h1>
		<p>チェック柄画像生成</p>
	</div>

	<p>Checkeredはチェック柄画像を生成するツールです。</p>
	<p>URLをパラメータにしてSVG形式の画像を自由に作り出すことができます。</p>
</header>

<section>
	<h2>URLの書式</h2>
	<p>https://checkered.pages.dev/[タイルのサイズ]/[背景色]/[模様の定義]/[画像サイズ].svg</p>

	<dl>
		<dt>タイルのサイズ</dt>
		<dd>
			<p>
				チェック柄を構成するタイル（繰り返しの単位）のサイズを指定します。書式は
				<code>[整数]x[整数]</code>です。
			</p>
			<p>例：<code>128x128</code></p>
		</dd>
		<dt>背景色</dt>
		<dd>
			<p>画像のベースになる背景色をRGBまたはRGBA形式で指定します。</p>
			<p>それぞれの数値は16進数とし、"#"などの記号は付けません。</p>
			<p>
				各色1桁の
				<code>RGB</code>、<code>RGBA</code>
				か、各色2桁の
				<code>RRGGBB</code>、<code>RRGGBBAA</code>
				で指定することができます。
			</p>
			<p>例：<code>fcfcfc</code></p>
		</dd>
		<dt>模様の定義</dt>
		<dd>
			<p>
				タイル状に描画する線の定義を"_（アンダースコア）"区切りで指定します。線の定義は
				<code>[線色][線の向き][線の太さ]-[線の中心の位置]</code>
				です。
			</p>
			<dl>
				<dt>線色</dt>
				<dd>
					<p>RGBまたはRGBA形式で指定します。</p>
					<p>
						各色1桁の
						<code>RGB</code>、<code>RGBA</code>
						か、各色2桁の
						<code>RRGGBB</code>、<code>RRGGBBAA</code>
						で指定することができます。
					</p>
				</dd>
				<dt>線の向き</dt>
				<dd>
					<p>
						アルファベットの小文字一文字で、
						<code>h</code>：横線または
						<code>v</code>：縦線を指定します。
					</p>
				</dd>
				<dt>線の太さ</dt>
				<dd><p>線の太さを整数で指定します。</p></dd>
				<dt><p>線の中心の位置</p></dt>
				<dd>
					<p>
						タイルの左上から線の中心までの距離を整数で指定します。横線の場合は縦方向の距離、縦線の場合は横方向の距離です。
					</p>
				</dd>
			</dl>
			例：<code>ef000080h20-20_ef000080v20-20</code>
		</dd>
		<dt>画像サイズ</dt>
		<dd>
			<p>
				生成したい画像のサイズ＋拡張子を指定します。書式は<code>[整数]x[整数].svg</code
				>です。拡張子は<code>.svg</code>のみに対応しています。
			</p>
			<p>例：<code>640x480.svg</code></p>
		</dd>
	</dl>

	<p>完成したURLの例は次のようになります。</p>
	<p>
		<code>https://checkered.pages.dev/40x40/fcfcfc/ef000080h20-20_ef000080v20-20/640x480.svg</code>
	</p>
</section>

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
	}

	* {
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

	dl {
		margin-left: 2rem;
	}

	dt {
		margin-top: 1rem;
	}

	dd {
		margin-left: 1.5rem;
	}

	code {
		background-color: #ebebeb;
		border-radius: 0.25rem;
		margin: 0 0.25rem;
		padding: 0.25rem 0.5rem;
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
