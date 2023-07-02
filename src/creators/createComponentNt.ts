import { writeFile } from 'fs/promises';
import { checkPathExistence, finishProcess } from '../helpers';
import { factoryNative } from '../helpers/factoryNative';
import { NameComponent } from '../showInput';
import { LanguageType } from '../types';
import { join } from 'path';
import { Uri, commands } from 'vscode';

export const createComponentNt = async (
	nameComponent: NameComponent,
	folderPath: string,
	language: LanguageType
) => {
	const { jsx, template } = factoryNative(language);

	const path = join(folderPath, nameComponent.capitalize + jsx);

	checkPathExistence(
		path,
		path =>
			`The Component "${nameComponent.capitalize}" already exists in the path ${path}`
	);

	try {
		await writeFile(path, template(nameComponent));
		commands.executeCommand('vscode.open', Uri.file(join(path)));
	} catch (error: any) {
		finishProcess(error.message);
	}
};
