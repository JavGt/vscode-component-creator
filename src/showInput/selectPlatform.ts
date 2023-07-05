import { window } from 'vscode';
import { finishProcess, getWorkspaceSettings } from '../helpers';
import { Platform } from '../types';
import { NOT_CONFIGURED } from '../constants';

export const selectPlatform = async (): Promise<Platform> => {
	const platformDefault = getWorkspaceSettings('platform');

	if (platformDefault !== NOT_CONFIGURED) return platformDefault;

	const platform = await window.showQuickPick(
		[
			{
				label: 'React Native',
				description: 'Create a component for React Native',
				value: 'native',
			},

			{
				label: 'React Web',
				description: 'Create a component for React Web',
				value: 'web',
			},
		],
		{
			placeHolder: 'Select platform',
		}
	);

	if (!platform) {
		finishProcess('You must select a platform');
	}

	return platform.value as Platform;
};
