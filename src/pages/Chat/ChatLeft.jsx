import React from 'react';
import { connect } from 'dva';

import style from './ChatLeft.less';
import Sousuo from './Sousuo';
import Group from './Group';

import add from '../../../images/chat/+@2x.png';
import styles from '../Admin/origin.less';
import { Spin } from 'antd';


@connect(({ userlist, chatabout, groups, loading }) => ({
  userlist,
  chatabout,
  groups,
  loading: loading.effects['userlist/fetch'],
}))

class ChatLeft extends React.Component {
  state = {
    userList: [],
    users: [],
    isShowGroup: false,
    ind: null,
    chating: {},
    chooseUser: {},
    souList: [],
    isSou: false,
    spin:true,
  };
  componentDidMount() {
    // 获取列表
    this.getGroups();
    console.log(this.props,'--------')

    if(localStorage.getItem("first")==="0"){
      setTimeout(() => {
        this.setState({
          spin:false
        })
        localStorage.setItem("first",'1')
      },5000)
    }else{
      this.setState({
        spin:false
      })
    }




  }
  componentWillReceiveProps(nextprops) {
    let c = nextprops.chatabout.lastList;
    // if(!this.props.chatabout.lastList.length){
    this.getChatList(c);
    // }
  }
  // 添加群组
  addGroup = userList => {
    let { users } = this.state;
    userList = userList.concat(...users);
    // console.log(this.props.chatabout.lastList,userList,'建群成功了吗')
    this.getChatList(this.props.chatabout.lastList);
    this.setState({
      userList: userList,
    });
  };
  // 获取用户列表
  getUsers = () => {
    let { dispatch } = this.props;
    dispatch({
      type: 'userlist/fetch',
      callback: res => {
        // console.log(res,'fetchUser');
        let { userList } = this.state;
        let users = res.result ? res.result : [];
        userList.push(...users);
        this.setState({
          userList,
          users,
        });
      },
    });
  };
  // 获取群列表
  getGroups = () => {
    let { dispatch } = this.props;
    dispatch({
      type: 'groups/fetch',
      callback: res => {
        // console.log(res,'setGroup')
        let userList = res.result ? res.result : [];
        this.setState({
          userList:userList.length===undefined?[]:userList,
        });
        this.getUsers();
      },
    });
  };
  // 展示
  showGroup = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    let { dispatch, groups } = this.props;
    dispatch({
      type: 'groups/show',
      payload: !groups.isGroupShow,
    });
    dispatch({
      type: 'groups/adds',
      payload: false,
    });
  };
  // 搜索
  sousuo = val => {
    let { dispatch } = this.props;
    val = val.trim();
    if (val !== '') {
      dispatch({
        type: 'chatabout/fetch',
        payload: {
          words: val,
        },
        callback: res => {
          // console.log(res,'fetch');
          if (res.result.groups && res.result.users) {
            let souList = res.result.groups.concat(res.result.users);
            // console.log(souList,'souList')
            this.setState({
              souList,
              isSou: true,
            });
          }
          // let userList = res.result?res.result:[]
          // this.setState({
          //     userList
          // });
        },
      });
    } else {
      this.setState({
        isSou: false,
      });
    }
  };
  //
  chooseThis = (item, ind) => {
    let { userList } = this.state;
    let { dispatch } = this.props;
    // userList[ind].noRead = 0;
    // console.log(userList[ind],ind)
    // console.log(item,ind)
    this.props.showR ? this.props.showR() : '';
    this.setState({
      ind,
      chating: item,
      isSou: false,
    });
    dispatch({
      type: 'chatabout/choose',
      payload: { ...item },
    });
  };
  // 获取会话列表
  getChatList = list => {
    // console.log(list)
    let { userList, chating } = this.state;
    //  console.log("jiang",userList.length)
    let lists = userList.map((item, ind) => {
      let haslast = list.find(it => it.targetId == item.no || it.targetId == item.id);
      // list.map((it,ind)=>{
      //     if(it.targetId==item.no||it.targetId==item.id){
      //         item.lastMsg = it.latestMessage.content.messageName=="TextMessage"?
      //         RongIMLib.RongIMEmoji.symbolToEmoji(it.latestMessage.content.content):
      //         '[图片]'
      //         // item.lastMsg = RongIMLib.RongIMEmoji.symbolToEmoji(it.latestMessage.content.content);
      //         item.sentTime = it.sentTime;
      //         item.noRead = it.unreadMessageCount;
      //         console.log(ind,it,item)
      //     }
      // })
      for (var i = 0; i < list.length; i++) {
        if (list[i].targetId == item.no || list[i].targetId == item.id) {
          item.lastMsg =
            list[i].latestMessage.content.messageName == 'TextMessage'
              ? RongIMLib.RongIMEmoji.symbolToEmoji(list[i].latestMessage.content.content)
              : list[i].latestMessage.content.messageName == 'ImageMessage'?'[图片]':'[文件]';
          // item.lastMsg = RongIMLib.RongIMEmoji.symbolToEmoji(it.latestMessage.content.content);
          item.sentTime = list[i].sentTime;
          item.noRead = list[i].unreadMessageCount;
          // console.log(ind,list[i],item)
        }
      }
      // console.log(haslast)
      if (haslast) {
        // console.log(ind,list,haslast.latestMessage.content,'haslast')
        // item.lastMsg = (haslast.latestMessage.content.content);
        // item.lastMsg = haslast.latestMessage.content.messageName=="TextMessage"?
        // RongIMLib.RongIMEmoji.symbolToEmoji(haslast.latestMessage.content.content):
        // '[图片]'
        // // item.lastMsg = RongIMLib.RongIMEmoji.symbolToEmoji(haslast.latestMessage.content.content);
        // item.sentTime = haslast.sentTime;
        // item.noRead = haslast.unreadMessageCount;
      }
      // console.log(item)
      return item;
    });
    // console.log(lists)
    // this.setState({
    //     userList
    // })
    this.userSort(lists, chating);
  };
  // 排序列表
  userSort = (userList, chating) => {
    // console.log(userList,chating)
    var max = -Infinity;
    var someList = userList.filter(item => item.sentTime);
    var elseList = userList.filter(item => !item.sentTime);
    for (var i = 0; i < someList.length - 1; i++) {
      for (var j = 0; j < someList.length - 1 - i; j++) {
        if (someList[j].sentTime < someList[j + 1].sentTime) {
          var temp;
          temp = someList[j];
          someList[j] = someList[j + 1];
          someList[j + 1] = temp;
        }
      }
    }
    let { isSou, souList } = this.state;
    // console.log(userList,elseList,'fbwkuefwe')
    userList = someList.concat(elseList);
    // console.log(userList[0],'-----------------------')
    let list = isSou ? souList : userList;
    list.map((it, index) => {
      if ((chating.no && chating.no == it.no) || (chating.id && chating.id == it.id)) {
        this.setState({
          ind: index,
        });
      }
      return it;
    });

    this.setState({
      userList,
    });
  };
  // 获取时间
  getTime = date => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    seconds = seconds >= 10 ? seconds : '0' + seconds;
    return { year, month, day, hour, minutes, seconds };
  };
  // 时间戳转换为时间
  showDate = time => {
    if (time) {
      let dates = new Date(time);
      let dateNow = new Date();
      let now = this.getTime(dateNow);
      let send = this.getTime(dates);
      if (now.day == send.day) {
        return `${send.hour}:${send.minutes}`;
      } else {
        return `${send.month}月${send.day}日`;
      }
    } else {
      return '';
    }
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    let { userList, isShowGroup, ind, isSou, souList, chating } = this.state;
    let { groups } = this.props;
    let list = isSou ? souList : userList;
    let users = (
      <div className={style.userList}>
        {list.length>0&&list.map((item, index) => (
          <div
            className={index == ind ? style.nowItem : style.userItem}
            key={item.no ? item.no : item.id}
            onClick={() => this.chooseThis(item, index)}
          >
            {/* {index}-{ind} */}
            <img className={style.userImg} src={item.no ? item.avatar : item.image} alt="" />
            <div className={style.userInfo}>
              <div className={style.topInfo}>
                <p className={style.userName}>{item.no ? item.truename : item.name}</p>
                <span>{this.showDate(item.sentTime)}</span>
              </div>
              <p className={style.userChat}>{item.lastMsg}</p>
            </div>
            <p className={item.noRead ? style.noRead : style.read}>{item.noRead}</p>
          </div>
        ))}
      </div>
    );

    if(this.state.spin===true){
      return (
        <Spin tip="正在加载" className={style.centerjiazai2} />
      )
    }else{
      return (
        <div className={style.chatLeft}>
          <div className={style.sousuo}>
            <Sousuo sousuo={this.sousuo} />
            <img onClick={this.showGroup} className={style.add} src={add} />
          </div>
          {groups.isGroupShow ? <Group addGroup={this.addGroup} {...this.props} /> : ''}
          {users}
        </div>
      );
    }


  }
}

export default ChatLeft;
