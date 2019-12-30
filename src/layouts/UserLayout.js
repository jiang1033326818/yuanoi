import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Icon, Button } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import getPageTitle from '@/utils/getPageTitle';
import topicon from  '../../images/longshenicon.png'

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright"/> 2019 云钱袋
  </Fragment>
);

class UserLayout extends Component {
  state={
    reglogin:"login"
  }

  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    console.log(this.props.location)

    if(this.props.location.pathname==="/user/register"){
      this.setState({
        reglogin:"register"
      })
    }else{
      this.setState({
        reglogin:"login"
      })
    }

    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  toregister=()=>{
    console.log(this.state.reglogin)
    if(this.state.reglogin==="login"){
      router.push('/ceo/register');
      // this.setState({
      //   reglogin:"register"
      // })
    }else{
      router.push('/user/login');
      this.setState({
        reglogin:"login"
      })
    }

  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container}>
          {/*<div className={styles.lang}>*/}
          {/*  <SelectLang />*/}
          {/*</div>*/}

          <div className={styles.Topicon}>
            <img src={topicon} alt="" />
          </div>

          <div className={styles.Topthree}>
            <Button type="primary" shape="round" className={styles.buttonSize} onClick={this.toregister} >
              {this.state.reglogin==="login"?"免费注册":"立即登录"}
            </Button>

            <Link to="/">
              <span className={styles.topbutton}>关于我们</span>
            </Link>

            <Link to="/">
              <span className={styles.topbutton}>帮助中心</span>
            </Link>

          </div>


          <div className={styles.content}>
            {/*<div className={styles.top}>*/}
            {/*  <div className={styles.header}>*/}
            {/*    <Link to="/">*/}
            {/*      <img alt="logo" className={styles.logo} src={logo} />*/}
            {/*      <span className={styles.title}>云钱袋</span>*/}
            {/*    </Link>*/}
            {/*  </div>*/}
            {/*  <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>*/}
            {/*</div>*/}
            {children}
          </div>
          {/*<GlobalFooter links={links} copyright={copyright} />*/}
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
