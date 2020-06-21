import * as api from 'src/service/manage';
import { action, extendObservable } from 'mobx';

const OBSERVABLE = {
  bulletinData: [],
  bulletinVisiable: false,
  fileList: []
};

class User {
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
}

export default new User();
