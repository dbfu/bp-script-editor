import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Button, Tabs, Space } from 'antd';

import Editor, { CommonPlaceholderThemes, ScriptEditorRef } from '@byteplan/bp-script-editor'

import Function from './component/funciton';
import ModelField from './component/model-field';
import Operation from './component/operation';

import { GlobalContext } from './context';
import { models } from './data/model';
import { functions } from './data/function';
import { operations } from './data/operation';

const placeholderTypes = {
  Field: 'f',
};

const placeholderThemes = {
  [placeholderTypes.Field]: CommonPlaceholderThemes.blue,
};

function App() {
  const tabs = useMemo(
    () => [
      {
        key: 'model-field',
        label: '字段',
        children: (
          <ModelField placeholderTypes={placeholderTypes} models={models} />
        ),
      },
      {
        key: 'function',
        label: '函数',
        children: <Function functions={functions} />,
      },
      {
        key: 'operation',
        label: '逻辑运算符',
        children: <Operation operations={operations} />,
      },
    ],
    [functions, operations, placeholderTypes]
  );

  const data = {
    user: {
      id: 1,
      name: '付德宝',
      age: '18',
      sex: 1,
    },
  };

  const onValueChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const [value, setValue] = useState<string>('');
  const [mode, setMode] = useState('name');

  const test = () => {
    const result = value.replace(/\[\[(.+?)\]\]/g, (_: string, $2: string) => {
      const [type, ...rest] = $2.split('.');

      if (type === 'f') {
        const [modelCode, fieldCode] = rest.map((t) => t.split(':')[1]);
        return `data?.${modelCode}?.${fieldCode}`;
      }

      return '';
    });

    console.log(`function: return ${result}`);

    const func = new window.Function('func', 'data', `return ${result}`);

    const res = func(
      functions.reduce((prev: { [k in string]: any }, cur) => {
        prev[cur.label] = cur.handle;
        return prev;
      }, {}),
      data
    );

    console.log(`输出: ${res}`);
  };

  const completions = useMemo(
    () => [...functions, ...operations],
    [functions, operations]
  );

  const keywords = useMemo(() => ['222'], []);

  const editorRef = useRef<ScriptEditorRef>(null);

  return (
    <GlobalContext.Provider value={{ editorRef }}>
      <div>
        <div className="h-[48px] flex items-center bg-[rgb(68,75,81)] justify-end px-[20px]">
          <Space>
            <Button onClick={test} type="primary">
              定义模型
            </Button>
            <Button onClick={test} type="primary">
              测试
            </Button>
            <Button
              onClick={() => {
                setMode((prev) => ['name', 'code'].filter((o) => o !== prev)[0]);
              }}
              type="primary"
            >
              {mode === 'name' ? '代码模式' : '名称模式'}
            </Button>
          </Space>
        </div>

        <div className="flex">
          <div className="w-[360px] flex-0 p-[12px] border-solid border-[#ccc] border-[1px]">
            <Tabs items={tabs} tabPosition="left" />
          </div>
          <div className="flex-1 w-0">
            <Editor
              completions={completions}
              onValueChange={onValueChange}
              keywords={keywords}
              placeholderThemes={placeholderThemes}
              functions={functions}
              ref={editorRef}
              height="calc(100vh - 48px)"
              mode={mode}
            />
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
