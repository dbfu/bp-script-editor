import { FC, useEffect } from 'react';
import { Form, Modal, Input } from 'antd';

interface PropType {
  formatFunctions: string;
  result: string;
  open: boolean;
  onClose: any;
}

const RunResult: FC<PropType> = ({
  formatFunctions,
  result,
  open,
  onClose,
}) => {

  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue({
        formatFunctions,
        result,
      })
    }
  }, [open]);

  return (
    <Modal
      title="测试结果"
      open={open}
      footer={null}
      onCancel={() => { onClose() }}
      width={800}
    >
      <Form
        form={form}
        wrapperCol={{ span: 19 }}
        labelCol={{ span: 5 }}
        name="result"
      >
        <Form.Item
          label="格式化后的函数"
          name="formatFunctions"
        >
          <Input.TextArea readOnly rows={5} />
        </Form.Item>
        <Form.Item
          label="运行结果"
          name="result"
        >
          <Input.TextArea readOnly rows={5} />
        </Form.Item>
      </Form>

    </Modal>
  )
}

export default RunResult;