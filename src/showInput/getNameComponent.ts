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
	const name = await window.showInputBox({
		title: 'Component Name',
		placeHolder: 'Ej: "name", "Name", "name of component"',
		ignoreFocusOut: true,
		prompt: 'Enter component Name',
		validateInput: value =>
			!value.length ? 'The name of the component is required' : '',
	});

	if (!name) finishProcess();

	const hasSpace = name.includes(' ');

	return {
		original: hasSpace ? capitalizeArray(name, true) : name.toLowerCase(),
		capitalize: hasSpace ? capitalizeArray(name) : capitalize(name),
	};
};
