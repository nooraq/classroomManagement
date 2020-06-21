import * as api from 'src/service/user';
import { action, extendObservable } from 'mobx';
// 可观察属性
const OBSERVABLE = {
  isLogin: true,
  user: {

  },
  selectModule: 'bulletin'
};


class User {
  constructor() {
    extendObservable(this, {
      ...OBSERVABLE
    });
  }

  // eslint-disable-next-line no-unused-vars
  @action.bound async login(data) {
    try {
      // const res = await api.login(data);
      const res = {
        name: '123',
        password: '123'
      };
      if (data.name === res.name && data.password === res.password) {
        this.isLogin = true;
      } else {
        // eslint-disable-next-line no-throw-literal
        throw '账号密码不对';
      }
      this.user = res;
    } catch (err) {
      throw new Error(err);
    }
  }

  @action.bound async logout() {
    try {
      await api.logout();
      this.isLogin = false;
      this.user = '';
    } catch (err) {
      throw new Error(err);
    }
  }

  @action.bound reset() {
    Object.assign(this, OBSERVABLE);
  }

  @action.bound update(data) {
    Object.assign(this, data);
  }
}

export default new User();
