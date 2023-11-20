import type { NameComponent } from '../types';
import { getWorkspaceSettings } from '../helpers';
import { toSort } from '../utils/functions';
import { importReact } from './shared.template';
import { templateStyleSheetNative } from './styleSheetNative.template';
import { templateInterface } from './tsx.template';

export const nativeTsTemplate = (nameComponent: NameComponent) => {
	const styleSheet = getWorkspaceSettings('native', 'styleSheet');
	const isBoolean = typeof styleSheet === 'boolean';
	const { imp, styles } = templateStyleSheetNative(nameComponent.lowerCase);

	const importLib = importReact();

	const { type, assignation } = templateInterface(nameComponent.capitalize);

	const imports = toSort([
		importLib,
		"import { Text } from 'react-native';",
		isBoolean
			? styleSheet
				? imp
				: ''
			: `import styles from './${nameComponent.lowerCase}.styles';`,
	]);

	const plus = toSort([isBoolean ? (styleSheet ? styles : '') : '']);

	return `${imports}

${type}const ${nameComponent.capitalize}${assignation} = () => {
    return (
        <Text>${nameComponent.capitalize}</Text>
    )
}

${plus}\nexport default ${nameComponent.capitalize}`;
};

export const nativeJsTemplate = (nameComponent: NameComponent) => {
	const styleSheet = getWorkspaceSettings('native', 'styleSheet');
	const isBoolean = typeof styleSheet === 'boolean';
	const { imp, styles } = templateStyleSheetNative(nameComponent.lowerCase);

	const importLib = importReact();

	const imports = toSort([
		importLib,
		"import { Text } from 'react-native';",
		isBoolean
			? styleSheet
				? imp
				: ''
			: `import styles from './${nameComponent.lowerCase}.styles';`,
	]);

	const plus = toSort([isBoolean ? (styleSheet ? styles : '') : '']);

	return `${imports}

const ${nameComponent.capitalize} = () => {
    return (
        <Text>${nameComponent.capitalize}</Text>
    )
}

${plus}\nexport default ${nameComponent.capitalize}`;
};
