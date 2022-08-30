const contentTemplate = (etiqueta, COMPONENT_NAME, className) => {
	return `\n\treturn <${etiqueta} ${className}>${COMPONENT_NAME}</${etiqueta}>;\n};\n\nexport default ${COMPONENT_NAME};\n`;
};

const importReact = () => {
	return `import React from 'react';\n`;
};

module.exports = {
	contentTemplate,
	importReact,
};