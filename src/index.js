const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const fsP = require('fs/promises');

const {
	STYLE_OPTIONS,
	STYLE_EXTENSIONS,
	STRUCTURE_OPTIONS,
	NOT_STYLE,
	NOT_CONFIG,
} = require('./constants');
const { checkExtension } = require('./helpers/CheckExtension/CheckExtension');
const { removeDot } = require('./helpers/RemoveDot/RemoveDot');
const { createCapitalize } = require('./helpers/Capitalize/Capitalize');
const { checkStyle } = require('./helpers/CheckStyle/CheckStyle');
const { templateBarrel } = require('./templates/barrel/barrel.template');
const { templateStyle } = require('./templates/styles/styles.template');
const { showMessageCancel } = require('./helpers/showMessageCancel/showMessageCancel');
const { GetSettings } = require('./helpers/GetSettings/GetSettings');

/**
 * @param {vscode.ExtensionContext} context
 */

const activate = context => {
	// Create workspace folder
	const createWorkspaceFolder = async () => {
		const workspaceFolder = vscode.workspace.getConfiguration('create-component');
		const workspaceFolderPath = workspaceFolder.get('workspaceFolderPath');
		const workspaceFolderName = workspaceFolder.get('workspaceFolderName');
		const workspaceFolderPathFull = path.join(workspaceFolderPath, workspaceFolderName);
		const workspaceFolderPathFullExists = await fsP.access(workspaceFolderPathFull);
		if (workspaceFolderPathFullExists) {
			vscode.window.showErrorMessage('Workspace folder already exists');
		}
		await fsP.mkdir(workspaceFolderPathFull, { recursive: true });
	};
	createWorkspaceFolder();

	let disposable = vscode.commands.registerCommand('Create-component', async args => {
		// Verifica si le dio click al menu o fue por comando
		const fsPath = await checkPath(args);

		if (!fsPath) return showMessageCancel();

		const {
			CreateBarrel,
			SelectLanguage,
			SelectTypeStyle,
			SelectExtensionStyle,
			CreateFolderStyles,
		} = GetSettings();

		// Pregunta si tendrá ts
		let COMPONENT_STRUCTURE;
		if (SelectLanguage !== NOT_CONFIG) COMPONENT_STRUCTURE = SelectLanguage;
		else
			COMPONENT_STRUCTURE = await vscode.window.showQuickPick(
				Object.values(STRUCTURE_OPTIONS),
				{
					title: 'Language',
					placeHolder: 'Select the type of component you want to create',
					ignoreFocusOut: true,
				}
			);

		if (!COMPONENT_STRUCTURE) return showMessageCancel();

		// El tipo de diseño que tendrá el componente, ej: style-component
		let STYLE_TYPE;

		if (SelectTypeStyle !== NOT_CONFIG) STYLE_TYPE = SelectTypeStyle;
		else
			STYLE_TYPE = await vscode.window.showQuickPick(Object.values(STYLE_OPTIONS), {
				placeHolder: 'Select the type of design that your component will have.',
				title: 'Style',
				ignoreFocusOut: true,
			});
		if (!STYLE_TYPE) return showMessageCancel();

		// Retorna la extension o "nothing"

		let STYLE_SELECT;

		if (SelectExtensionStyle !== NOT_CONFIG) STYLE_SELECT = SelectExtensionStyle;
		else STYLE_SELECT = await selectStyle(STYLE_TYPE);

		if (!STYLE_SELECT) return showMessageCancel();

		// Pregunta por el nombre del componente
		const COMPONENT_NAME = await vscode.window.showInputBox({
			placeHolder: 'Component Name',
			title: 'Component Name',
			ignoreFocusOut: true,
			validateInput: value => value.length === 0 && 'Component Name is required',
		});
		if (!COMPONENT_NAME) return showMessageCancel();

		const { componentNotDot, componentName } = componentCheck(COMPONENT_NAME);

		// Crear la carpeta donde estará el componente
		const FOLDER_NAME = await createFolder(fsPath, componentNotDot);
		if (!FOLDER_NAME) return;

		// Se crea el componente
		createComponent(
			COMPONENT_STRUCTURE,
			STYLE_TYPE,
			STYLE_SELECT,
			COMPONENT_NAME,
			FOLDER_NAME
		);

		// Se crea el styles
		if (STYLE_SELECT !== NOT_STYLE)
			createStyles(
				componentNotDot,
				FOLDER_NAME,
				STYLE_TYPE,
				STYLE_SELECT,
				CreateFolderStyles
			);

		// Se crea el barrer
		if (CreateBarrel)
			createBarrer(componentName, componentNotDot, FOLDER_NAME, COMPONENT_STRUCTURE);

		vscode.window.showInformationMessage(`Component ${componentName} created. 🎉`);
	});

	context.subscriptions.push(disposable);
};

