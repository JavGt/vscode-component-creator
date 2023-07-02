import { TemplateStyleInterface } from '../helpers/checkStyle';
import {
	contentTemplate,
	importPropTypes,
	importReact,
	typeFunction,
} from './shared.template';

export const templateJsx = (
	nameComponent: string,
	templateStyle: TemplateStyleInterface
) => {
	const importLib = importReact();
	const { import: isImportPropTypes, plus: plusImportPropTypes } =
		importPropTypes(nameComponent);

	const imports = [importLib, templateStyle.import, isImportPropTypes]
		.filter(Boolean)
		.join('\n')
		.trim();

	const plus = [templateStyle.plus, plusImportPropTypes].filter(Boolean).join('\n\n');

	const { initial, end } = typeFunction();

	return `${imports}${
		imports ? '\n\n' : ''
	}${initial}${nameComponent}${end}${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className
	)}};\n\n${plus}${plus ? '\n\n' : ''}export default ${nameComponent};`;
};
