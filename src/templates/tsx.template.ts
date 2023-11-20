import type { TemplateStyleInterface } from '../types';
import { getWorkspaceSettings } from '../helpers';
import { toSort } from '../utils/functions';
import {
	contentTemplate,
	directive,
	importReact,
	typeFunction,
} from './shared.template';

export const templateInterface = (nameComponent: string) => {
	const createTypes = getWorkspaceSettings('root', 'createTypes');
	const interfaceType = getWorkspaceSettings('root', 'interfaceType');

	const type = createTypes
		? `export ${
				interfaceType === 'type'
					? `type ${nameComponent}Props =`
					: `interface ${nameComponent}Props`
		  } {\n}\n\n`
		: '';

	const assignation = createTypes ? `: React.FC<${nameComponent}Props> ` : '';

	return {
		type,
		assignation,
	};
};

export const templateTsx = (
	nameComponent: string,
	templateStyle: TemplateStyleInterface,
) => {
	const di = directive();

	const { type, assignation } = templateInterface(nameComponent);
	const importLib = importReact();

	const imports = toSort([di, importLib, templateStyle.import]);

	const plus = toSort([templateStyle.plus]);

	const { initial, end } = typeFunction();

	return `${imports}${
		imports ? '\n\n' : ''
	}${type}${initial}${nameComponent}${assignation}${end}${contentTemplate(
		templateStyle.etiqueta,
		nameComponent,
		templateStyle.className,
	)}};\n\n${plus}${plus ? '\n\n' : ''}export default ${nameComponent};\n`;
};