const checkPath = async args => {
	const fsPath = args?.fsPath ?? null;

	if (!fsPath) {
		const pathInput = await vscode.window.showInputBox({
			placeHolder: 'Enter the path',
			title: vscode.workspace.workspaceFolders[0].uri.fsPath,
			ignoreFocusOut: true,
			validateInput: value => value.length === 0 && 'Path is required',
			value: './src',
		});
		if (!pathInput) return null;

		return path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, pathInput);
	}

	return fsPath;
};

const selectStyle = async TYPE_STYLE => {
	// Si fue "Style component" evita preguntar
	if (TYPE_STYLE === STYLE_OPTIONS.STYLE_COMPONENT || TYPE_STYLE === NOT_STYLE)
		return NOT_STYLE;

	// Pregunta que extension de la hoja de estilos tendrá
	return await vscode.window.showQuickPick(Object.values(STYLE_EXTENSIONS), {
		ignoreFocusOut: true,
		placeHolder: 'Select the type of extension that your style sheet will have',
		title: 'Style extension',
	});
};

const createFolder = async (fsPath, COMPONENT_NAME) => {
	// Crear una carpeta con el nombre del componente
	const FOLDER_NAME = path.join(fsPath, COMPONENT_NAME);

	// Verifica si la carpeta ya existe
	try {
		await fsP.access(FOLDER_NAME);
		vscode.window
			.showErrorMessage(
				`The Component "${COMPONENT_NAME}" already exists in the path ${fsPath}`,
				'Retry'
			)
			.then(selection => {
				if (selection === 'Retry') {
					vscode.commands.executeCommand('Create-component');
				}
			});
		return null;
	} catch (err) {}

	try {
		await fsP.mkdir(FOLDER_NAME, {
			recursive: true,
		});
	} catch (err) {
		vscode.window.showErrorMessage(err.message);
	}
	return FOLDER_NAME;
};

const createComponent = (
	COMPONENT_STRUCTURE,
	STYLE_TYPE,
	STYLE_SELECT,
	COMPONENT_NAME,
	FOLDER_NAME
) => {
	const { extension, template } = checkExtension(COMPONENT_STRUCTURE);

	const { componentName, componentNotDot } = componentCheck(COMPONENT_NAME);

	const COMPONENT_FILE = componentName + extension;

	const COMPONENT_PATH = path.join(FOLDER_NAME, COMPONENT_FILE);

	const templateStyle = checkStyle(componentNotDot, STYLE_TYPE, STYLE_SELECT);

	fs.writeFileSync(COMPONENT_PATH, template(componentNotDot, templateStyle));

	vscode.commands.executeCommand('vscode.open', vscode.Uri.file(COMPONENT_PATH));
};

const componentCheck = COMPONENT_NAME => {
	const componentSanitize = String(COMPONENT_NAME);
	const componentNotDot = removeDot(componentSanitize);

	return {
		componentNotDot: createCapitalize(componentNotDot),
		componentName: createCapitalize(componentSanitize),
	};
};

const createStyles = (
	COMPONENT_NAME,
	FOLDER_NAME,
	STYLE_TYPE,
	STYLE_SELECT,
	CREATE_FOLDER
) => {
	let pathStyles;

	if (CREATE_FOLDER) {
		pathStyles = path.join(FOLDER_NAME, 'styles');
		fs.mkdirSync(pathStyles);
	} else pathStyles = FOLDER_NAME;

	fs.writeFileSync(
		path.join(
			pathStyles,
			COMPONENT_NAME +
				`${STYLE_TYPE === STYLE_OPTIONS.STYLE_MODULE ? '.module' : ''}.${STYLE_SELECT}`
		),
		templateStyle(COMPONENT_NAME)
	);
};

const createBarrer = (
	COMPONENT_NAME_FILE,
	COMPONENT_NAME,
	FOLDER_NAME,
	COMPONENT_STRUCTURE
) => {
	const { extension } = checkExtension(COMPONENT_STRUCTURE);
	fs.writeFileSync(
		path.join(FOLDER_NAME, 'index' + extension),
		templateBarrel(COMPONENT_NAME, COMPONENT_NAME_FILE)
	);
};

const deactivate = () => {};

module.exports = {
	activate,
	deactivate,
};
