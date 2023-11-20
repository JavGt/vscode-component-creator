import { NameComponent } from '../types';

export const nativeTsTemplate = (nameComponent: NameComponent) => {
	return `import { Text } from 'react-native'

const ${nameComponent.capitalize} = () => {
    return (
        <Text>${nameComponent.capitalize}</Text>
    )
}

export default ${nameComponent.capitalize}`;
};

export const nativeJsTemplate = (nameComponent: NameComponent) => {
	return `import { Text } from 'react-native'

const ${nameComponent.capitalize} = () => {
    return (
        <Text>${nameComponent.capitalize}</Text>
    )
}

export default ${nameComponent.capitalize}`;
};
