import type { QuickPickItem } from 'vscode';

export type OptionsPick<T extends string> = Record<
	T,
	QuickPickItem & {
		value: T;
	}
>;
