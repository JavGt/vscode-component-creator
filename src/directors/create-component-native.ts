import { ExtensionContext, window } from 'vscode';
import { getNameComponent, pickLanguage } from '../inputs';
import { ComponentNative } from '../builders/ComponentNative';

export const createComponentNative = async (
	ctx: ExtensionContext,
	path: string,
) => {
	const component = new ComponentNative(ctx, path);

	component.language = await pickLanguage();

	component.name = await getNameComponent();

	await component.build();
};
