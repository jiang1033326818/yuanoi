import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import router from 'umi/router';


class App extends React.Component {
  state = {
    current: 'fetch2',
  };

  componentDidMount() {
    let a = window.location.pathname;
    if (a === '/admin/index') {
      this.setState({
        current: 'fetch',
      });
    }else{
      this.setState({
        current: 'fetch2',
      });
    }
    console.log(a);
  }


  handleClick = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/' + e.key,
    });
    // router.push({
    //   pathname: '/admin/'+e.key,
    // });
    if (e.key == 'fetch2') {
      router.push({
        pathname: '/flow/index',
      });
    } else if (e.key == 'fetch') {
      router.push({
        pathname: '/admin/index',
      });
    }
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <div className={styles.menubody}>

        <Menu onClick={this.handleClick} className={styles.maxMenu} selectedKeys={[this.state.current]}
              mode="horizontal">
          <Menu.Item key="fetch" className={styles.bordergo}>
            组织架构部署
          </Menu.Item>
          <Menu.Item key="fetch2" className={styles.bordergo}>
            流程部署
          </Menu.Item>
          <Menu.Item key="fetch3" className={styles.bordergo}>
            数据部署
            {/* 增减管理员 */}
          </Menu.Item>
          <Menu.Item key="fetch4" className={styles.bordergo}>
            权限部署
            {/* 更新企业信息 */}
          </Menu.Item>
          <Menu.Item key="three" className={styles.bordergo}>
            {/* 三步完成部署 */}
          </Menu.Item>
        </Menu>

      </div>

    );
  }
}

export default connect(({ global, setting, menu: menuModel }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  ...setting,
}))(App);
