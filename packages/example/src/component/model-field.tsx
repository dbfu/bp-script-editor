import React, { FC, useContext, useMemo } from 'react';
import { Tree } from 'antd';

import { GlobalContext } from '../context';
import { Model } from '../data/model';

interface PropsType {
  models: Model[];
  placeholderTypes: {
    [k: string]: string;
  }
}


const ModelField: FC<PropsType> = ({
  placeholderTypes,
  models,
}) => {
  const { editorRef } = useContext(GlobalContext);

  const formatTree = (list: Model[], parent?: any): any[] => {
    return list.map((item: Model) => {
      const data: any = {
        title: item.name,
        key: item.code,
        parent,
      };
      data.children = formatTree(item.children || [], data);
      return data;
    });
  };

  const treeData: any[] = useMemo(() => {
    return formatTree(models);
  }, [models]);

  return (
    <Tree
      defaultExpandAll
      onSelect={(_, info: any) => {
        const text = `[[${placeholderTypes.Field}.${info.node.parent.title}:${info.node.parent.key}.${info.node.title}:${info.node.key}]] `;
        if (editorRef?.current?.insertText) {
          editorRef?.current?.insertText(text, false);
        }
      }}
      treeData={treeData}
    />
  );
}

export default ModelField;
