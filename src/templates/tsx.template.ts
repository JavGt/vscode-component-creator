import { getWorkspaceSettings, TemplateStyleInterface } from '../helpers';
import { contentTemplate, importReact } from './shared.template';

const templateInterface = (nameComponent: string) =>
	`\nexport type ${nameComponent}Props = {\n}\n`;

export const templateTsx = (
	nameComponent: string,
	templateStyle: TemplateStyleInterface
) => {
	const createInterface = getWorkspaceSettings('CreateInterface');

	return `${importReact()}${templateStyle.import}${
		createInterface ? templateInterface(nameComponent) : ''
	}\nconst ${nameComponent}${
		createInterface ? `: React.FC<${nameComponent}Props> ` : ''
	}= () => {\n${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className
	)}};\n${templateStyle.plus}\nexport default ${nameComponent};\n`;
};
