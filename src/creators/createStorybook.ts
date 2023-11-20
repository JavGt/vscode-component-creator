import { join } from 'path';
import type { Language, NameComponent } from '../types';
import { writeFile } from 'fs/promises';
import { window } from 'vscode';
import { getTemplateSb } from '../utils/functions/getTemplateSb';

export const createStorybook = async (
	folderPath: string,
	componentName: NameComponent,
	language: Language,
) => {
	const options = getTemplateSb(language);

	const path = join(folderPath, options.fileName(componentName.capitalize));

	try {
		await writeFile(path, options.template(componentName.capitalize), {
			encoding: 'utf-8',
		});
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}
};
