import { workspace } from 'vscode';
import { WORKSPACE_NAME } from '../constants/constants';
import { SettingsWorkspace } from '../types/properties';

export const settingsWorkspace: SettingsWorkspace = {
	importReactOnTop: true,
	defaultRoute: 'src/components',
	lenguaje: 'to ask',
	typeStyle: 'to ask',
	extensionStyle: 'to ask',
	createInterface: true,
	createBarrel: true,
	recommendedRoutes: ['src/components'],
	experimentalStorybook: false,
	interfaceType: 'type',
	styledComponentsLibrary: 'styled-components',
	importPropTypes: true,
	selectedExtras: [],
	askExtras: true,
	pageType: 'to ask',
	platform: 'to ask',
};

/**
 * Obtiene la configuración del workspace
 * @param setting Nombre de la configuración
 * @returns Valor de la configuración
 * @example
 * getWorkspaceSettings('defaultRoute') : string
 * getWorkspaceSettings('importReactOnTop') : boolean
 */
export const getWorkspaceSettings = <K extends keyof SettingsWorkspace>(
	setting: K
): SettingsWorkspace[K] =>
	workspace.getConfiguration(WORKSPACE_NAME).get(setting) as SettingsWorkspace[K];
