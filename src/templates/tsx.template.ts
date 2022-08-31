import { templateStyleInterface } from '../helpers';
import { contentTemplate, importReact } from './shared.template';

const templateInterface = (COMPONENT_NAME: string) => {
	return `export interface ${COMPONENT_NAME}Interface {}\n`;
};

export const templateTsx = (
	COMPONENT_NAME: string,
	templateStyle: templateStyleInterface
) => {
	return `${importReact()}${templateStyle.import}\n\n${templateInterface(
		COMPONENT_NAME
	)}\nconst ${COMPONENT_NAME}: React.FC<${COMPONENT_NAME}Interface> = () => {${contentTemplate(
		templateStyle.etiqueta,
		COMPONENT_NAME,
		templateStyle.className
	)}\n${templateStyle.plus}`;
};
