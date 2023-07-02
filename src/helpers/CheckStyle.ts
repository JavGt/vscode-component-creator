import { STYLE_OPTIONS } from '../constants/style';
import { NameComponent } from '../showInput';
import { getWorkspaceSettings } from '.';
import { ExtensionStyle, StyleType } from '../types';

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
		case STYLE_OPTIONS.module.value:
			return {
				import: `import styles from './${nameComponent.capitalize}.module.${extensionStyle}';`,
				etiqueta: `div`,
				className: ` className={styles.${nameComponent.original}}`,
				plus: ``,
			};

		case STYLE_OPTIONS.traditional.value:
			return {
				import: `import './${nameComponent.capitalize}.${extensionStyle}';`,
				etiqueta: `div`,
				className: ` className='${nameComponent.original}'`,
				plus: ``,
			};

		case STYLE_OPTIONS.component.value:
			const styledComponentsLibrary = getWorkspaceSettings('styledComponentsLibrary');

			const importLib =
				styledComponentsLibrary === 'styled-components'
					? 'styled-components'
					: '@emotion/styled';

			return {
				import: `import styled from '${importLib}';`,
				etiqueta: `${nameComponent.capitalize}Stl`,
				className: ``,
				plus: `export const ${nameComponent.capitalize}Stl = styled.div\`\`;`,
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
