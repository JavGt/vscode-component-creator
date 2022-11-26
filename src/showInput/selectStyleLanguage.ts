import { GetSettings } from '../helpers';
import { window } from 'vscode';
import { NOT_CONFIG, NOT_STYLE, STYLE_EXTENSIONS, STYLE_OPTIONS } from '../constants';

export const selectStyleLanguage = async (TYPE_STYLE: string) => {
	if (
		TYPE_STYLE === STYLE_OPTIONS.STYLE_COMPONENT ||
		TYPE_STYLE === STYLE_OPTIONS.NOT_STYLE
	)
		return NOT_STYLE;

	const { SelectExtensionStyle } = GetSettings();

	if (SelectExtensionStyle !== NOT_CONFIG) return SelectExtensionStyle;

	// Pregunta que extension de la hoja de estilos tendrá
	return await window.showQuickPick(Object.values(STYLE_EXTENSIONS), {
		title: 'Style language',
		placeHolder: 'Select the type of extension that your style sheet will have',
		ignoreFocusOut: true,
	});
};
