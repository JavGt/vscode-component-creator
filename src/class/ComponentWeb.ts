import { type ExtensionContext } from 'vscode';
import type {
	Extras,
	Language,
	None,
	StyleSheet,
	TypeStyle,
	NameComponent,
} from '../types';
import { Component } from '../interface';
import { getNameComponent } from '../inputs';
import {
	createBarrer,
	createComponentWeb,
	createFolder,
	createStyles,
} from '../creators';
import { createStorybook, createTest } from '../creators';
import { EXTRAS, NONE } from '../constants';

export class ComponentWeb {
	private _folderPath: string | undefined;

	private set folderPath(value: string | undefined) {
		this._folderPath = value;
	}

	private _name: NameComponent | undefined;

	public set name(value: NameComponent) {
		this._name = value;
	}

	private _styleSheet: StyleSheet | undefined;

	public set styleSheet(value: StyleSheet | None) {
		this._styleSheet = value === NONE ? undefined : value;
	}

	private _language: Language | undefined;

	public set language(value: Language) {
		this._language = value;
	}
	private _extras: Array<Extras> = [];

	public set extras(value: Array<Extras>) {
		this._extras = value;
	}
	public _typeStyle: TypeStyle | None = NONE;

	public set typeStyle(value: TypeStyle | None) {
		this._typeStyle = value;
	}

	constructor(
		public readonly ctx: ExtensionContext,
		public readonly path: string,
	) {}

	public async build(): Promise<void> {
		await this.buildFolder();

		await Promise.all([
			this.buildBarrer(),
			this.buildStyle(),
			this.buildExtras(),
			this.buildComponent(),
		]);
	}

	private async buildComponent(): Promise<void> {
		await createComponentWeb(
			this._folderPath!,
			this._name!,
			this._language!,
			this._typeStyle,
			this._styleSheet!,
		);
	}

	private async buildStyle(): Promise<void> {
		if (this._typeStyle === NONE) return;

		await createStyles(
			this._folderPath!,
			this._name!,
			this._typeStyle,
			this._styleSheet!,
		);
	}

	async buildFolder(): Promise<void> {
		this.folderPath = await createFolder(this.path, this._name!);
	}

	private buildBarrer() {
		console.log('buildBarrer');
		console.log(this._name!, this._folderPath!, this._language!);
		console.log(this._name!, this._folderPath!, this._language!);
		createBarrer(this._name!, this._folderPath!, this._language!);
	}

	private async buildExtras(): Promise<void> {
		if (this._extras.includes(EXTRAS.STORIES))
			await createStorybook(this._folderPath!, this._name!, this._language!);

		if (this._extras.includes(EXTRAS.TEST))
			await createTest(this._folderPath!, this._name!, this._language!);
	}
}
