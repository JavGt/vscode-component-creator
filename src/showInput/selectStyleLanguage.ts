import { getWorkspaceSettings } from '../helpers';
import { window } from 'vscode';
import { NOT_CONFIGURED } from '../constants';
import { finishProcess } from '../helpers/finish-process';
import { STYLE_EXTENSIONS } from '../constants/style';
import { ExtensionStyle } from '../types';

export const selectStyleLanguage = async (): Promise<ExtensionStyle> => {
	const extensionStyleDefault = getWorkspaceSettings('selectExtensionStyle');

	if (extensionStyleDefault !== NOT_CONFIGURED) return extensionStyleDefault;

	const response = await window.showQuickPick(
		Object.values(STYLE_EXTENSIONS).map(style => ({
			label: style.label,
			detail: style.detail,
			value: style.value,
		})),
		{
			title: 'Style language',
			placeHolder: 'Select the type of extension that your style sheet will have',
			ignoreFocusOut: true,
		}
	);

	if (!response) finishProcess();

	return response.value as ExtensionStyle;
};
