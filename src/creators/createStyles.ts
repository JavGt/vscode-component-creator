import { join } from 'path';
import { writeFile } from 'fs/promises';
import { templateStyle } from '../templates';
import { NameComponent } from '../showInput/getNameComponent';
import { finishProcess } from '../helpers/finish-process';
import { STYLE_OPTIONS, STYLE_EXTENSIONS } from '../constants/style';
import { ExtensionStyle, StyleType } from '../types';

export const createStyles = async (
	folderPath: string,
	nameComponent: NameComponent,
	styleType: StyleType,
	extensionStyle: ExtensionStyle
) => {
	const isModule = styleType === STYLE_OPTIONS.module.value ? '.module' : '';

	const fileName =
		nameComponent.capitalize + isModule + STYLE_EXTENSIONS[extensionStyle].ext;

	const className = nameComponent.original;

	try {
		writeFile(join(folderPath, fileName), templateStyle(className));
	} catch (error: any) {
		finishProcess(error.message);
	}
};
