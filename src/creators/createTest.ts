import { join } from 'path';
import { factoryTest } from '../helpers/factoryTest';
import { NameComponent } from '../showInput';
import { LanguageType } from '../types';
import { writeFile } from 'fs/promises';
import { window } from 'vscode';

export const createTest = async (
	folderPath: string,
	componentName: NameComponent,
	language: LanguageType
) => {
	const { template, jsx } = factoryTest(language);

	const fileName = `${componentName.capitalize}.test${jsx}`;

	const path = join(folderPath, fileName);

	try {
		await writeFile(path, template(componentName.capitalize));
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}
};
