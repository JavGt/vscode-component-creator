import {
	ExtensionContext,
	commands,
	window,
	workspace,
	ProgressLocation,
	Uri,
} from 'vscode';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import { access, mkdir } from 'fs/promises';

import {
	CommCreateComponent,
	showMessageCancel,
	removeDot,
	addCapitalize,
	checkExtension,
	checkStyle,
	GetSettings,
	validateInput,
} from './helpers';
import {
	comandoCreateComponent,
	messageNotName,
	messageNotPath,
	NOT_CONFIG,
	NOT_STYLE,
	STRUCTURE_OPTIONS,
	STYLE_EXTENSIONS,
	STYLE_OPTIONS,
	STYLE_OPTIONS_INTERFACE,
	textRetry,
} from './constants';

import { templateBarrel, templateStyle } from './templates';

export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand(comandoCreateComponent, async args => {
		const fsPath = await checkPath(args);

		if (!fsPath) return showMessageCancel();

		const {
			CreateBarrel,
			SelectLanguage,
			SelectTypeStyle,
			SelectExtensionStyle,
			CreateFolderStyles,
		} = GetSettings();

		let COMPONENT_STRUCTURE;
		if (SelectLanguage !== NOT_CONFIG) COMPONENT_STRUCTURE = SelectLanguage;
		else
			COMPONENT_STRUCTURE = await window.showQuickPick(Object.values(STRUCTURE_OPTIONS), {
				title: 'Language',
				placeHolder: 'Select the type of component you want to create',
				ignoreFocusOut: true,
			});

		if (!COMPONENT_STRUCTURE) return showMessageCancel();

		// El tipo de diseño que tendrá el componente, ej: style-component
		let STYLE_TYPE;
		if (SelectTypeStyle !== NOT_CONFIG) STYLE_TYPE = SelectTypeStyle;
		else
			STYLE_TYPE = await window.showQuickPick(Object.values(STYLE_OPTIONS), {
				placeHolder: 'Select the type of design that your component will have.',
				title: 'Style',
				ignoreFocusOut: true,
			});
		if (!STYLE_TYPE) return showMessageCancel();

		let STYLE_SELECT;
		if (SelectExtensionStyle !== NOT_CONFIG) STYLE_SELECT = SelectExtensionStyle;
		else STYLE_SELECT = await selectStyle(STYLE_TYPE);

		if (!STYLE_SELECT) return showMessageCancel();

		const COMPONENT_NAME = await window.showInputBox({
			placeHolder: 'Component Name',
			title: 'Component Name',
			ignoreFocusOut: true,
			validateInput: value => validateInput(value, messageNotName),
		});
		if (!COMPONENT_NAME) return showMessageCancel();

		const { componentNotDot, componentName } = componentCheck(COMPONENT_NAME);

		const FOLDER_NAME = await createFolder(fsPath, componentNotDot);
		if (!FOLDER_NAME) return;

		createComponent(
			COMPONENT_STRUCTURE,
			STYLE_TYPE,
			STYLE_SELECT,
			COMPONENT_NAME,
			FOLDER_NAME
		);

		if (STYLE_SELECT !== NOT_STYLE)
			createStyles(
				componentNotDot,
				FOLDER_NAME,
				STYLE_TYPE,
				STYLE_SELECT,
				CreateFolderStyles
			);

		if (CreateBarrel)
			createBarrer(componentName, componentNotDot, FOLDER_NAME, COMPONENT_STRUCTURE);

		window.showInformationMessage(`Component ${componentName} created. 🎉`);
	});

	context.subscriptions.push(disposable);
}

