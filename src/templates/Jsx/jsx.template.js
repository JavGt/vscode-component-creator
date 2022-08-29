const { contentTemplate, importReact } = require('./sharedTemplate');

const templateJsx = (COMPONENT_NAME, templateStyle) => {
	return `${importReact()}${
		templateStyle.import
	}\n\nconst ${COMPONENT_NAME} = () => {${contentTemplate(
		templateStyle.etiqueta,
		COMPONENT_NAME,
		templateStyle.className
	)}\n${templateStyle.plus}`;
};

module.exports = {
	templateJsx,
};
