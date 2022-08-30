const { STRUCTURE_OPTIONS, EXTENSION_OPTIONS } = require('../../constants');
const { templateJsx } = require('../../templates/Jsx/jsx.template');
const { templateTsx } = require('../../templates/Jsx/tsx.template');

const checkExtension = COMPONENT_STRUCTURE => {
	const isTs = COMPONENT_STRUCTURE === STRUCTURE_OPTIONS.ts;

	return {
		extension: isTs ? EXTENSION_OPTIONS.ts : EXTENSION_OPTIONS.js,
		template: isTs ? templateTsx : templateJsx,
	};
};

module.exports = {
	checkExtension,
};
