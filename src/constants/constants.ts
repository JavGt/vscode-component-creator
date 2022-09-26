export type STYLE_OPTIONS_INTERFACE = keyof typeof STYLE_OPTIONS;
export type STYLE_EXTENSIONS_INTERFACE = keyof typeof STYLE_EXTENSIONS;

export const messageNotPath = 'Path is required';

export const comandoCreateComponent = 'Create-component';
export const textRetry = 'Retry';

export const messageNotName = 'Component Name is required.';

export const messageCancel = 'Component creation aborted. 😢';

export const NOT_CONFIG = 'to ask';

export const STRUCTURE_OPTIONS = {
	ts: 'TypeScript',
	js: 'JavaScript',
};

export const EXTENSION_OPTIONS = {
	ts: '.ts',
	js: '.js',
};

export const NOT_STYLE = 'Not style';

export const STYLE_OPTIONS = {
	STYLE_TRADITIONAL: 'Style Traditional',
	STYLE_MODULE: 'Style Module',
	STYLE_COMPONENT: 'Style Component',
	NOT_STYLE,
};

export const STYLE_EXTENSIONS = {
	CSS: 'css',
	SCSS: 'scss',
	SASS: 'sass',
};
