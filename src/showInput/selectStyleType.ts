import { window } from 'vscode';
import { NOT_CONFIG, STYLE_OPTIONS } from '../constants';
import { GetSettings } from '../helpers';

export const selectStyleType = async () => {
	const { SelectTypeStyle } = GetSettings();

	if (SelectTypeStyle !== NOT_CONFIG) return SelectTypeStyle;

	return await window.showQuickPick(Object.values(STYLE_OPTIONS), {
		placeHolder: 'Select the type of design that your component will have.',
		title: 'Style type',
		ignoreFocusOut: true,
	});
};
