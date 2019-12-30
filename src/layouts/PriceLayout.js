import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import styles from './UserLayout.less';

class UserLayout extends Component {
  render() {
    const { children } = this.props;
    return <div className={styles.price}>{children}</div>;
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
