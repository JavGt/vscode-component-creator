import { STYLE_OPTIONS } from '../constants';
import { GetSettings } from './GetSettings';

export interface templateStyleInterface {
	import: string;
	etiqueta: string;
	className: string;
	plus: string;
}

export const checkStyle = (
	COMPONENT_NAME: string,
	STYLE_TYPE: string,
	STYLE_SELECT: string
) => {
	const { CreateFolderStyles } = GetSettings();

	const isFolderStyles = CreateFolderStyles ? '/styles' : '';

	switch (STYLE_TYPE) {
		case STYLE_OPTIONS.STYLE_MODULE:
			return {
				import: `import styles from '.${isFolderStyles}/${COMPONENT_NAME}.module.${STYLE_SELECT}';`,
				etiqueta: `div`,
				className: `className={styles.${COMPONENT_NAME}}`,
				plus: ``,
			};
		case STYLE_OPTIONS.STYLE_TRADITIONAL:
			return {
				import: `import '.${isFolderStyles}/${COMPONENT_NAME}.${STYLE_SELECT}';`,
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
