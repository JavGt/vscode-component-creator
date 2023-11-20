import { getWorkspaceSettings } from '../helpers';
import { window } from 'vscode';
import {
	NOT_CONFIGURED,
	STYLE_SHEET_ARRAY,
	styleSheetOptions,
} from '../constants';
import { finishProcess } from '../helpers/finish-process';
import type { StyleSheet } from '../types';

export const pickStyleSheet = async (): Promise<StyleSheet> => {
	const extensionStyleDefault = getWorkspaceSettings('web', 'styleSheet');

	if (
		extensionStyleDefault === NOT_CONFIGURED ||
		STYLE_SHEET_ARRAY.indexOf(extensionStyleDefault) === -1
	) {
		const options = Object.values(styleSheetOptions);

		const response = await window.showQuickPick(options, {
			title: 'Style language',
			placeHolder:
				'Select the type of extension that your style sheet will have',
			ignoreFocusOut: true,
		});

		if (!response) return finishProcess();

		return response.value;
	}

	return extensionStyleDefault;
};
