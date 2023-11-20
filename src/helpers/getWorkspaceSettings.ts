import type { SettingsProperties } from '../types';
import { workspace } from 'vscode';
import { WORKSPACE_NAME } from '../constants/strings';

export const getWorkspaceSettings = <
	Section extends keyof SettingsProperties,
	Options extends keyof SettingsProperties[Section],
	Return = SettingsProperties[Section][Options],
>(
	category: Section,
	options: Options,
): Return => {
	const section = WORKSPACE_NAME + (category === 'root' ? '' : `.${category}`);

	return workspace.getConfiguration(section).get(options as string) as Return;
};
