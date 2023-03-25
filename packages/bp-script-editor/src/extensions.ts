import { autocompletion } from '@codemirror/autocomplete';
import { EditorView } from '@codemirror/view';
import { CompletionsType, FunctionType, HintPathType, PlaceholderThemesType } from './interface';

import { baseTheme } from './plugin/base-theme';
import { customCompletions } from './plugin/custom-completions';
import { functionPlugin } from './plugin/functions';
import { keywordsPlugin } from './plugin/keywords';
import { placeholdersPlugin } from './plugin/placeholders';
import { hintPlugin } from './plugin/hint'

export const extensions = ({
  completions,
  keywords,
  placeholderThemes,
  mode,
  functions,
  keywordsColor,
  keywordsClassName,
  hintPaths,
}: {
  keywords?: string[];
  completions: CompletionsType[];
  placeholderThemes: PlaceholderThemesType;
  mode: string;
  functions: FunctionType[];
  keywordsColor?: string;
  keywordsClassName?: string;
  hintPaths?: HintPathType[];
}): any[] => {
  return [
    keywords.length ? keywordsPlugin(keywords, keywordsColor, keywordsClassName) : null,
    baseTheme,
    placeholdersPlugin(placeholderThemes, mode),
    EditorView.lineWrapping,
    autocompletion({
      override: [
        customCompletions(completions),
        hintPaths?.length ? hintPlugin(hintPaths) : null,
      ].filter(o => !!o)
    }),
    functionPlugin(functions),
  ].filter(o => !!o);
}

