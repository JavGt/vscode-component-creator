import type { None, TypeStyle } from '../types';
import { window } from 'vscode';
import {
	NONE,
	NOT_CONFIGURED,
	TYPE_STYLE_ARRAY,
	typeStyleOptions,
} from '../constants';
import { getWorkspaceSettings } from '../helpers';
import { finishProcess } from '../helpers';

export const selectStyleType = async (): Promise<TypeStyle | None> => {
	const styleTypeDefault = getWorkspaceSettings('web', 'typeStyle');

	if (styleTypeDefault === NONE) return NONE;

	if (
		styleTypeDefault === NOT_CONFIGURED ||
		TYPE_STYLE_ARRAY.indexOf(styleTypeDefault) === -1
	) {
		const options = Object.values(typeStyleOptions);

		const response = await window.showQuickPick(options, {
			title: 'Style type',
			placeHolder: 'Select the type of design that your component will have.',
			ignoreFocusOut: true,
		});

		if (!response) return finishProcess();

		return response.value;
	}

	return styleTypeDefault;
};
