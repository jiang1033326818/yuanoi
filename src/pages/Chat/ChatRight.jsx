import React from 'react';
import { connect } from 'dva';
import { Icon, Spin } from 'antd';

import style from './ChatRight.less';
import More from './More';
import Historys from './Historys';
import qiniu from '../../../scripts/qiniu';
import upload from '../../../scripts/upload';
import UploadClient from '../../../scripts/init';

import more from '../../../images/chat/more@2x.png';
import smile from '../../../images/chat/smile@2x.png';
import minenew from '../../../images/chat/minenew@2x.png';
import myfile from '../../../images/chat/folder.png';
import myfiles from '../../../images/chat/myfile.png';
import styles from '../Admin/origin.less';

@connect(({ userlist, chatabout, allclick,groups, loading }) => ({
  userlist,
  chatabout,
  allclick,
  groups,
  loading: loading.effects['chatabout/fetch'],
}))
class chatRight extends React.Component {
  state = {
    hasmore: true,
    isShowEmoji: false,
    isShowHistory: false,
    myToken: '',
    chating: {},
    chatList: [],
    showThisImg: '',
    isShowImg: false,
    emoliList: [],
    // num:0,
    showTip: false,
    hasMoreTip: false,
    getHis: false,
    spin:true,
  };
  componentDidMount() {
    this.chatInit();
    if (this.refs.chatShow) {
      let obj = this.refs.chatShow;
      this.addEvent(obj, 'mousewheel', this.wheel);
      this.addEvent(obj, 'DOMMouseScroll', this.wheel);
    }
    this.refs.chatarea ? this.refs.chatarea.addEventListener('keydown', this.sendEasy) : '';
    // this.clear("942488")
  }
  clear = id =>{
    var params = {
      conversationType: RongIMLib.ConversationType.PRIVATE,
      targetId: id,
      timestamp: 1513308018122 // 可取 sentTime, 收发消息和历史消息中都有 sentTime 字段
    };
    RongIMLib.RongIMClient.getInstance().clearRemoteHistoryMessages(params, {
      onSuccess: function() {
        console.log('清除成功');
      },
      onError: function(error) {
        console.log('清除失败', error);
      }
    });
  }
  wheel = e => {
    var ev = window.event || e;
    var dir = -ev.detail || ev.wheelDelta;
    let { num } = this.state;
    var a = 0;
    if (dir > 0) {
      if (this.refs.chatShow) {
        let { chating } = this.state;
        let list = this.refs.chatShow;
        let top = list.scrollTop;
        let one = RongIMLib.ConversationType.PRIVATE;
        let group = RongIMLib.ConversationType.GROUP;
        if (top <= 10) {
          list.scrollTop = 10;
          // if(num>3){
          //     this.setState({
          //         showTip:true
          //     })
          //     return ;
          // }
          num++;
          if (num == 1) {
            if (chating.no) {
              this.getHistory(one, `${chating.no}`, null, 20);
            } else {
              this.getHistory(group, `${chating.id}`, null, 20);
            }
          }
          this.setState({
            num,
          });
        }
      }
    }
  };
  addEvent = (obj, type, fn) => {
    if (document.addEventListener) {
      obj.addEventListener(type, fn, false);
    } else {
      obj.attachEvent('on' + type, fn);
    }
  };
  componentWillReceiveProps(nextprops) {
    // console.log(nextprops,'chatright')
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    let chating = nextprops.chatabout.nowChoose;
    if (
      this.props.chatabout.nowChoose.no !== nextprops.chatabout.nowChoose.no ||
      this.props.chatabout.nowChoose.id !== nextprops.chatabout.nowChoose.id
    ) {
      // console.log(this.props.chatabout.nowChoose,nextprops.chatabout.nowChoose)
      this.setState({
        chating,
        // hasMoreTip: false
        // num:0
      });
      // console.log(chating,'---------')
      this.refs.chatarea.value = '';
      if (chating.no) {
        this.getHistory(one, `${chating.no}`, 0, 20);
        // this.delNoRead(one,`${chating.no}`)
      } else {
        this.getHistory(group, `${chating.id}`, 0, 20);
        // this.delNoRead(group,`${chating.id}`)
      }
    }
    if (this.props.chatabout.nowChoose !== nextprops.chatabout.nowChoose) {
      if (chating.no) {
        this.delNoRead(one, `${chating.no}`);
      } else {
        this.delNoRead(group, `${chating.id}`);
      }
    }
    let { isToMax, allclick } = nextprops;
    if (!allclick.showMore) {
      // if(isToMax){
      //     this.refs.moreInfo.style.transition = 'all .3s';
      //     this.refs.moreInfo.style.right = 0;
      //     this.refs.moreInfo.style.zIndex = -1;
      // }else{
      if(this.state.spin!==true){
        this.refs.moreInfo.style.zIndex = -1;
      }

      // }
    }
  }
  componentDidUpdate(prev, next) {
    // console.log(prev,next,'==========');
    let { getHis } = this.state;
    if (!getHis) {
      this.scrollBom();
    }
    
  }
  
