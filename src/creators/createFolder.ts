import { textRetry } from '../constants';
import { join } from 'path';
import { window } from 'vscode';
import { CommCreateComponent, removeDot } from '../helpers';
import { access, mkdir } from 'fs/promises';

const createFolder = async (path: string, componentName: string) => {
	// Crear una carpeta con el nombre del componente
	const nameFolder = removeDot(componentName);

	const folderPath = join(path, nameFolder);

	// Verifica si la carpeta ya existe
	try {
		await access(folderPath);
		window
			.showErrorMessage(
				`The Component "${componentName}" already exists in the path ${path}`,
				textRetry
			)
			.then(selection => selection === textRetry && CommCreateComponent());
		return null;
	} catch (err) {}

	try {
		await mkdir(folderPath, { recursive: true });
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}

	return folderPath;
};

export { createFolder };
