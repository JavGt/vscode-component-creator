import { GetSettings, templateStyleInterface } from '../helpers';
import { contentTemplate, importReact } from './shared.template';

const templateInterface = (nameComponent: string) => {
	return `export interface ${nameComponent}Interface {}\n`;
};

export const templateTsx = (
	nameComponent: string,
	templateStyle: templateStyleInterface
) => {
	const { CreateInterface } = GetSettings();

	return `${importReact()}${templateStyle.import}${
		CreateInterface ? templateInterface(nameComponent) : ''
	}\nconst ${nameComponent} ${
		CreateInterface ? `: React.FC<${nameComponent}Interface> ` : ''
	}= () => {\n${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className
	)}};\n${templateStyle.plus}\nexport default ${nameComponent};\n`;
};
