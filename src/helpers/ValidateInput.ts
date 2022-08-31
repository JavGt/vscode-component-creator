export const validateInput = (value: string, alerta: string): string =>
	value.length === 0 ? 'Path is required' : '';
