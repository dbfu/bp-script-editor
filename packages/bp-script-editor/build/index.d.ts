import React from 'react';

interface CommonPlaceholderTheme {
    textColor: string;
    backgroudColor: string;
    borderColor: string;
}
interface CommonPlaceholderThemesType {
    [k: string]: CommonPlaceholderTheme;
}
declare const CommonPlaceholderThemes: CommonPlaceholderThemesType;

interface EditorPropTypes {
    tabs: any[];
    completions: any;
    keywords?: string[];
    onValueChange?: (value: string) => void;
    placeholderThemes: {
        [k: string]: CommonPlaceholderTheme;
    };
    mode: string;
    functions: {
        name: string;
        template: string;
        detail?: string;
        type: string;
        handle?: any;
    }[];
}
interface ScriptEditorRef {
    insertText?: (text: string, isTemplate: boolean) => void;
}
declare const _default: React.ForwardRefExoticComponent<EditorPropTypes & React.RefAttributes<ScriptEditorRef>>;

export { CommonPlaceholderThemes, ScriptEditorRef, _default as default };
