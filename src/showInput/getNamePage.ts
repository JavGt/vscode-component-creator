import { window } from 'vscode';
import { finishProcess } from '../helpers';
import { TypePage } from '../types';

export type NamePage = { nameFolder: string; nameFile: string | undefined } | string;

export const getNamePage = async (type: TypePage): Promise<NamePage> => {
	let nameFolder: string | undefined;

	if (type === 'folder') {
		const nameF = await window.showInputBox({
			title: `Name of folder`,
			placeHolder: `Name of folder`,
			ignoreFocusOut: true,
			validateInput: (value: string) => {
				if (!value) return 'You must enter a name';
				return null;
			},
		});

		if (!nameF) return finishProcess(`You must enter a name for ${type}`);

		nameFolder = nameF;
	}

	const nameFile = await window.showInputBox({
		title: `Name of file`,
		placeHolder: `Name of file`,
		ignoreFocusOut: true,
		prompt:
			type === 'folder'
				? `pressing "esc" will apply a default name (index | page)`
				: undefined,
	});

	if (!nameFile && type !== 'folder')
		return finishProcess(`You must enter a name for ${type}`);

	return type === 'folder'
		? {
				nameFolder: nameFolder as string,
				nameFile,
		  }
		: (nameFile as string);
};
