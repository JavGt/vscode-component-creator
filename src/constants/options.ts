import type {
	Extras,
	OptionsPick,
	Language,
	None,
	Platform,
	StyleSheet,
	TypeStyle,
	TypePage,
} from '../types';
import {
	EXTRAS,
	LANGUAGE,
	PLATFORM,
	STYLE_SHEET,
	TYPE_PAGE,
	TYPE_STYLE,
} from './enums';
import { NONE } from './strings';

export const extrasOptions = {
	stories: {
		label: 'Storybook',
		detail: 'Create a storybook for the component',
		value: EXTRAS.STORIES,
	},
	test: {
		label: 'Test',
		detail: 'Create a test for the component',
		value: EXTRAS.TEST,
	},
} as const satisfies OptionsPick<Extras>;

export const platformOptions = {
	native: {
		label: 'React Native',
		detail: 'Create a component for React Native',
		value: PLATFORM.NATIVE,
	},
	web: {
		label: 'React Web',
		detail: 'Create a component for React Web',
		value: PLATFORM.WEB,
	},
} as const satisfies OptionsPick<Platform>;

export const languageOptions = {
	javascript: {
		label: 'JavaScript',
		detail: 'Create a component using JavaScript',
		value: LANGUAGE.JAVASCRIPT,
	},
	typescript: {
		label: 'TypeScript',
		detail: 'Create a component using TypeScript',
		value: LANGUAGE.TYPESCRIPT,
	},
} as const satisfies OptionsPick<Language>;

export const styleSheetOptions = {
	css: {
		label: 'CSS',
		detail: 'import "./style.css;',
		value: STYLE_SHEET.CSS,
	},
	scss: {
		label: 'SCSS',
		detail: 'import "./style.scss;',
		value: STYLE_SHEET.SCSS,
	},
	sass: {
		label: 'SASS',
		detail: 'import "./style.sass;',
		value: STYLE_SHEET.SASS,
	},
} as const satisfies OptionsPick<StyleSheet>;

export const typeStyleOptions = {
	traditional: {
		label: 'Style Traditional',
		detail: 'import "./style.css;',
		value: TYPE_STYLE.TRADITIONAL,
	},
	module: {
		label: 'Style Module',
		detail: 'import styles from "./style.module.css;"',
		value: TYPE_STYLE.MODULE,
	},
	component: {
		label: 'Style Component',
		detail: 'import styled from "[styled-components | @emotion/styled]";',
		value: TYPE_STYLE.COMPONENT,
	},
	none: {
		label: 'None',
		detail: 'Create a component without style',
		value: NONE,
	},
} as const satisfies OptionsPick<TypeStyle | None>;

export const typePageOptions = {
	folder: {
		label: 'Folder',
		detail: 'create your page with folder',
		value: TYPE_PAGE.FOLDER,
	},
	file: {
		label: 'File',
		detail: 'create your page with file',
		value: TYPE_PAGE.FILE,
	},
} as const satisfies OptionsPick<TypePage>;
