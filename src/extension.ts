import { ExtensionContext, commands, window } from 'vscode';
import { showMessageCancel } from './helpers';
import { comandoCreateComponent, NOT_STYLE } from './constants';
import {
	checkPath,
	InputNameComponent,
	selectLanguage,
	selectStyleLanguage,
	selectStyleType,
} from './showInput';
import { createFolder, createStyles, createComponent, createBarrer } from './creators';

export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand(comandoCreateComponent, async args => {
		// Valida la ruta del proyecto
		const path = await checkPath(args);
		if (!path) return showMessageCancel();

		// Selecciona el lenguaje
		const COMPONENT_STRUCTURE = await selectLanguage();
		if (!COMPONENT_STRUCTURE) return showMessageCancel();

		// El tipo de diseño que tendrá el componente, ej: style-component
		let STYLE_TYPE = await selectStyleType();
		if (!STYLE_TYPE) return showMessageCancel();

		// Selecciona el lenguaje de la hoja de estilos
		const STYLE_LANGUAGE = await selectStyleLanguage(STYLE_TYPE);
		if (!STYLE_LANGUAGE) return showMessageCancel();

		// Pregunta por el nombre del componente
		const COMPONENT_NAME = await InputNameComponent();
		if (!COMPONENT_NAME) return showMessageCancel();

		const FOLDER_PATH = await createFolder(path, COMPONENT_NAME);
		if (!FOLDER_PATH) return;

		if (STYLE_LANGUAGE !== NOT_STYLE)
			createStyles(FOLDER_PATH, COMPONENT_NAME, STYLE_TYPE, STYLE_LANGUAGE);

		createComponent(
			FOLDER_PATH,
			COMPONENT_NAME,
			COMPONENT_STRUCTURE,
			STYLE_TYPE,
			STYLE_LANGUAGE
		);

		createBarrer(COMPONENT_NAME, FOLDER_PATH, COMPONENT_STRUCTURE);

		window.showInformationMessage(
			`Component ${COMPONENT_NAME.split('.')[0]} created. 🎉`
		);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
