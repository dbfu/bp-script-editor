import { autocompletion } from '@codemirror/autocomplete';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { CommonPlaceholderThemesType, CompletionsType, FunctionType } from './interface';

import { baseTheme } from './plugin/base-theme';
import { customCompletions } from './plugin/custom-completions';
import { functionPlugin } from './plugin/functions';
import { keywordsPlugin } from './plugin/keywords';
import { placeholdersPlugin } from './plugin/placeholders';

export const extensions = ({
  completions,
  keywords,
  placeholderThemes,
  mode,
  functions,
  keywordsColor,
  keywordsClassName,
}: {
  keywords?: string[];
  completions: CompletionsType[];
  placeholderThemes: CommonPlaceholderThemesType;
  mode: string;
  functions: FunctionType[];
  keywordsColor?: string;
  keywordsClassName?: string;
}): any[] => {
  return [
    baseTheme,
    placeholdersPlugin(placeholderThemes, mode),
    EditorView.lineWrapping,
    javascriptLanguage,
    autocompletion({
      override: [
        customCompletions(completions),
        (context: any) => {
          const word = context.matchBefore(/\w*/);
          if (word.from == word.to && !context.explicit) return null;
          return {
            from: word.from,
            options: [],
          };
        }
      ]
    }),
    keywords.length ? keywordsPlugin(keywords, keywordsColor, keywordsClassName) : null,
    functionPlugin(functions),
  ].filter(o => !!o);
}

