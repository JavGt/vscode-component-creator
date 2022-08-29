const templateBarrel = (COMPONENT_NAME, COMPONENT_NAME_FILE) => {
	return `export { default as ${COMPONENT_NAME} } from './${COMPONENT_NAME_FILE}';`;
};

module.exports = {
	templateBarrel,
};
