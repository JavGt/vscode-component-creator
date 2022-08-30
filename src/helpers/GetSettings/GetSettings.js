const vscode = require('vscode');

const GetSettings = () =>
	vscode.workspace.getConfiguration('reactCreateComponent.settings');

module.exports = {
	GetSettings,
};
