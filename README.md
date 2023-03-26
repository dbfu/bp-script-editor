## 组件demo地址: <https://dbfu.github.io/bp-script-editor/>

# 组件使用文档

1. 安装依赖

``` jsx
npm i @byteplan/bp-script-editor 
yarn add @byteplan/bp-script-editor 
pnpm i @byteplan/bp-script-editor 
```

2. 代码示例

``` jsx
import Editor from '@byteplan/bp-script-editor';

<Editor
  completions={completions}
  onValueChange={onValueChange}
  keywords={keywordsConfig.keywords}
  keywordsColor={keywordsConfig.color}
  placeholderThemes={placeholderThemes}
  functions={localFunctions}
  ref={editorRef}
  height="calc(100vh - 48px)"
  mode={mode}
  defaultValue="hello world"
  hintPaths={hintPaths}
/>
```

3. 属性说明

| 属性    | 说明  | 数据格式
|  ----  | ----  | ----
| completions |  自动补全定义的数据 | [CompletionsType[]](#completionstype)
| keywords | 关键字 | string[]
| keywordsColor | 关键字颜色 支持#ffffff或white格式 | string
| keywordsClassName | 关键字类名 | string
| height | 高度 | string
| width | 宽度 | string
| placeholderThemes | 占位符类型主题 | [PlaceholderThemesType](#placeholderthemestype)
| defaultValue | 默认值 | string
| functions | 函数 | [CompletionsType[]](#completionstype)
| mode | 模式 | code ｜ name
| hintPaths | 代码提示 | [[HintPathType]](#hintpathtype)
| onValueChange | 值改变的回调 | (value: string) => void

4. 方法

| 名称    | 说明  | 参数
|  ----  | ----  | ----
| insertText | 插入文本  | (text, isTemplate) =>  void，有类似${}这样的占位符，需要把isTemplate设置为true
| clearText | 清空文本  | () =>  void
| setText | 设置文本  | (text) =>  void，会把编辑器的内容使用text替换掉

# CompletionsType

```js
   template: string; // 自动插入时补全的文本
   label: string;    // 要匹配的文本
   detail: string;   // 描述
   type: string;     // 类型
```

# PlaceholderThemesType

```js
   [K: string]: CommonPlaceholderTheme;
```

# CommonPlaceholderTheme

```js
    textColor: string;
    backgroudColor: string;
    borderColor: string;
```

# CompletionsType

```js
    template: string;
    label: string;
    detail: string;
    type: string;
```

# HintPathType

```js
    label: string;
    detail: string;
    type: 'function' | 'keyword' | 'variable' | 'text' | 'property';
    template: string;
    children?: HintPathType[];
```
