import { svggen } from '$lib/svggen';

export function GET(params) {
	const svgstr = svggen({
		imagesize: params.params.imagesize,
		tilesize: params.params.tilesize,
		bgcolor: params.params.bgcolor,
		lines: params.params.lines
	});
	const options = {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	};
	return new Response(svgstr, options);
}
