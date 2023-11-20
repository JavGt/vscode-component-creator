import type {
	NameComponent,
	None,
	StyleSheet,
	TemplateStyleInterface,
	TypeStyle,
} from '../types';
import { STYLE_OPTIONS } from '../constants/style';
import { getWorkspaceSettings } from '.';

export const checkStyle = (
	nameComponent: NameComponent,
	styleType: TypeStyle | None,
	extensionStyle: StyleSheet,
): TemplateStyleInterface => {
	switch (styleType) {
		case STYLE_OPTIONS.module.value:
			return {
				import: `import styles from './${nameComponent.capitalize}.module.${extensionStyle}';`,
				etiqueta: `div`,
				className: ` className={styles.${nameComponent.lowerCase}}`,
				plus: ``,
			};

		case STYLE_OPTIONS.traditional.value:
			return {
				import: `import './${nameComponent.capitalize}.${extensionStyle}';`,
				etiqueta: `div`,
				className: ` className='${nameComponent.lowerCase}'`,
				plus: ``,
			};

		case STYLE_OPTIONS.component.value:
			const styledComponentsLibrary = getWorkspaceSettings(
				'web',
				'styledComponentsLibrary',
			);

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
