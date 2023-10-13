import { templateBarrel } from '../templates';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getWorkspaceSettings, finishProcess } from '../helpers';
import { NameComponent } from '../showInput/getNameComponent';
import { LANGUAGE_OPTIONS } from '../constants';
import { LanguageType } from '../types';

export const createBarrer = (
  nameComponent: NameComponent,
  folderPath: string,
  language: LanguageType
) => {
  const createBarrel = getWorkspaceSettings('createBarrel');

  if (!createBarrel) return;

  try {
    writeFile(
      join(folderPath, 'index' + LANGUAGE_OPTIONS[language].ext),
      templateBarrel(nameComponent.capitalize)
    );
  } catch (error: any) {
    finishProcess(error.message);
  }
};
