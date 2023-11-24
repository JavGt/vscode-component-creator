import { NOT_CONFIGURED, NONE } from '../constants';
import {
	DIRECTIVE,
	EXTRAS,
	LANGUAGE,
	PLATFORM,
	STYLED_COMPONENTS_LIBRARY,
	STYLE_SHEET,
	TYPE_FOLDER,
	TYPE_INTERFACE,
	TYPE_PAGE,
	TYPE_STYLE,
} from '../constants/enums';

export type NotConfigured = typeof NOT_CONFIGURED;

export type None = typeof NONE;

export type Language = `${LANGUAGE}`;

export type TypeStyle = `${TYPE_STYLE}`;

export type StyleSheet = `${STYLE_SHEET}`;

export type Extras = `${EXTRAS}`;

export type TypePage = `${TYPE_PAGE}`;

export type TypeFolder = `${TYPE_FOLDER}`;

export type StyledComponentsLibrary = `${STYLED_COMPONENTS_LIBRARY}`;

export type Directive = `${DIRECTIVE}`;

export type TypeInterface = `${TYPE_INTERFACE}`;

export type Platform = `${PLATFORM}`;

export type WebProperties = {
	directive: Directive | None;
	styleSheet: StyleSheet | NotConfigured;
	typeStyle: TypeStyle | NotConfigured | None;
	extras: Extras[] | Boolean;
	styledComponentsLibrary: StyledComponentsLibrary;
	pageType: TypePage | NotConfigured;
};

export type NativeProperties = {
	styleSheet: Boolean | 'file';
};

// reactCreateComponent.settings
export type SettingsProperties = {
	root: {
		disableQuickSuggestions: boolean;
		disableHistory: boolean;
		importReact: boolean;
		createBarrel: boolean;
		language: Language | NotConfigured;
		defaultRoute: string;
		createTypes: boolean;
		interfaceType: TypeInterface;
		quickSuggestions: Array<string | [string, string]>;
		platform: Platform | NotConfigured;
	};
	native: NativeProperties;
	web: WebProperties;
};

/**
 * tipos de opciones que pueden dar el nombre del componente
 * Entrada: "nombre del componente"
 * lowerCase: "nombreDelComponente",
 * capitalize: "NombreDelComponente"
 */
export type NameComponent = {
	lowerCase: string;
	capitalize: string;
};

export type LanguageOptions = {
	ext: string;
	jxs: string;
};

export type StyleSheetsOptions = {
	ext: string;
	import: string;
};

export interface TemplateStyleInterface {
	import: string;
	etiqueta: string;
	className: string;
	plus: string;
}
