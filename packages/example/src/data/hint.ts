import { HintPathType } from '@byteplan/bp-script-editor';

export const hintPaths: HintPathType[] = [{
  label: 'user',
  template: 'user',
  detail: '用户',
  type: 'variable',
  children: [{
    label: 'department',
    template: 'department',
    detail: '部门',
    type: 'property',
    children: [{
      label: 'name',
      template: 'name',
      detail: '名称',
      type: 'property',
    }],
  }],
}]