import { templateStyleInterface } from '../helpers/CheckStyle';
import { contentTemplate, importReact } from './shared.template';

export const templateJsx = (
	COMPONENT_NAME: string,
	templateStyle: templateStyleInterface
) => {
	return `${importReact()}${
		templateStyle.import
	}\n\nconst ${COMPONENT_NAME} = () => {${contentTemplate(
		templateStyle.etiqueta,
		COMPONENT_NAME,
		templateStyle.className
	)}\n${templateStyle.plus}`;
};