const createBarrer = (
	COMPONENT_NAME_FILE: string,
	COMPONENT_NAME: string,
	FOLDER_NAME: string,
	COMPONENT_STRUCTURE: string
) => {
	const { extension } = checkExtension(COMPONENT_STRUCTURE);
	window.withProgress(
		{
			location: ProgressLocation.Notification,
			title: 'Creating barrel',
			cancellable: false,
		},
		async () =>
			writeFileSync(
				join(FOLDER_NAME, 'index' + extension),
				templateBarrel(COMPONENT_NAME, COMPONENT_NAME_FILE)
			)
	);
};
const createStyles = (
	COMPONENT_NAME: string,
	FOLDER_NAME: string,
	STYLE_TYPE: string,
	STYLE_SELECT: string,
	CREATE_FOLDER: boolean
) => {
	let pathStyles: string;

	if (CREATE_FOLDER) {
		pathStyles = join(FOLDER_NAME, 'styles');

		try {
			window.withProgress(
				{
					location: ProgressLocation.Notification,
					title: 'Creating folder styles',
					cancellable: false,
				},
				async () => mkdirSync(pathStyles)
			);
		} catch (err: any) {
			window.showErrorMessage(err.message);
		}
	} else pathStyles = FOLDER_NAME;

	try {
		window.withProgress(
			{
				location: ProgressLocation.Notification,
				title: 'Creating styles',
				cancellable: false,
			},
			async () =>
				writeFileSync(
					join(
						pathStyles,
						COMPONENT_NAME +
							`${
								STYLE_TYPE === STYLE_OPTIONS.STYLE_MODULE ? '.module' : ''
							}.${STYLE_SELECT}`
					),
					templateStyle(COMPONENT_NAME)
				)
		);
	} catch (error: any) {
		window.showErrorMessage(error.message);
	}
};

const componentCheck = (COMPONENT_NAME: string) => {
	return {
		componentNotDot: removeDot(COMPONENT_NAME),
		componentName: addCapitalize(COMPONENT_NAME),
	};
};

const checkPath = async (args: any) => {
	const { DefaultRoute } = GetSettings();
	window.showInformationMessage(DefaultRoute);
	const fsPath = args?.fsPath ?? null;

	if (fsPath) return fsPath;

	if (!workspace.workspaceFolders)
		return window.showInformationMessage("You don't have an open project.");

	const projectRoot = workspace.workspaceFolders[0].uri.fsPath;

	const pathInput = await window.showInputBox({
		value: DefaultRoute,
		placeHolder: 'Enter the path',
		title: projectRoot,
		ignoreFocusOut: true,
		validateInput: value => validateInput(value, messageNotPath),
	});

	if (!pathInput) return null;

	return join(projectRoot, pathInput);
};

const selectStyle = async (TYPE_STYLE: STYLE_OPTIONS_INTERFACE) => {
	if (
		TYPE_STYLE === STYLE_OPTIONS.STYLE_COMPONENT ||
		TYPE_STYLE === STYLE_OPTIONS.NOT_STYLE
	)
		return NOT_STYLE;

	// Pregunta que extension de la hoja de estilos tendrá
	return await window.showQuickPick(Object.values(STYLE_EXTENSIONS), {
		ignoreFocusOut: true,
		placeHolder: 'Select the type of extension that your style sheet will have',
		title: 'Style extension',
	});
};

const createFolder = (fsPath: string, COMPONENT_NAME: string) => {
	// Crear una carpeta con el nombre del componente
	const FOLDER_NAME = join(fsPath, COMPONENT_NAME);

	// Verifica si la carpeta ya existe
	try {
		access(FOLDER_NAME).then(() => {
			window
				.showErrorMessage(
					`The Component "${COMPONENT_NAME}" already exists in the path ${fsPath}`,
					textRetry
				)
				.then(selection => selection === textRetry && CommCreateComponent());
		});
	} catch (err) {}

	try {
		window.withProgress(
			{
				location: ProgressLocation.Notification,
				title: 'Creating folder.',
			},
			async () => mkdir(FOLDER_NAME, { recursive: true })
		);
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}
	return FOLDER_NAME;
};

const createComponent = (
	COMPONENT_STRUCTURE: string,
	STYLE_TYPE: string,
	STYLE_SELECT: string,
	COMPONENT_NAME: string,
	FOLDER_NAME: string
) => {
	const { extension, template } = checkExtension(COMPONENT_STRUCTURE);

	const { componentName, componentNotDot } = componentCheck(COMPONENT_NAME);

	const COMPONENT_FILE = componentName + extension;

	const COMPONENT_PATH = join(FOLDER_NAME, COMPONENT_FILE);

	const templateStyle = checkStyle(componentNotDot, STYLE_TYPE, STYLE_SELECT);

	try {
		window.withProgress(
			{
				location: ProgressLocation.Notification,
				title: 'Creating component.',
			},
			async () => writeFileSync(COMPONENT_PATH, template(componentNotDot, templateStyle))
		);
	} catch (err: any) {
		return window.showErrorMessage(err.message);
	}

	commands.executeCommand('vscode.open', Uri.file(COMPONENT_PATH));
};

export function deactivate() {}
