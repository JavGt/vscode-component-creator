import { TemplateStyleInterface } from '../types';
import {
	contentTemplate,
	propTypes,
	importReact,
	typeFunction,
} from './shared.template';

export const templateJsx = (
	nameComponent: string,
	templateStyle: TemplateStyleInterface,
) => {
	const importLib = importReact();

	const { import: importPropTypes, plus: plusPropTypes } =
		propTypes(nameComponent);

	const imports = [importLib, templateStyle.import, importPropTypes]
		.filter(Boolean)
		.join('\n')
		.trim();

	const plus = [templateStyle.plus, plusPropTypes].filter(Boolean).join('\n\n').trim();

	const { initial, end } = typeFunction();

	return `${imports}${
		imports ? '\n\n' : ''
	}${initial}${nameComponent}${end}${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className,
	)}};\n\n${plus}${plus ? '\n\n' : ''}export default ${nameComponent};`;
};
