import React, { useContext } from 'react';
import { Tooltip } from 'antd';
import { GlobalContext } from '../context';

function Function({ functions }) {
  const { editorRef } = useContext(GlobalContext);

  return (
    <div>
      {functions.map((item) => (
        <Tooltip placement="right" key={item.name} title={item.detail}>
          <div
            onClick={() => {
              editorRef.current.insertText(`${item.template}`, true);
            }}
            className="px-[12px] py-[4px] hover:(bg-[rgba(0,0,0,0.04)]) cursor-pointer rounded-md"
          >
            {item.name}
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

export default Function;
