/**
 * TODO: refactor this flow
 */
import { type FunctionFlow } from '../types';
import { selectTypePage } from '../inputs/selectTypePage';
import { TypeFolder } from '../types';
import { getNamePage } from '../inputs/getNamePage';
import { createPage } from '../creators/createPage';
import { selectLanguage } from '../inputs';

export const isVerifyFolder = (path: string): TypeFolder => {
	if (path.includes('pages')) {
		return 'pages';
	}

	return 'app';
};

export const createPageFlow: FunctionFlow = async (ctx, args) => {
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
