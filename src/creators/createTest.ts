import type { Language, NameComponent } from '../types';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { getTemplateTest } from '../utils/functions';
import { finishProcess } from '../helpers';

export const createTest = async (
	folderPath: string,
	componentName: NameComponent,
	language: Language,
) => {
	const options = getTemplateTest(language);

	const path = join(folderPath, options.fileName(componentName.capitalize));

	try {
		await writeFile(path, options.template(componentName.capitalize), {
			encoding: 'utf-8',
		});
	} catch (err: any) {
		finishProcess(err);
	}
};
