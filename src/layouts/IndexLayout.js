import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import logo from '../../images/logo.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import getPageTitle from '@/utils/getPageTitle';
import styles from './IndexLayout.less';
import tishi1 from '../../images/admin/tishi1.png';
import router from 'umi/router';

// lazy load SettingDrawer
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

class BasicLayout extends React.Component {
  state = {
    tishi1: 'none',
    tishi2: 'none',
    tishi3: 'none',
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
  }

  tologin=()=>{
    router.push({
      pathname:"/user/login"
    })
  }

  toregister=()=>{
    router.push({
      pathname:'ceo/register'
    })
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

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

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
    } = this.props;
    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <Layout>
        <Layout>
          <Content className={styles.content} style={contentStyle}>
            <div className={styles.index}>
                <div className={styles.box1}>
                  <img src='https://statics.oi.yuanoi.com/longshenicon_blue.png' alt="" />
                  <div>
                    <span onClick={this.tologin}>登录</span>
                    |
                    <span onClick={this.toregister}>注册</span>
                  </div>
                </div>
                <div className={styles.box2}>
                  <img src="https://statics.oi.yuanoi.com/simple_index.png" alt=""/>
                </div>
                <div className={styles.box3}>
                  <h2>从<span> 营销驱动 </span> 公司变为<span> 数据驱动 </span> 公司，你准备好了吗？</h2>
                  <p>欢迎使用</p>
                  <img src='https://statics.oi.yuanoi.com/OAbangong.png' alt=""/>
                </div>
                <div className={styles.box4}>
                  <h2>龙神OI系统  <span>五大面板</span> ，满足全员工作需求</h2>
                  <div className={styles.mianban}>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/ceomianban.png" alt=""/>
                      <p>查看公司全部数据， 用数据做决策</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/guanlicengmianban.png" alt=""/>
                      <p>实时掌握下属 状态、数据、产出</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/renshimianban.png" alt=""/>
                      <p>专业人事工作台，掌握 处理公司全部人事数据</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/caiwumianban.png" alt=""/>
                      <p>专业财务工作台，掌握 处理公司全部财务数据</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/yuangongmianban.png" alt=""/>
                      <p>全能工具箱， 全模块线上智能化</p>
                    </div>
                  </div>
                </div>
                <div className={styles.box5}>
                  <h2>龙神公司<span>愿景</span></h2>
                  <div className={styles.yuanjing}>
                    <div className={styles.yuanjing_left}>
                      <img src="https://statics.oi.yuanoi.com/yuanjing.png" alt=""/>
                    </div>

                    <div className={styles.yuanjing_right}>
                      <div className={styles.item}>
                        <img src="https://statics.oi.yuanoi.com/gou.png" alt=""/>
                        <span>帮助企业工作简单化</span>
                      </div>
                      <div className={styles.item}>
                        <img src="https://statics.oi.yuanoi.com/gou.png" alt=""/>
                        <span>基础工作程序化</span>
                      </div>
                      <div className={styles.item}>
                        <img src="https://statics.oi.yuanoi.com/gou.png" alt=""/>
                        <span>核算工作智能化</span>
                      </div>
                      <div className={styles.item}>
                        <img src="https://statics.oi.yuanoi.com/gou.png" alt=""/>
                        <span>管理工作工具化</span>
                      </div>
                    </div>

                  </div>
                </div>
                <div className={styles.box6}>
                  <h2>龙神OI系统 <span>特色工具</span></h2>
                  <div className={styles.gongju}>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/yimiao.png" alt=""/>
                      <p>1秒建设好企业文化</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/sanmiaoyuyue.png" alt=""/>
                      <p>3秒钟预约会议室</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/shishishengcheng.png" alt=""/>
                      <p>实时生成公司数据表</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/yijianshengcheng.png" alt=""/>
                      <p>一键生成组织架构图</p>
                    </div>
                  </div>
                </div>
                <div className={styles.box7}>
                  <h2>万能集成工具箱</h2>
                  <div className={styles.gongjuxiang}>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/jishiliaotian.png" alt=""/>
                      <p>即时聊天</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/ruzhidengji.png" alt=""/>
                      <p>入职登记</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/xinchouqueren.png" alt=""/>
                      <p>薪酬确认</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/kaoqindaka.png" alt=""/>
                      <p>考勤打卡</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/qingjia.png" alt=""/>
                      <p>请假</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/zhuanzheng.png" alt=""/>
                      <p>转正</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/tiaogangxin.png" alt=""/>
                      <p>调岗、薪</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/lizhi.png" alt=""/>
                      <p>离职</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/yuyuehuiyishi.png" alt=""/>
                      <p>预约会议室</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/yuyueyongche.png" alt=""/>
                      <p>预约用车</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/beiyongjinshenqing.png" alt=""/>
                      <p>备用金申请</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/baoxiao.png" alt=""/>
                      <p>报销</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/hetongshenpi.png" alt=""/>
                      <p>合同审批</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/caigoushenpi.png" alt=""/>
                      <p>采购审批</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/dingdanshenpi.png" alt=""/>
                      <p>订单申请</p>
                    </div>
                    <div className={styles.item}>
                      <img src="https://statics.oi.yuanoi.com/qiyefengcaiquan.png" alt=""/>
                      <p>企业风采圈</p>
                    </div>
                  </div>
                </div>
              <div className={styles.footer}>
                <h4>客服电话：010-65821884</h4>
                <p>北京元极集成科技发展有限公司 </p>
                <p>京ICP备19040704号-1 Copyright</p>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
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
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
