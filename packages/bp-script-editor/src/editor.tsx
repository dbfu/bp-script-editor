import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  ForwardRefRenderFunction,
  useMemo,
} from 'react';
import { githubLight } from '@uiw/codemirror-theme-github';
import ReactCodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { snippet } from '@codemirror/autocomplete';

import { extensions } from './extensions';
import { CommonPlaceholderThemesType, CompletionsType, FunctionType } from './interface';

export interface EditorPropTypes {
  completions: CompletionsType[];
  keywords?: string[];
  onValueChange?: (value: string) => void;
  placeholderThemes: CommonPlaceholderThemesType;
  mode: string;
  functions: FunctionType[];
}

export interface ScriptEditorRef {
  insertText?: (text: string, isTemplate: boolean) => void;
}

const Editor: ForwardRefRenderFunction<ScriptEditorRef, EditorPropTypes> = (
  { completions, onValueChange, keywords, placeholderThemes, mode, functions },
  ref,
) => {
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  const insertText = (text: string, isTemplate?: boolean) => {
    const { view } = editorRef.current!;
    if (!view) return;

    const { state } = view;
    if (!state) return;

    const [range] = state?.selection?.ranges || [];

    view.focus();

    if (isTemplate) {
      snippet(text)(
        {
          state,
          dispatch: view.dispatch,
        },
        {
          label: text,
          detail: text,
        },
        range.from,
        range.to
      );
    } else {
      view.dispatch({
        changes: {
          from: range.from,
          to: range.to,
          insert: text,
        },
        selection: {
          anchor: range.from + text.length
        },
      });
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        insertText,
      };
    },
    []
  );
  const extensionsMemo = useMemo(
    () =>
      extensions({
        completions,
        keywords,
        placeholderThemes,
        mode,
        functions,
      }),
    [completions, keywords, placeholderThemes, mode, functions]
  );

  const onChangeHandle = useCallback(
    (value: string) => {
      onValueChange && onValueChange(value);
    },
    [onValueChange]
  );

  return (
    <ReactCodeMirror
      height="100vh"
      width="100%"
      extensions={extensionsMemo}
      theme={githubLight}
      onChange={onChangeHandle}
      ref={editorRef}
    />
  );
}

export default forwardRef<ScriptEditorRef, EditorPropTypes>(Editor);
