import {
  ExtensionContext,
  QuickPickItem,
  QuickPickItemKind,
  window,
  workspace,
} from 'vscode';
import { join } from 'path';
import { finishProcess } from '../helpers';
import { getWorkspace } from './getWorkspace';
import { statSync } from 'fs';
import { access, readdir } from 'fs/promises';
import { formatDistance } from 'date-fns';
import { getWorkspaceSettings } from '../helpers';

const optionsRecommended = () => {
  const optionsRecommended = getWorkspaceSettings('recommendedRoutes');

  return [
    {
      label: 'Recommended options. ⚛️',
      description: 'folder',
      kind: QuickPickItemKind.Separator,
    },
    ...optionsRecommended.map((option) => ({
      label: option,
    })),
    {
      label: 'Extras',
      description: 'folder',
      kind: QuickPickItemKind.Separator,
    },
    {
      label: 'create',
      detail: 'Create a new folder. 📁 ',
    },
  ] as QuickPickItem[];
};

export const getPath = async (ctx: ExtensionContext): Promise<string> => {
  if (!workspace.workspaceFolders?.length) {
    finishProcess("You don't have an open project.");
  }

  const workspaceFolder =
    workspace.workspaceFolders?.length > 1
      ? await getWorkspace()
      : workspace.workspaceFolders[0].uri.fsPath;

  const pickCustom = async (): Promise<string> => {
    return new Promise((resolve) => {
      const pick = window.createQuickPick();

      pick.ignoreFocusOut = true;
      pick.placeholder = 'Base url /';
      pick.title = 'Select a path or search (To finish it must end with /)';

      // * Sirve para seleccionará mas de 1
      // pick.canSelectMany = true;

      // * Sirve como event cuando selecciona otro item de la lista (Se usa solo cuando se canSelectMany esta en true)
      // pick.onDidChangeSelection(event => {
      // 	console.log('onDidChangeSelection', event);
      // });

      // * Sirve como event cuando cambias de sección en el list
      pick.onDidChangeActive((items) => {
        // if (items[0] && items[0].label === 'Elemento 1') {
        // 	// La flecha derecha ha sido presionada, haz algo aquí
        // 	console.log('La flecha derecha ha sido presionada');
        // }
      });

      pick.show();

      // * Sirve como event cuando el valor dentro del input cambia
      pick.onDidChangeValue(async (value) => {
        if (!value.length) {
          await getOptions();
        }

        if (value.endsWith('/')) {
          await getOptions(value);
        }
      });

      pick.onDidAccept(() => {
        const { label: value } = pick.selectedItems[0];

        if (value !== 'create') {
          addOptionCache(value);
        }

        resolve(value);
      });

      pick.onDidHide(() => {
        if (!pick.selectedItems.length) {
          finishProcess();
        }
      });

      const getOptions = async (prompt: string = '') => {
        // concatena el workspaceFolder con la ruta
        const path = join(workspaceFolder + '/' + prompt);

        try {
          // Verifica si existe el path
          pick.busy = true;
          await access(path);
          pick.busy = false;
        } catch (error) {
          // Si no existe el path, muestra un mensaje de error y limpia el input
          pick.value = '';
          window.showErrorMessage('The path does not exist.');
        }

        // Obtiene los archivos de la ruta
        const files = await readdir(path);

        // Filtra los archivos para obtener solo las carpetas
        const folders = files.filter((file) => {
          // Verifica si es una carpeta
          const isDirectory = statSync(path + '/' + file).isDirectory();

          if (isDirectory) {
            // Hacer una expresión regular para que no tome en cuenta los archivos que empiecen con punto y node_modules
            const regex = /^(?!\.)(?!node_modules)/;

            // Verifica si es una carpeta oculta o node_modules
            if (regex.test(file)) {
              return file;
            }
          }
        });

        pick.items = [
          ...folders.map((folder) => ({
            label: prompt + folder,
            description: 'Your folder. 📁',
          })),
          ...optionsRecommended(),
          // Usados recientemente
          ...getOptionsCache(),
        ] as QuickPickItem[];
      };

      const getOptionsCache = () => {
        const options = ctx.workspaceState
          .get('routes', [])
          .map((route: { label: string; time: number }) => ({
            label: route.label,
            detail: formatDistance(new Date(route.time), new Date(), {
              addSuffix: true,
            }),
          }));

        return [
          {
            label: 'Recently used. 🕛',
            description: 'folder',
            kind: QuickPickItemKind.Separator,
          },
          ...options,
        ];
      };

      getOptions();
    });
  };

  const addOptionCache = (value: string) => {
    ctx.workspaceState.update('routes', [
      {
        label: value,
        time: Date.now(),
      },
      ...ctx.workspaceState
        .get('routes', [])
        .filter(({ label }: QuickPickItem) => label !== value)
        .splice(0, 9),
    ]);
  };

  return await pickCustom().then(async (value) => {
    if (value !== 'create') {
      return join(workspaceFolder + '/' + value);
    }

    const defaultRoute = getWorkspaceSettings('defaultRoute');

    const path = await window.showInputBox({
      value: defaultRoute,
      ignoreFocusOut: true,
      placeHolder: 'Folder name',
      prompt: 'Enter the name of the folder you want to create.',
      validateInput: (value) =>
        !value.length ? 'The folder name is required.' : '',
    });

    if (!path) {
      finishProcess();
    }

    addOptionCache(
      // Remover la barra al final
      path.endsWith('/') ? path.slice(0, -1) : path
    );

    return join(workspaceFolder + '/' + path);
  });
};
