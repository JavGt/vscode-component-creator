const messageCancel = 'Component creation aborted. 😢';

const NOT_CONFIG = 'to ask';

const STRUCTURE_OPTIONS = {
	ts: 'TypeScript',
	js: 'JavaScript',
};

const EXTENSION_OPTIONS = {
	ts: '.tsx',
	js: '.jsx',
};

const NOT_STYLE = 'Not style';

const STYLE_OPTIONS = {
	STYLE_TRADITIONAL: 'Style Traditional',
	STYLE_MODULE: 'Style Module',
	STYLE_COMPONENT: 'Style Component',
	NOT_STYLE,
};

const STYLE_EXTENSIONS = {
	CSS: 'css',
	SASS: 'sass',
	SCSS: 'scss',
};

module.exports = {
	STYLE_OPTIONS,
	STYLE_EXTENSIONS,
	NOT_STYLE,
	STRUCTURE_OPTIONS,
	EXTENSION_OPTIONS,
	messageCancel,
	NOT_CONFIG,
};
