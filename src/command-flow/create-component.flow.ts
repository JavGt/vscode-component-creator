import { type FunctionFlow } from '../types/function-flow.type';
import { createComponentWeb } from '../directors/create-component-web';
import { pickPlatform } from '../inputs/pickPlatform';
import { createComponentNative } from '../directors/create-component-native';
import { Route } from '../builders';
import { PLATFORM } from '../constants';

export const createComponentFlow: FunctionFlow = async (ctx, args) => {
	const route = new Route(ctx, args);

	await route.bootstrap();

	const plataforma = await pickPlatform();

	if (plataforma === PLATFORM.WEB) {
		await createComponentWeb(ctx, route.path);
		return;
	}

	if (plataforma === PLATFORM.NATIVE) {
		await createComponentNative(ctx, route.path);
		return;
	}
};
