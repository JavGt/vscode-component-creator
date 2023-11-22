import { testJsTemplate, testTsTemplate } from '../../templates/test.template';
import type { Language } from '../../types';
import { getLanguage } from './getLanguage';

export const templatesTest: Record<Language, (name: string) => string> = {
	javascript: testJsTemplate,
	typescript: testTsTemplate,
};

export const getTemplateTest = (language: Language) => {
	const options = getLanguage(language);

	const fileName = (nameComponent: string) => {
		const { jxs } = options;

		return `${nameComponent}.test${jxs}`;
	};

	const template = templatesTest[language] || templatesTest.javascript;

	return {
		fileName,
		template,
	};
};
