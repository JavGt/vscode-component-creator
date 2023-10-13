import { access } from 'fs/promises';
import { finishProcess } from './finish-process';

export const checkPathExistence = async (
  path: string,
  message: (path: string) => string
): Promise<void> => {
  try {
    await access(path);
    finishProcess(message(path));
  } catch (error) {}
};
