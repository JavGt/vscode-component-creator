import type { StyleSheet, Language, TypeStyle, NameComponent, None } from '../types';
import { join } from 'path';
import { commands, Uri, window } from 'vscode';
import { checkStyle, finishProcess } from '../helpers';
import { writeFile } from 'fs/promises';
import { getTemplateWeb } from '../utils/functions/getTemplateWeb';

export const createComponentWeb = async (
	folderPath: string,
	componentName: NameComponent,
	language: Language,
	styleType: TypeStyle | None,
	extensionStyle: StyleSheet,
) => {
	const options = getTemplateWeb(language);

	const componentPath = join(
		folderPath,
		options.fileName(componentName.capitalize),
	);

	const templateStyle = checkStyle(componentName, styleType, extensionStyle);

	try {
		await writeFile(
			componentPath,
			options.template(componentName.capitalize, templateStyle),
			{ encoding: 'utf-8' },
		);
	} catch (err: any) {
		finishProcess();
		return window.showErrorMessage(err.message);
	}

	commands.executeCommand('vscode.open', Uri.file(componentPath));
};
