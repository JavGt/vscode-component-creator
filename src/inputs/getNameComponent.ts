import type { NameComponent } from '../types';
import { window } from 'vscode';
import { finishProcess } from '../helpers/finish-process';
import { toCapitalize } from '../utils/functions';

export const getNameComponent = async (): Promise<NameComponent> => {
	const name = await window.showInputBox({
		title: 'Component Name',
		placeHolder: 'Ej: "name", "Name", "name of component"',
		ignoreFocusOut: true,
		prompt: 'Enter component Name',
		validateInput: (value) =>
			!value.length ? 'The name of the component is required' : '',
	});

	if (!name) return finishProcess();

	return {
		lowerCase: toCapitalize(name, true),
		capitalize: toCapitalize(name),
	};
};
