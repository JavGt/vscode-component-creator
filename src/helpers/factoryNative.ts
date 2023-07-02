import { LANGUAGE_OPTIONS } from '../constants';
import { nativeJsTemplate, nativeTsTemplate } from '../templates/native.template';
import { LanguageType } from '../types';

export const factoryNative = (language: LanguageType) => {
	switch (language) {
		case LANGUAGE_OPTIONS.javascript.value:
			return {
				jsx: LANGUAGE_OPTIONS.javascript.jxs,
				template: nativeJsTemplate,
			};
		case LANGUAGE_OPTIONS.typescript.value:
			return {
				jsx: LANGUAGE_OPTIONS.typescript.jxs,
				template: nativeTsTemplate,
			};
		default:
			return {
				jsx: LANGUAGE_OPTIONS.javascript.jxs,
				template: nativeJsTemplate,
			};
	}
};
