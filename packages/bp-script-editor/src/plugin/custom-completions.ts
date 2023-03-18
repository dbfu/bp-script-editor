import { snippetCompletion } from '@codemirror/autocomplete';

export function customCompletions(completions: any) {
  return (context: any) => {
    let word = context.matchBefore(/\w*/);
    if (word.from == word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: completions?.map((item: any) => (
        snippetCompletion(item.template, {
          label: item.name,
          detail: item.detail,
          type: item.type,
        })
      )) || [],
    };
  }
}