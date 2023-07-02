import { type ExtensionContext } from 'vscode';

const deleteCacheFn = async (ctx: ExtensionContext) => {
	ctx.workspaceState.update('routes', []);
};

export default deleteCacheFn;
