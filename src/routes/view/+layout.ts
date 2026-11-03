import type { LayoutLoad } from './$types';
import { params } from '../../params';
import type { StandardSchemaV1 } from '@standard-schema/spec';

function parse<T>(schema: StandardSchemaV1<string, T>, value: string | undefined) {
	const result = schema['~standard'].validate(value ?? '');
	if (result instanceof Promise || result.issues) throw new Error('invalid params');
	return result.value;
}

export const load: LayoutLoad = ({ url }) => {
	// read and validate searchParams.
	const p = url.searchParams.get('p');
	if (p === null) throw new Error('invalid params');
	const ps = p.split('/');

	return {
		p: {
			tilesize: parse(params.tilesize, ps[0]),
			bgcolor: parse(params.color, ps[1]),
			lines: parse(params.lines, ps[2])
		}
	};
};
