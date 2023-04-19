import { NameComponent } from '../showInput';
import { ExtensionStyle, StyleType } from './GetSettings';

export interface TemplateStyleInterface {
	import: string;
	etiqueta: string;
	className: string;
	plus: string;
}

export const checkStyle = (
	nameComponent: NameComponent,
	styleType: StyleType,
	extensionStyle: ExtensionStyle
): TemplateStyleInterface => {
	switch (styleType) {
		case 'Style Module':
			return {
				import: `import styles from './${nameComponent.capitalize}.module.${extensionStyle}';\n`,
				etiqueta: `div`,
				className: `className={styles.${nameComponent.original}}`,
				plus: ``,
			};
		case 'Style Traditional':
			return {
				import: `import './${nameComponent.capitalize}.${extensionStyle}';\n`,
				etiqueta: `div`,
				className: `className='${nameComponent.original}'`,
				plus: ``,
			};
		case 'Style Component':
			return {
				import: `import styled from 'styled-components';\n`,
				etiqueta: `${nameComponent.original}Style`,
				className: ``,
				plus: `\nexport const ${nameComponent.original}Style = styled.div\`\`;\n`,
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
