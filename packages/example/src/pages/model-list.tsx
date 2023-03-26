import React, { FC, useMemo, useState, useEffect } from 'react'
import { Drawer, Table, Button, Modal, Form, Input, message } from 'antd'

import { Model } from '../data/model'

import './model-list.css'

interface PropType {
  models: Model[];
  onModelsChange?: (models: Model[]) => void;
  open: boolean;
  onClose: () => void;
}

const ModelList: FC<PropType> = ({
  models,
  onModelsChange,
  onClose,
  open,
}) => {

  const [selected, setSelected] = useState<string | null>();
  const [localModels, setLocalModels] = useState(models);

  const [modelOpen, setModelOpen] = useState(false);
  const [fieldOpen, setFieldOpen] = useState(false);

  const [modelForm] = Form.useForm();
  const [fieldForm] = Form.useForm();

  const tableData = useMemo(() => {
    return localModels.find(o => o.code === selected)?.children || [];
  }, [selected, localModels]);

  const newModel = (values: any) => {
    setLocalModels(prev => [...prev, {
      name: values.name,
      code: values.code,
      type: 'model',
      children: [],
    }]);
    setSelected(values.code);
    setModelOpen(false);
  };

  const newModelField = (values: any) => {
    if (!selected) return;

    if (tableData.some(o => o.code === values.code)) {
      message.error('字段代码不能重复');
      return;
    }

    const index = localModels.findIndex(o => o.code === selected);

    if (!localModels[index].children) {
      localModels[index].children = [];
    }

    localModels[index].children = [
      ...(localModels[index].children || []),
      {
        name: values.name,
        code: values.code,
        value: values.value,
        type: 'field',
      }
    ];

    setLocalModels([...localModels]);
    setFieldOpen(false);
  }

  const removeField = (code: string) => {
    if (!code) return;

    const index = localModels.findIndex(o => o.code === selected);

    localModels[index].children = (localModels[index].children || []).filter(o => o.code !== code);

    setLocalModels([...localModels]);
  }

  const removeModel = (code: string) => {
    if (!code) return;

    setSelected(null);
    setLocalModels(prev => prev.filter(o => o.code !== code));
  }

  useEffect(() => {
    if (onModelsChange) {
      onModelsChange(localModels);
    }
  }, [localModels]);


  const columns = useMemo(() => {
    return [{
      dataIndex: 'name',
      title: '名称',
    }, {
      dataIndex: 'code',
      title: '代码',
    }, {
      dataIndex: 'value',
      title: '值',
    }, {
      title: '操作',
      dataIndex: 'code',
      render: (code: string) => {
        return (
          <a onClick={() => { removeField(code) }}>删除</a>
        )
      }
    }]
  }, [selected])

  return (
    <Drawer
      open={open}
      title="定义模型"
      width="100vw"
      onClose={() => {
        onClose();
      }}
    >
      <div className="flex model-list">
        <div className='w-[300px] border-r-solid border-r-[1px] border-r-[#f3f3f3] py-[20px pr-[20px] h-[calc(100vh-106px)] overflow-auto'>
          <div className="py-[16px] text-right">
            <Button
              type="primary"
              onClick={() => {
                setModelOpen(true);
                modelForm.resetFields();
              }}
            >
              添加模型
            </Button>
          </div>
          {
            localModels.map(m => (
              <div
                onClick={() => { setSelected(m.code) }}
                key={m.code}
                className={`flex items-center justify-between h-[60px] px-[18px] transition-colors duration-100 hover:bg-[#f2f4f6] cursor-pointer rounded-lg ${selected === m.code ? 'selected' : ''}`}
              >
                <div>
                  <div className="h-[22px]">{m.name}</div>
                  <div className="h-[18px] leading-[18px] opacity-60 text-[12px] overflow-hidden">{m.code}</div>
                </div>
                {selected === m.code && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      removeModel(m.code);
                    }}
                  >
                    X
                  </div>
                )}
              </div>
            ))
          }
        </div>
        <div className="flex-1 w-[0] pl-[20px]">
          {!!selected && (
            <div className="py-[16px] text-right">
              <Button
                type="primary"
                onClick={() => {
                  setFieldOpen(true);
                  fieldForm.resetFields();
                }}
              >
                添加字段
              </Button>
            </div>
          )}
          <Table
            dataSource={tableData}
            columns={columns}
            size="middle"
            rowKey="code"
            pagination={false}
          />
        </div>
      </div>
      <Modal
        open={modelOpen}
        title="添加模型"
        onOk={() => {
          modelForm.submit();
        }}
        onCancel={() => {
          setModelOpen(false);
        }}
      >
        <Form
          name="model"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          form={modelForm}
          onFinish={newModel}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{
              required: true
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="代码"
            rules={[{
              required: true
            }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={fieldOpen}
        title="添加字段"
        onOk={() => {
          fieldForm.submit();
        }}
        onCancel={() => {
          setFieldOpen(false);
        }}
      >
        <Form
          name="field"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          form={fieldForm}
          onFinish={newModelField}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{
              required: true
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="代码"
            rules={[{
              required: true
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="value"
            label="值"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Drawer>
  )
}

export default ModelList;