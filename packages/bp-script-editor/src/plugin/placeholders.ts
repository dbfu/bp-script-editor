import { ViewUpdate } from '@codemirror/view';
import { DecorationSet } from '@codemirror/view';
import {
  Decoration,
  ViewPlugin,
  MatchDecorator,
  EditorView,
  WidgetType,
} from '@codemirror/view';

import { PlaceholderThemesType } from '../interface';

export const placeholdersPlugin = (themes: PlaceholderThemesType, mode: string = 'name') => {

  class PlaceholderWidget extends WidgetType {
    curFlag: string;
    text: string;

    constructor(text: string) {
      super();
      if (text) {
        const [curFlag, ...texts] = text.split('.');
        if (curFlag && texts.length) {
          this.text = texts.map(t => t.split(':')[mode === 'code' ? 1 : 0]).join('.');
          this.curFlag = curFlag;
        }
      }
    }

    eq(other: PlaceholderWidget) {
      return this.text == other.text;
    }

    toDOM() {
      let elt = document.createElement('span');
      if (!this.text) return elt;

      const { backgroudColor, borderColor, textColor } = themes[this.curFlag];
      elt.style.cssText = `
      border: 1px solid ${borderColor};
      border-radius: 4px;
      line-height: 20px;
      background: ${backgroudColor};
      color: ${textColor};
      font-size: 12px;
      padding: 2px 7px;
      user-select: none;
      `;
      elt.textContent = this.text;
      return elt;
    }
    ignoreEvent() {
      return true;
    }
  }

  const placeholderMatcher = new MatchDecorator({
    regexp: /\[\[(.+?)\]\]/g,
    decoration: (match) => {
      return Decoration.replace({
        widget: new PlaceholderWidget(match[1]),
      });
    },
  });

  return ViewPlugin.fromClass(
    class {
      placeholders: DecorationSet;
      constructor(view: EditorView) {
        this.placeholders = placeholderMatcher.createDeco(view);
      }
      update(update: ViewUpdate) {
        this.placeholders = placeholderMatcher.updateDeco(
          update,
          this.placeholders
        );
      }
    },
    {
      decorations: (instance: any) => {
        return instance.placeholders;
      },
      provide: (plugin: any) =>
        EditorView.atomicRanges.of((view: any) => {
          return view.plugin(plugin)?.placeholders || Decoration.none;
        }),
    }
  );
}




