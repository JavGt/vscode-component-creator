const { contentTemplate, importReact } = require('./sharedTemplate');

const templateInterface = COMPONENT_NAME => {
	return `export interface ${COMPONENT_NAME}Interface {}\n`;
};

const templateTsx = (COMPONENT_NAME, templateStyle) => {
	return `${importReact()}${templateStyle.import}\n\n${templateInterface(
		COMPONENT_NAME
	)}\nconst ${COMPONENT_NAME}: React.FC<${COMPONENT_NAME}Interface> = () => {${contentTemplate(
		templateStyle.etiqueta,
		COMPONENT_NAME,
		templateStyle.className
	)}\n${templateStyle.plus}`;
};

module.exports = {
	templateTsx,
};
