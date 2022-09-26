import { templateStyleInterface } from '../helpers/CheckStyle';
import { contentTemplate, importReact } from './shared.template';

export const templateJsx = (
	nameComponent: string,
	templateStyle: templateStyleInterface
) => {
	return `${importReact()}${
		templateStyle.import
	}\nconst ${nameComponent} = () => {\n${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className
	)}};\n${templateStyle.plus}\nexport default ${nameComponent};\n`;
};
