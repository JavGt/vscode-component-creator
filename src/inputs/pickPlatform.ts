import type { Platform } from '../types';
import { window } from 'vscode';
import { finishProcess, getWorkspaceSettings } from '../helpers';
import { NOT_CONFIGURED, PLATFORM_ARRAY, platformOptions } from '../constants';

export const pickPlatform = async (): Promise<Platform> => {
	const platformDefault = getWorkspaceSettings('root', 'platform');

	if (
		platformDefault === NOT_CONFIGURED ||
		PLATFORM_ARRAY.indexOf(platformDefault) === -1
	) {
		const options = Object.values(platformOptions);

		const platform = await window.showQuickPick(options, {
			placeHolder: 'Select platform',
			ignoreFocusOut: true,
		});

		if (!platform) return finishProcess('You must select a platform');

		return platform.value;
	}
	return platformDefault;
};
