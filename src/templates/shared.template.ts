import { getWorkspaceSettings } from '../helpers';

export const contentTemplate = (
  etiqueta: string,
  nameComponent: string,
  className: string
) => {
  const isAddTest = getWorkspaceSettings('selectedExtras').includes('test');

  return `\treturn <${etiqueta}${className}${
    isAddTest ? ` data-testid="${nameComponent}"` : ''
  }>${nameComponent}</${etiqueta}>;\n`;
};

export const importReact = () => {
  const importReact = getWorkspaceSettings('importReact');

  if (!importReact) return '';

  return `import React from 'react';`;
};

export const propTypes = (nameComponent: string) => {
  const createTypes = getWorkspaceSettings('createTypes');

  return {
    import: createTypes ? `import PropTypes from 'prop-types';` : '',
    plus: createTypes ? `${nameComponent}.propTypes = {};` : '',
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
