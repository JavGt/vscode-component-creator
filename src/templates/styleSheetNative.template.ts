export const templateStyleSheetNative = (nameComponent: string) => {
	const imp = `import { StyleSheet } from 'react-native';`;

	const styles = `export const styles = StyleSheet.create({\n\t${nameComponent}: {\n\t\tflex: 1,\n\t},\n});`;

	const template = `${imp}\n\n${styles}`;

	return {
		imp,
		styles,
		template,
	};
};
