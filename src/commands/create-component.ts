import { ExtensionContext } from 'vscode';
import { getPath } from '../showInput';
import { createComponentWeb } from './create-component-web';
import { selectPlatform } from '../showInput/selectPlatform';
import { createComponentNative } from './create-component-native';

const createComponentFn = async (ctx: ExtensionContext, args: any) => {
  // Obtiene la ruta del archivo seleccionado
  const path = args?.fsPath ?? (await getPath(ctx));

  const plataforma = await selectPlatform();

  if (plataforma === 'web') createComponentWeb(path);

  if (plataforma === 'native') createComponentNative(path);
};

export default createComponentFn;
