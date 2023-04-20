import { TemplateStyleInterface } from '../helpers/CheckStyle';
import { contentTemplate, importReact } from './shared.template';

export const templateJsx = (
	nameComponent: string,
	templateStyle: TemplateStyleInterface
) => {
	return `${importReact()}${
		templateStyle.import
	}\nconst ${nameComponent} = () => {\n${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className
	)}};\n${templateStyle.plus}\nexport default ${nameComponent};\n`;
};
