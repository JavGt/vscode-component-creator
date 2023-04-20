import { window, commands } from 'vscode';
import { comandoCreateComponent, messageCancel, textRetry } from '../constants';

export const showMessageCancel = (message: string = messageCancel) =>
	window
		.showErrorMessage(message, textRetry)
		.then(selection => selection === textRetry && CommCreateComponent());

export const CommCreateComponent = () => commands.executeCommand(comandoCreateComponent);
