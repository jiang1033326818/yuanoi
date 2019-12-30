import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, message, Form } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import { connect } from 'dva';
import logo from '../../../images/header.png'
import router from 'umi/router';



@connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/submit'],
}))
export default class GlobalHeaderRight extends PureComponent {


  state={
    houtai:"系统后台",
  }



  componentDidMount() {
    const {dispatch} =this.props
    let a=window.location.pathname.slice(0,6)
    console.log(a)
    if(a==="/chat/"){
        this.setState({
          houtai:"系统后台",
        })
    }else{
      this.setState({
        houtai:"个人中心",
      })
    }
    dispatch({
      type: 'user/fetchCurrent',
    });

  }

  changehoutai=(e)=>{
    if(this.state.houtai==='系统后台'){
      this.setState({
        houtai:"个人中心"
      })
      router.push({
        pathname:"/admin/originnext"
      })
    }else{
      this.setState({
        houtai:"系统后台"
      })
      router.push({
        pathname:"/chat/chat"
      })
    }
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  loginout=(e)=>{
    console.log("退出登录")
    router.push({
      pathname:'/user/login'
    })
  }

  render() {
    const {
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      user,
      theme,
    } = this.props;

    // console.log(user)
    // if(user.currentUser.code===10005){
    //   router.push({
    //     pathname: '/user/login',
    //   });
    // }

    const {currentUser} =user
    const currentUser2={
      name:"姜海鹏",
      avatar:logo,
    }
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>

        {currentUser ? (
          <span className={`${styles.action} ${styles.account}`} onClick={this.loginout} >
              {/* <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser2.avatar}
                alt="avatar"
              /> */}
            退出登录
              <span className={styles.name}>{currentUser.result[0].nickname}</span>
            </span>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        {/*这里是国际化的内容,我要把它注释掉然后改成各个面板*/}
        <span onClick={this.changehoutai} style={{  cursor: "pointer"}}>{this.state.houtai}</span>
      </div>
    );
  }
}
