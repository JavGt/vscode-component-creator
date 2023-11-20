export const toSort = (array: string[]) => {
	return array.filter(Boolean).join('\n').trim();
};
