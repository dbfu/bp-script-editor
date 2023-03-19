export interface CompletionsType {
  template: string;
  label: string;
  detail: string;
  type: string;
}

export interface FunctionType extends CompletionsType {
  handle: any;
}

export interface CommonPlaceholderTheme {
  textColor: string;
  backgroudColor: string;
  borderColor: string;
}

export interface CommonPlaceholderThemesType {
  [k: string]: CommonPlaceholderTheme;
}

