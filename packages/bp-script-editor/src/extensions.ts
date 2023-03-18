import { autocompletion } from '@codemirror/autocomplete';
import { javascriptLanguage } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

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
}: {
  keywords?: string[];
  completions: any;
  placeholderThemes: any;
  mode: string;
  functions: any;
}) => {

  return [
    baseTheme,
    placeholdersPlugin(placeholderThemes, mode),
    EditorView.lineWrapping,
    javascriptLanguage,
    autocompletion({
      override: [
        customCompletions(completions)
      ]
    }),
    keywordsPlugin(keywords),
    functionPlugin(functions),
  ];
}

