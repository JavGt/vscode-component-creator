export const capitalize = (str: string) =>
	str.charAt(0).toUpperCase() + str.slice(1);

export const toCapitalize = (str: string, lowerFirst: boolean = false) => {
	const hasSpace = str.includes(' ');

	if (!hasSpace) return lowerFirst ? str.toLowerCase() : capitalize(str);

	return str
		.split(' ')
		.map((word, idx) => {
			if (!idx) return lowerFirst ? word.toLowerCase() : capitalize(word);

			return capitalize(word);
		})
		.join('');
};
