import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Form, Input
} from 'antd';
import { toJS } from 'mobx';
import styles from './index.less';

@inject('manage', 'user')
@observer
class Comment extends Component {
  formRef = React.createRef();

  componentDidMount() {
    const { user: { getUsers } } = this.props;
    getUsers();
  }

  onVisiable = (id) => () => {
    const { manage: { update, getComments } } = this.props;
    getComments({ personid: id });
    update({
      commentVisiable: true,
      replayId: id
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
    validateFields().then((data) => {
      const { manage: { postComment }, user: { user } } = this.props;
      postComment({ personid: user.id, ...data });
    });
  }

  onDelete = (id) => {
    const { manage: { deleteComment } } = this.props;
    deleteComment({ id });
  };

  render() {
    const {
      manage:
      { commentData, commentVisiable }, user: { user, users }
    } = this.props;
    return (
      <div>
        <Table
          className={styles.table}
          columns={[{
            dataIndex: 'name',
            title: '用户名',
            render: (name, record) => (user.id === record.personid
              ? <span style={{ fontSize: 18, fontWeight: 800 }}>{name}</span>
              : name)
          }, {
            dataIndex: 'id',
            render: (id) => <>
              <Button onClick={this.onVisiable(id)} type="link">
                评论
              </Button>
            </>
          }]}
          rowKey="id"
          dataSource={toJS(users)}
          pagination={null}
        />
        <Modal
          onCancel={this.onUnvisiable}
          visible={commentVisiable}
          title="新建留言"
        >
          <Form
            style={{ marginBottom: 24 }}
            ref={this.formRef}
            onFinish={this.submitNewComment}
            layout="inline"
          >
            <Form.Item
              name="introduce"
              rules={[{ required: true }]}
              style={{ width: '72%' }}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">提交评论</Button>
            </Form.Item>
          </Form>
          <Table
            className={styles.table}
            columns={[{
              dataIndex: 'name',
              title: '用户名',
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
        </Modal>
      </div>
    );
  }
}

export default Comment;
