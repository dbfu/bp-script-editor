import { DecorationSet } from '@codemirror/view';
import { ViewUpdate } from '@codemirror/view';
import { EditorView } from '@codemirror/view';
import { WidgetType } from '@codemirror/view';
import {
  Decoration,
  ViewPlugin,
  MatchDecorator,
} from '@codemirror/view';

export const keywordsPlugin = (
  keywords: string[] = [],
  keywordsColor?: string,
  keywordsClassName?: string,
) => {

  const regexp = new RegExp(keywords.map(w => `${w}`).join('|'), 'g');

  class KeywordsWidget extends WidgetType {
    text: string;

    constructor(text: string) {
      super();
      this.text = text;
    }

    eq(other: KeywordsWidget) {
      return this.text == other.text;
    }

    toDOM() {
      let elt = document.createElement('span');
      const styles: string[] = [];
      if (keywordsColor) {
        styles.push(`color: ${keywordsColor}`);
      }
      elt.style.cssText = styles.join('\n');
      if (keywordsClassName) {
        elt.setAttribute('class', keywordsClassName);
      }
      elt.textContent = this.text;
      return elt;
    }
    ignoreEvent() {
      return true;
    }
  }

  const keywordsMatcher = new MatchDecorator({
    regexp,
    decoration: (match) => {
      return Decoration.replace({
        widget: new KeywordsWidget(match[0]),
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

