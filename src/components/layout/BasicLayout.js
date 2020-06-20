import React from 'react';
import WithAuth from './WithAuth';
import Header from './Header';
import styles from './BasicLayout.less';

class BasicLayout extends React.Component {
  render() {
    const {
      routeContent
    } = this.props;
    return (
      <div className={`${styles.layout}`}>
        <Header />
        {routeContent}
      </div>
    );
  }
}

export default WithAuth(BasicLayout);
