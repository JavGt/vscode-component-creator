import { LANGUAGE_OPTIONS } from '../constants';
import { STYLE_EXTENSIONS, STYLE_OPTIONS } from '../constants/style';

export type LanguageType = keyof typeof LANGUAGE_OPTIONS;

export type StyleType = keyof typeof STYLE_OPTIONS;

export type ExtensionStyle = keyof typeof STYLE_EXTENSIONS;
export type Extras = 'stories' | 'test';

export type TypePage = 'folder' | 'file';

export type TypeFolder = 'pages' | 'app';

export type Platform = 'web' | 'native';

export type SettingsWorkspace = {
  importReact: boolean;
  defaultRoute: string;
  lenguaje: LanguageType | 'to ask';
  typeStyle: StyleType | 'to ask';
  extensionStyle: ExtensionStyle | 'to ask';
  createTypes: boolean;
  createBarrel: boolean;
  recommendedRoutes: string[];
  experimentalStorybook: boolean;
  interfaceType: 'type' | 'interface';
  styledComponentsLibrary: 'styled-components' | 'emotion';
  selectedExtras: Extras[];
  askExtras: boolean;
  pageType: TypePage | 'to ask';
  platform: Platform | 'to ask';
};
