import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Modal, Form, Input
} from 'antd';

export default
@inject('manage')
@observer
class User extends Component {
  formRef = React.createRef();

  onUnvisiable = () => {
    const { manage: { update } } = this.props;
    update({
      userVisible: false
    });
  }

  onOk = () => {
    const { validateFields } = this.formRef.current;
    validateFields().then((params) => {
      const { manage: { postUser, fixUser } } = this.props;
      postUser({ ...fixUser, ...params });
      this.onUnvisiable();
    });
  }

  render() {
    const { manage: { userVisible, fixUser } } = this.props;
    if (!fixUser) return '';
    return <Modal
      visible={userVisible}
      onCancel={this.onUnvisiable}
      onOk={this.onOk}
      destroyOnClose
    >
      <Form ref={this.formRef} initialValues={fixUser} style={{ marginTop: 30 }}>
        <Form.Item
          label="用户名"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="积分"
          name="price"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>

    </Modal>;
  }
}
