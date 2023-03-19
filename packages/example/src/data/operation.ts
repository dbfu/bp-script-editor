import { CompletionsType } from '@byteplan/bp-script-editor';

export const operations: CompletionsType[] = [
  {
    label: '==',
    template: '== ',
    detail: '判断两遍是否相等',
    type: 'keyword',
  },
  {
    label: '!=',
    template: '!= ',
    detail: '判断两遍是否不相等',
    type: 'keyword',
  },
  {
    label: '+',
    template: '+ ',
    detail: '加',
    type: 'keyword',
  },
  {
    label: '-',
    template: '- ',
    detail: '减',
    type: 'keyword',
  },
  {
    label: '*',
    template: '* ',
    detail: '乘',
    type: 'keyword',
  },
  {
    label: '/',
    template: '/ ',
    detail: '除',
    type: 'keyword',
  },
]