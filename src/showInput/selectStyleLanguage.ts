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
		.showQuickPick(
			[
				{
					label: 'CSS',
					detail: 'Create a component with CSS style',
					value: 'css',
				},
				{
					label: 'SCSS',
					detail: 'Create a component with SCSS style',
					description: 'Recommended',
					value: 'scss',
				},
				{
					label: 'SASS',
					detail: 'Create a component with SASS style',
					value: 'sass',
				},
			],
			{
				title: 'Style language',
				placeHolder: 'Select the type of extension that your style sheet will have',
				ignoreFocusOut: true,
			}
		)
		.then(style => style?.value ?? finishProcess())) as ExtensionStyle;
};
