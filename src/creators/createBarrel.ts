import type { Language, NameComponent } from '../types';
import { templateBarrel } from '../templates';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getWorkspaceSettings, finishProcess } from '../helpers';
import { getLanguage } from '../utils/functions';

export const createBarrer = (
	nameComponent: NameComponent,
	folderPath: string,
	language: Language,
) => {
	const createBarrel = getWorkspaceSettings('root', 'createBarrel');

	if (!createBarrel) return;

	const file = 'index' + getLanguage(language).ext;

	try {
		writeFile(
			join(folderPath, file),
			templateBarrel(nameComponent.capitalize),
			{
				encoding: 'utf-8',
			},
		);
	} catch (error: any) {
		finishProcess(error.message);
	}
};
