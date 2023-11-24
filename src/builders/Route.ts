import {
	type ExtensionContext,
	type QuickPickItem,
	type WorkspaceFolder,
	QuickPickItemKind,
	window,
} from 'vscode';
import type { HistoryState } from '../types';
import { pickWorkspace } from '../inputs';
import { finishProcess, getWorkspaceSettings } from '../helpers';
import { join, basename } from 'path';
import { statSync } from 'fs';
import { access, readdir } from 'fs/promises';
import { getPath } from '../inputs/getPath';
import { regexFolders, workspaceState } from '../constants';

export class Route {
	private readonly pick = window.createQuickPick();
	private workspaceFolder: WorkspaceFolder | undefined;
	private readonly workspace = workspaceState.history;
	private readonly itemsAccompaniment: QuickPickItem[];
	private _path: string = '';

	private set path(path: string) {
		this._path = path;
	}
	public get path(): string {
		return this._path;
	}

	constructor(
		private readonly ctx: ExtensionContext,
		/**
		 * NOTE: el tipo es dado como any porque no hay typing, si estoy en un error puedes crear un issue en el repositorio
		 * NOTE: the type is given as any because there is no typing, if I am in an error you can create an issue in the repository
		 * @see https://github.com/JavGt/vscode-component-creator/issues/new
		 */
		public readonly args: any,
	) {
		this.itemsAccompaniment = this.getItemsAccompaniment();
	}

	/**
	 * Inicia el proceso de creación de un componente
	 * Start the process of creating a component
	 */
	public async bootstrap(): Promise<void> {
		await this.verifyArgs(async () => {
			await this.getWorkspaceFolder();

			await this.pickRoute();
		});
	}

	/**
	 * Verifica si se pasaron argumentos
	 * Check if arguments were passed
	 */
	private async verifyArgs(callback: () => Promise<void>): Promise<void> {
		if (!this.args) return await callback();

		const folder = basename(this.args.path);

		this.setHistory(folder);

		this.path = join(this.args.fsPath);
	}

	/**
	 * Obtiene la carpeta de trabajo
	 * Get the workspace folder
	 */
	private async getWorkspaceFolder(): Promise<void> {
		this.workspaceFolder = await pickWorkspace();
	}

	/**
	 * Muestra un input para seleccionar la ruta
	 * Show an input to select the route
	 */
	private async pickRoute(): Promise<string> {
		await this.getRoutes();

		return new Promise((resolve) => {
			const { pick } = this;

			pick.show();
			pick.ignoreFocusOut = true;
			pick.placeholder = 'Base url /';
			pick.title = 'Select a path or search (To finish it must end with /)';

			pick.onDidChangeValue(async (value) => {
				if (!value) {
					await this.getRoutes();
				}

				if (value.endsWith('/')) {
					await this.getRoutes(value);
				}
			});

			pick.onDidHide(() => {
				if (!pick.selectedItems.length) {
					return finishProcess();
				}
			});

			pick.onDidAccept(async () => {
				let value = pick.selectedItems[0].label;

				if (value === 'New folder') {
					value = await getPath();
				}

				this.setHistory(value);
				this.path = join(this.workspaceFolder?.uri.fsPath ?? '', value);
				resolve(value);
			});
		});
	}

	/**
	 * Obtiene las rutas
	 * Get routes
	 */
	private async getRoutes(value: string = '') {
		const { pick } = this;
		pick.busy = true;

		const path = join(this.workspaceFolder?.uri.fsPath ?? '', value);

		try {
			// Verifica si existe el path
			await access(path);
		} catch (error) {
			// Si no existe el path, muestra un mensaje de error y limpia el input
			pick.value = '';
			window.showErrorMessage('The path does not exist.');
		}

		const files = await readdir(path);

		const folders = files.filter((file) => {
			// Verifica si es una carpeta
			if (!statSync(join(path, file)).isDirectory()) return false;

			// Verifica si es una carpeta oculta o node_modules
			if (regexFolders.test(file)) return file;
		});

		pick.busy = false;

		const itemsAccompaniment = !value ? this.itemsAccompaniment : [];

		const items: QuickPickItem[] = folders.map((folder) => ({
			label: value + folder,
			description: 'Your folder. 📁',
		}));

		pick.items = items.concat(itemsAccompaniment);
	}

	/**
	 * Guarda el historial de rutas
	 * Save the route history
	 */
	public setHistory(route: string): void {
		const isDisable = getWorkspaceSettings('root', 'disableHistory');

		if (isDisable) return;

		const storage = this.ctx.workspaceState.get<HistoryState[]>(
			this.workspace.key,
			this.workspace.default,
		);

		this.ctx.workspaceState.update(this.workspace.key, [
			{
				label: route,
				time: Date.now(),
			},
			...storage
				.filter(({ label }: QuickPickItem) => label !== route)
				.splice(0, 9),
		]);
	}

	/**
	 * Obtiene los items de acompañamiento
	 * get the items of accompaniment
	 */
	private getItemsAccompaniment(): QuickPickItem[] {
		const quickSuggestions = this.getQuickSuggestions();
		const itemsExtra = this.getExtraOptions();
		const history = this.getHistory();

		return quickSuggestions.concat(itemsExtra, history);
	}

	/**
	 * Obtiene el historial
	 * get history
	 */
	private getHistory(): QuickPickItem[] {
		const isDisable = getWorkspaceSettings('root', 'disableHistory');

		if (isDisable) return [];

		const storage = this.ctx.workspaceState.get<HistoryState[]>(
			this.workspace.key,
			this.workspace.default,
		);

		const history = storage.map((route) => ({
			label: route.label,
			detail: new Date(route.time).toLocaleString(),
		}));

		return [
			{
				label: `Recently used (${storage.length}) 🕛`,
				description: 'folder',
				kind: QuickPickItemKind.Separator,
			},
			...history,
		];
	}

	/**
	 * Obtiene las opciones extra
	 * get extra options
	 */
	private getExtraOptions(): QuickPickItem[] {
		return [
			{
				label: 'Extras',
				description: 'folder',
				kind: QuickPickItemKind.Separator,
			},
			{
				label: 'New folder',
				detail: 'Create a new folder. 📁 ',
			},
		];
	}

	/**
	 * Obtiene las sugerencias rápidas
	 * get quick suggestions
	 */
	private getQuickSuggestions(): QuickPickItem[] {
		const isDisable = getWorkspaceSettings('root', 'disableQuickSuggestions');

		if (isDisable) return [];

		const quickSuggestions = getWorkspaceSettings('root', 'quickSuggestions');

		return [
			{
				label: 'Quick access 🚀',
				description: 'folder',
				kind: QuickPickItemKind.Separator,
			},
			...quickSuggestions.map((label) => ({
				label,
			})),
		];
	}
}
