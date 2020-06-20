import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon, message } from 'antd';

import { observer, inject } from 'mobx-react';
import { history, PATHS } from 'src/router';
import styles from './BasicLayout.less';

const { SubMenu, Item: MenuItem } = Menu;

@inject('user')
@observer
class Header extends Component {
  toggleSider = () => {
    const {
      layout: { foldSidebar, update },
    } = this.props;
    update({
      foldSidebar: !foldSidebar
    });
  }

  handleClickMenu = async ({ key }) => {
    const {
      user: { logout },
    } = this.props;
    if (key === 'logout') {
      try {
        await logout();
        history.replace(PATHS.LOGIN);
      } catch (err) {
        message.error(err.message);
      }
    }
  }

  render() {
    const {
      user: { user }
    } = this.props;
    return (
      <div className={styles['layout-hd']}>
        <div className={styles['toggle-sider-btn']} onClick={this.toggleSider}>
        </div>
        <
        <Menu
          mode="horizontal"
          className={styles['layout-logout']}
          onClick={this.handleClickMenu}
          selectedKeys={[]}
        >
          <SubMenu
            title={(
              <span>
                <Icon
                  type="user"
                />
                {user.name}
              </span>
          )}
          >
            <MenuItem key="logout">注销</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Header);
