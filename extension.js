const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { plantillaJsx, plantillaStyles, plantillaBarrer } = require('./plantillas');
const { stylesOptions, notStyle, extensionStyles } = require('./constantes');

/**
 * @param {vscode.ExtensionContext} context
 */

const activate = context => {
	let disposable = vscode.commands.registerCommand(
		'create-component-creation',
		async () => {
			// // question a ts  and storybook
			// const selectOption = await vscode.window.showQuickPick(['TypeScript'], {
			// 	placeHolder: 'Select the type of component you want to create',
			// 	canPickMany: true,
			// 	ignoreFocusOut: true,
			// });

			const structComponent = await vscode.window.showQuickPick(
				Object.values(stylesOptions),
				{
					placeHolder: 'Select the type of component you want to create',
					ignoreFocusOut: true,
				}
			);

			const style = await selectStyle(structComponent);

			// Pregunta por el nombre del componente
			const componentName = await vscode.window.showInputBox({
				placeHolder: 'Component Name',
				ignoreFocusOut: true,
				validateInput: value => value.length === 0 && 'Component Name is required',
			});

			// Crear una carpeta con el nombre del componente
			const folderName = path.join(
				vscode.workspace.workspaceFolders[0].uri.fsPath,
				componentName
			);

			fs.mkdirSync(folderName);

			// Se crea el componente
			createComponent({ componentName, folderName, structComponent, style });

			// Se crea el styles
			if (style !== notStyle)
				createStyles({ componentName, folderName, style, structComponent });

			// Se crea el barrer
			createBarrer(componentName, folderName);
		}
	);

	context.subscriptions.push(disposable);
};

const createComponent = ({ componentName, folderName, structComponent, style }) => {
	const componentPath = path.join(folderName, componentName + '.jsx');
	fs.writeFileSync(
		componentPath,
		plantillaJsx({ componentName, structComponent, style })
	);
};

const createStyles = ({ componentName, folderName, style, structComponent }) => {
	const folderSylesName = path.join(folderName, 'styles');

	fs.mkdirSync(folderSylesName);

	fs.writeFileSync(
		path.join(
			folderSylesName,
			componentName +
				`${structComponent === stylesOptions.styleModule ? '.module' : ''}.${style}`
		),
		plantillaStyles({ componentName })
	);
};

const createBarrer = (componentName, folderName) => {
	fs.writeFileSync(path.join(folderName, 'index.js'), plantillaBarrer({ componentName }));
};

const selectStyle = async structComponent => {
	if (structComponent !== stylesOptions.styleComponent) {
		const SelectOptionStyles = await vscode.window.showQuickPick(
			Object.values(extensionStyles),
			{
				ignoreFocusOut: true,
				placeHolder: 'Select style',
			}
		);
		return SelectOptionStyles;
	}
	return notStyle;
};

const deactivate = () => {};

module.exports = {
	activate,
	deactivate,
};

// if (fs.existsSync(componentPath))
// 	return vscode.window.showErrorMessage(
// 		`Component ${componentName} already exists`
// 	);
