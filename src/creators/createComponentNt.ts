import type { Language, NameComponent } from '../types';
import { writeFile } from 'fs/promises';
import { finishProcess } from '../helpers';
import { join } from 'path';
import { Uri, commands } from 'vscode';
import { verifyPath } from '../utils/functions';
import { getTemplateNative } from '../utils/functions/getTemplateNative';

export const createComponentNt = async (
	nameComponent: NameComponent,
	folderPath: string,
	language: Language,
) => {
	const options = getTemplateNative(language);

	const path = join(folderPath, options.fileName(nameComponent.capitalize));

	verifyPath(
		path,
		(path) =>
			`The Component "${nameComponent.capitalize}" already exists in the path ${path}`,
	);

	try {
		await writeFile(path, options.template(nameComponent), {
			encoding: 'utf-8',
		});

		commands.executeCommand('vscode.open', Uri.file(join(path)));
	} catch (error: any) {
		finishProcess(error.message);
	}
};
