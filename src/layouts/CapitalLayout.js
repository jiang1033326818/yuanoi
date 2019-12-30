import React, { Suspense } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, Popover } from 'antd';
import DocumentTitle from 'react-document-title';
import getPageTitle from '@/utils/getPageTitle';
import { ContainerQuery } from 'react-container-query';
import Context from './MenuContext';
import classNames from 'classnames';
import Media from 'react-media';
import logo from '../../images/logo.png';
import style from './CapitalLayout.less';
import Link from 'umi/link';
import router from 'umi/router';

const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class CapitalLayout extends React.Component {
  state = {
    handList: [
      {
        title: '资金管理',
        icon: 'diff',
        content: [
          {
            key: '1',
            con: '流水导入',
          },
          {
            key: '2',
            con: '确认收支',
          },
          {
            key: '3',
            con: '收支审核',
          },
        ],
      },
      // {
      //   title: '辅助做账',
      //   icon: 'form',
      //   content: [
      //     {
      //       key: '4',
      //       con: '确认凭证',
      //     },
      //     {
      //       key: '5',
      //       con: '凭证审核',
      //     },
      //     {
      //       key: '6',
      //       con: '导出',
      //     },
      //   ],
      // },
      {
        title: '管理报表',
        icon: 'bar-chart',
        content: [
          {
            key: '7',
            con: '资金日记账',
          },
          {
            key: '8',
            con: '收入支出统计',
          },
          {
            key: '9',
            con: '对账',
          },
        ],
      },
      {
        title: '系统设置',
        icon: 'setting',
        content: [
          {
            key: '10',
            con: '公司设置',
          },
          {
            key: '11',
            con: '银行账户设置',
          },
          {
            key: '12',
            con: '收支类型设置',
          },
          {
            key: '13',
            con: '成员管理',
          },
          {
            key: '14',
            con: '权限分配',
          },
        ],
      },
    ],
    collapsed: false,
  };
  componentDidMount() {
    this.setState({
      tishi1: localStorage.getItem('tishi1'),
    });
    const {
      dispatch,
      route: { routes, path, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, path, authority },
    });
    dispatch({
      type: 'capitals/fetch',
      callback:(res)=>{
        console.log(res.result,'------------')
        localStorage.setItem('menList',JSON.stringify(res.result));
      }
    });
    // console.log(this.props,'-=-=-=------------===========')
  }
  toMine = () => {
    router.push({
      pathname: '/capmine',
    });
  };
  toIndex = () => {
    router.push({
      pathname: '/capital/index',
    });
  };
  capTap = (index, ind) => {
    switch (index) {
      case 0:
        switch (ind) {
          case 0:
            router.push({
              pathname: '/capital/leading',
            });
            break;
          case 1:
            router.push({
              pathname: '/capital/confirms',
            });
            break;
          case 2:
            router.push({
              pathname: '/capital/examine',
            });
            break;
        }
        break;
      case 1:
        switch (ind) {
          case 0:
              router.push({
                pathname: '/capital/diary',
              });
            break;
          case 1:
              router.push({
                pathname: '/capital/count',
              });
            break;
          case 2:
              router.push({
                pathname: '/capital/check',
              });
            break;
        }
        break;
      // case 2:
      //   switch (ind) {
      //     case 0:
      //       break;
      //     case 1:
      //       break;
      //     case 2:
      //       break;
      //   }
      //   break;
      case 2:
        switch (ind) {
          case 0:
            router.push({
              pathname: '/capital/company',
            });
            break;
          case 1:
            router.push({
              pathname: '/capital/account',
            });
            break;
          case 2:
            router.push({
              pathname: '/capital/budget',
            });
            break;
          case 3:
            router.push({
              pathname: '/capital/member',
            });
            break;
          case 4:
            router.push({
              pathname: '/capital/jurisdiction',
            });
            break;
        }
        break;
      default:
        router.push({
          pathname: '/capital/index',
        });
        break;
    }
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  goOut = () => {
    router.push({
      pathname: '/caplogin',
    });
  };
  render() {
    let {
      layout: PropsLayout,
      children,
      location: { pathname },
      breadcrumbNameMap,
      fixedHeader,
      menuData,
      isMobile,
    } = this.props;
    let { handList } = this.state;
    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const content = (
      <div className={style.hoverCard}>
        <p>我的订单</p>
        <p onClick={this.toMine}>个人中心</p>
        <p onClick={this.toIndex}>返回首页</p>
      </div>
    );
    let rightTop = (
      <div className={style.rightTop}>
        <span>帮助</span>
        <span>欢迎您</span>
        <Popover placement="bottom" trigger="hover" content={content}>
          <img src="" alt="" />
        </Popover>
        <span onClick={this.goOut}>退出</span>
      </div>
    );
    const layout = (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          // style={{background:"#343a40"}}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <h1 className={style.titleName}>{this.state.collapsed ? '资金' : '资金管理系统'}</h1>
          <Menu
            // style={{background:"#343a40"}}
            theme="dark"
            mode="inline"
          >
            {handList.map((item, index) => (
              <SubMenu
                key={'sub' + index + 1}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {item.content.map((it, ind) => (
                  <Menu.Item key={it.key} onClick={() => this.capTap(index, ind)}>
                    {it.con}
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>{rightTop}</Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <div className={style.max}>
              <div className={style.tiao}></div>
              <div className={style.minBox}>
                {children}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>{layout}</DocumentTitle>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting,capitals, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
  capitals
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <CapitalLayout {...props} isMobile={isMobile} />}
  </Media>
));
