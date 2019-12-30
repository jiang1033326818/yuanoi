import React, { PureComponent } from 'react';
import { Form, Icon } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import FlowRight from './FlowRight';
import { title } from '../../defaultSettings';
import { connect } from 'dva';

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  setpanel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/checkmianban',
      payload: {
        index: 0,
      },
    });
  };
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        <div className={styles.logo} onClick={this.setpanel} id="logo">
          <Link to="/admin/index">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </Link>
        </div>
        {/*{isMobile && (*/}
        {/*  <Link to="/" className={styles.logo} key="logo">*/}
        {/*    <img src={logo} alt="logo" width="32" />*/}
        {/*  </Link>*/}
        {/*)}*/}
        {/*<span className={styles.trigger} onClick={this.toggle}>*/}
        {/*  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />*/}
        {/*</span>*/}
        <RightContent {...this.props} />
        {/* <FlowRight {...this.props} /> */}
      </div>
    );
  }
}
