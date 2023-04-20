import { window } from 'vscode';
import { NOT_CONFIGURED, STYLE_OPTIONS } from '../constants';
import { StyleType, getWorkspaceSettings } from '../helpers';
import { finishProcess } from '../helpers/finish-process';

export const getStyleType = async (): Promise<StyleType> => {
	const styleType = getWorkspaceSettings('SelectTypeStyle');

	if (styleType !== NOT_CONFIGURED) {
		return styleType;
	}
	return (await window
		.showQuickPick(
			[
				{
					label: 'Style Traditional',
					detail: 'import "./style.css;',
					value: 'Style Traditional',
				},
				{
					label: 'Style Module',
					description: 'Recommended',
					detail: 'import styles from "./style.module.css;"',
					value: 'Style Module',
				},
				{
					label: 'Style Component',
					detail: 'import styled from "styled-components";',
					value: 'Style Component',
				},
				{
					label: 'None',
					detail: 'Create a component without style',
					value: 'Not Style',
				},
			],
			{
				placeHolder: 'Select the type of design that your component will have.',
				title: 'Style type',
				ignoreFocusOut: true,
			}
		)
		.then(style => style?.value ?? finishProcess())) as StyleType;
};
