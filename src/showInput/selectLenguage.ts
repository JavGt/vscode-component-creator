import { NOT_CONFIG, STRUCTURE_OPTIONS } from '../constants';
import { window, workspace } from 'vscode';
import { GetSettings } from '../helpers';
import { existsSync } from 'fs';
import { join } from 'path';

export const selectLanguage = async () => {
	if (!workspace.workspaceFolders)
		return window.showInformationMessage("You don't have an open project.");

	const projectRoot = workspace.workspaceFolders[0].uri.fsPath;

	const { SelectLanguage } = GetSettings();

	if (SelectLanguage !== NOT_CONFIG) return SelectLanguage;

	try {
		return existsSync(join(projectRoot, 'tsconfig.json'))
			? STRUCTURE_OPTIONS.ts
			: STRUCTURE_OPTIONS.js;
	} catch (error) {
		return await window.showQuickPick(Object.values(STRUCTURE_OPTIONS), {
			title: 'Language',
			placeHolder: 'Select the type of component you want to create',
			ignoreFocusOut: true,
		});
	}
};
