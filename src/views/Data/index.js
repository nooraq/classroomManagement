import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Table, Button, Modal, Form, Input, Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BASE_URL } from 'src/config';
import styles from './index.less';

@inject('manage')
@observer
class Data extends Component {
  formRef = React.createRef();

  state = { fileList: [] }

  componentDidMount() {
    const { manage: { getData } } = this.props;
    getData();
  }

  onVisiable = () => {
    const { manage: { update } } = this.props;
    update({
      dataVisiable: true
    });
  }

  onUnvisiable = () => {
    const { manage: { update } } = this.props;
    update({
      dataVisiable: false
    });
  }

  submitNewData = () => {
    const { validateFields } = this.formRef.current;
    validateFields().then((params) => {
      const { manage: { postData } } = this.props;
      postData(params);
    });
  }

  onDelete = (id) => {
    const { manage: { deleteMaterials } } = this.props;
    deleteMaterials({ id });
  };

  onRemove = () => {
    this.setState({ fileList: [] });
  }

  disposeUpload = ({ file }) => {
    if (!file.response) return '';
    return file.response.data.file.path;
  }

  upload = (e) => {
    this.setState({ fileList: e.fileList });
  }

  render() {
    const { manage: { dataData, dataVisiable } } = this.props;
    const { fileList } = this.state;
    return (
      <div>
        <Button
          type="primary"
          className={styles.btn}
          onClick={this.onVisiable}
        >
          新增资料
        </Button>
        <Table
          className={styles.table}
          columns={[{
            dataIndex: 'name',
            title: '资料名'
          }, {
            dataIndex: 'introduce',
            title: '资料简介'
          }, {
            dataIndex: 'fileurl',
            title: '下载链接',
            render: (fileurl) => <a href={`http:${BASE_URL}/${fileurl}`} download="wenjian"><Button type="link">下载</Button></a>
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
          dataSource={dataData}
          pagination={null}
        />
        <Modal
          onCancel={this.onUnvisiable}
          onOk={this.submitNewData}
          visible={dataVisiable}
          title="新增资料"
        >
          <Form ref={this.formRef}>
            <Form.Item
              label="资料名"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="资料简介"
              name="introduce"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              getValueFromEvent={this.disposeUpload}
              name="fileurl"
              label="资料上传"
              rules={[{ required: true }]}
            >
              <Upload
                action={`${BASE_URL}/file`}
                onChange={this.upload}
                fileList={fileList}
                onRemove={this.onRemove}
              >
                <Button disabled={fileList.length >= 1}>
                  <UploadOutlined />
                  上传资料
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Data;
