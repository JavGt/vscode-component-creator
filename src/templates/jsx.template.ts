import type { TemplateStyleInterface } from '../types';
import { toSort } from '../utils/functions';
import {
	contentTemplate,
	propTypes,
	importReact,
	typeFunction,
	directive,
} from './shared.template';

export const templateJsx = (
	nameComponent: string,
	templateStyle: TemplateStyleInterface,
) => {
	const di = directive();
	const importLib = importReact();

	const { import: importPropTypes, plus: plusPropTypes } =
		propTypes(nameComponent);

	const imports = toSort([
		di,
		importLib,
		templateStyle.import,
		importPropTypes,
	]);

	const plus = toSort([templateStyle.plus, plusPropTypes]);

	const { initial, end } = typeFunction();

	return `${imports}${
		imports ? '\n\n' : ''
	}${initial}${nameComponent}${end}${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className,
	)}};\n\n${plus}${plus ? '\n\n' : ''}export default ${nameComponent};`;
};
