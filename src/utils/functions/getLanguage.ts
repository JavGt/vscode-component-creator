import { Language, LanguageOptions } from '../../types';

export const LANGUAGE_OPTIONS: Record<Language, LanguageOptions> = {
	javascript: {
		ext: '.js',
		jxs: '.jsx',
	},
	typescript: {
		ext: '.ts',
		jxs: '.tsx',
	},
};

export const getLanguage = (language: Language): LanguageOptions => {
	return LANGUAGE_OPTIONS[language] || LANGUAGE_OPTIONS.javascript;
};
