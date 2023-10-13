import { getWorkspaceSettings, TemplateStyleInterface } from '../helpers';
import { contentTemplate, importReact, typeFunction } from './shared.template';

const templateInterface = (nameComponent: string) => {
  const createTypes = getWorkspaceSettings('createTypes');
  const interfaceType = getWorkspaceSettings('interfaceType');

  const type = createTypes
    ? `export ${
        interfaceType === 'type'
          ? `type ${nameComponent}Props =`
          : `interface ${nameComponent}Props`
      } {\n}\n\n`
    : '';

  const assignation = createTypes
    ? `: React.FC<${nameComponent}Props> `
    : '';

  return {
    type,
    assignation,
  };
};
export const templateTsx = (
  nameComponent: string,
  templateStyle: TemplateStyleInterface
) => {
  const { type, assignation } = templateInterface(nameComponent);
  const importLib = importReact();

  const imports = [importLib, templateStyle.import]
    .filter(Boolean)
    .join('\n')
    .trim();

  const plus = [templateStyle.plus].filter(Boolean).join('\n\n');
  const { initial, end } = typeFunction();

  return `${imports}${
    imports ? '\n\n' : ''
  }${type}${initial}${nameComponent}${assignation}${end}${contentTemplate(
    templateStyle.etiqueta,
    nameComponent,
    templateStyle.className
  )}};\n\n${plus}${plus ? '\n\n' : ''}export default ${nameComponent};\n`;
};
