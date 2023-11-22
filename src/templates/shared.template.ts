import { DIRECTIVE, DIRECTIVE_ARRAY, NONE } from '../constants';
import { getWorkspaceSettings } from '../helpers';

export const contentTemplate = (
	etiqueta: string,
	nameComponent: string,
	className: string,
) => {
	return `\treturn (\n\t\t<${etiqueta}${className}>\n \t\t\t${nameComponent} works!\n \t\t</${etiqueta}>\n\t);\n`;
};

export const directive = () => {
	const directive = getWorkspaceSettings('web', 'directive');

	if (directive === NONE || !DIRECTIVE_ARRAY.includes(directive)) return '';

	return `"use ${directive}";`;
};

export const importReact = () => {
	const importReact = getWorkspaceSettings('root', 'importReact');

	if (!importReact) return '';

	return `import React from 'react';`;
};

export const propTypes = (nameComponent: string) => {
	const createTypes = getWorkspaceSettings('root', 'createTypes');

	return {
		import: createTypes ? `import PropTypes from 'prop-types';` : '',
		plus: createTypes ? `${nameComponent}.propTypes = {};` : '',
	};
};

export const typeFunction = () => {
	const initial = 'const ';

	const end = ' = ({}) => {' + '\n';

	return {
		initial,
		end,
	};
};
