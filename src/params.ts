import { defineParams } from '@sveltejs/kit/params';

const matchColor = (param: string) => {
	return /^([0-9a-f]{6}|[0-9a-f]{8})$/.test(param);
};

const matchImagesize = (param: string) => {
	return /^\d+x\d+\.(svg)$/.test(param);
};

const matchLines = (param: string) => {
	return /^([0-9a-f]{6}|[0-9a-f]{8})[hv]\d+-\d+(_([0-9a-f]{6}|[0-9a-f]{8})[hv]\d+-\d+)*$/.test(
		param
	);
};

const matchTilesize = (param: string) => {
	return /^\d+x\d+$/.test(param);
};

export const params = defineParams({
	color: (param) => (matchColor(param) ? param : undefined),
	imagesize: (param) => (matchImagesize(param) ? param : undefined),
	lines: (param) => (matchLines(param) ? param : undefined),
	tilesize: (param) => (matchTilesize(param) ? param : undefined)
});
