const { stylesOptions, notStyle } = require('./constantes');

const plantillaJsx = ({ componentName, structComponent, style }) => {
	let structStyle = '';

	if (style !== notStyle) {
		switch (structComponent) {
			case stylesOptions.styleModule:
				structStyle = `import styles from './styles/${componentName}.module.${style}';`;
				break;
			case stylesOptions.styleTradicional:
				structStyle = `import './styles/${componentName}.${style}';`;
				break;
			case stylesOptions.styleComponent:
				structStyle = `import styled from 'styled-components';`;
				break;
			default:
				structStyle = '';
				break;
		}
	}

	return `import React from 'react';\n${structStyle}\nconst ${componentName} = () => {\n\treturn <div>${componentName}</div>;\n};\n\nexport default ${componentName};\n`;
};

const plantillaStyles = ({ componentName }) => {
	return `.${componentName} {\n\n}`;
};

const plantillaBarrer = ({ componentName }) => {
	return `export { default as ${componentName} } from './${componentName}';`;
};

module.exports = { plantillaJsx, plantillaStyles, plantillaBarrer };
