import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Button, Tabs, Space } from 'antd';
import { useLocalStorageState } from 'ahooks'

import Editor, { CommonPlaceholderThemes, FunctionType, ScriptEditorRef } from '@byteplan/bp-script-editor'

import Function from './component/function';
import ModelField from './component/model-field';
import Operation from './component/operation';

import { GlobalContext } from './context';
import { Model, models } from './data/model';
import { functions } from './data/function';
import { operations } from './data/operation';
import ModelList from './pages/model-list';
import Keywords, { KeywordsConfigType } from './pages/keywords';
import Functions from './pages/functions';
import RunResult from './pages/result';

const placeholderTypes = {
  Field: 'f',
};

const placeholderThemes = {
  [placeholderTypes.Field]: CommonPlaceholderThemes.blue,
};

function App() {

  const [localModels, setLocalModels] = useLocalStorageState<Model[]>(
    'model-list',
    { defaultValue: models }
  );

  const [keywordsConfig, setKeywordsConfig] = useLocalStorageState<KeywordsConfigType>(
    'keywords-config',
    {
      defaultValue: {
        color: 'red',
        keywords: [],
      }
    }
  );

  const [localFunctions, setLocalFunctions] = useLocalStorageState<FunctionType[]>(
    'functions',
    {
      defaultValue: functions,
    }
  );


  const tabs = useMemo(
    () => [
      {
        key: 'model-field',
        label: '字段',
        children: (
          <ModelField placeholderTypes={placeholderTypes} models={localModels} />
        ),
      },
      {
        key: 'function',
        label: '函数',
        children: <Function functions={localFunctions} />,
      },
      {
        key: 'operation',
        label: '逻辑运算符',
        children: <Operation operations={operations} />,
      },
    ],
    [localFunctions, operations, placeholderTypes, localModels]
  );

  const data = useMemo(() => {
    return localModels.reduce((prevModel: any, model: Model) => {
      prevModel[model.code] = model.children?.reduce((prevField: any, field: Model) => {
        prevField[field.code] = field.value;
        return prevField;
      }, {})
      return prevModel;
    }, {});
  }, [])

  const onValueChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const [value, setValue] = useState<string>('');
  const [mode, setMode] = useState('name');
  const [modelListOpen, setModelListOpen] = useState(false);
  const [keywordsOpen, setKeywordsOpen] = useState(false);
  const [functionsOpen, setFunctionsOpen] = useState(false);
  const [runResultOpen, setRunResultOpen] = useState(false);
  const [formatFunctions, setFormatFunctions] = useState('');
  const [runResult, setRunResult] = useState('');

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

    const funcs = localFunctions.reduce((prev: { [k in string]: any }, cur) => {

      if (cur.handle) {
        const handle = new window.Function(`return ${cur.handle}`);
        prev[cur.label] = handle();
      }

      return prev;
    }, {});

    const runRes = func(
      funcs,
      data
    );

    setFormatFunctions(`return ${result}`);
    setRunResult(runRes);
    setRunResultOpen(true);
  };

  const completions = useMemo(
    () => [...localFunctions, ...operations],
    [localFunctions, operations]
  );

  const editorRef = useRef<ScriptEditorRef>(null);

  return (
    <GlobalContext.Provider value={{ editorRef }}>
      <div>
        <div className="h-[48px] flex items-center bg-[rgb(68,75,81)] justify-end px-[20px]">
          <Space>
            <Button onClick={() => { setModelListOpen(true) }} type="primary">
              定义模型
            </Button>
            <Button onClick={() => { setFunctionsOpen(true) }} type="primary">
              定义函数
            </Button>
            <Button onClick={() => { setKeywordsOpen(true) }} type="primary">
              定义关键字
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
              keywords={keywordsConfig.keywords}
              placeholderThemes={placeholderThemes}
              functions={localFunctions}
              ref={editorRef}
              height="calc(100vh - 48px)"
              mode={mode}
              keywordsColor={keywordsConfig.color}
            />
          </div>
        </div>
        <ModelList
          onModelsChange={setLocalModels}
          open={modelListOpen}
          onClose={() => { setModelListOpen(false) }}
          models={localModels}
        />
        <Keywords
          onClose={() => {
            setKeywordsOpen(false
            )
          }}
          onChange={setKeywordsConfig}
          open={keywordsOpen}
          keywordsConfig={keywordsConfig}
        />
        <Functions
          open={functionsOpen}
          functions={localFunctions}
          onChange={setLocalFunctions}
          onClose={() => { setFunctionsOpen(false) }}
        />
        <RunResult
          formatFunctions={formatFunctions}
          result={runResult}
          open={runResultOpen}
          onClose={() => {
            setRunResultOpen(false);
          }}
        />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
