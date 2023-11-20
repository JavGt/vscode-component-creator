import { SettingsProperties } from '../types';

export const settingsWorkspaceDefault: SettingsProperties = {
	root: {
		disableQuickSuggestions: false,
		disableHistory: false,
		importReact: true,
		defaultRoute: 'src/components',
		language: 'to ask',
		createTypes: true,
		createBarrel: true,
		quickSuggestions: ['src/components'],
		interfaceType: 'type',
		platform: 'to ask',
	},
	web: {
		directive: 'client',
		styleSheet: 'to ask',
		styledComponentsLibrary: 'styled-components',
		extras: [],
		pageType: 'to ask',
		typeStyle: 'to ask',
	},
	native: {
		styleSheet: true,
	},
};
