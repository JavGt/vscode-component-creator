import { window } from 'vscode';
import { NOT_CONFIGURED, STYLE_OPTIONS } from '../constants';
import { StyleType, getWorkspaceSettings } from '../helpers';
import { finishProcess } from '../helpers/finish-process';

export const getStyleType = async (): Promise<StyleType> => {
	const styleType = getWorkspaceSettings('SelectTypeStyle');

	if (styleType !== NOT_CONFIGURED) {
		return styleType;
	}
	return (await window
		.showQuickPick(Object.values(STYLE_OPTIONS), {
			placeHolder: 'Select the type of design that your component will have.',
			title: 'Style type',
			ignoreFocusOut: true,
		})
		.then(style => style ?? finishProcess())) as StyleType;
};
