import { join } from 'path';
import { mkdir } from 'fs/promises';
import { finishProcess } from '../helpers/finish-process';
import { NameComponent } from '../showInput/getNameComponent';
import { checkPathExistence } from '../helpers/checkPathExistence';

export const createFolder = async (
  path: string,
  componentName: NameComponent
): Promise<string> => {
  // Crear una carpeta con el nombre del componente
  const folderPath = join(path, componentName.capitalize);

  // Verifica si la carpeta ya existe
  checkPathExistence(
    folderPath,
    (path) =>
      `The Component "${componentName.capitalize}" already exists in the path ${path}`
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
