import { join } from 'path';
import { commands, Uri, window } from 'vscode';
import { checkExtension, checkStyle } from '../helpers';
import { writeFile } from 'fs/promises';
import { NameComponent } from '../showInput/getNameComponent';
import type { ExtensionStyle, LanguageType, StyleType } from '../types';

export const createComponent = async (
  folderPath: string,
  componentName: NameComponent,
  language: LanguageType,
  styleType: StyleType,
  extensionStyle: ExtensionStyle
) => {
  const { template, jxs } = checkExtension(language);

  const fileName = componentName.capitalize + jxs;

  const componentPath = join(folderPath, fileName);

  const templateStyle = checkStyle(componentName, styleType, extensionStyle);

  try {
    await writeFile(
      componentPath,
      template(componentName.capitalize, templateStyle)
    );
  } catch (err: any) {
    return window.showErrorMessage(err.message);
  }

  commands.executeCommand('vscode.open', Uri.file(componentPath));
};
