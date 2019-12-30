import React, { PureComponent } from 'react';
import styles from './index.less';
import { connect } from 'dva';

@connect(({ user, loading }) => ({
    user,
    submitting: loading.effects['user/submit'],
}))

export default class GlobalHeaderRight extends PureComponent {

  componentDidMount() {
    const {dispatch} =this.props
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  render() {
      console.log(this.props)
    const {
        theme,
    } = this.props;
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <p>我的 设置 管理层面板</p>
      </div>
    );
  }
}
