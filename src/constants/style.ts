export const STYLE_OPTIONS = {
	traditional: {
		label: 'Style Traditional',
		detail: 'import "./style.css;',
		value: 'traditional',
	},
	module: {
		label: 'Style Module',
		detail: 'import styles from "./style.module.css;"',
		value: 'module',
	},
	component: {
		label: 'Style Component',
		detail: 'import styled from "[styled-components | @emotion/styled]";',
		value: 'component',
	},
	none: {
		label: 'None',
		detail: 'Create a component without style',
		value: 'none',
	},
};
