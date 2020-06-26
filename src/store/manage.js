import * as api from 'src/service/manage';
import { action, extendObservable } from 'mobx';

const OBSERVABLE = {
  bulletinData: [],
  bulletinVisiable: false,
  fileList: [],
  commentData: [],
  commentVisiable: false,
  coursesData: [],
  courseVisiable: false,
  dataData: [],
  dataVisiable: false
};

class Manage {
  constructor() {
    extendObservable(this, {
      ...OBSERVABLE
    });
  }

  @action.bound reset() {
    Object.assign(this, OBSERVABLE);
  }

  @action.bound update(data) {
    Object.assign(this, data);
  }

  @action.bound async postBulletin(params) {
    await api.postBulletin(params);
    this.bulletinVisiable = false;
    this.getBulletins();
    this.fileList = [];
  }

  @action.bound async getBulletins() {
    const res = await api.getBulletins();
    this.bulletinData = res;
  }

  @action.bound async deleteBulletin(params) {
    await api.deleteBulletin(params);
    this.getBulletins();
  }

  @action.bound async getComments() {
    const res = await api.getComments();
    this.commentData = res;
  }

  @action.bound async postComment(params) {
    await api.postComment(params);
    this.commentVisiable = false;
    this.fileList = [];
    this.getComments();
  }

  @action.bound async deleteComment(params) {
    await api.deleteComment(params);
    this.getComments();
  }

  @action.bound async deleteMaterials(params) {
    await api.deleteMaterials(params);
    this.getData();
  }

  @action.bound async getCourses(params) {
    this.coursesData = await api.getCourses(params);
  }

  @action.bound async postCourse(params) {
    await api.postCourse(params);
    this.courseVisiable = false;
    this.getCourses();
  }

  @action.bound async deleteCourse(params) {
    await api.deleteCourse(params);
    this.getCourses();
  }

  @action.bound async getData(params) {
    this.dataData = await api.getData(params);
  }

  @action.bound async postData(params) {
    await api.postData(params);
    this.dataVisiable = false;
    this.getData();
  }
}

export default new Manage();
