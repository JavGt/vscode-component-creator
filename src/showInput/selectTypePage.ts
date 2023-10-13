import { QuickPickItem, window } from 'vscode';
import { finishProcess } from '../helpers/finish-process';
import { TypePage } from '../types';
import { getWorkspaceSettings } from '../helpers';
import { NOT_CONFIGURED } from '../constants';

export type OptionsTypePage<T> = QuickPickItem & {
  value: T;
};

const options: OptionsTypePage<TypePage>[] = [
  {
    label: 'Folder',
    detail: 'create your page with folder',
    value: 'folder',
  },
  {
    label: 'File',
    detail: 'create your page with file',
    value: 'file',
  },
];

export const selectTypePage = async (): Promise<TypePage> => {
  const typePageDefault = getWorkspaceSettings('pageType');

  if (typePageDefault !== NOT_CONFIGURED) return typePageDefault;

  const res = await window.showQuickPick(options, {
    title: 'Select type of page',
    placeHolder: 'Select type of page',
    ignoreFocusOut: true,
  });

  if (!res) return finishProcess('You must select a type of page');

  return res.value;
};
