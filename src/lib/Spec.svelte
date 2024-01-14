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

<style>
	h2 {
		margin-top: 1rem;
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
</style>
