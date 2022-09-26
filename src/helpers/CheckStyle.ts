import { STYLE_OPTIONS } from '../constants';
import { GetSettings } from './GetSettings';

export interface templateStyleInterface {
	import: string;
	etiqueta: string;
	className: string;
	plus: string;
}

export const checkStyle = (
	componentName: string,
	styleType: string,
	styleLanguage: string
) => {
	const { CreateFolderStyles } = GetSettings();

	const isFolderStyles = CreateFolderStyles ? '/styles' : '';

	switch (styleType) {
		case STYLE_OPTIONS.STYLE_MODULE:
			return {
				import: `import styles from '.${isFolderStyles}/${componentName}.module.${styleLanguage}';\n`,
				etiqueta: `div `,
				className: `className={styles.${componentName.toLowerCase()}}`,
				plus: ``,
			};
		case STYLE_OPTIONS.STYLE_TRADITIONAL:
			return {
				import: `import '.${isFolderStyles}/${componentName}.${styleLanguage}';\n`,
				etiqueta: `div `,
				className: `className='${componentName.toLowerCase()}'`,
				plus: ``,
			};
		case STYLE_OPTIONS.STYLE_COMPONENT:
			return {
				import: `import styled from 'styled-components';\n`,
				etiqueta: `${componentName}Style`,
				className: ``,
				plus: `\nexport const ${componentName}Style = styled.div\`\`;\n`,
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
