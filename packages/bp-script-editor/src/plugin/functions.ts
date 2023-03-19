import { DecorationSet } from '@codemirror/view';
import { ViewUpdate } from '@codemirror/view';
import { EditorView, WidgetType } from '@codemirror/view';
import {
  Decoration,
  ViewPlugin,
  MatchDecorator,
} from '@codemirror/view';
import { FunctionType } from '../interface';


export const functionPlugin = (functions: FunctionType[]) => {
  class FunctionWidget extends WidgetType {
    text: string;

    constructor(text: string) {
      super();
      this.text = text;
    }

    eq(other: FunctionWidget) {
      return this.text == other.text;
    }

    toDOM() {
      const elt = document.createElement('span');
      elt.style.cssText = `
      color: #d73a49;
      font-size: 14px;
      `;
      elt.textContent = this.text;

      const span = document.createElement('span');
      span.style.cssText = 'color: #6a737d;';
      span.textContent = "(";
      elt.appendChild(span);
      return elt;
    }
    ignoreEvent() {
      return true;
    }
  }

  const functionMatcher = new MatchDecorator({
    regexp: /func\.(.+?)\(/g,
    decoration: (match) => {
      const funcName = match[1];
      if (functions.some(o => o.label === funcName)) {
        return Decoration.replace({
          widget: new FunctionWidget(`${funcName}`),
        });
      }
      return null;
    },
  });

  return ViewPlugin.fromClass(
    class {
      function: DecorationSet;
      constructor(view: EditorView) {
        this.function = functionMatcher.createDeco(view);
      }
      update(update: ViewUpdate) {
        this.function = functionMatcher.updateDeco(
          update,
          this.function
        );
      }
    },
    {
      decorations: (instance: any) => {
        return instance.function;
      },
      provide: (plugin: ViewPlugin<any>) =>
        EditorView.atomicRanges.of((view) => {
          return view.plugin(plugin)?.function || Decoration.none;
        }),
    }
  );
}

