import type { ParamMatcher } from '@sveltejs/kit';
export const match: ParamMatcher = (param) => {
	return /^([0-9a-f]{6}|[0-9a-f]{8})$/.test(param);
};
