import { InputBoxOptions, window, workspace } from 'vscode';
import { join } from 'path';
import { getWorkspaceSettings } from '../helpers';
import { finishProcess } from '../helpers/finish-process';
import { getWorkspace } from './getWorkspace';

export const getPath = async (): Promise<string> => {
	if (!workspace.workspaceFolders?.length) {
		finishProcess("You don't have an open project.");
	}

	const workspaceFolder =
		workspace.workspaceFolders?.length > 1
			? await getWorkspace()
			: workspace.workspaceFolders[0].uri.fsPath;

	const options: InputBoxOptions = {
		title: 'Enter the path where you want to create the component',
		value: getWorkspaceSettings('DefaultRoute'),
		placeHolder: 'Enter the path',
		validateInput: value => (!value.length ? 'Path is required' : ''),
		ignoreFocusOut: true,
	};

	return await window
		.showInputBox(options)
		.then(path => (path ? join(workspaceFolder, path) : finishProcess()));
};
