import { window } from 'vscode';
import { finishProcess, getWorkspaceSettings } from '../helpers';
import { Extras } from '../types';
import { EXTRAS } from '../constants/extras';

export const options = Object.values(EXTRAS);

export const selectExtras = async (): Promise<Extras[]> => {
	const extras = getWorkspaceSettings('selectedExtras');
	const askExtras = getWorkspaceSettings('askExtras');

	console.log({
		extras,
		asd: askExtras,
	});

	if (!askExtras) return extras;

	const isFullOptions = options.reduce(
		(acc, option) => acc && extras.includes(option.value as Extras),
		true
	);

	console.log({
		isFullOptions,
	});

	if (isFullOptions) return extras;

	const extrasSelected = await window.showQuickPick(
		options.map(option => ({
			...option,
			picked: extras.includes(option.value as Extras),
		})),
		{
			canPickMany: true,
			placeHolder: 'Select extras',
			ignoreFocusOut: true,
			matchOnDescription: true,
			matchOnDetail: true,
		}
	);

	if (!extrasSelected) finishProcess();

	return extrasSelected.map(extra => extra.value as Extras);
};
