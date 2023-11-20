import { ExtensionContext } from 'vscode';

export type FunctionFlow = (ctx: ExtensionContext, args: any) => Promise<void>;
