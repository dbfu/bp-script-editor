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
import { Extension } from '@codemirror/state';

import { extensions } from './extensions';
import { CompletionsType, FunctionType, HintPathType, PlaceholderThemesType, ScriptEditorRef } from './interface';

interface PropsType {
  completions: CompletionsType[];
  keywords?: string[];
  onValueChange?: (value: string) => void;
  placeholderThemes: PlaceholderThemesType;
  mode: string;
  functions: FunctionType[];
  height?: string;
  width?: string;
  keywordsClassName?: string;
  keywordsColor?: string;
  defaultValue?: string;
  hintPaths?: HintPathType[];
  extensions?: Extension[];
}

const Editor: ForwardRefRenderFunction<ScriptEditorRef, PropsType> = ({
  completions,
  onValueChange,
  keywords,
  placeholderThemes,
  mode,
  functions,
  height,
  width,
  keywordsColor,
  keywordsClassName,
  defaultValue,
  hintPaths,
  extensions: extensionsProps,
},
  ref,
) => {
  const editorRef = useRef<ReactCodeMirrorRef>(null);

  const insertText = useCallback((text: string, isTemplate?: boolean) => {
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
  }, []);

  const clearText = useCallback(() => {
    const { view } = editorRef.current;
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: '',
      },
      selection: {
        anchor: 0,
      },
    });
    view.focus();
  }, []);

  const setText = useCallback((text: string) => {
    const { view } = editorRef.current;
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: text,
      },
      selection: {
        anchor: text.length,
      },
    });
    view.focus();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        insertText,
        clearText,
        setText,
        originEditorRef: editorRef,
      };
    },
    [insertText, clearText, setText]
  );

  console.log(extensionsProps);
  const extensionsMemo = useMemo(
    () =>
      [
        ...extensions({
          completions,
          keywords,
          placeholderThemes,
          mode,
          functions,
          keywordsColor,
          keywordsClassName,
          hintPaths,
        }),
        ...(extensionsProps || [])
      ],
    [
      completions,
      keywords,
      placeholderThemes,
      mode,
      functions,
      keywordsColor,
      keywordsClassName,
      hintPaths,
      extensionsProps,
    ]
  );

  const onChangeHandle = useCallback(
    (value: string) => {
      onValueChange && onValueChange(value);
    },
    [onValueChange]
  );

  return (
    <ReactCodeMirror
      height={height}
      width={width}
      extensions={extensionsMemo}
      theme={githubLight}
      onChange={onChangeHandle}
      value={defaultValue}
      ref={editorRef}
    />
  );
}


export default forwardRef<ScriptEditorRef, PropsType>(Editor);
