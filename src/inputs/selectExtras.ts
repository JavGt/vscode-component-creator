import { window } from 'vscode';
import { finishProcess, getWorkspaceSettings } from '../helpers';
import { Extras } from '../types';
import { extrasOptions } from '../constants';

export const selectExtras = async (): Promise<Extras[]> => {
	const extras = getWorkspaceSettings('web', 'extras');

	const isBoolean = !Array.isArray(extras);

	if (!isBoolean) return extras;

	if (isBoolean) {
		if (!extras) return [];
	}

	const options = Object.values(extrasOptions);

	const extrasSelected = await window.showQuickPick(options, {
		placeHolder: 'Select extras',
		canPickMany: true,
		ignoreFocusOut: true,
		matchOnDescription: true,
		matchOnDetail: true,
	});

	if (!extrasSelected) return finishProcess();

	return extrasSelected.map((extra) => extra.value);
};
