/**
 * @deprecated
 */
export const COMMANDS_V1 = Object.freeze({
  deleteCache: 'Create-component-React:delete-cache',
  createComponent: 'Create-component',
});

export const SUFFIX = 'RCC';

export const command = Object.freeze({
  createComponent: `${SUFFIX}:create-component`,
  createPage: `${SUFFIX}:create-page`,
  deleteCache: `${SUFFIX}:delete-cache`,
});
