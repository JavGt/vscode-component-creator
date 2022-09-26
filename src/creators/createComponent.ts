import { join } from 'path';
import { commands, Uri, window } from 'vscode';
import { checkExtension, checkStyle, removeDot } from '../helpers';
import { writeFile } from 'fs/promises';

const createComponent = async (
	folderPath: string,
	componentName: string,
	componentStructure: string,
	styleType: string,
	styleLanguage: string
) => {
	const { extension, template } = checkExtension(componentStructure);

	const nameComponent = removeDot(componentName);

	const fileName = componentName + extension + 'x';

	const componentPath = join(folderPath, fileName);

	const templateStyle = checkStyle(nameComponent, styleType, styleLanguage);

	try {
		await writeFile(componentPath, template(nameComponent, templateStyle));
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}

	commands.executeCommand('vscode.open', Uri.file(componentPath));
};

export { createComponent };
