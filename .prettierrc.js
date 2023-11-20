/**
 * Prettier configuration
 * @see https://prettier.io/docs/en/options.html
 */
const config = {
	jsxSingleQuote: false, // comillas simples en jsx
	quoteProps: 'as-needed', // poner comillas a las propiedades de los objetos solo si es necesario
	endOfLine: 'auto', // mantener el formato de fin de linea
	printWidth: 80, // cantidad de caracteres por linea
	semi: true, // poner punto y coma al final de cada linea
	useTabs: true, // usar tabs
	arrowParens: 'always', // poner parentesis en las arrow functions
	bracketSameLine: false, // No poner llaves en la misma linea ejm: { return true; }
	bracketSpacing: true, // poner espacios entre llaves
	singleQuote: true, // comillas simples
	trailingComma: 'all', // poner comas al final de cada objeto o array
};

module.exports = config;
