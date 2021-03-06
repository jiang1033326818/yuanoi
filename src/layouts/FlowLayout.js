import React , {Suspense} from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import getPageTitle from '@/utils/getPageTitle';
import { ContainerQuery } from 'react-container-query';
import Context from './MenuContext';
import classNames from 'classnames';
import Media from 'react-media';
import Header from './Header';
import logo from '../../images/logo.png';

const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

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

class FlowLayout extends React.Component{
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
    }
    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
          location,
          breadcrumbNameMap,
        };
    }
    renderSettingDrawer = () => {
        // Do not render SettingDrawer in production
        // unless it is deployed in preview.pro.ant.design as demo
        // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
        if (
          process.env.NODE_ENV === 'production' &&
          ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION !== 'site'
        ) {
          return null;
        }
        return <SettingDrawer />;
    };
    handleMenuCollapse = collapsed => {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload: collapsed,
      });
    };
    render(){
        let {
            layout: PropsLayout,
            children,
            location: { pathname },
            breadcrumbNameMap,
            fixedHeader,
            menuData,
            isMobile
        } = this.props;
        console.log(this.props)
        const isTop = PropsLayout === 'topmenu';
        const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
        const layout = (
            <Layout style={{ height: '100%' }}>
                <Header
                  menuData={menuData}
                  handleMenuCollapse={this.handleMenuCollapse}
                  logo={logo}
                  isMobile={isMobile}
                  {...this.props}
                />
                <Content>{children}</Content>
            </Layout>
        )
        return (
            <React.Fragment>
                <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <ContainerQuery query={query}>
                    {params => (
                    <Context.Provider value={this.getContext()}>
                        <div className={classNames(params)} style={{height:"100%"}} >{layout}</div>
                    </Context.Provider>
                    )}
                </ContainerQuery>
                </DocumentTitle>
                <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
            </React.Fragment>
        )
    }
}

export default connect(({ global, setting, menu: menuModel }) => ({
    collapsed: global.collapsed,
    layout: setting.layout,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    ...setting,
  }))(props => (
    <Media query="(max-width: 599px)">
      {isMobile => <FlowLayout {...props} isMobile={isMobile} />}
    </Media>
  ));
