const { stylesOptions, notStyle } = require('./constantes');

const plantillaJsx = ({ componentName, structComponent, style }) => {
	let style = '';

	if (style !== notStyle) {
		switch (structComponent) {
			case stylesOptions.styleModule:
				style = `import styles from './styles/${componentName}.module.css';`;
				break;
			case stylesOptions.styleTradicional:
				style = `import './styles/${componentName}.css';`;
				break;
			case stylesOptions.styleComponent:
				style = `import styled from 'styled-components';`;
				break;
			default:
				style = '';
				break;
		}
	}

	return `import React from 'react';\n${style}\nconst ${componentName} = () => {\n\treturn <div>${componentName}</div>;\n};\n\nexport default ${componentName};\n`;
};

const plantillaStyles = ({ componentName }) => {
	return `.${componentName} {\n\n}`;
};

const plantillaBarrer = ({ componentName }) => {
	return `export { default as ${componentName} } from './${componentName}';`;
};

module.exports = { plantillaJsx, plantillaStyles, plantillaBarrer };
