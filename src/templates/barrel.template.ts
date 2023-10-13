export const templateBarrel = (nameComponent: string) =>
  `export { default as ${nameComponent} } from './${nameComponent}';`;
