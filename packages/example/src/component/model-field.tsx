import React from 'react';
import { Tree } from 'antd';

import { useContext } from 'react';
import { GlobalContext } from '../context';
import { useMemo } from 'react';

function ModelField({ placeholderTypes, models }) {
  const { editorRef } = useContext(GlobalContext);

  const formatTree = (list, parent) => {
    list.forEach((item) => {
      item.title = item.name;
      item.key = item.code;
      item.parent = parent;
      formatTree(item.children || [], item);
    });
  };

  const treeData = useMemo(() => {
    formatTree(models);
    return models;
  }, [models]);

  return (
    <Tree
      defaultExpandAll
      onSelect={(_, info) => {
        const text = `[[${placeholderTypes.Field}.${info.node.parent.title}:${info.node.parent.key}.${info.node.title}:${info.node.key}]] `;
        editorRef.current?.insertText(text, false);
      }}
      treeData={treeData}
    />
  );
}

export default ModelField;
