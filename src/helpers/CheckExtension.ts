import { templateJsx, templateTsx } from '../templates';
import { LanguageType } from './GetSettings';

export const checkExtension = (language: LanguageType) => {
	switch (language) {
		case 'JavaScript':
			return {
				extension: '.js',
				template: templateJsx,
			};

		case 'TypeScript':
			return {
				extension: '.ts',
				template: templateTsx,
			};

		default:
			return {
				extension: '.js',
				template: templateTsx,
			};
	}
};
