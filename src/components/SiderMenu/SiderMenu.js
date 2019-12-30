import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
// import Link from 'umi/link';
import styles from './index.less';
import { connect } from 'dva';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
// import { title } from '../../defaultSettings';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

let firstMount = true;
@connect(({ loading, user, project }) => ({
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  // @connect(({ loading, user, project }) => ({
  //   listLoading: loading.effects['list/fetch'],
  //   currentUser: user.currentUser,
  //   currentUserLoading: loading.effects['user/fetchCurrent'],
  //   project,
  //   projectLoading: loading.effects['project/fetchNotice'],
  // }))

  componentDidMount() {
    firstMount = false;
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile, currentUser } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
    });
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        {/*<div className={styles.logo} id="logo">*/}
        {/*  <Link to="/">*/}
        {/*    <img src={logo} alt="logo" />*/}
        {/*    <h1>{title}</h1>*/}
        {/*  </Link>*/}
        {/*</div>*/}

        <div className={styles.avatarHolder}>
          <img alt="" src={currentUser.avatar} />
          <div className={styles.name}>{currentUser.name}</div>
          <div className={styles.samecolor}>{currentUser.signature}</div>
        </div>

        <Suspense fallback={<PageLoading />}>
          <BaseMenu
            {...this.props}
            mode="inline"
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            style={{ padding: '16px 0', width: '100%' }}
            {...defaultProps}
          />
        </Suspense>
      </Sider>
    );
  }
}
