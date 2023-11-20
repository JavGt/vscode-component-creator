import { window } from 'vscode';
import { createBarrer, createFolder } from '../creators';
import { getNameComponent, selectLanguage } from '../inputs';
import { createComponentNt } from '../creators/createComponentNt';

export const createComponentNative = async (path: string) => {
  const language = await selectLanguage();

  const nameComponent = await getNameComponent();

  const folderPath = await createFolder(path, nameComponent);

  createBarrer(nameComponent, folderPath, language);

  createComponentNt(nameComponent, folderPath, language);

  window.showInformationMessage(
    `Component ${nameComponent.capitalize} created. ⚛`
  );
};
