import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  List, Card, Button, Modal, Form, Input, Upload
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from 'src/config';
import styles from './index.less';

@inject('manage')
@observer
class Bulletin extends Component {
  formRef = React.createRef();

  componentDidMount() {
    const { manage: { getBulletins } } = this.props;
    getBulletins();
  }

  onUploadVisiable = () => {
    const { manage: { update } } = this.props;
    update({
      bulletinVisiable: true
    });
  }

  upload = (e) => {
    const { manage: { update } } = this.props;
    update({ fileList: e.fileList });
  }

  disposeUpload = ({ file }) => {
    if (!file.response) return '';
    return file.response.data.file.path;
  }

  onUploadUnvisiable = () => {
    const { manage: { update } } = this.props;
    update({
      bulletinVisiable: false
    });
  }

  submitNewBulletin = () => {
    const { validateFields } = this.formRef.current;
    validateFields().then((params) => {
      const { manage: { postBulletin } } = this.props;
      postBulletin(params);
    });
  }

  onDelete = (id) => {
    const { manage: { deleteBulletin } } = this.props;
    deleteBulletin({ id });
  };

  render() {
    const { manage: { bulletinData, bulletinVisiable, fileList } } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Button
          type="primary"
          className={styles.btn}
          disabled={bulletinData.length >= 4}
          onClick={this.onUploadVisiable}
        >
          上传新的公告
        </Button>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
          className={styles.list}
          dataSource={bulletinData}
          renderItem={item => (
            <List.Item>
              <Card
                className={styles.listitem}
                title={item.title}
                extra={<Button
                  type="link"
                  onClick={() => this.onDelete(item.id)}
                >
                  删除
                </Button>}
              >
                <div>{item.introduce}</div>
                <img className={styles.img} alt="暂无图片" src={`http:${BASE_URL}/${item.imgurl}`} />
              </Card>
            </List.Item>
          )}
        />
        <Modal
          visible={bulletinVisiable}
          title="上传新的公告"
          onCancel={this.onUploadUnvisiable}
          onOk={this.submitNewBulletin}
        >
          <Form ref={this.formRef}>
            <Form.Item name="title" label="标题" required>
              <Input />
            </Form.Item>
            <Form.Item name="introduce" label="介绍" required>
              <Input />
            </Form.Item>
            <Form.Item
              name="imgurl"
              label="图片"
              required
              getValueFromEvent={this.disposeUpload}
            >
              <Upload
                accept=".img,.jpg,.jpeg"
                action={`${BASE_URL}/file`}
                listType="picture-card"
                fileList={fileList}
                onChange={this.upload}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Bulletin;
