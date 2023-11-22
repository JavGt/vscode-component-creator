import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { factoryPage, finishProcess } from '../helpers';
import { Language, TypeFolder, TypePage } from '../types';
import { NamePage } from '../inputs/getNamePage';
import { Uri, commands } from 'vscode';
import { verifyPath } from '../utils/functions';

export type CreatePageArgs = {
	path: string;
	typeFolder: TypeFolder;
	name: NamePage;
	language: Language;
	type: TypePage;
};

export const createPage = async (options: CreatePageArgs) => {
	const { jsx, template } = factoryPage(options.language);

	if (typeof options.name === 'object' && options.type === 'folder') {
		const path = join(options.path, options.name.nameFolder);

		const fileName =
			(options.name.nameFile
				? options.name.nameFile
				: options.typeFolder === 'app'
				? 'page'
				: 'index') + jsx;

		verifyPath(
			path,
			(path) =>
				`The folder ${path} already exists. Please, try again with another name.`,
		);

		try {
			await mkdir(path, { recursive: true });
		} catch (err: any) {
			finishProcess(err.message);
		}

		try {
			await writeFile(join(path, fileName), template());

			commands.executeCommand('vscode.open', Uri.file(join(path, fileName)));
		} catch (err: any) {
			finishProcess(err.message);
		}
	}

	if (typeof options.name === 'string' && options.type === 'file') {
		const path = join(options.path, options.name + jsx);

		verifyPath(
			path,
			(path) =>
				`The file ${path} already exists. Please, try again with another name.`,
		);

		try {
			await writeFile(path, template());
			commands.executeCommand('vscode.open', Uri.file(join(path)));
		} catch (err: any) {
			finishProcess(err.message);
		}
	}
};
