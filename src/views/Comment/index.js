import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Form, Input
} from 'antd';
import styles from './index.less';

@inject('manage', 'user')
@observer
class Comment extends Component {
  formRef = React.createRef();

  componentDidMount() {
    const { manage: { getComments } } = this.props;
    getComments();
  }

  onVisiable = () => {
    const { manage: { update } } = this.props;
    update({
      commentVisiable: true
    });
  }

  onUnvisiable = () => {
    const { manage: { update } } = this.props;
    update({
      commentVisiable: false
    });
  }

  submitNewComment = () => {
    const { validateFields } = this.formRef.current;
    validateFields().then((params) => {
      const { manage: { postComment } } = this.props;
      postComment(params);
    });
  }

  onDelete = (id) => {
    const { manage: { deleteComment } } = this.props;
    deleteComment({ id });
  };

  render() {
    const {
      manage:
      { commentData, commentVisiable }, user: { user }
    } = this.props;
    return (
      <div>
        <Button
          type="primary"
          className={styles.btn}
          onClick={this.onVisiable}
        >
          新建留言
        </Button>
        <Table
          className={styles.table}
          columns={[{
            dataIndex: 'name',
            title: '用户ID',
            render: (name, record) => (user.id === record.personid
              ? <span style={{ fontSize: 18, fontWeight: 800 }}>{name}</span>
              : name)

          }, {
            dataIndex: 'introduce',
            title: '留言'
          }, {
            dataIndex: 'id',
            render: (id) => <Button
              type="link"
              onClick={() => this.onDelete(id)}
            >
              删除
            </Button>
          }]}
          rowKey="id"
          dataSource={commentData}
          pagination={null}
        />
        <Modal
          onCancel={this.onUnvisiable}
          onOk={this.submitNewComment}
          visible={commentVisiable}
          title="新建留言"
        >
          <Form ref={this.formRef}>
            <Form.Item
              label="用户ID"
              name="personid"
              required
              initialValue={user.id}
            >
              {user.name}
            </Form.Item>
            <Form.Item name="introduce" label="留言内容" required>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Comment;
