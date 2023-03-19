
export interface Model {
  code: string,
  name: string;
  children?: Model[];
  type: "model" | "field",
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
      },
      {
        name: '姓名',
        code: 'name',
        type: 'field',
      },
      {
        name: '年龄',
        code: 'age',
        type: 'field',
      },
      {
        name: '性别',
        code: 'sex',
        type: 'field',
      },
    ],
  },
]