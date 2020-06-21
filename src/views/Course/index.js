import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  List, Card, Button, Modal, Form, Input, Upload, InputNumber
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import { BASE_URL } from 'src/config';
import styles from './index.less';

const { TextArea } = Input;

@inject('manage')
@observer
class Bulletin extends Component {
  formRef = React.createRef();

  state = {
    fileList: [],
    fileVideoList: []
  }

  componentDidMount() {
    const { manage: { getCourses } } = this.props;
    getCourses();
  }

  onUploadVisiable = () => {
    const { manage: { update } } = this.props;
    update({
      courseVisiable: true
    });
  }

  uploadImg = (e) => {
    this.setState({ fileList: e.fileList });
  }

  uploadVideo = (e) => {
    this.setState({ fileVideoList: e.fileList });
  }

  disposeUpload = ({ file }) => {
    if (!file.response) return '';
    return file.response.data.file.path;
  }

  onUploadUnvisiable = () => {
    const { manage: { update } } = this.props;
    update({
      courseVisiable: false
    });
  }

  submitNewCourse = () => {
    const { validateFields } = this.formRef.current;
    validateFields().then((params) => {
      const { manage: { postCourse } } = this.props;
      postCourse(params);
    });
  }

  onDelete = (id) => {
    const { manage: { deleteCourse } } = this.props;
    deleteCourse({ id });
  };


  render() {
    const { manage: { courseVisiable, coursesData } } = this.props;
    const { fileList, fileVideoList } = this.state;
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
          onClick={this.onUploadVisiable}
        >
          上传新的课程
        </Button>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          className={styles.list}
          dataSource={coursesData}
          renderItem={item => (
            <List.Item>
              <Card
                className={styles.listitem}
                title={<div>
                  {item.name}
                  {item.price && <span style={{
                    color: 'orange',
                    fontSize: 10,
                    marginTop: 6,
                    marginLeft: 8,
                    verticalAlign: 'bottom'
                  }}
                  >
                    ¥
                    {item.price}
                  </span>}
                </div>}
                extra={<Button type="link" onClick={() => this.onDelete(item.id)}>删除</Button>}
              >
                <div>{item.introduce}</div>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  poster={`${BASE_URL}/${item.coverimg}`}
                  src={`${BASE_URL}/${item.videourl}`}
                  controls
                  style={{ width: '100%' }}
                />
                {/* <img className={styles.img} alt="暂无图片" src={`http:${BASE_URL}/${item.imgurl}`} /> */}
              </Card>
            </List.Item>
          )}
        />
        <Modal
          visible={courseVisiable}
          title="上传新课程"
          onCancel={this.onUploadUnvisiable}
          onOk={this.submitNewCourse}
        >
          <Form
            ref={this.formRef}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 19 }
            }}
            labelCol={{
              xs: { span: 24 },
              sm: { span: 5 },
            }}
          >
            <Form.Item name="name" label="课程名" required>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="课程价格" required>
              <InputNumber />
            </Form.Item>
            <Form.Item name="introduce" label="课程介绍" required>
              <TextArea />
            </Form.Item>
            <Form.Item
              name="coverimg"
              label="封面图"
              required
              getValueFromEvent={this.disposeUpload}
            >
              <Upload
                accept=".img,.jpg,.jpeg"
                action={`${BASE_URL}/file`}
                listType="picture-card"
                onChange={this.uploadImg}
                fileList={fileList}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              name="videourl"
              label="课程图片"
              required
              getValueFromEvent={this.disposeUpload}
            >
              <Upload
                accept=".mp4"
                action={`${BASE_URL}/file`}
                onChange={this.uploadVideo}
                fileList={fileVideoList}
              >
                <Button disabled={fileVideoList.length >= 1}>
                  <UploadOutlined />
                  添加新课程
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Bulletin;
