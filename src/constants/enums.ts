/* eslint-disable @typescript-eslint/naming-convention */

import type {
	Directive,
	Extras,
	Language,
	Platform,
	StyleSheet,
	StyledComponentsLibrary,
	TypeFolder,
	TypeInterface,
	TypePage,
	TypeStyle,
} from '../types';

export enum LANGUAGE {
	TYPESCRIPT = 'typescript',
	JAVASCRIPT = 'javascript',
}

export const LANGUAGE_ARRAY: Array<Language> = Object.values(LANGUAGE);

export enum STYLE_SHEET {
	CSS = 'css',
	SCSS = 'scss',
	SASS = 'sass',
}

export const STYLE_SHEET_ARRAY: Array<StyleSheet> = Object.values(STYLE_SHEET);

export enum TYPE_STYLE {
	TRADITIONAL = 'traditional',
	MODULE = 'module',
	COMPONENT = 'component',
}

export const TYPE_STYLE_ARRAY: Array<TypeStyle> = Object.values(TYPE_STYLE);

export enum DIRECTIVE {
	CLIENT = 'client',
	SERVER = 'server',
}

export const DIRECTIVE_ARRAY: Array<Directive> = Object.values(DIRECTIVE);

export enum TYPE_INTERFACE {
	TYPE = 'type',
	INTERFACE = 'interface',
}

export const TYPE_INTERFACE_ARRAY: Array<TypeInterface> =
	Object.values(TYPE_INTERFACE);

export enum PLATFORM {
	WEB = 'web',
	NATIVE = 'native',
}

export const PLATFORM_ARRAY: Array<Platform> = Object.values(PLATFORM);

export enum EXTRAS {
	STORIES = 'stories',
	TEST = 'test',
}

export const EXTRAS_ARRAY: Array<Extras> = Object.values(EXTRAS);

export enum TYPE_PAGE {
	FOLDER = 'folder',
	FILE = 'file',
}

export const TYPE_PAGE_ARRAY: Array<TypePage> = Object.values(TYPE_PAGE);

export enum TYPE_FOLDER {
	PAGES = 'pages',
	APP = 'app',
}

export const TYPE_FOLDER_ARRAY: Array<TypeFolder> = Object.values(TYPE_FOLDER);

export enum STYLED_COMPONENTS_LIBRARY {
	STYLED_COMPONENTS = 'styled-components',
	EMOTION = 'emotion',
}

export const STYLED_COMPONENTS_LIBRARY_ARRAY: Array<StyledComponentsLibrary> =
	Object.values(STYLED_COMPONENTS_LIBRARY);
