import { templateBarrel } from '../templates';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { checkExtension, GetSettings } from '../helpers';
import { window } from 'vscode';

const createBarrer = (
	componentName: string,
	folderPath: string,
	componentStructure: string
) => {
	const { CreateBarrel } = GetSettings();
	if (!CreateBarrel) return;

	const { extension } = checkExtension(componentStructure);

	const nameDefault = componentName.split('.')[0];

	try {
		writeFile(
			join(folderPath, 'index' + extension),
			templateBarrel(nameDefault, componentName)
		);
	} catch (error: any) {
		window.showErrorMessage(error.message);
	}
};

export { createBarrer };
