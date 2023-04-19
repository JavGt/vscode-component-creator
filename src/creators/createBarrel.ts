import { templateBarrel } from '../templates';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { checkExtension, getWorkspaceSettings, LanguageType } from '../helpers';
import { NameComponent } from '../showInput/InputNameComponent';
import { finishProcess } from '../helpers/finish-process';

export const createBarrer = (
	nameComponent: NameComponent,
	folderPath: string,
	language: LanguageType
) => {
	const createBarrel = getWorkspaceSettings('CreateBarrel');

	if (!createBarrel) {
		return;
	}

	const { extension } = checkExtension(language);

	try {
		writeFile(
			join(folderPath, 'index' + extension),
			templateBarrel(nameComponent.capitalize)
		);
	} catch (error: any) {
		finishProcess(error.message);
	}
};
