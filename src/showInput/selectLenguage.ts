import { NOT_CONFIG, STRUCTURE_OPTIONS } from '../constants';
import { window } from 'vscode';
import { GetSettings } from '../helpers';

export const selectLanguage = async () => {
	const { SelectLanguage } = GetSettings();

	if (SelectLanguage !== NOT_CONFIG) return SelectLanguage;

	return await window.showQuickPick(Object.values(STRUCTURE_OPTIONS), {
		title: 'Language',
		placeHolder: 'Select the type of component you want to create',
		ignoreFocusOut: true,
	});
};
