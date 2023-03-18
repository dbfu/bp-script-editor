import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Button, Tabs, Space } from 'antd';

import ScriptEditor, { CommonPlaceholderThemes, ScriptEditorRef } from '@bp/bp-script-editor'

import Function from './component/funciton';
import ModelField from './component/model-field';
import Operation from './component/operation';

import { GlobalContext } from './context';

const placeholderTypes = {
  Field: 'f',
};

const placeholderThemes = {
  [placeholderTypes.Field]: CommonPlaceholderThemes.blue,
};

const models = [
  {
    code: 'user',
    name: '用户',
    children: [
      {
        name: 'id',
        code: 'id',
      },
      {
        name: '姓名',
        code: 'name',
      },
      {
        name: '年龄',
        code: 'age',
      },
      {
        name: '性别',
        code: 'sex',
      },
    ],
  },
];

function App() {

  const functions = useMemo(
    () => [
      {
        name: 'if',
        template: 'func.if(${p}, ${v1}, ${v2})',
        detail:
          '判断函数，p为条件，当p为真的时候，返回v1，当p为假的时候，返回v2',
        type: 'function',
        handle: (p, v1, v2) => {
          return p ? v1 : v2;
        },
      },
      {
        name: 'sum',
        template: 'func.sum(${num1}, ${num2}, ${num3}, ${...})',
        detail: '求和函数，把所有参数加一起返回',
        type: 'function',
        handle: (...args) => {
          return args.reduce((prev, cur) => {
            return prev + +cur;
          }, 0);
        },
      },
    ],
    []
  );

  const operations = useMemo(
    () => [
      {
        name: '==',
        template: '== ',
        detail: '判断两遍是否相等',
        type: 'keyword',
      },
      {
        name: '!=',
        template: '!= ',
        detail: '判断两遍是否不相等',
        type: 'keyword',
      },
      {
        name: '+',
        template: '+ ',
        detail: '加',
        type: 'keyword',
      },
      {
        name: '-',
        template: '- ',
        detail: '减',
        type: 'keyword',
      },
      {
        name: '*',
        template: '* ',
        detail: '乘',
        type: 'keyword',
      },
      {
        name: '/',
        template: '/ ',
        detail: '除',
        type: 'keyword',
      },
    ],
    []
  );

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
    [functions, operations]
  );

  const data = {
    user: {
      id: 1,
      name: '付德宝',
      age: '18',
      sex: 1,
    },
  };

  const onValueChange = useCallback((value) => {
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
      functions.reduce((prev, cur) => {
        prev[cur.name] = cur.handle;
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
        <Space>
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

        <div className="flex">
          <div className="w-[360px] flex-0 p-[12px] border-solid border-[#ccc] border-[1px]">
            <Tabs items={tabs} tabPosition="left">
              <Tabs.TabPane tab="参数" key="5" tabKey="5">
                <Tabs>
                  <Tabs.TabPane key="2" tab="上下文参数">
                    上下文参数
                  </Tabs.TabPane>
                  <Tabs.TabPane key="1" tab="系统参数">
                    系统参数
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane tab="变量" key="4" tabKey="4"></Tabs.TabPane>
            </Tabs>
          </div>
          <div className="flex-1 w-0">
            <ScriptEditor
              completions={completions}
              tabs={tabs}
              onValueChange={onValueChange}
              keywords={keywords}
              placeholderThemes={placeholderThemes}
              mode={mode}
              functions={functions}
              ref={editorRef}
            />
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
