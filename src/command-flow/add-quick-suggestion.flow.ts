/**
 * flujo para agregar un folder a la lista de "quick suggestions"
 * flow to add a folder to the "quick suggestions" list
 */
import type { FunctionFlow } from '../types';
import { window, workspace } from 'vscode';
import { relative } from 'path';
import { getWorkspaceSettings } from '../helpers';
import { WORKSPACE_NAME } from '../constants';
import { getAliasSuggestion } from '../inputs/getAliasSuggestion';

export const addQuickSuggestionFlow: FunctionFlow = async (ctx, arg) => {
	const quickSuggestions = getWorkspaceSettings('root', 'quickSuggestions');

	const workspaceRoot = workspace.getWorkspaceFolder(arg);

	if (!workspaceRoot) throw new Error('No workspace root found');

	const folder = relative(workspaceRoot?.uri.fsPath, arg.fsPath).replace(
		/\\/g,
		'/',
	);

	if (
		quickSuggestions.some((item) => {
			if (typeof item === 'string') return item === folder;
			return item[0] === folder;
		})
	) {
		window.showInformationMessage(
			`The folder ${folder} is already in the quick suggestions list`,
		);

		return;
	}

	const alias = await getAliasSuggestion(folder);

	const suggestion = alias === folder ? folder : [folder, alias];

	/**
	 *  agregar ese folder a la lista de quickSuggestions de la configuración de vscode
	 *  add that folder to the quickSuggestions list of the vscode configuration
	 */

	// insertar el suggestion en la lista de quickSuggestions del workspace seleccionado

	workspace
		.getConfiguration(WORKSPACE_NAME)
		.update(`quickSuggestions`, [...quickSuggestions, suggestion]);
};
