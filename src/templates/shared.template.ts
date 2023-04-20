import { getWorkspaceSettings } from '../helpers';

export const contentTemplate = (
	etiqueta: string,
	nameComponent: string,
	className: string
) => `\treturn <${etiqueta} ${className}>${nameComponent}</${etiqueta}>;\n`;

export const importReact = () => {
	const importReact = getWorkspaceSettings('importReactOnTop');

	if (!importReact) {
		return '';
	}

	return "import React from 'react';\n";
};
