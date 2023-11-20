import type { NameComponent, StyleSheet, TypeStyle } from '../types';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { templateStyle } from '../templates';
import { finishProcess } from '../helpers/finish-process';
import { TYPE_STYLE } from '../constants';
import { getStyleSheet } from '../utils/functions/getStyleSheet';

export const createStyles = async (
	folderPath: string,
	nameComponent: NameComponent,
	styleType: TypeStyle,
	extensionStyle: StyleSheet,
) => {
	const isModule = styleType === TYPE_STYLE.MODULE ? '.module' : '';

	const fileName =
		nameComponent.capitalize + isModule + getStyleSheet(extensionStyle).ext;

	const className = nameComponent.lowerCase;

	try {
		writeFile(join(folderPath, fileName), templateStyle(className), {
			encoding: 'utf-8',
		});
	} catch (error: any) {
		finishProcess(error.message);
	}
};
