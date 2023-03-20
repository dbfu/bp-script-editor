
export interface Model {
  code: string,
  name: string;
  children?: Model[];
  type: "model" | "field";
  value?: any;
}

export const models: Model[] = [
  {
    code: 'user',
    name: '用户',
    type: 'model',
    children: [
      {
        name: 'id',
        code: 'id',
        type: 'field',
        value: 1,
      },
      {
        name: '姓名',
        code: 'name',
        type: 'field',
        value: '张三',
      },
      {
        name: '年龄',
        code: 'age',
        type: 'field',
        value: 18,
      },
      {
        name: '性别',
        code: 'sex',
        type: 'field',
        value: 1,
      },
    ],
  },
]