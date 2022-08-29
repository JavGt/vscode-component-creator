const { window, commands } = require('vscode');
const { messageCancel } = require('../../constants');

const showMessageCancel = () =>
	window.showErrorMessage(messageCancel, 'Retry').then(selection => {
		if (selection === 'Retry') {
			commands.executeCommand('Create-component');
		}
	});

module.exports = {
	showMessageCancel,
};
