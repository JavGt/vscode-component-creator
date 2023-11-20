import type { FunctionFlow } from '../types';

export const deleteCacheFlow: FunctionFlow = async (ctx) => {
	ctx.workspaceState.update('history', []);
};
