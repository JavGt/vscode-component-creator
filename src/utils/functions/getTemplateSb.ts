import { sbJsTemplate, sbTsTemplate } from '../../templates/sbTs.template';
import { Language } from '../../types';
import { getLanguage } from './getLanguage';

export const templatesSb: Record<Language, (name: string) => string> = {
	javascript: sbJsTemplate,
	typescript: sbTsTemplate,
};

export const getTemplateSb = (language: Language) => {
	const options = getLanguage(language);

	const fileName = (nameComponent: string) => {
		const { jxs } = options;
		return `${nameComponent}.stories${jxs}`;
	};

	const template = templatesSb[language] || templatesSb.javascript;

	return {
		fileName,
		template,
	};
};
