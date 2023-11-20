import { StyleSheet, StyleSheetsOptions } from '../../types';

export const styleSheetOptions: Record<StyleSheet, StyleSheetsOptions> = {
	css: {
		import: 'import "./style.css;',
		ext: '.css',
	},
	scss: {
		import: 'import "./style.scss;',
		ext: '.scss',
	},
	sass: {
		import: 'import "./style.sass;',
		ext: '.sass',
	},
};

export const getStyleSheet = (
	styleSheet: StyleSheet,
): StyleSheetsOptions => {
	return styleSheetOptions[styleSheet];
};
