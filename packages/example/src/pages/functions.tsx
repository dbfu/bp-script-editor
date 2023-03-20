import { FC, useMemo, useState } from 'react'
import { Button, Drawer, Form, Table, Modal, Input } from 'antd'
import { FunctionType } from '@byteplan/bp-script-editor';

interface PropsType {
  open: boolean;
  functions: FunctionType[];
  onChange: any;
  onClose: any;
}

const Functions: FC<PropsType> = ({
  open,
  functions,
  onChange,
  onClose,
}) => {

  const [form] = Form.useForm();
  const [formOpen, setFormOpen] = useState(false);

  const columns = useMemo(() => {
    return [{
      dataIndex: 'label',
      title: '名称',
    }, {
      dataIndex: 'template',
      title: '模版',
    }, {
      dataIndex: 'detail',
      title: '描述',
    }, {
      dataIndex: 'handle',
      title: '实现',
    }]
  }, [])

  const finish = (values: any) => {
    onChange([
      {
        ...values,
        type: 'function',
      },
      ...functions
    ]);
    setFormOpen(false);
  }

  return (
    <Drawer
      title="定义函数"
      open={open}
      width={1200}
      bodyStyle={{ maxHeight: 480, overflowY: 'auto' }}
      onClose={onClose}
    >
      <Button
        onClick={() => {
          setFormOpen(true);
        }}
        type="primary"
        className='my-[12px]'
      >
        添加
      </Button>
      <Table
        columns={columns}
        dataSource={functions}
        rowKey="label"
        pagination={false}
        tableLayout="fixed"
      />
      <Modal
        title="新建"
        open={formOpen}
        onCancel={() => {
          setFormOpen(false);
        }}
        width={640}
        onOk={() => { form.submit() }}
      >
        <Form
          form={form}
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 5 }}
          onFinish={finish}
        >
          <Form.Item
            name="label"
            label="名称"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="template"
            label="模版"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="detail"
            label="描述"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="handle"
            label="实现"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Drawer>
  )
}

export default Functions;