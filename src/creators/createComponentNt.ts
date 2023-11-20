import { writeFile } from 'fs/promises';
import {  finishProcess } from '../helpers';
import { factoryNative } from '../helpers/factoryNative';
import { Language, NameComponent } from '../types';
import { join } from 'path';
import { Uri, commands } from 'vscode';
import { verifyPath } from '../utils/functions';

export const createComponentNt = async (
  nameComponent: NameComponent,
  folderPath: string,
  language: Language
) => {
  const { jsx, template } = factoryNative(language);

  const path = join(folderPath, nameComponent.capitalize + jsx);

  verifyPath(
    path,
    (path) =>
      `The Component "${nameComponent.capitalize}" already exists in the path ${path}`
  );

  try {
    await writeFile(path, template(nameComponent));
    commands.executeCommand('vscode.open', Uri.file(join(path)));
  } catch (error: any) {
    finishProcess(error.message);
  }
};
