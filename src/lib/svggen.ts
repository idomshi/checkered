export function svggen(params: {
	imagesize: string;
	tilesize: string;
	bgcolor: string;
	lines: string;
}) {
	const [iw, ih] = params.imagesize
		.replace('.svg', '')
		.split('x')
		.map((v) => parseInt(v));
	const [tw, th] = params.tilesize.split('x').map((v) => parseInt(v));
	const basecolor = params.bgcolor;
	const pattern = params.lines.split('_');

	// generate css
	const linecss = pattern
		.map((v, i) => {
			const classname = `.l${String(i).padStart(3, '0')}`;
			const mc = v.match(/^((?:[0-9a-f]{6}|[0-9a-f]{8}))[hvlr]([0-9]+)-[0-9]+$/);
			if (mc === null) return '';

			const [strokeColor, strokeWidth] = mc.slice(1);
			return `${classname} { stroke: #${strokeColor}; stroke-width: ${strokeWidth} }`;
		})
		.join('\n');

	// generate line element
	const resultArr: string[] = [];

	pattern.forEach((p, i) => {
		const classname = `l${String(i).padStart(3, '0')}`;
		const mc = p.match(/^(?:[0-9a-f]{6}|[0-9a-f]{8})([hvlr])([0-9]+)-([0-9]+)$/);
		if (mc === null) return;

		const [type, strokeWidth, offset] = mc.slice(1);

		switch (type) {
			case 'h': {
				// horizontal line
				const lw = parseInt(strokeWidth);
				const oy = parseInt(offset);

				if (oy + lw / 2 > th) {
					resultArr.push(
						`<line x1="0" x2="${iw}" y1="${oy - th}" y2="${oy - th}" class="${classname}" />`
					);
				}
				for (let y = oy; y < ih + lw / 2; y += th) {
					resultArr.push(`<line x1="0" x2="${iw}" y1="${y}" y2="${y}" class="${classname}" />`);
				}
				break;
			}

			case 'v': {
				// vertical line
				const lw = parseInt(strokeWidth);
				const ox = parseInt(offset);

				if (ox + lw / 2 > tw) {
					resultArr.push(
						`<line x1="${ox - tw}" x2="${ox - tw}" y1="0" y2="${ih}" class="${classname}" />`
					);
				}
				for (let x = ox; x < iw + lw / 2; x += tw) {
					resultArr.push(`<line x1="${x}" x2="${x}" y1="0" y2="${ih}" class="${classname}" />`);
				}
				break;
			}

			case 'l': {
				break;
			}

			case 'r': {
				break;
			}
		}
	});

	// generate code
	const svgstr = `<svg version="1.1" baseProfile="full" width="${iw}" height="${ih}" xmlns="http://www.w3.org/2000/svg">
<defs><style type="text/css"><![CDATA[
.bg { fill: #${basecolor}; }
${linecss}
]]></style></defs>
<rect class="bg" width="${iw}" height="${ih}" />
${resultArr.join('')}
</svg>`;

	return svgstr;
}
