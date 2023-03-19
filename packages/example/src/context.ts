import React from 'react'
import { ScriptEditorRef } from '@byteplan/bp-script-editor';

export interface ContextType {
  editorRef: React.RefObject<ScriptEditorRef> | null;
}

export const GlobalContext = React.createContext<ContextType>({
  editorRef: null,
});
