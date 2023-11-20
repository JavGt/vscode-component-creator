import type { Language } from '../../types';
import { templateJsx, templateTsx } from '../../templates';
import { getLanguage } from './getLanguage';

export const templatesWeb: Record<Language, any> = {
	javascript: templateJsx,
	typescript: templateTsx,
};

export const getTemplateWeb = (language: Language) => {
	const options = getLanguage(language);

	const fileName = (nameComponent: string) => {
		const { jxs } = options;

		return `${nameComponent}${jxs}`;
	};

	const template = templatesWeb[language] || templatesWeb.javascript;

	return {
		fileName,
		template,
		...options,
	};
};
