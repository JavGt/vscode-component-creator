const messageCancel = 'Component creation aborted. 😢';

const STRUCTURE_OPTIONS = {
	ts: 'TypeScript',
};

const EXTENSION_OPTIONS = {
	ts: '.tsx',
	js: '.jsx',
};

const STYLE_OPTIONS = {
	STYLE_TRADITIONAL: 'Style Traditional',
	STYLE_MODULE: 'Style Module',
	STYLE_COMPONENT: 'Style Component',
};

const STYLE_EXTENSIONS = {
	CSS: 'css',
	SASS: 'sass',
	SCSS: 'scss',
};

const NOT_STYLE = 'nothing';

module.exports = {
	STYLE_OPTIONS,
	STYLE_EXTENSIONS,
	NOT_STYLE,
	STRUCTURE_OPTIONS,
	EXTENSION_OPTIONS,
	messageCancel,
};
