import { capitalize, capitalizeArray } from '../helpers';
import { window } from 'vscode';
import { finishProcess } from '../helpers/finish-process';

/**
 * tipos de opciones que pueden dar el nombre del componente
 * "nombre",
 * "Nombre",
 * "nombre del componente",
 */

export type NameComponent = {
	original: string;
	capitalize: string;
};

export const getNameComponent = async (): Promise<NameComponent> => {
	const name = await window
		.showInputBox({
			placeHolder: 'Component Name',
			title: 'Component Name',
			ignoreFocusOut: true,
			validateInput: value =>
				!value.length ? 'The name of the component is required' : '',
		})
		.then(value => value ?? finishProcess());

	const hasSpace = name.includes(' ');

	return {
		original: hasSpace ? capitalizeArray(name, true) : name,
		capitalize: hasSpace ? capitalizeArray(name) : capitalize(name),
	};
};
