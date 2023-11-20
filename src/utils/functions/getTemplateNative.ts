import {
	nativeJsTemplate,
	nativeTsTemplate,
} from '../../templates/native.template';
import { Language } from '../../types';
import { getLanguage } from './getLanguage';

export const templatesNative: Record<Language, any> = {
	javascript: nativeJsTemplate,
	typescript: nativeTsTemplate,
};

export const getTemplateNative = (language: Language) => {
	const options = getLanguage(language);

	const fileName = (nameComponent: string) => {
		const { jxs } = options;

		return `${nameComponent}${jxs}`;
	};

	const template = templatesNative[language] || templatesNative.javascript;

	return {
		fileName,
		template,
		...options,
	};
};
