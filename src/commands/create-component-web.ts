import { ExtensionContext, window } from 'vscode';
import {
  selectLanguage,
  getNameComponent,
  getPath,
  selectStyleType,
  selectStyleLanguage,
} from '../showInput';
import {
  createBarrer,
  createComponent,
  createFolder,
  createStyles,
} from '../creators';
import { createStorybook } from '../creators/createStorybook';
import { STYLE_OPTIONS } from '../constants/style';
import { ExtensionStyle } from '../types';
import { selectExtras } from '../showInput/selectExtras';
import { createTest } from '../creators/createTest';

export const createComponentWeb = async (path: string) => {
  const extras = await selectExtras();

  // Selecciona el lenguaje
  const language = await selectLanguage();

  // El tipo de diseño que tendrá el componente, ej: style-component
  const styleType = await selectStyleType();

  // Selecciona la extension de la hoja de estilos
  const extensionStyle =
    styleType === STYLE_OPTIONS.component.value ||
    styleType === STYLE_OPTIONS.none.value
      ? STYLE_OPTIONS.none.value
      : await selectStyleLanguage();

  // Pregunta por el nombre del componente
  const nameComponent = await getNameComponent();

  const folderPath = await createFolder(path, nameComponent);

  if (extensionStyle !== STYLE_OPTIONS.none.value)
    createStyles(
      folderPath,
      nameComponent,
      styleType,
      extensionStyle as ExtensionStyle
    );

  createComponent(
    folderPath,
    nameComponent,
    language,
    styleType,
    extensionStyle as ExtensionStyle
  );

  createBarrer(nameComponent, folderPath, language);

  if (extras.includes('stories')) {
    createStorybook(folderPath, nameComponent, language);
  }

  if (extras.includes('test')) {
    createTest(folderPath, nameComponent, language);
  }

  window.showInformationMessage(
    `Component ${nameComponent.capitalize} created. ⚛`
  );
};
