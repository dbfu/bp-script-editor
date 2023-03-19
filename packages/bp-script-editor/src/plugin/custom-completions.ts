import { snippetCompletion } from '@codemirror/autocomplete';
import { CompletionsType } from '../interface';

export function customCompletions(completions: CompletionsType[]) {
  return (context: any) => {
    let word = context.matchBefore(/\w*/);
    if (word.from == word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: completions?.map((item) => (
        snippetCompletion(item.template, {
          label: item.label,
          detail: item.detail,
          type: item.type,
        })
      )) || [],
    };
  }
}