import { window, workspace } from 'vscode';
import { finishProcess } from '../helpers/finish-process';

export const getWorkspace = async (): Promise<string> => {
	return window
		.showQuickPick(
			workspace.workspaceFolders!.map(({ name, uri: { fsPath } }) => ({
				label: name,
				value: fsPath,
			})),
			{
				title: 'Select the project where you want to create the component',
				placeHolder: 'Select the project',
				ignoreFocusOut: true,
			}
		)
		.then(workspace => workspace?.value ?? finishProcess());
};
