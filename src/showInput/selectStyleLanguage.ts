import { ExtensionStyle, getWorkspaceSettings } from '../helpers';
import { window } from 'vscode';
import { NOT_CONFIGURED, STYLE_EXTENSIONS } from '../constants';
import { finishProcess } from '../helpers/finish-process';

export const selectStyleLanguage = async () => {
	const extensionStyle = getWorkspaceSettings('SelectExtensionStyle');

	if (extensionStyle !== NOT_CONFIGURED) {
		return extensionStyle;
	}

	// Pregunta que extension de la hoja de estilos tendrá
	return (await window
		.showQuickPick(Object.values(STYLE_EXTENSIONS), {
			title: 'Style language',
			placeHolder: 'Select the type of extension that your style sheet will have',
			ignoreFocusOut: true,
		})
		.then(style => style ?? finishProcess())) as ExtensionStyle;
};
