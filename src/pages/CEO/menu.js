import  React from 'react';
import { Menu, Icon} from 'antd';
import { connect } from 'dva';
import styles from './index.less'
import router from 'umi/router';




class App extends React.Component {
  state={
    current: 'fetch',
  }

  componentDidMount() {
    // const {
    //   dispatch,
    //   route: { routes, path, authority },
    // } = this.props;
    // dispatch({
    //   type: 'menu/getMenuData',
    //   payload: { routes, path, authority },
    // });
  }



  handleClick = e => {
    const { dispatch} =this.props
    dispatch({
      type: 'menu/' + e.key,
    });
    router.push({
      pathname: '/admin/'+e.key,
    });
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <div className={styles.menubody}>

        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="fetch" className={styles.bordergo}>
            组织架构
          </Menu.Item>
          <Menu.Item key="fetch2" className={styles.bordergo}>
            重大任务
          </Menu.Item>
          <Menu.Item key="fetch3" className={styles.bordergo}>
            年度目标
          </Menu.Item>
          <Menu.Item key="fetch4" className={styles.bordergo}>
            公司数据
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
