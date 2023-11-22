import { window } from 'vscode';
import { MESSAGE_ABORTED } from '../constants';

export const finishProcess = (message: string = MESSAGE_ABORTED): never => {
	const msg = `Process canceled: ${message}`;

	window.showErrorMessage(msg);

	throw new Error(msg);
};