  // 快捷键
  sendEasy = e => {
    if (this.props.showRight && this.refs.chatarea) {
      if (e.ctrlKey && e.keyCode == 13) {
        this.refs.chatarea.value += `\n`;
        // console.log(this.refs.chatarea.value,'this.refs.chatarea')
        return;
      }
      if (e.keyCode == 13) {
        e.preventDefault();
        this.sendInfo();
      }
    }
  };
  // 初始化聊天
  chatInit = () => {
    let appkey = '3argexb63qyge';
    let { dispatch } = this.props;
    RongIMLib.RongIMClient.init(appkey);
    this.beforeIm();
    dispatch({
      type: 'chatabout/getToken',
      callback: res => {
        this.setState({
          myToken: res.result.token,
        });
        this.nowIm(res.result.token);
        this.getChatList();
      },
    });
  };
  // 查找用户
  userfetch = userId => {
    var user = this.props.userlist.userlist.find(item => item.no == userId);
    return user;
  };
  // 初始化
  beforeIm = () => {
    var _this = this;
    var one = RongIMLib.ConversationType.PRIVATE;
    var group = RongIMLib.ConversationType.GROUP;
    // 连接状态监听器
    RongIMClient.setConnectionStatusListener({
      onChanged: function(status) {
        // status 标识当前连接状态
        switch (status) {
          case RongIMLib.ConnectionStatus.CONNECTED:
            console.log('链接成功');
            break;
          case RongIMLib.ConnectionStatus.CONNECTING:
            console.log('正在链接');
            break;
          case RongIMLib.ConnectionStatus.DISCONNECTED:
            console.log('断开连接');
            break;
          case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
            console.log('其他设备登录');
            break;
          case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
            console.log('域名不正确');
            break;
          case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
            console.log('网络不可用');
            break;
        }
      },
    });
    // 消息监听器
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function(message) {
        // 判断消息类型
        switch (message.messageType) {
          case RongIMClient.MessageType.TextMessage:
            // console.log('8080', message );
            var userId = message.senderUserId;
            var user = _this.userfetch(userId);
            var targetId = message.targetId;
            var { chating } = _this.state;
            let con = message.content.content;
            con = RongIMLib.RongIMEmoji.symbolToEmoji(con);
            if(chating){
              if (chating.no == targetId || chating.id == targetId) {
                _this.newInfo(con, true, 'TextMessage', user);
                chating.no ? _this.delNoRead(one, targetId) : _this.delNoRead(group, targetId);
              }
            }
            _this.getChatList();
            // switch (message.conversationType){}
            break;
          case RongIMClient.MessageType.VoiceMessage:
            var audioFile = message.content.content;
            break;
          case RongIMClient.MessageType.ImageMessage:
            // console.log(message)
            var { userOne, userList } = _this.state;
            // console.log(message)
            var targetId = message.targetId;
            var userId = message.senderUserId;
            var user = _this.userfetch(userId);
            let imgSrc = message.content.imageUri;
            if(chating){
              if (chating.no == targetId || chating.id == targetId) {
                _this.newInfo(imgSrc, true, 'ImageMessage', user);
                chating.no ? delNoRead(one, targetId) : delNoRead(group, targetId);
              }
              _this.getChatList();
            }
            break;
          case RongIMClient.MessageType.FileMessage:
            console.log(message,'ffffffffffffffffffffffff')
            var { userOne, userList } = _this.state;
            // console.log(message)
            var targetId = message.targetId;
            var userId = message.senderUserId;
            var user = _this.userfetch(userId);
            let fileSrc = message.content.fileUrl;
            if(chating){
              if (chating.no == targetId || chating.id == targetId) {
                _this.newInfo(fileSrc, true, 'FileMessage', user);
                chating.no ? delNoRead(one, targetId) : delNoRead(group, targetId);
              }
            }
            _this.getChatList();
            break;
          case RongIMClient.MessageType.LocationMessage:
            break;
          case RongIMClient.MessageType.RichContentMessage:
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            break;
          case RongIMClient.MessageType.CommandMessage:
            break;
          case RongIMClient.MessageType.UnknownMessage:
            break;
          default:
          // do something
        }
      },
    });
  };
  // 连接接口
  nowIm = (token) => {
    // var token = this.state.myToken;
    var _this = this;
    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        console.log('Connect successfully. ' + userId);
        _this.getChatList();
      },
      onTokenIncorrect: function() {
        console.log('token 无效');
      },
      onError: function(errorCode) {
        var info = '';
        switch (errorCode) {
          case RongIMLib.ErrorCode.TIMEOUT:
            info = '超时';
            break;
          case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
            info = '不可接受的协议版本';
            break;
          case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
            info = 'appkey不正确';
            break;
          case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
            info = '服务器不可用';
            break;
        }
        // console.log(info);
      },
    });
  };
  // 获取会话列表
  getChatList = () => {
    var conversationTypes = [RongIMLib.ConversationType.PRIVATE, RongIMLib.ConversationType.GROUP];
    var count = 150;
    var _this = this;
    RongIMClient.getInstance().getConversationList(
      {
        onSuccess: function(list) {
          console.log('获取会话列表成功', list);
          let { dispatch } = _this.props;
          dispatch({
            type: 'chatabout/last',
            payload: list,
          });

          dispatch({
            type: 'groups/last2',
            payload: {
              spin:false
            },
          });


          _this.setState({
            spin:false
          })
          // console.log(userList)
          // _this.getChatOne();
        },
        onError: function(error) {
          console.log('获取会话列表失败', error);
        },
      },
      conversationTypes,
      count
    );
  };
  // 清除未读数
  delNoRead = (conversationType, targetId) => {
    // console.log(conversationType,targetId)
    RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
      onSuccess: function() {
        // console.log('清除指定会话未读消息数成功');
      },
      onError: function(error) {
        console.log('清除指定会话未读消息数失败', error);
      },
    });
  };
  // 点击发送
  sendInfo = () => {
    // this.emojiNone()
    if (this.refs.chatarea) {
      let val = this.refs.chatarea.value;
      RongIMLib.RongIMEmoji.emojiToSymbol(val);
      this.send('text', val);
      this.refs.chatarea.value = '';
      this.refs.chatarea.focus();
    }
  };
  // 滚动到底部
  scrollBom = () => {
    if (this.refs.chatShow) {
      let list = this.refs.chatShow;
      list.scrollTop = list.scrollHeight;
    }
  };
  areaFocus = () => {
    this.scrollBom();
  };
  // 发送新消息
  newInfo = (val, isleft, type, user, fileInfo) => {
    // console.log({val, isleft, type, user},'======================')
    // let {chatList} = this.state;
    let { chatabout, dispatch } = this.props;
    let chatList = chatabout.chatList;
    let {chating} = this.state;
    console.log(this.props,chatabout,chatList,'chatList')
    let b = document.createElement('br');
    chatList.push({
      conversationType:chating.id?3:1,
      messageId: new Date().getTime(),
      isLeft: isleft,
      content: {
        content: val,
        messageName: type,
        imageUri: val,
        fileUrl: val,
        name: fileInfo?fileInfo.name:'',
        size: fileInfo?fileInfo.size:''
      },
      user: user,
      sentTime: new Date().getTime(),
    });
    dispatch({
      type: 'chatabout/chats',
      payload: chatList,
    });
    this.setState({
      chatList
    })
  };
  // 发送消息
  send = (conType, val) => {
    switch (conType) {
      case 'text':
        let { chating } = this.state;
        let one = RongIMLib.ConversationType.PRIVATE;
        let group = RongIMLib.ConversationType.GROUP;
        val = val.trim();
        if (val !== '') {
          chating.no
            ? this.sendText(val, one, `${chating.no}`, chating)
            : this.sendText(val, group, `${chating.id}`, chating);
        }
        break;
      case 'voice':
        break;
      case 'image':
        break;
      case 'location':
        break;
      case 'richContent':
        break;
      case 'information':
        break;
      case 'contact':
        break;
      case 'profile':
        break;
      case 'commandNot':
        break;
      case 'command':
        break;
      case 'unknown':
        break;
      default:
        break;
    }
  };
  // 发送文本消息
  sendText = (val, cType, targetId, info, userIdList = []) => {
    this.newInfo(val, false, 'TextMessage', this.props.userlist.nowUser[0]);
    var isMentioned = true; // @ 消息
    var mentioneds = new RongIMLib.MentionedInfo(); // @ 消息对象
    mentioneds.type = RongIMLib.MentionedType.PART;
    mentioneds.userIdList = userIdList;
    var msg = new RongIMLib.TextMessage({
      content: val,
      user: this.state.nowUser,
      extra: info,
      mentionedInfo: mentioneds,
    });
    var conversationType = cType; // 群聊, 其他会话选择相应的消息类型即可
    // var targetId = `${this.state.chating.no}`; // 目标 Id
    var pushContent = 'user 发送了一条消息'; // Push 显示内容
    var pushData = null; // Push 通知时附加信息, 可不填
    var _this = this;
    RongIMClient.getInstance().sendMessage(
      conversationType,
      targetId,
      msg,
      {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          // console.log('发送文本消息成功', message,message.content.user);
          let val = message.content.content;
          _this.getChatList();
          // val = RongIMLib.RongIMEmoji.symbolToEmoji(val)
          // _this.createEle(_this.state.nowUser.avatar,'p',val)
        },
        onError: function(errorCode) {
          console.log('发送文本消息失败', errorCode);
        },
      },
      isMentioned,
      pushContent,
      pushData,
      null
    );
  };
  // 获取历史聊天记录
  getHistory = (cType, targetId, timestrap, count) => {
    var conversationType = cType;
    // var count = 20;
    var _this = this;
    if (timestrap == 0) {
      this.setState({
        getHis: false,
      });
    } else {
      this.setState({
        getHis: true,
      });
    }
    RongIMLib.RongIMClient.getInstance().getHistoryMessages(
      conversationType,
      targetId,
      timestrap,
      count,
      {
        onSuccess: function(list, hasMsg) {
          // console.log(hasMsg)
          let { userlist, nowUser } = _this.props.userlist;
          // console.log(_this.state.num,'-------------------------')
          _this.setState({
            num: 0,
          });
          if (list.length != 0) {
            list = list.map(item => {
              let userId = item.senderUserId;
              let user = userlist.find(item => item.no == userId);
              let myId = item.targetId;
              item.user = user;
              // console.log(userlist,item,user,'user')
              if (userId == nowUser[0].no) {
                item.isLeft = false;
                item.user = nowUser[0];
              } else {
                item.isLeft = true;
              }
              item.content.content =
                item.content.messageName == 'TextMessage'
                  ? RongIMLib.RongIMEmoji.symbolToEmoji(item.content.content)
                  : item.content.content;
              return item;
            });
          }
          let { dispatch } = _this.props;
          // console.log('获取历史消息成功',timestrap, list);
          if (list.length != 0) {
            let { chatList } = _this.state;
            if (timestrap == 0) {
              chatList = list;
            } else {
              chatList = list.concat(chatList);
            }
            dispatch({
              type: 'chatabout/chats',
              payload: chatList,
            });
            _this.setState({
              chatList,
            });
            if (timestrap == 0) {
              // console.log(timestrap,_this.refs.chatShow.scrollHeight,'-=-=-=-=-=')
              _this.refs.chatShow
                ? (_this.refs.chatShow.scrollTop = _this.refs.chatShow.scrollHeight)
                : '';
            }
          } else {
            if (timestrap == 0) {
              dispatch({
                type: 'chatabout/chats',
                payload: _this.state.chatList,
              });
              console.log(list,'list')
              _this.setState({
                chatList: list,
                num: 0,
              });
            }
            _this.setState({
              hasMoreTip: true,
            });
          }
        },
        onError: function(error) {
          // 请排查：单群聊消息云存储是否开通
          console.log('获取历史消息失败', error);
        },
      }
    );
  };
  // 显示更多
  getmore = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    let { dispatch, allclick, isToMax } = this.props;
    // if(isToMax){
    //     this.refs.moreInfo.style.height = '100%';
    //     if (allclick.showMore) {
    //         this.refs.moreInfo.style.transition = 'all .3s';
    //         this.refs.moreInfo.style.right = 0;
    //         this.refs.moreInfo.style.zIndex = -1;
    //     } else {
    //         this.refs.moreInfo.style.transition = 'all .6s';
    //         this.refs.moreInfo.style.right = '-250px';
    //         this.refs.moreInfo.style.zIndex = -1;
    //     }
    // }else{
    this.refs.moreInfo.style.height = '85%';
    if (allclick.showMore) {
      // this.refs.moreInfo.style.transition = 'all .3s';
      // this.refs.moreInfo.style.right = 0;
      this.refs.moreInfo.style.zIndex = -1;
    } else {
      // this.refs.moreInfo.style.transition = 'all .6s';
      this.refs.moreInfo.style.right = '0';
      this.refs.moreInfo.style.zIndex = 3;
    }
    // }
    dispatch({
      type: 'allclick/more',
      payload: !allclick.showMore,
    });
    dispatch({
      type: 'allclick/emoji',
      payload: false,
    });
    dispatch({
      type: 'allclick/history',
      payload: false,
    });
  };
  // 获取表情图
  getEmoji = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    // this.historyNone()
    var config = {
      size: 25,
      url: '//f2e.cn.ronghub.com/sdk/emoji-48.png',
      lang: 'en',
      extension: {
        dataSource: {
          u1F914: {
            // 自定义 u1F914 对应的表情
            en: 'thinking face', // 英文名称
            zh: '思考', // 中文名称
            tag: '🤔', // 原生 Emoji
            position: '0 0', // 所在背景图位置坐标
          },
        },
        url: '//cdn.ronghub.com/thinking-face.png', // 新增 Emoji 背景图 url
      },
    };
    RongIMLib.RongIMEmoji.init(config);
    var emoliList = RongIMLib.RongIMEmoji.list;
    this.setState({
      emoliList,
    });
    // this.refs.showEmoji.style.display = 'block';
  };
  // 点击表情
  sendEmoji = item => {
    this.refs.chatarea.value += item.emoji;
  };
  // 显示表情
  showEmoji = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    let { dispatch, allclick } = this.props;
    dispatch({
      type: 'allclick/emoji',
      payload: !allclick.showEmoji,
    });
    dispatch({
      type: 'allclick/history',
      payload: false,
    });
    dispatch({
      type: 'allclick/more',
      payload: false,
    });
    this.getEmoji(e);
  };
  // 显示历史记录
  showHistory = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    let { dispatch, allclick } = this.props;
    dispatch({
      type: 'allclick/history',
      payload: !allclick.showHistory,
    });
    dispatch({
      type: 'allclick/emoji',
      payload: false,
    });
    dispatch({
      type: 'allclick/more',
      payload: false,
    });
  };
  // 图片预览
  showImg = (imgSrc, e) => {
    this.props.showImgs(imgSrc, e);
  };
  // 聊天信息显示
  msg = item => {
    console.log('news')
    switch (item.content.messageName) {
      case 'TextMessage':
        let val = item.content.content.split('\n');
        return (
          <p className={item.isLeft ? style.you : ''}>
            {val.map(i => (
              <li>{i}</li>
            ))}
          </p>
        );
        break;
      // case "VoiceMessage":
      //     return (
      //     <p className={item.isLeft?style.you:''}>
      //         {/* <img src={video} alt=""/> */}
      //         不支持该消息，可在手机查看
      //     </p>
      //     )
      //     break;
      case 'ImageMessage':
        // console.log(item,'item.content.messageName')
        return (
          <img
            className={style.chatImg}
            src={item.content.imageUri}
            onClick={e => this.showImg(item.content.imageUri, e)}
            alt=""
          />
        );
        break;
      case 'FileMessage':
        let getSize = size =>{
          if(size/1024<1){
            return size+'B';
          }else if(size/1024>=1&&size/1024<1024){
            return size/1024+'KB';
          }else{
            return size/1024/1024+'MB';
          }
        }
        // console.log(item,'item.content.messageName')
        return (
          <a className={style.myFile} href={item.content.fileUrl}>
            <p className={item.isLeft ? style.you : ''}>
              <div style={{background:item.isLeft ?'#fff':'',display: 'flex',padding: item.isLeft ?'10px 15px':0}}>
                <div className={style.fileInfo}>
                  <span>{item.content.name}</span>
                  <span>{getSize(item.content.size)}</span>
                </div>
                <img src={myfiles} alt=""/>
              </div>
            </p>
          </a>
        );
        break;
      default:
        return <p className={item.isLeft ? style.you : ''}>不支持该消息，可在手机查看</p>;
        break;
    }
  };
  stopEvent = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  // 获取图片路径
  getImage = (_file,fileType,num) =>{
    let {chating} = this.state;
    let _this = this;
    // var fileType = RongIMLib.FileType.IMAGE;
    RongIMClient.getInstance().getFileToken(fileType, {
      onSuccess: function(data) {
        console.log('上传 token 为', data.token);
      },
      onError: function(error) {
        console.log('get file token error', error);
      }
    })
    var config = {
      domain: 'http://upload.qiniu.com',
      fileType: fileType,
      getToken: function(callback) {
        RongIMClient.getInstance().getFileToken(fileType, {
          onSuccess: function(data){
            callback(data.token);
          },
          onError: function(){
            console.error('get file token error', error);
          }
        });
      }
    };

    var uploadCallbacks = {
      onProgress: function(loaded, total) {
        var percent = Math.floor(loaded / total * 100);
        console.log('已上传: ', percent);
      },
      onCompleted: function(data) {
        // 上传完成, 调用 getFileUrl 获取文件下载 url
        // console.log(chating,'-----------')
        RongIMClient.getInstance().getFileUrl(fileType, data.filename, data.name, {
          onSuccess: function(datas) {
            console.log('文件 url 为: ',data, datas.downloadUrl);
            let name = data.name;
            let size = data.size;
            let index = name.lastIndexOf('.') + 1;
            let type = name.substring(index);
            var msg = new RongIMLib.FileMessage({
              name: name,
              size: size,
              type: type,
              fileUrl: datas.downloadUrl
            });
            if(chating.id){
              var conversationType = RongIMLib.ConversationType.GROUP;
              var targetId = chating.id;
            }else{
              var conversationType = RongIMLib.ConversationType.PRIVATE;
              var targetId = chating.no;
            }
            if(num==1){
              var base64Str = data.thumbnail;  // 压缩后的 base64 略缩图, 用来快速展示图片
              var imageUri = datas.downloadUrl;  // 上传到自己服务器的 url. 用来展示高清图片
              var msg = new RongIMLib.ImageMessage({content: base64Str, imageUri: imageUri});
              var img = document.createElement('img');
              _this.newInfo(imageUri, false, 'ImageMessage', _this.props.userlist.nowUser[0]);
              // img.src = imageUri
              // _this.refs.chatarea.style.backgroundImage = `url(${imageUri})`;
            }else{
              _this.newInfo(datas.downloadUrl, false, 'FileMessage', _this.props.userlist.nowUser[0],{name:name,size,size});
            }
            RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
              onSuccess: function (message) {
                console.log('发送文件消息成功', message);
              },
              onError: function (errorCode) {
                console.log('发送文件消息失败', errorCode);
              }
            });
          },
          onError: function(error) {
            console.log('get file url error', error);
          }
        })
      },
      onError: function(error) {
        console.error('上传失败', error);
      }
    };

    if(num==1){
      UploadClient.initImage(config, function(uploadFile) { // 上传文件为: UploadClient.initFile
        uploadFile.upload(_file, uploadCallbacks);
      });
    }else{
      UploadClient.initFile(config, function(uploadFile) { // 上传文件为: UploadClient.initFile
        uploadFile.upload(_file, uploadCallbacks);
      });
    }

  }
  // 获取文件路径
  getFile = _file =>{
    var fileType = RongIMLib.FileType.FILE;

  }
  // 点击上传
  onChange = e =>{
    // console.log(RongIMLib.FileType)
    let f = e.target.files
    if(f.length>=0){
      if(f[0]){
        f = f[0]
        let type = f.type;
        let name = f.name;
        let size = f.size;
        let isImg = /image/img.test(type);
        if(isImg){
          var fileType = RongIMLib.FileType.IMAGE;
          this.getImage(f,fileType,1)
        }else{
          var fileType = RongIMLib.FileType.FILE;
          this.getImage(f,fileType,2)
        }
      }
    }
  }
  test = e =>{
    console.log(e.target,'=====')
  }
  render() {
    let {
      isShowEmoji,
      isShowHistory,
      chating,
      chatList,
      showThisImg,
      isShowImg,
      emoliList,
      showTip,
      hasMoreTip,
    } = this.state;
    let { allclick } = this.props;
    console.log(chatList,'chatList--------------------')
    // console.log(RongIMClient.MessageType,'--------------')
    // 表情
    let emojiBox = (
      <div className={style.emojiBox}>
        {emoliList.map(item => (
          <span key={item.unicode} onClick={() => this.sendEmoji(item)}>
            {item.emoji}
          </span>
        ))}
      </div>
    );
    // 显示聊天信息
    let chatShow = (
      <div ref="chatShow" className={style.chatShow}>
        {/* {hasMoreTip?(<li className={style.moreTip}>暂无更多记录</li>):''} */}
        {chatList.map(item => (
          <div key={item.messageId} className={item.isLeft ? style.chatyou : style.chatItem}>
            <img className={style.userImg} src={item.user ? item.user.avatar : ''} alt="" />
            <div className={style.userBox}>
              {item.conversationType == 3 ? (
                <div className={style.userPos}>
                  {
                    item.user?item.user.pos+'-'+item.user.truename:''
                  }
                </div>
              ) : (
                ''
              )}
              {this.msg(item)}
            </div>
          </div>
        ))}
      </div>
    );
    // 历史记录
    let historyBox = (
      <div className={style.historyBox}>
        <Historys
          hasMoreTip={hasMoreTip}
          getHistory={this.getHistory}
          addEvent={this.addEvent}
          chating={chating}
          chatList={chatList}
        />
      </div>
    );
    if(this.state.spin===true){
      return (
        <Spin tip="正在加载"  />
      )
    }else{
      return (
        <div className={style.chatRight}>
          <div className={style.chatTit}>
          <span className={style.chatName}>
            {chating.truename ? chating.truename : chating.name}
          </span>
            <div className={style.chatMore} onClick={chating.no ? null : this.getmore}>
              <img src={more} alt="" />
            </div>
          </div>
          <div className={style.chatCon}>{chatShow}</div>
          <div className={style.chatHand}>
            <div className={style.handTop}>
              <img className={style.handImg} onClick={this.showEmoji} src={smile} alt="" />
              <img className={style.handImg} onClick={this.showHistory} src={minenew} alt="" />
              <img className={style.handImg} onClick={this.showFile} src={myfile} alt="" />
              <input className={style.handFile} type="file" onChange={this.onChange}/>
              {allclick.showEmoji ? emojiBox : ''}
              {allclick.showHistory ? historyBox : ''}
            </div>
            <div>
            <textarea
              ref="chatarea"
              onFocus={this.areaFocus}
              className={style.chatarea}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
              {/* <p onClick={this.test} contenteditable='true'>123</p> */}
            </div>
            <button className={style.sendInfo} onClick={this.sendInfo}>
              发送
            </button>
          </div>
          <div ref="moreInfo" onClick={this.stopEvent} className={style.moreInfo}>
            <More />
          </div>
        </div>
      );
    }


  }
}

export default chatRight;
