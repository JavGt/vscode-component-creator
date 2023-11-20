import { ExtensionContext, window } from 'vscode';
import {
	selectLanguage,
	getNameComponent,
	selectStyleType,
	selectStyleLanguage,
} from '../inputs';
import { selectExtras } from '../inputs/selectExtras';
import { ComponentWeb } from '../class/ComponentWeb';
import { typeStyleOptions } from '../constants';

export const createComponentWeb = async (
	ctx: ExtensionContext,
	path: string,
) => {
	const component = new ComponentWeb(ctx, path);

	component.extras = await selectExtras();

	component.language = await selectLanguage();

	component.typeStyle = await selectStyleType();

	console.log(component.typeStyle);

	component.styleSheet =
		component.typeStyle === typeStyleOptions.component.value ||
		component.typeStyle === typeStyleOptions.none.value
			? typeStyleOptions.none.value
			: await selectStyleLanguage();
	// Pregunta por el nombre del componente

	component.name = await getNameComponent();

	await component.build();

	// window.showInformationMessage(
	// 	`Component ${component.name.capitalize} created. ⚛`,
	// );
};
