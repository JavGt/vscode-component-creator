import { join } from 'path';
import { window } from 'vscode';
import { GetSettings, removeDot } from '../helpers';
import { mkdir, writeFile } from 'fs/promises';
import { STYLE_OPTIONS } from '../constants';
import { templateStyle } from '../templates';

const createStyles = async (
	folderPath: string,
	componentName: string,
	styleType: string,
	styleLanguage: string
) => {
	const { CreateFolderStyles } = GetSettings();

	let path: string;

	if (CreateFolderStyles) {
		path = join(folderPath, 'styles');

		try {
			await mkdir(path);
		} catch (err: any) {
			window.showErrorMessage(err.message);
		}
	} else path = folderPath;

	const isModule = styleType === STYLE_OPTIONS.STYLE_MODULE ? '.module' : '';

	const nameFile = componentName + isModule + '.' + styleLanguage;

	const nameClass = removeDot(componentName).toLowerCase();

	try {
		writeFile(join(path, nameFile), templateStyle(nameClass));
	} catch (error: any) {
		window.showErrorMessage(error.message);
	}
};

export { createStyles };
