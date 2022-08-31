import { workspace } from 'vscode';

export const GetSettings = () =>
	workspace.getConfiguration('reactCreateComponent.settings');
