import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Popconfirm
} from 'antd';
import Modal from './Modal';

export default
@inject('manage')
@observer
class User extends Component {
  componentDidMount() {
    const { manage: { getUsers } } = this.props;
    getUsers();
  }

  delete = (item) => {
    const { manage: { deleteUser } } = this.props;
    deleteUser(item);
  }

  change = (item) => {
    const { manage: { update } } = this.props;

    update({
      fixUser: item,
      userVisible: true
    });
  }

  render() {
    const { manage: { userList } } = this.props;
    return <div>
      <Table
        style={{ marginTop: 24 }}
        columns={[{
          title: '用户名',
          dataIndex: 'name'
        }, {
          title: '密码',
          dataIndex: 'password'
        }, {
          title: '积分',
          dataIndex: 'price'
        }, {
          title: '',
          render: (_, item) => <>
            <Button type="link" onClick={() => this.change(item)}>修改</Button>
            <Popconfirm
              onConfirm={() => this.delete(item)}
              title="确实要删除吗"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </>
        }]}
        dataSource={userList}
      />
      <Modal />
    </div>;
  }
}
