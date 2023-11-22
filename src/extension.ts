import { type ExtensionContext, commands } from 'vscode';
import {
	createComponentFlow,
	createPageFlow,
	deleteCacheFlow,
} from './command-flow';
import { COMMAND } from './constants';
import { addQuickSuggestionFlow } from './command-flow/add-quick-suggestion.flow';

//Función que se ejecuta al activar la extension
export const activate = async (ctx: ExtensionContext) => {
	const createComponentCommand = commands.registerCommand(
		COMMAND.CREATE_COMPONENT,
		async (args) => createComponentFlow(ctx, args),
	);

	const createPageCommand = commands.registerCommand(
		COMMAND.CREATE_PAGE,
		async (args) => createPageFlow(ctx, args),
	);

	const deleteCacheCommand = commands.registerCommand(
		COMMAND.DELETE_CACHE,
		async (args) => deleteCacheFlow(ctx, args),
	);

	const addQuickSuggestionCommand = commands.registerCommand(
		COMMAND.ADD_QUICK_SUGGESTION,
		async (args) => addQuickSuggestionFlow(ctx, args),
	);

	ctx.subscriptions.push(
		createComponentCommand,
		deleteCacheCommand,
		createPageCommand,
		addQuickSuggestionCommand,
	);
};

//Función que se ejecuta al desactivar la extension
export const deactivate = () => {
	console.log('RCC: the extension has been deactivated');
};
