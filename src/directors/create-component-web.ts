import { ExtensionContext, window } from 'vscode';
import {
	pickLanguage,
	getNameComponent,
	pickTypeStyle,
	pickStyleSheet,
} from '../inputs';
import { pickExtras } from '../inputs/pickExtras';
import { ComponentWeb } from '../builders/ComponentWeb';
import { typeStyleOptions } from '../constants';

export const createComponentWeb = async (
	ctx: ExtensionContext,
	path: string,
) => {
	const component = new ComponentWeb(ctx, path);

	component.extras = await pickExtras();

	component.language = await pickLanguage();

	component.typeStyle = await pickTypeStyle();

	component.styleSheet =
		component.typeStyle === typeStyleOptions.component.value ||
		component.typeStyle === typeStyleOptions.none.value
			? typeStyleOptions.none.value
			: await pickStyleSheet();

	component.name = await getNameComponent();

	await component.build();
};
