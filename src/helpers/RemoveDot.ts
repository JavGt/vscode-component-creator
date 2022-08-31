import { addCapitalize } from './AddCapitalize';

export const removeDot = (str: string) => {
	const name = addCapitalize(str);
	return name.split('.')[0];
};
