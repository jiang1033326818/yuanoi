import  React from 'react';
import { Menu, Icon} from 'antd';
import { connect } from 'dva';





class App extends React.Component {
  state={
    current: 'mail',
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
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="fetch">
          <Icon type="mail" />
          组织架构
        </Menu.Item>
        <Menu.Item key="fetch2">
          <Icon type="edit" />
          重大任务
        </Menu.Item>
        <Menu.Item key="fetch3">
          <Icon type="rise" />
          年度目标
        </Menu.Item>
      </Menu>
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
