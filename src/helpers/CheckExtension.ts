import { LANGUAGE_OPTIONS } from '../constants';
import { templateJsx, templateTsx } from '../templates';
import { Language } from '../types';

export const checkExtension = (language: Language) => {
  switch (language) {
    case LANGUAGE_OPTIONS.javascript.value:
      return {
        ...LANGUAGE_OPTIONS.javascript,
        template: templateJsx,
      };

    case LANGUAGE_OPTIONS.typescript.value:
      return {
        ...LANGUAGE_OPTIONS.typescript,
        template: templateTsx,
      };

    default:
      return {
        ...LANGUAGE_OPTIONS.javascript,
        template: templateJsx,
      };
  }
};
