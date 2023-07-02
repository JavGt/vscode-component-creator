import { LANGUAGE_OPTIONS } from '../constants';
import { pageJsTemplate, pageTsTemplate } from '../templates/page.template';
import { LanguageType } from '../types';

export const factoryPage = (language: LanguageType) => {
	switch (language) {
		case LANGUAGE_OPTIONS.javascript.value:
			return {
				jsx: LANGUAGE_OPTIONS.javascript.jxs,
				template: pageJsTemplate,
			};
		case LANGUAGE_OPTIONS.typescript.value:
			return {
				jsx: LANGUAGE_OPTIONS.typescript.jxs,
				template: pageTsTemplate,
			};
		default:
			return {
				jsx: LANGUAGE_OPTIONS.javascript.jxs,
				template: pageJsTemplate,
			};
	}
};
