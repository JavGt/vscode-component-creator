import { join } from 'path';
import { ExtensionStyle, StyleType } from '../helpers';
import { writeFile } from 'fs/promises';
import { templateStyle } from '../templates';
import { NameComponent } from '../showInput/InputNameComponent';
import { finishProcess } from '../helpers/finish-process';

export const createStyles = async (
	folderPath: string,
	nameComponent: NameComponent,
	styleType: StyleType,
	extensionStyle: ExtensionStyle
) => {
	const isModule = styleType === 'Style Module' ? '.module' : '';

	const nameFile = nameComponent.capitalize + isModule + '.' + extensionStyle;

	const nameClass = nameComponent.original;

	try {
		writeFile(join(folderPath, nameFile), templateStyle(nameClass));
	} catch (error: any) {
		finishProcess(error.message);
	}
};
