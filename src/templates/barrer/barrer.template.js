const plantillaBarrer = ({ componentName }) => {
	return `export { default as ${componentName} } from './${componentName}';`;
};

module.exports = { plantillaBarrer };
