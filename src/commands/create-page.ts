import { ExtensionContext } from 'vscode';
import { selectTypePage } from '../showInput/selectTypePage';
import { TypeFolder } from '../types';
import { getNamePage } from '../showInput/getNamePage';
import { createPage } from '../creators/createPage';
import { selectLanguage } from '../showInput';

export const isVerifyFolder = (path: string): TypeFolder => {
	if (path.includes('pages')) {
		return 'pages';
	}

	return 'app';
};

const createPageFn = async (ctx: ExtensionContext, args: any) => {
	const path = args?.fsPath;

	const typeFolder = isVerifyFolder(args.fsPath);

	const type = await selectTypePage();

	const language = await selectLanguage();

	const name = await getNamePage(type);

	createPage({
		language,
		name,
		path,
		type,
		typeFolder,
	});
};

export default createPageFn;
