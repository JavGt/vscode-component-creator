import { getWorkspaceSettings } from '../helpers';

export const contentTemplate = (
  etiqueta: string,
  nameComponent: string,
  className: string
) => {
  const extra = getWorkspaceSettings('selectedExtras');
  return `\treturn <${etiqueta}${className}${
    extra.includes('test') ? ` data-testid="${nameComponent}"` : ''
  }>${nameComponent}</${etiqueta}>;\n`;
};

export const importReact = () => {
  const importReact = getWorkspaceSettings('importReact');

  if (!importReact) return '';

  return `import React from 'react';`;
};

export const importPropTypes = (nameComponent: string) => {
  const importPropTypes = getWorkspaceSettings('importPropTypes');

  return {
    import: importPropTypes ? `import PropTypes from 'prop-types';` : '',
    plus: importPropTypes ? `${nameComponent}.propTypes = {};` : '',
  };
};

export const typeFunction = () => {
  const initial = 'const ';
  const end = ' = ({}) => {' + '\n';

  return {
    initial,
    end,
  };
};
