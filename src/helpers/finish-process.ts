import { commands, window } from 'vscode';
import { command, messageCancel } from '../constants';

export const finishProcess: (message?: string, retry?: boolean) => never = (
	message = messageCancel,
	retry = true
) => {
	window
		.showErrorMessage(message, retry ? 'Retry' : '')
		.then(
			selection =>
				selection === 'Retry' && commands.executeCommand(command.createComponent)
		);

	throw new Error(`Process canceled: message ${message}`);
};
