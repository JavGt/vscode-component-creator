import { join } from 'path';
import { mkdir } from 'fs/promises';
import { finishProcess } from '../helpers/finish-process';
import { NameComponent } from '../types';
import { verifyPath } from '../utils/functions';

export const createFolder = async (
	path: string,
	componentName: NameComponent,
): Promise<string> => {
	
	const folderPath = join(path, componentName.capitalize);

	// Verifica si la carpeta ya existe
	verifyPath(
		folderPath,
		(path) =>
			`The Component "${componentName.capitalize}" already exists in the path ${path}`,
	);

	try {
		await mkdir(folderPath, {
			recursive: true,
		});
	} catch (err: any) {
		finishProcess(err.message);
	}

	

	return folderPath;
};
