import {
  Decoration,
  ViewPlugin,
  MatchDecorator,
  EditorView,
  ViewUpdate,
  DecorationSet,
} from '@codemirror/view';

export const keywordsPlugin = (
  keywords: string[] = [],
  keywordsColor?: string,
  keywordsClassName?: string,
) => {

  const regexp = new RegExp(keywords.join('|'), 'g');

  const keywordsMatcher = new MatchDecorator({
    regexp,
    decoration: (match, view, pos) => {
      const lineText = view.state.doc.lineAt(pos).text;
      const [matchText] = match;

      // 如果当前匹配字段后面一位有值且不是空格的时候，这种情况不能算匹配到，不做处理
      if (lineText?.[pos + matchText.length] && lineText?.[pos + matchText.length] !== ' ') {
        return Decoration.mark({});
      }

      // 如果当前匹配字段前面一位有值且不是空格的时候，这种情况不能算匹配到，不做处理
      if (lineText?.[pos - 1] && lineText?.[pos - 1] !== ' ') {
        return Decoration.mark({});
      }

      let style: string;

      if (keywordsColor) {
        style = `color: ${keywordsColor};`;
      }

      return Decoration.mark({
        attributes: {
          style,
        },
        class: keywordsClassName,
      });
    },
  });

  return ViewPlugin.fromClass(
    class {
      keywords: DecorationSet;
      constructor(view: EditorView) {
        this.keywords = keywordsMatcher.createDeco(view);
      }
      update(update: ViewUpdate) {
        this.keywords = keywordsMatcher.updateDeco(
          update,
          this.keywords
        );
      }
    },
    {
      decorations: (instance: any) => {
        return instance.keywords;
      }
    }
  );
}


