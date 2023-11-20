import { window } from 'vscode';
import { TypePage } from '../types';
import { getWorkspaceSettings, finishProcess } from '../helpers';
import { NOT_CONFIGURED, typePageOptions } from '../constants';

export const selectTypePage = async (): Promise<TypePage> => {
	const typePageDefault = getWorkspaceSettings('web', 'pageType');

	if (typePageDefault !== NOT_CONFIGURED) return typePageDefault;

	const options = Object.values(typePageOptions);

	const res = await window.showQuickPick(options, {
		title: 'Select type of page',
		placeHolder: 'Select type of page',
		ignoreFocusOut: true,
	});

	if (!res) return finishProcess('You must select a type of page');

	return res.value;
};
