import { LANGUAGE_OPTIONS } from '../constants';
import { testJsTemplate, testTsTemplate } from '../templates/test.template';
import { Language } from '../types';

export const factoryTest = (language: Language) => {
  switch (language) {
    case LANGUAGE_OPTIONS.javascript.value:
      return {
        jsx: LANGUAGE_OPTIONS.javascript.jxs,
        template: testJsTemplate,
      };
    case LANGUAGE_OPTIONS.typescript.value:
      return {
        jsx: LANGUAGE_OPTIONS.typescript.jxs,
        template: testTsTemplate,
      };
    default:
      return {
        jsx: LANGUAGE_OPTIONS.javascript.jxs,
        template: testJsTemplate,
      };
  }
};
