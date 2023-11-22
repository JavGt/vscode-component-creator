import { WorkspaceFolder, window, workspace } from 'vscode';
import { finishProcess } from '../helpers/finish-process';

export const pickWorkspace = async (): Promise<WorkspaceFolder> => {
	const workspaceFolders = workspace.workspaceFolders;

	if (!workspaceFolders) {
		return finishProcess(
			'You must have at least one workspaceFolder in your workspace',
		);
	}

	if (workspaceFolders?.length === 1) return workspaceFolders[0];

	const options = workspaceFolders.map(({ name, index }) => ({
		label: name,
		value: index,
	}));

	const workspaceFolder = await window.showQuickPick(options, {
		title: 'Pick the workspaceFolder where you want to create the component',
		placeHolder: 'Pick the workspaceFolder',
		ignoreFocusOut: true,
	});

	if (!workspaceFolder)
		return finishProcess("You don't pick any workspaceFolder");

	return workspaceFolders[workspaceFolder.value];
};
