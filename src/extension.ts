import { ExtensionContext, commands, window } from 'vscode';
import { ExtensionStyle, removeDot } from './helpers';
import { comandoCreateComponent, NOT_STYLE } from './constants';

import {
	getLanguage,
	getNameComponent,
	getPath,
	getStyleType,
	selectStyleLanguage,
} from './showInput';

import { createFolder, createStyles, createComponent, createBarrer } from './creators';

export async function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand(comandoCreateComponent, async args => {
		// Obtiene la ruta del archivo seleccionado
		const path = args?.fsPath ?? (await getPath(context));

		// Selecciona el lenguaje
		const language = await getLanguage();

		// El tipo de diseño que tendrá el componente, ej: style-component
		const styleType = await getStyleType();

		// Selecciona la extension de la hoja de estilos
		const extensionStyle =
			styleType === 'Style Component' || styleType === 'Not style'
				? NOT_STYLE
				: await selectStyleLanguage();

		// Pregunta por el nombre del componente
		const nameComponent = await getNameComponent();

		const folderPath = await createFolder(path, nameComponent);

		if (extensionStyle !== NOT_STYLE) {
			createStyles(folderPath, nameComponent, styleType, extensionStyle);
		}

		createComponent(
			folderPath,
			nameComponent,
			language,
			styleType,
			extensionStyle as ExtensionStyle
		);

		createBarrer(nameComponent, folderPath, language);

		window.showInformationMessage(
			`Component ${removeDot(nameComponent.capitalize)} created. ⚛`
		);
	});

	const deleteCache = commands.registerCommand(
		'Create-component-React:delete-cache',
		async args => {
			context.workspaceState.update('routes', []);
		}
	);

	context.subscriptions.push(disposable, deleteCache);
}

export function deactivate() {}
