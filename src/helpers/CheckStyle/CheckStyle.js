const { STYLE_OPTIONS } = require('../../constants');

const checkStyle = (COMPONENT_NAME, STYLE_TYPE, STYLE_SELECT) => {
	switch (STYLE_TYPE) {
		case STYLE_OPTIONS.STYLE_MODULE:
			return {
				import: `import styles from './styles/${COMPONENT_NAME}.module.${STYLE_SELECT}';`,
				etiqueta: `div`,
				className: `className={styles.${COMPONENT_NAME}}`,
				plus: ``,
			};
		case STYLE_OPTIONS.STYLE_TRADITIONAL:
			return {
				import: `import './styles/${COMPONENT_NAME}.${STYLE_SELECT}';`,
				etiqueta: `div`,
				className: `className='${COMPONENT_NAME}'`,
				plus: ``,
			};
		case STYLE_OPTIONS.STYLE_COMPONENT:
			return {
				import: `import styled from 'styled-components';`,
				etiqueta: `${COMPONENT_NAME}Styled`,
				className: ``,
				plus: `export const ${COMPONENT_NAME}Styled = styled.div\`\`;`,
			};
		default:
			return {
				import: ``,
				etiqueta: `div`,
				className: ``,
				plus: ``,
			};
	}
};

module.exports = {
	checkStyle,
};
