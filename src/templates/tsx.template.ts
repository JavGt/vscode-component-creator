import { GetSettings, templateStyleInterface } from '../helpers';
import { contentTemplate, importReact } from './shared.template';

const templateInterface = (nameComponent: string) =>
	`export interface ${nameComponent}Props {}\n`;

export const templateTsx = (
	nameComponent: string,
	templateStyle: templateStyleInterface
) => {
	const { CreateInterface } = GetSettings();

	return `${importReact()}${templateStyle.import}${
		CreateInterface ? templateInterface(nameComponent) : ''
	}\nconst ${nameComponent} ${
		CreateInterface ? `: React.FC<${nameComponent}Props> ` : ''
	}= () => {\n${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className
	)}};\n${templateStyle.plus}\nexport default ${nameComponent};\n`;
};
