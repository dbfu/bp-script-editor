import React from 'react';
import { Extension } from '@codemirror/state';

interface CompletionsType {
    template: string;
    label: string;
    detail: string;
    type: string;
}
interface PlaceholderThemesType {
    [K: string]: CommonPlaceholderTheme;
}
interface FunctionType extends CompletionsType {
    handle: any;
}
interface CommonPlaceholderTheme {
    textColor: string;
    backgroudColor: string;
    borderColor: string;
}
interface ScriptEditorRef {
    insertText?: (text: string, isTemplate: boolean) => void;
    clearText?: () => void;
    setText?: (text: string) => void;
}
interface HintPathType {
    label: string;
    detail: string;
    type: 'function' | 'keyword' | 'variable' | 'text' | 'property';
    template: string;
    children?: HintPathType[];
}

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
declare const _default: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<ScriptEditorRef>>;

declare const CommonPlaceholderThemes: {
    magenta: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    red: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    volcano: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    orange: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    gold: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    lime: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    green: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    cyan: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    blue: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    geekblue: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
    purple: {
        textColor: string;
        backgroudColor: string;
        borderColor: string;
    };
};

export { CommonPlaceholderTheme, CommonPlaceholderThemes, CompletionsType, FunctionType, HintPathType, PlaceholderThemesType, ScriptEditorRef, _default as default };
