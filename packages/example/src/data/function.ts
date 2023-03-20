import { FunctionType } from '@byteplan/bp-script-editor';


export const functions: FunctionType[] = [
  {
    label: 'if',
    template: 'func.if(${p}, ${v1}, ${v2})',
    detail:
      '判断函数，p为条件，当p为真的时候，返回v1，当p为假的时候，返回v2',
    type: 'function',
    handle: `(p, v1, v2) => {
      return p ? v1 : v2;
    }`,
  },
  {
    label: 'sum',
    template: 'func.sum(${num1}, ${num2}, ${num3}, ${...})',
    detail: '求和函数，把所有参数加一起返回',
    type: 'function',
    handle: `(...args) => {
      return args.reduce((prev, cur) => {
        return prev + +cur;
      }, 0);
    }`,
  },
]