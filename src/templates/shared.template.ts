import { GetSettings } from '../helpers';

export const contentTemplate = (
	etiqueta: string,
	COMPONENT_NAME: string,
	className: string
) =>
	`\n\treturn <${etiqueta} ${className}>${COMPONENT_NAME}</${etiqueta}>;\n};\n\nexport default ${COMPONENT_NAME};\n`;

export const importReact = () => {
	const { importReactOnTop } = GetSettings();

	if (!importReactOnTop) return '';

	return "import React from 'react';\n";
};
