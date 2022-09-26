import { window, workspace } from 'vscode';
import { join } from 'path';
import { GetSettings } from '../helpers';

const checkPath = async (args: any) => {
	if (!workspace.workspaceFolders)
		return window.showInformationMessage("You don't have an open project.");

	const fsPath = args?.fsPath ?? null;
	if (fsPath) return fsPath;

	const { DefaultRoute } = GetSettings();

	const projectRoot = workspace.workspaceFolders[0].uri.fsPath;

	const pathInput = await window.showInputBox({
		value: DefaultRoute,
		placeHolder: 'Enter the path',
		title: 'Enter the path where you want to create the component',
		validateInput: value => (value.length === 0 ? 'Path is required' : ''),
		ignoreFocusOut: true,
	});

	if (!pathInput) return null;

	return join(projectRoot, pathInput);
};

export { checkPath };
