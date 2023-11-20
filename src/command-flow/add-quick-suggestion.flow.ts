/**
 * flujo para agregar un folder a la lista de "quick suggestions"
 * flow to add a folder to the "quick suggestions" list
 */
import type { FunctionFlow } from '../types';
import { window, workspace } from 'vscode';
import { relative } from 'path';
import { getWorkspaceSettings } from '../helpers';
import { WORKSPACE_NAME } from '../constants';

export const addQuickSuggestionFlow: FunctionFlow = async (ctx, arg) => {
	const quickSuggestions = getWorkspaceSettings('root', 'quickSuggestions');

	const workspaceRoot = workspace.getWorkspaceFolder(arg);

	if (!workspaceRoot) throw new Error('No workspace root found');

	const folder = relative(workspaceRoot?.uri.fsPath, arg.fsPath).replace(
		/\\/g,
		'/',
	);

	if (quickSuggestions.includes(folder)) {
		window.showInformationMessage(
			`The folder ${folder} is already in the quick suggestions list`,
		);

		return;
	}

	/**
	 *  agregar ese folder a la lista de quickSuggestions de la configuración de vscode
	 *  add that folder to the quickSuggestions list of the vscode configuration
	 */
	workspace
		.getConfiguration(WORKSPACE_NAME)
		.update(`quickSuggestions`, [...quickSuggestions, folder]);
};
