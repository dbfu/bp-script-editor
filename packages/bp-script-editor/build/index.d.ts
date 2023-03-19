import React from 'react';

interface CompletionsType {
    template: string;
    label: string;
    detail: string;
    type: string;
}
interface FunctionType extends CompletionsType {
    handle: any;
}
interface CommonPlaceholderTheme {
    textColor: string;
    backgroudColor: string;
    borderColor: string;
}
interface CommonPlaceholderThemesType {
    [k: string]: CommonPlaceholderTheme;
}
interface ScriptEditorRef {
    insertText?: (text: string, isTemplate: boolean) => void;
}

interface PropsType {
    completions: CompletionsType[];
    keywords?: string[];
    onValueChange?: (value: string) => void;
    placeholderThemes: CommonPlaceholderThemesType;
    mode: string;
    functions: FunctionType[];
    height?: string;
    width?: string;
}
declare const _default: React.ForwardRefExoticComponent<PropsType & React.RefAttributes<ScriptEditorRef>>;

declare const CommonPlaceholderThemes: CommonPlaceholderThemesType;

export { CommonPlaceholderTheme, CommonPlaceholderThemes, CommonPlaceholderThemesType, CompletionsType, FunctionType, ScriptEditorRef, _default as default };
