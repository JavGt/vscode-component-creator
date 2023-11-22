/**
 * TODO: refactor this flow
 */
import { type FunctionFlow } from '../types';
import { pickTypePage } from '../inputs/pickTypePage';
import { TypeFolder } from '../types';
import { getNamePage } from '../inputs/getNamePage';
import { createPage } from '../creators/createPage';
import { pickLanguage } from '../inputs';

export const isVerifyFolder = (path: string): TypeFolder => {
	if (path.includes('pages')) {
		return 'pages';
	}

	return 'app';
};

export const createPageFlow: FunctionFlow = async (ctx, args) => {
	const path = args?.fsPath;

	const typeFolder = isVerifyFolder(args.fsPath);

	const type = await pickTypePage();

	const language = await pickLanguage();

	const name = await getNamePage(type);

	createPage({
		language,
		name,
		path,
		type,
		typeFolder,
	});
};
