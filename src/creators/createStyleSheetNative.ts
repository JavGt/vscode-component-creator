import { join } from 'path';
import { templateStyleSheetNative } from '../templates/styleSheetNative.template';
import { Language, NameComponent } from '../types';
import { getLanguage } from '../utils/functions';
import { writeFile } from 'fs/promises';
import { finishProcess } from '../helpers';

export const createStyleSheetNative = (
	nameComponent: NameComponent,
	folderPath: string,
	language: Language,
) => {
	const options = getLanguage(language);

	const file = `${nameComponent.capitalize}.styles${options.ext}`;

	try {
		writeFile(
			join(folderPath, file),
			templateStyleSheetNative(nameComponent.lowerCase).template,
			{
				encoding: 'utf-8',
			},
		);
	} catch (error: any) {
		finishProcess(error.message);
	}
};
