import { access } from 'fs/promises';
import { finishProcess } from '../../helpers/finish-process';

export const verifyPath = async (
	path: string,
	message?: (path: string) => string,
): Promise<void> => {
	try {
		await access(path);

		finishProcess(message ? message(path) : `The path already exists`);
	} catch (error) {}
};
