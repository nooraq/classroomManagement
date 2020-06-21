import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { withRouter } from 'react-router-dom';
import Routes from 'src/router/Routes';
import styles from './Layout.less';

class Layout extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <div className={styles['layout-wrap']}>
          <Routes />
        </div>
      </ConfigProvider>
    );
  }
}
export default withRouter(Layout);
