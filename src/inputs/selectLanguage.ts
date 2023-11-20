import type { Language } from '../types';
import { LANGUAGE_ARRAY, languageOptions, NOT_CONFIGURED } from '../constants';
import { window } from 'vscode';
import { getWorkspaceSettings } from '../helpers';
import { finishProcess } from '../helpers/finish-process';

export const selectLanguage = async (): Promise<Language> => {
	const languageDefault = getWorkspaceSettings('root', 'language');

	if (
		languageDefault === NOT_CONFIGURED ||
		LANGUAGE_ARRAY.indexOf(languageDefault) === -1
	) {
		const options = Object.values(languageOptions);

		const response = await window.showQuickPick(options, {
			title: 'Language',
			placeHolder: 'Select the language that your component will have.',
			ignoreFocusOut: true,
		});

		if (!response) return finishProcess();

		return response.value;
	}

	return languageDefault;
};
