/**
 * @deprecated
 */
export const addCapitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeArray = (str: string, notCapitalizeFirst?: boolean) =>
	str
		.split(' ')
		.map((single, idx) => {
			if (notCapitalizeFirst && idx === 0) {
				return single;
			}

			return capitalize(single);
		})
		.join('');
