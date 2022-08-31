export const templateBarrel = (COMPONENT_NAME: string, COMPONENT_NAME_FILE: string) =>
	`export { default as ${COMPONENT_NAME} } from './${COMPONENT_NAME_FILE}';`;
