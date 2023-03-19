import {
  EditorView,
} from '@codemirror/view';

export const baseTheme: any = EditorView.baseTheme({
  '&.cm-editor': {
    fontSize: '15px',
  },
  '&.cm-editor.cm-focused': {
    outline: 'none',
  },
  '&.cm-editor .cm-gutterElement': {
    lineHeight: '28px',
  },
  '&.cm-editor .cm-line': {
    lineHeight: '28px',
  },
  '&.cm-editor .ͼt .ͼs': {
    color: '#d73a49',
  },
});