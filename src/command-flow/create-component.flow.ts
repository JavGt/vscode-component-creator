import { type FunctionFlow } from '../types/function-flow.type';
import { createComponentWeb } from '../commands/create-component-web';
import { pickPlatform } from '../inputs/pickPlatform';
import { createComponentNative } from '../commands/create-component-native';
import { Route } from '../class';
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
		await createComponentNative(route.path);
		return;
	}
};
