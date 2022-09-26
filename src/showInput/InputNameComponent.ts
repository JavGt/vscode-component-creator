import { addCapitalize } from '../helpers';
import { window } from 'vscode';

const InputNameComponent = async () => {
	let isValidate = false;
	let component;

	do {
		const componentName = await window.showInputBox({
			placeHolder: 'Component Name',
			title: 'Component Name',
			ignoreFocusOut: true,
			validateInput: value =>
				value.length === 0 ? 'The name of the component is required' : '',
		});
		// validar a futuro las si agrega caracteres especiales
		component = componentName;
		isValidate = true;
	} while (!isValidate);

	if (!component) return;

	return addCapitalize(component);
};

export { InputNameComponent };
