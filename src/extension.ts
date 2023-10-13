import { ExtensionContext, commands } from 'vscode';
import { command } from './constants/commands';
import { deleteCacheFn, createComponentFn, createPageFn } from './commands';

export const activate = async (ctx: ExtensionContext) => {
  const createComponentCommand = commands.registerCommand(
    command.createComponent,
    async (args) => createComponentFn(ctx, args)
  );

  const deleteCacheCommand = commands.registerCommand(
    command.deleteCache,
    async (args) => deleteCacheFn(ctx)
  );

  const createPageCommand = commands.registerCommand(
    command.createPage,
    async (args) => createPageFn(ctx, args)
  );

  ctx.subscriptions.push(
    createComponentCommand,
    deleteCacheCommand,
    createPageCommand
  );
};

export const deactivate = () => {};
