import { window, commands } from 'vscode';
import { comandoCreateComponent, messageCancel, textRetry } from '../constants';

export const showMessageCancel = () =>
	window
		.showErrorMessage(messageCancel, textRetry)
		.then(selection => selection === textRetry && CommCreateComponent());

export const CommCreateComponent = () => commands.executeCommand(comandoCreateComponent);
