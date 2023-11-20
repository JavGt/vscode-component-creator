import { ExtensionContext } from 'vscode';
import { Language, NameComponent } from '../types';

export interface Component {
  name: NameComponent;
  language: Language;
  path: string;
  folderPath: string | undefined;
  ctx: ExtensionContext;

  buildFolder(): Promise<void>;
  buildComponent(): Promise<void>;
  build(): Promise<void>;
}
