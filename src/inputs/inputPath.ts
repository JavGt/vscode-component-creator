import { window } from 'vscode';
import { finishProcess, getWorkspaceSettings } from '../helpers';

export const inputPath = async (): Promise<string> => {
	const defaultRoute = getWorkspaceSettings('root', 'defaultRoute');

	const path = await window.showInputBox({
		value: defaultRoute,
		ignoreFocusOut: true,
		placeHolder: 'Folder name',
		prompt: 'Enter the name of the folder you want to create.',
		validateInput: (value) =>
			!value.length ? 'The folder name is required.' : '',
	});

	if (!path) return finishProcess();

	return path;
};
