import { workspace } from 'vscode';
import { WORKSPACE_NAME } from '../constants/constants';

/**
 *
 * @deprecated
 * Esta función esta mal implementada, no se debe usar en el futuro
 */
export const GetSettings = () =>
	workspace.getConfiguration('reactCreateComponent.settings');

// | 'importReactOnTop'
// | 'SelectExtensionStyle'
// | 'CreateBarrel'
// | 'SelectLanguage'
// | 'SelectTypeStyle'
// | 'CreateFolderStyles'
// | 'DefaultRoute'
// | 'CreateInterface'
// | 'RouteList';

export type SettingsWorkspace = {
	importReactOnTop: boolean;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	DefaultRoute: string;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	SelectLanguage: LanguageType | 'to ask';
	// eslint-disable-next-line @typescript-eslint/naming-convention
	SelectTypeStyle: StyleType | 'to ask';
	// eslint-disable-next-line @typescript-eslint/naming-convention
	SelectExtensionStyle: ExtensionStyle | 'to ask';
	// eslint-disable-next-line @typescript-eslint/naming-convention
	CreateInterface: boolean;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	CreateBarrel: boolean;
	recommendedRoutes: string[];
};

/**
 * Lenguaje de programación
 *
 */
export type LanguageType = 'TypeScript' | 'JavaScript';

export type StyleType =
	| 'Style Traditional'
	| 'Style Module'
	| 'Style Component'
	| 'Not style';

export type ExtensionStyle = 'css' | 'sass' | 'scss';

export const settingsWorkspace: SettingsWorkspace = {
	importReactOnTop: true,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	DefaultRoute: 'src/components',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	SelectLanguage: 'to ask',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	SelectTypeStyle: 'to ask',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	SelectExtensionStyle: 'to ask',
	// eslint-disable-next-line @typescript-eslint/naming-convention
	CreateInterface: true,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	CreateBarrel: true,
	recommendedRoutes: ['src/components'],
};

/**
 * Obtiene la configuración del workspace
 * @param setting Nombre de la configuración
 * @returns Valor de la configuración
 * @example
 * getWorkspaceSettings('DefaultRoute') : string
 * getWorkspaceSettings('importReactOnTop') : boolean
 */
export const getWorkspaceSettings = <K extends keyof SettingsWorkspace>(
	setting: K
): SettingsWorkspace[K] =>
	workspace.getConfiguration(WORKSPACE_NAME).get(setting) as SettingsWorkspace[K];
