import type { Language, NameComponent } from '../types';
import { ExtensionContext, window } from 'vscode';
import { createBarrer, createComponentNt, createFolder } from '../creators';
import { createStyleSheetNative } from '../creators/createStyleSheetNative';
import { getWorkspaceSettings } from '../helpers';

export class ComponentNative {
	private _folderPath: string | undefined;

	private set folderPath(value: string | undefined) {
		this._folderPath = value;
	}

	private _name: NameComponent | undefined;

	public set name(value: NameComponent) {
		this._name = value;
	}

	private _language: Language | undefined;

	public set language(value: Language) {
		this._language = value;
	}

	constructor(
		public readonly ctx: ExtensionContext,
		public readonly path: string,
	) {}

	async build(): Promise<void> {
		await this.buildFolder();

		await Promise.all([
			this.buildBarrer(),
			this.buildStyleSheets(),
			this.buildComponent(),
		]);

		window.showInformationMessage(
			`Component ${this._name?.capitalize} created. ⚛`,
		);
	}

	private async buildFolder(): Promise<void> {
		this.folderPath = await createFolder(this.path, this._name!);
	}

	private buildStyleSheets() {
		const styleSheet = getWorkspaceSettings('native', 'styleSheet');

		const isBoolean = typeof styleSheet === 'boolean';

		if (isBoolean) return;

		createStyleSheetNative(this._name!, this._folderPath!, this._language!);
	}
	private buildBarrer() {
		createBarrer(this._name!, this._folderPath!, this._language!);
	}

	private async buildComponent(): Promise<void> {
		await createComponentNt(this._name!, this._folderPath!, this._language!);
	}
}
