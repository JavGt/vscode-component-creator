import { showMessageCancel } from './ShowMessageCancel';
import { commands, window } from 'vscode';
import { comandoCreateComponent, messageCancel } from '../constants/constants';

export const finishProcess: (message?: string, retry?: boolean) => never = (
	message = messageCancel,
	retry = true
) => {
	showMessageCancel(message);

	window
		.showErrorMessage(message, retry ? 'Retry' : '')
		.then(
			selection =>
				selection === 'Retry' && commands.executeCommand(comandoCreateComponent)
		);

	throw new Error(`Process canceled: message ${message}`);
};
