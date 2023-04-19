import { join } from 'path';
import { commands, Uri, window } from 'vscode';
import { checkExtension, checkStyle, LanguageType, removeDot } from '../helpers';
import { writeFile } from 'fs/promises';
import { NameComponent } from '../showInput/InputNameComponent';
import { ExtensionStyle, StyleType } from '../helpers/GetSettings';
import { NOT_STYLE } from '../constants/constants';

const createComponent = async (
	folderPath: string,
	componentName: NameComponent,
	language: LanguageType,
	styleType: StyleType,
	extensionStyle: ExtensionStyle
) => {
	const { extension, template } = checkExtension(language);

	const fileName = componentName.capitalize + extension + 'x';

	const componentPath = join(folderPath, fileName);

	const templateStyle = checkStyle(componentName, styleType, extensionStyle);

	try {
		await writeFile(componentPath, template(componentName.capitalize, templateStyle));
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}

	commands.executeCommand('vscode.open', Uri.file(componentPath));
};

export { createComponent };
