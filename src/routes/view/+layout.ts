import type { LayoutLoad } from './$types';
import { match as matchTilesize } from '../../params/tilesize';
import { match as matchColor } from '../../params/color';
import { match as matchLines } from '../../params/lines';

export const load: LayoutLoad = ({ url }) => {
    // read and validate searchParams.
	const p = url.searchParams.get('p');
	if (p === null) throw new Error('invalid params');

	const params = p.split('/');
	if (!matchTilesize(params[0])) throw new Error('invalid params');
	if (!matchColor(params[1])) throw new Error('invalid params');
	if (!matchLines(params[2])) throw new Error('invalid params');

	const imageProps = {
		tilesize: params[0],
		bgcolor: params[1],
		lines: params[2]
	};

	return {
		p: imageProps
	};
};
