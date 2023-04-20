import { join } from 'path';
import { access, mkdir } from 'fs/promises';
import { finishProcess } from '../helpers/finish-process';
import { NameComponent } from '../showInput/InputNameComponent';

export const createFolder = async (
	path: string,
	componentName: NameComponent
): Promise<string> => {
	// Crear una carpeta con el nombre del componente
	const folderPath = join(path, componentName.capitalize);

	// Verifica si la carpeta ya existe
	try {
		await access(folderPath);

		finishProcess(
			`The Component "${componentName.capitalize}" already exists in the path ${folderPath}`
		);
	} catch (err) {}

	try {
		await mkdir(folderPath, { recursive: true });
	} catch (err: any) {
		finishProcess(err.message);
	}

	return folderPath;
};
