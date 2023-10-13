import { join } from 'path';
import { factorySb } from '../helpers/factorySb';
import { NameComponent } from '../showInput';
import { LanguageType } from '../types';
import { writeFile } from 'fs/promises';
import { window } from 'vscode';

export const createStorybook = async (
  folderPath: string,
  componentName: NameComponent,
  language: LanguageType
) => {
  const { jsx, template } = factorySb(language);

  const fileName = `${componentName.capitalize}.stories${jsx}`;

  const path = join(folderPath, fileName);

  try {
    await writeFile(path, template(componentName.capitalize));
  } catch (err: any) {
    return window.showErrorMessage(err.message);
  }
};
