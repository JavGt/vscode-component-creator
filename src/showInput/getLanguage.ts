import { NOT_CONFIGURED, STRUCTURE_OPTIONS } from '../constants';
import { window } from 'vscode';
import { LanguageType, getWorkspaceSettings } from '../helpers';
import { finishProcess } from '../helpers/finish-process';

export const getLanguage = async (): Promise<LanguageType> => {
	const language = getWorkspaceSettings('SelectLanguage');

	if (language !== NOT_CONFIGURED) {
		return language;
	}

	return (await window
		.showQuickPick(Object.values(STRUCTURE_OPTIONS), {
			title: 'Language',
			placeHolder: 'Select the type of component you want to create',
			ignoreFocusOut: true,
		})
		.then(len => len ?? finishProcess())) as LanguageType;
};
