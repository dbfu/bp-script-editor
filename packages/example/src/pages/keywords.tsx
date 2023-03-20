import { FC, useState, useRef, useEffect } from 'react'
import { Modal, Tag, Input, InputRef } from 'antd'
import { HexColorPicker } from 'react-colorful';

export interface KeywordsConfigType {
  keywords: string[];
  color: string;
}

interface PropsType {
  open: boolean;
  onChange?: any;
  keywordsConfig: KeywordsConfigType;
  onClose: any;
}

const Keywords: FC<PropsType> = ({
  open,
  onChange,
  keywordsConfig,
  onClose,
}) => {

  const [color, setColor] = useState(keywordsConfig.color);
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [inputValue, setInputValue] = useState<string>();
  const [localkeywords, setLocalkeywords] = useState(keywordsConfig.keywords)

  const onColorChange = (newColor: string) => {
    setColor(newColor);
  }

  const handleClose = (removedTag: string) => {
    const newTags = localkeywords.filter((word) => word !== removedTag);
    console.log(newTags);
    setLocalkeywords(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !localkeywords.includes(inputValue)) {
      setLocalkeywords(prev => [...prev, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  return (
    <Modal
      open={open}
      title="定义关键字"
      onOk={() => {
        onChange({
          color,
          keywords: localkeywords,
        });
        onClose();
      }}
      onCancel={() => {
        onClose();
      }}
    >
      <div className="flex">
        <div className="mr-[10px]">颜色：</div>
        <div>
          <HexColorPicker color={color} onChange={onColorChange} />
        </div>
      </div>
      <div className="flex mt-[24px]">
        <div className="mr-[10px]">关键字：</div>
        <div>
          {localkeywords.map(item => (
            <Tag
              key={item}
              closable
              onClose={(e) => {
                e.preventDefault();
                handleClose(item);
              }}
            >
              {item}
            </Tag>
          ))}
          {
            inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />) : (
              <Tag
                onClick={() => {
                  setInputVisible(true);
                }}
                className="cursor-pointer"
              >
                + 添加
              </Tag>
            )
          }
        </div>
      </div>
    </Modal>
  )
}

export default Keywords;