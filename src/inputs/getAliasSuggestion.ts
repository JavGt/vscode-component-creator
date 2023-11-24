import { window } from 'vscode';
import { finishProcess } from '../helpers/finish-process';

export const getAliasSuggestion = async (
	defaultAlias: string,
): Promise<string> => {
	const alias = await window.showInputBox({
		title: 'Alias',
		value: defaultAlias,
		placeHolder: 'Alias for the suggestion',
		ignoreFocusOut: true,
		prompt: 'Enter component Name',
		validateInput: (value) =>
			!value.length ? 'The alias is required' : undefined,
	});

	if (!alias) return finishProcess();

	return alias;
};
