import { GetSettings } from '../helpers';

export const contentTemplate = (
	etiqueta: string,
	nameComponent: string,
	className: string
) => `\treturn <${etiqueta}${className}>${nameComponent}</${etiqueta}>;\n`;

export const importReact = () => {
	const { importReactOnTop } = GetSettings();

	if (!importReactOnTop) return '';

	return "import React from 'react';\n";
};
