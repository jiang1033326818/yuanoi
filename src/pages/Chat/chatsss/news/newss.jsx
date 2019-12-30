import React from 'react';
// import {Route,Switch,Link,Redirect,NavLink} from 'react-router-dom';
import style from './news.less';
import Group from './group/group';
import More from './more/more';
import sousuo from '../../../../images/chat/sousuo@2x.png';
import add from '../../../../images/chat/+@2x.png';
import NavLink from 'umi/navlink';
import smile from '../../../../images/chat/smile@2x.png';
import cutter from '../../../../images/chat/cutter@2x.png';
import folder from '../../../../images/chat/folder@2x.png';
import minenew from '../../../../images/chat/minenew@2x.png';
import { getUser, getNow, getToken,getGroupList,fileLoad,getGroupInfo } from '../../../services/api.js';
import data from '@/utils/request';
import { async } from 'q';
import {Spin} from "antd",

class News extends React.Component {
  state = {
    hasmore: true,
    nowUser: [],
    userList: [],
    userAll: [],
    userOne: [],
    userGroup: [],
    myToken: '',
    emoliList: [],
    chating:'',
    num:0,
  };
  componentDidMount() {
    // 初次默认不渲染聊天
    // this.isChating()
    // 获取当前用户信息
    this.getNowUser()
    // 获取好友列表
    this.getUserList()
    // 获取群列表
    this.getGroupsList()
    // 初始化聊天信息
    this.chatInit()
    // 获取会话列表
    // this.getChatList()
    // ctrl+v
    window.addEventListener('keydown', this.keyDown);
    // console.log(UploadClient)
  }
  // 更多设置
  getmore = () => {
    console.log(this.state.hasmore,'1231')
    if (!this.state.hasmore) {
      this.refs.moreInfo.style.transition = 'all .6s';
      this.refs.moreInfo.style.right = 0;
    } else {
      this.refs.moreInfo.style.transition = 'all 1s';
      this.refs.moreInfo.style.right = '-250px';
    }
    this.setState({
      hasmore: !this.state.hasmore,
    });
  };
  // 是否有聊天
  isChating = ()=>{
    this.state.chating==''?
    this.refs.chatCon.style.display='none':
    this.refs.chatCon.style.display='block'
  }
  // 获取当前用户信息
  getNowUser = async()=>{
    let nowUser = await getNow();
    nowUser = nowUser.result[0]
    this.setState({
      nowUser
    });
    console.log(nowUser)
    return nowUser;
  }
  // 获取好友列表
  getUserList = async()=>{
    let userOne = await getUser();
    let {userList} = this.state;
    userOne = userOne.result
    userList = userList.length==0?userOne:userOne.concat(userList)
    this.setState({
      userOne,
      userList
    });
    console.log(userOne)
  }
  // 获取群列表
  getGroupsList = async()=>{
    let userGroup = await getGroupList();
    let {userList} = this.state;
    userGroup = userGroup.result
    userList = userList.length==0?userGroup:userGroup.concat(userList)
    this.setState({
      userGroup,
      userList
    })
  }
  // 获取群信息
  getGroupInfos = async(group_id)=>{
    let info = await getGroupInfo(group_id);
    console.log(info)
  }
  // 初始化聊天信息
  chatInit = ()=>{
    var appkey = '3argexb63qyge';
    RongIMLib.RongIMClient.init(appkey);
    this.beforeIm();
    // 获取token
    getToken().then(res => {
      this.setState({
        myToken: res.result.token,
      });
      this.nowIm();
    });
  }
  // 复制时触发
  keyDown = e => {
    if (e.ctrlKey && e.keyCode == 86) {
      console.log('ctrl+v');
    }
  };
  // 初始化
  beforeIm = () => {
    var _this = this;
    const text = _this.state.nowUser;
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
            // message.content.content => 文字内容
            let con = message.content.content
            con = RongIMLib.RongIMEmoji.symbolToEmoji(con);
            console.log('8080', message,con );
            _this.setState({
              chating:message.content.user
            })
            console.log(message.content.user)
            // _this.refs.chatCon.style.display='block';
            _this.createEle(message.content.user.avatar,con,true)
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // message.content.content => 格式为 AMR 的音频 base64
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64
            // message.content.imageUri => 原图 URL
            break;
          case RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度
            // message.content.longitude => 经度
            // message.content.content => 位置图片 base64
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // message.content.content => 文本消息内容
            // message.content.imageUri => 图片 base64
            // message.content.url => 原图 URL
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something
            break;
          default:
          // do something
        }
      },
    });
  };
  // 连接接口
  nowIm = () => {
    var token = this.state.myToken;
    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        console.log('Connect successfully. ' + userId);
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
        console.log(info);
      },
    });
  };
  // 点击发送
  sendInfo = () => {
    this.emojiNone()
    let val = this.refs.chatarea.value;
    RongIMLib.RongIMEmoji.emojiToSymbol(val);
    this.send(this, val);
  };
  // 发送消息
  send = (that, val) => {
    // this.sendText(val);
    // this.getChatList()
    let {chating,nowGroup} = this.state;
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    chating.no?this.sendText(val,one,`${chating.no}`,chating):this.sendText(val,group,`${chating.id}`,chating,nowGroup);
  };
  // 获取会话列表
  getChatList = () => {
    var conversationTypes = [RongIMLib.ConversationType.PRIVATE];
    var count = 150;
    var _this = this;
    RongIMClient.getInstance().getConversationList(
      {
        onSuccess: function(list) {
          console.log('获取会话列表成功', list);
          _this.getChatOne();
        },
        onError: function(error) {
          console.log('获取会话列表失败', error);
        },
      },
      conversationTypes,
      count
    );
  };
  // 获取指定会话
  getChatOne = () => {
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = `${this.state.chating.no}`;
    RongIMClient.getInstance().getConversation(conversationType, targetId, {
      onSuccess: function(conversation) {
        if (conversation) {
          console.log('获取指定会话成功', conversation);
        }
      },
    });
  };
  // 获取历史聊天记录
  getHistory = () => {
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = `${this.state.chating.no}`;
    var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
    var count = 20;
    RongIMLib.RongIMClient.getInstance().getHistoryMessages(
      conversationType,
      targetId,
      timestrap,
      count,
      {
        onSuccess: function(list, hasMsg) {
          /*
                    list: 获取的历史消息列表
                    hasMsg: 是否还有历史消息可以获取
                */
          console.log('获取历史消息成功', list);
        },
        onError: function(error) {
          // 请排查：单群聊消息云存储是否开通
          console.log('获取历史消息失败', error);
        },
      }
    );
  };
  // 创建消息
  createEle = (imgsrc,text,isLeft=false)=>{
    let chatItem = document.createElement('div');
    chatItem.className = style.chatItem;
    let userImg = document.createElement('img');
    userImg.src = imgsrc
    let chatText = document.createElement('p');
    chatText.innerHTML = text
    chatItem.appendChild(userImg)
    chatItem.appendChild(chatText)
    console.log(this.refs.chatShow,'-------++++++++')
    this.refs.chatShow.appendChild(chatItem)
    let list = this.refs.chatShow;
    list.scrollTop = list.scrollHeight;
    if(isLeft){
      chatItem.style.flexDirection = 'row';
      chatText.style.background = '#F6F6F6';
      chatText.className = style.you
    }
  }
  // 发送文本消息
  sendText = (val,cType,targetId,info,userIdList=[]) => {
    var isMentioned = true; // @ 消息
    var mentioneds = new RongIMLib.MentionedInfo(); // @ 消息对象
    mentioneds.type = RongIMLib.MentionedType.PART;
    mentioneds.userIdList = userIdList;
    var msg = new RongIMLib.TextMessage({
      content: val,
      user : this.state.nowUser,
      extra: info,
      mentionedInfo: mentioneds,
    });
    var conversationType = cType; // 群聊, 其他会话选择相应的消息类型即可
    // var targetId = `${this.state.chating.no}`; // 目标 Id
    var pushContent = 'user 发送了一条消息'; // Push 显示内容
    var pushData = null; // Push 通知时附加信息, 可不填
    var _this = this
    RongIMClient.getInstance().sendMessage(
      conversationType,
      targetId,
      msg,
      {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          console.log('发送文本消息成功', message,message.content.user);
          _this.createEle(_this.state.nowUser.avatar,message.content.content)
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
  // 发送表情
  sendEmoji = item => {
    this.refs.chatarea.value += item.emoji;
  };
  // 表情图消失
  emojiNone = () =>{
    this.refs.showEmoji.style.display = "none";
  }
  // 获取表情图
  getEmoji = () => {
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
    this.refs.showEmoji.style.display = 'block';
  }
  // 点击进行聊天
  chooseOne = (item) =>{
    console.log(item)
    item.id?this.getGroupInfos(item.id):''
    this.setState({
      chating:item
    })
    this.refs.chatCon.style.display='block';
  }
  // 全部
  chatAll = () =>{
    let {userOne,userGroup} = this.state
    let userList = userOne.concat(userGroup)
    this.setState({
      userList
    });
  }
  // 单聊
  chatOne = () =>{
    let userList = this.state.userOne
    this.setState({
      userList
    });
    console.log(this.state.userList)
  }
  // 群聊
  chatGroup = () =>{
    let userList = this.state.userGroup
    this.setState({
      userList
    });
    console.log(this.state.userList)
  }
  // 创建群聊
  setGroup = () =>{
    this.refs.group.style.display = "block";
  }
  // 关闭创建群聊
  closeGroup = () =>{
    this.refs.group.style.display = "none";
  }
  render() {
    const { userList, chating, emoliList } = this.state;
    return (
      <div className={style.news}>
        <div className={style.leftList}>
          <div className={style.topSou}>
            <img className={style.sousuo} src={sousuo} />
            <input type="text" placeholder="搜索" />
            <img className={style.add} src={add} onClick={this.setGroup} />
            <div ref="group" className={style.group}>
              {/* <Group closeGroup={this.closeGroup} /> */}
            </div>
          </div>
          <div className={style.chatWay}>
            <p className={style.chatClass} onClick={this.chatAll}>全部</p>
            <p className={style.chatClass} onClick={this.chatOne}>单聊</p>
            <p className={style.chatClass} onClick={this.chatGroup}>群聊</p>
          </div>
          <div className={style.chatList}>
            <div className={style.chatitem}>
              {userList.map(item => (
                <div className={style.userItem}
                  onClick={()=>this.chooseOne(item)}
                  key={item.no?item.no:item.id}>
                  <img src={item.avatar?item.avatar:item.image} alt="" />
                  <span>{item.nickname?item.nickname:item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div ref='chatCon' className={style.chatCon}>
          <div className={style.chatConHeader}>
            {chating.nickname?chating.nickname:chating.name}
            <div className={style.getmore} onClick={this.getmore}></div>
            <div className={style.moreInfo} ref="moreInfo">
                {/* <More /> */}
            </div>
          </div>
          <div ref='chatShow' className={style.chatShow}></div>
          <div className={style.chating}>
            <div className={style.chatElse}>
              <div ref='showEmoji' className={style.showEmoji}>
                {emoliList.map(item => (
                  <span key={item.unicode} onClick={() => this.sendEmoji(item)}>
                    {item.emoji}
                  </span>
                ))}
              </div>
              <img onClick={this.getEmoji} src={smile} alt="" />
              <img src={cutter} alt="" />
              <img src={folder} alt="" />
              <img src={minenew} alt="" />
            </div>
            <div>
              <textarea
                className={style.chatarea}
                ref="chatarea"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button onClick={this.sendInfo} className={style.sendInfo}>
              发送
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;






import React from 'react';
// import {Route,Switch,Link,Redirect,NavLink} from 'react-router-dom';
import style from './news.less';
import Group from './group/group';
import More from './more/more';
import sousuo from '../../../../images/chat/sousuo@2x.png';
import add from '../../../../images/chat/+@2x.png';
import NavLink from 'umi/navlink';
import smile from '../../../../images/chat/smile@2x.png';
import cutter from '../../../../images/chat/cutter@2x.png';
import folder from '../../../../images/chat/folder@2x.png';
import minenew from '../../../../images/chat/minenew@2x.png';
import { getUser, getNow, getToken,getGroupList,fileLoad,getGroupInfo,searchUser } from '../../../services/api.js';
import data from '@/utils/request';
import { async } from 'q';

class News extends React.Component {
  state = {
    hasmore: true,
    nowUser: [],
    userList: [],
    userAll: [],
    userOne: [],
    userGroup: [],
    myToken: '',
    emoliList: [],
    chating:'',
    nowGroup:[],
    isAdd:'no',
    group_id:'',
    nowClass:1,
    news:[]
  };
  componentDidMount() {
    console.log(this.state.nowUser)
    // 初次默认不渲染聊天
    this.isChating()
    // 获取当前用户信息
    this.getNowUser()
    // 获取好友列表
    this.getUserList()
    // 获取群列表
    this.getGroupsList()
    // 初始化聊天信息
    this.chatInit()
    // 获取会话列表
    // this.getChatList()
    // ctrl+v
    window.addEventListener('keydown', this.keyDown);
    // console.log(UploadClient)

  }
  componentDidUpdate() {

  }
  // 添加群成员
  userAdd = (isAdd,group_id) =>{
    this.setState({
      isAdd,
      group_id
    })
    this.setGroup()
  }
  // 更多设置
  getmore = () => {
    console.log(this.state.hasmore)
    if (!this.state.hasmore) {
      this.refs.moreInfo.style.transition = 'all .6s';
      this.refs.moreInfo.style.right = 0;
    } else {
      this.refs.moreInfo.style.transition = 'all 1s';
      this.refs.moreInfo.style.right = '-250px';
    }
    this.setState({
      hasmore: !this.state.hasmore,
    });
  };
  // 是否有聊天
  isChating = ()=>{
    if(this.refs.chatCon){
      this.state.chating==''?
      this.refs.chatCon.style.display='none':
      this.refs.chatCon.style.display='block'
    }
  }
  // 获取当前用户信息
  getNowUser = async()=>{
    let nowUser = await getNow();
    nowUser = nowUser.result[0]
    this.setState({
      nowUser
    });
    console.log(nowUser)
    return nowUser;
  }
  // 获取好友列表
  getUserList = async()=>{
    let userOne = await getUser();
    let {userGroup, userList} = this.state;
    userOne = userOne.result
    userList = userList.length==0?userOne:userOne.concat(userGroup)
    this.setState({
      userOne,
      userList
    });
    console.log(userOne)
  }
  // 获取群列表
  getGroupsList = async()=>{
    let userGroup = await getGroupList();
    let {userOne, userList} = this.state;
    userGroup = userGroup.result
    console.log(userGroup,'dhytdjjjjjjjjggdjhtdiyt')
    userList = userList.length==0?userGroup:userGroup.concat(userOne)
    this.setState({
      userGroup,
      userList
    })
  }
  // 获取群信息
  getGroupInfos = async(group_id)=>{
    let nowGroup = await getGroupInfo(group_id);
    nowGroup = nowGroup.result.users
    this.setState({
      nowGroup
    })
    console.log(nowGroup)
  }
  // 初始化聊天信息
  chatInit = ()=>{
    var appkey = '3argexb63qyge';
    RongIMLib.RongIMClient.init(appkey);
    this.beforeIm();
    // 获取token
    getToken().then(res => {
      this.setState({
        myToken: res.result.token,
      });
      this.nowIm();
    });
  }
  // 复制时触发
  keyDown = e => {
    if (e.ctrlKey && e.keyCode == 86) {
      console.log('ctrl+v');
    }
  };
  // 初始化
  beforeIm = () => {
    var _this = this;
    const text = _this.state.nowUser;
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
            // message.content.content => 文字内容
            let con = message.content.content
            con = RongIMLib.RongIMEmoji.symbolToEmoji(con);
            console.log('8080', message,con );
            _this.setState({
              chating:message.content.extra
            })
            let user = message.content.user
            // _this.createEle(user.no,user.avatar,con,true)
            // _this.refs.chatCon?_this.refs.chatCon.style.display='block':''
            console.log(_this.createEle)
            _this.createEle(user.avatar,con,true)
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // message.content.content => 格式为 AMR 的音频 base64
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64
            // message.content.imageUri => 原图 URL
            break;
          case RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度
            // message.content.longitude => 经度
            // message.content.content => 位置图片 base64
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // message.content.content => 文本消息内容
            // message.content.imageUri => 图片 base64
            // message.content.url => 原图 URL
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something
            break;
          default:
          // do something
        }
      },
    });
  };
  // 连接接口
  nowIm = () => {
    var token = this.state.myToken;
    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        console.log('Connect successfully. ' + userId);
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
        console.log(info);
      },
    });
  };
  // 点击发送
  sendInfo = () => {
    this.emojiNone()
    let val = this.refs.chatarea.value;
    RongIMLib.RongIMEmoji.emojiToSymbol(val);
    this.send(this, val);
    this.refs.chatarea.value = ''
  };
  // 发送消息
  send = (that, val) => {
    let {chating,nowGroup} = this.state;
    // this.sendText(val)
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    chating.no?this.sendText(val,one,`${chating.no}`,chating):this.sendText(val,group,`${chating.id}`,chating,nowGroup);
    // this.getChatList()
  };
  // 获取会话列表
  getChatList = () => {
    var conversationTypes = [RongIMLib.ConversationType.PRIVATE];
    var count = 150;
    var _this = this;
    RongIMClient.getInstance().getConversationList(
      {
        onSuccess: function(list) {
          console.log('获取会话列表成功', list);
          _this.getChatOne();
        },
        onError: function(error) {
          console.log('获取会话列表失败', error);
        },
      },
      conversationTypes,
      count
    );
  };
  // 获取指定会话
  getChatOne = () => {
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = `${this.state.chating.no}`;
    RongIMClient.getInstance().getConversation(conversationType, targetId, {
      onSuccess: function(conversation) {
        if (conversation) {
          console.log('获取指定会话成功', conversation);
        }
      },
    });
  };
  // 获取历史聊天记录
  getHistory = () => {
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = `${this.state.chating.no}`;
    var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
    var count = 20;
    RongIMLib.RongIMClient.getInstance().getHistoryMessages(
      conversationType,
      targetId,
      timestrap,
      count,
      {
        onSuccess: function(list, hasMsg) {
          /*
                    list: 获取的历史消息列表
                    hasMsg: 是否还有历史消息可以获取
                */
          console.log('获取历史消息成功', list);
        },
        onError: function(error) {
          // 请排查：单群聊消息云存储是否开通
          console.log('获取历史消息失败', error);
        },
      }
    );
  };
  // 发送文本消息
  sendText = (val,cType,targetId,info,userIdList=[]) => {
    var isMentioned = true; // @ 消息
    var mentioneds = new RongIMLib.MentionedInfo(); // @ 消息对象
    mentioneds.type = RongIMLib.MentionedType.PART;
    mentioneds.userIdList = userIdList;
    var msg = new RongIMLib.TextMessage({
      content: val,
      user : this.state.nowUser,
      extra: info,
      mentionedInfo: mentioneds
    });
    var conversationType = cType;
    // var targetId = `${this.state.chating.no}`; // 目标 Id
    var pushContent = 'user 发送了一条消息'; // Push 显示内容
    var pushData = null; // Push 通知时附加信息, 可不填
    var _this = this
    console.log(targetId,'-----')
    RongIMClient.getInstance().sendMessage(
      conversationType,
      targetId,
      msg,
      {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          // console.log('发送文本消息成功', message,message.content.user,info);
          _this.createEle(_this.state.nowUser.avatar,message.content.content)
          // _this.createEle(_this.state.nowUser.no,_this.state.nowUser.avatar,message.content.content)
        },
        onError: function(errorCode) {
          // console.log('发送文本消息失败', errorCode);
        },
      },
      isMentioned,
      pushContent,
      pushData,
      null
    );
  };
  // 发送表情
  sendEmoji = item => {
    this.refs.chatarea.value += item.emoji;
  };
  // 表情图消失
  emojiNone = () =>{
    this.refs.showEmoji.style.display = "none";
  }
  // 获取表情图
  getEmoji = () => {
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
    this.refs.showEmoji.style.display = 'block';
  }
  // 点击进行聊天
  chooseOne = (item) =>{
    console.log(item)
    item.id?this.getGroupInfos(item.id):''
    this.setState({
      chating:item
    })
    this.refs.chatCon?this.refs.chatCon.style.display='block':'';
  }
  // 全部
  chatAll = () =>{
    let {userOne,userGroup} = this.state
    let userList = userOne.concat(userGroup)
    this.setState({
      userList,
      nowClass:1
    });
  }
  // 单聊
  chatOne = () =>{
    let userList = this.state.userOne
    this.setState({
      userList,
      nowClass:2
    });
  }
  // 群聊
  chatGroup = () =>{
    let userList = this.state.userGroup
    this.setState({
      userList,
      nowClass:3
    });
  }
  // 创建群聊
  setGroup = () =>{
    this.refs.group.style.display = "block";
  }
  // 关闭创建群聊
  closeGroup = () =>{
    this.refs.group.style.display = "none";
  }
  // 搜索
  sousuo = (e) =>{
    console.log(e.target.value)
    searchUser(e.target.value).then(res=>{
      console.log(res)
    })
  }
  // 更新用户展示列表
  updateGroup = () =>{
    this.getGroupsList()
  }
  // 创建消息
  // createEle = (no,avatar,txt,isLeft=false)=>{
  createEle = (imgsrc,text,isLeft=false)=>{
      let chatItem = document.createElement('div');
      chatItem.className = style.chatItem;
      let userImg = document.createElement('img');
      userImg.src = imgsrc
      let chatText = document.createElement('p');
      chatText.innerHTML = text
      chatItem.appendChild(userImg)
      chatItem.appendChild(chatText)
      console.log(this.refs.chatShow,'-------++++++++')
      this.refs.chatShow.appendChild(chatItem)
      let list = this.refs.chatShow;
      list.scrollTop = list.scrollHeight;
      if(isLeft){
        chatItem.style.flexDirection = 'row';
        chatText.style.background = '#F6F6F6';
        chatText.className = style.you
      }

      // let {news} = this.state;
      // let date = new Date();
      // let time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes}`;
      // news.push({
      //   no,
      //   avatar,
      //   txt,
      //   time,
      //   isLeft
      // })
      // console.log(news)
      // this.setState({
      //   news
      // })
      // this.refs.chatShow.scrollTop = this.refs.chatShow.scrollHeight;
  }
  componentWillUnmount(){
    this.createEle = function(){}
  }
  render() {
    const { userList, chating, emoliList, nowGroup,isAdd,group_id,nowClass,news } = this.state;
    return (
      <div className={style.news}>
        <div className={style.leftList}>
          <div className={style.topSou}>
            <img className={style.sousuo} src={sousuo} />
            <input type="text" placeholder="搜索" onBlur={this.sousuo} />
            <img className={style.add} src={add} onClick={this.setGroup} />
            <div ref="group" className={style.group}>
              <Group isAdd={isAdd}
                group_id={group_id}
                closeGroup={this.closeGroup}
                updateGroup={this.updateGroup} />
            </div>
          </div>
          <div className={style.chatWay}>
            <p className={nowClass==1?style.nowClass:style.chatClass} onClick={this.chatAll}>全部</p>
            <p className={nowClass==2?style.nowClass:style.chatClass} onClick={this.chatOne}>单聊</p>
            <p className={nowClass==3?style.nowClass:style.chatClass} onClick={this.chatGroup}>群聊</p>
          </div>
          <div className={style.chatList}>
            {userList.map(item => (
              <div className={style.userItem}
                onClick={()=>this.chooseOne(item)}
                key={item.no?item.no:item.id}>
                <img src={item.avatar?item.avatar:item.image} alt="" />
                <p>{item.nickname?item.nickname:item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div ref='chatCon' className={style.chatCon}>
          <div className={style.chatConHeader}>
            {chating.nickname?chating.nickname:chating.name}
            <div className={style.getmore} onClick={this.getmore}></div>
            <div className={style.moreInfo} ref="moreInfo" >
              {
                nowGroup.length?<More userAdd={this.userAdd} nowGroup={nowGroup} chating={chating} />:''
              }
            </div>
          </div>
          <div ref='chatShow' className={style.chatShow}>
              {/* {
                news.map(item=>(
                  <div key={new Date().getTime()*Math.random()} className={item.isLeft?style.chatyou:style.chatItem}>
                    <img src={item.avatar} alt=""/>
                    <p className={item.isLeft?style.you:''}>{item.txt}</p>
                  </div>
                ))
              } */}
          </div>
          <div className={style.chating}>
            <div className={style.chatElse}>
              <div ref='showEmoji' className={style.showEmoji}>
                {emoliList.map(item => (
                  <span key={item.unicode} onClick={() => this.sendEmoji(item)}>
                    {item.emoji}
                  </span>
                ))}
              </div>
              <img onClick={this.getEmoji} src={smile} alt="" />
              <img src={cutter} alt="" />
              <img src={folder} alt="" />
              <img src={minenew} alt="" />
            </div>
            <div>
              <textarea
                className={style.chatarea}
                ref="chatarea"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <button className={style.sendInfo} onClick={this.sendInfo}>
              发送
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;



import React from 'react';
// import {Route,Switch,Link,Redirect,NavLink} from 'react-router-dom';
import style from './news.less';
import Group from './group/group';
import More from './more/more';
import sousuo from '../../../../images/chat/sousuo@2x.png';
import add from '../../../../images/chat/+@2x.png';
import NavLink from 'umi/navlink';
import smile from '../../../../images/chat/smile@2x.png';
import cutter from '../../../../images/chat/cutter@2x.png';
import folder from '../../../../images/chat/folder@2x.png';
import minenew from '../../../../images/chat/minenew@2x.png';
import { getUser, getNow, getToken,getGroupList,fileLoad,getGroupInfo,searchUser } from '../../../services/api.js';
import data from '@/utils/request';
import { async } from 'q';
import styles from '../../../Admin/origin.less';

class News extends React.Component {
  state = {
    hasmore: true,
    nowUser: [],
    userList: [],
    userAll: [],
    userOne: [],
    userGroup: [],
    myToken: '',
    emoliList: [],
    chating:'',
    nowGroup:[],
    isAdd:'no',
    group_id:''
  };
  componentDidMount() {
    console.log(this.state.nowUser)
    // 初次默认不渲染聊天
    // this.isChating()
    // 获取当前用户信息
    this.getNowUser()
    // 获取好友列表
    this.getUserList()
    // 获取群列表
    this.getGroupsList()
    // 初始化聊天信息
    this.chatInit()
    // 获取会话列表
    // this.getChatList()
    // ctrl+v
    window.addEventListener('keydown', this.keyDown);
    // console.log(UploadClient)

  }
  // 添加群成员
  userAdd = (isAdd,group_id) =>{
    this.setState({
      isAdd,
      group_id
    })
    this.setGroup()
  }
  // 获取文件
  getFile = (e) =>{
    // console.log(e.target.files)
    let obj = e.target.files
    let arr = []
    for(let i in obj){
      arr.push(obj[i])
    }
    arr.pop()
    arr.pop()
    console.log(arr)
    fileLoad(arr).then(res=>{
      console.log(res)
    })
  }

  // 更多设置
  getmore = () => {
    if (this.state.hasmore) {
      this.refs.moreInfo.style.transition = 'all .6s';
      this.refs.moreInfo.style.right = 0;
    } else {
      this.refs.moreInfo.style.transition = 'all 1s';
      this.refs.moreInfo.style.right = '-250px';
    }
    this.setState({
      hasmore: !this.state.hasmore,
    });
  };
  // 是否有聊天
  isChating = ()=>{
    this.state.chating==''?
    this.refs.chatCon.style.display='none':
    this.refs.chatCon.style.display='block'
  }
  // 获取当前用户信息
  getNowUser = async()=>{
    let nowUser = await getNow();
    nowUser = nowUser.result[0]
    this.setState({
      nowUser
    });
    console.log(nowUser)
    return nowUser;
  }
  // 获取好友列表
  getUserList = async()=>{
    let userOne = await getUser();
    let {userList} = this.state;
    userOne = userOne.result
    userList = userList.length==0?userOne:userOne.concat(userList)
    this.setState({
      userOne,
      userList
    });
    console.log(userOne)
  }
  // 获取群列表
  getGroupsList = async()=>{
    let userGroup = await getGroupList();
    let {userList} = this.state;
    userGroup = userGroup.result
    console.log(userGroup,'dhytdjjjjjjjjggdjhtdiyt')
    userList = userList.length==0?userGroup:userGroup.concat(userList)
    this.setState({
      userGroup,
      userList
    })
  }
  // 获取群信息
  getGroupInfos = async(group_id)=>{
    let nowGroup = await getGroupInfo(group_id);
    nowGroup = nowGroup.result.users
    this.setState({
      nowGroup
    })
    console.log(nowGroup)
  }
  // 初始化聊天信息
  chatInit = ()=>{
    var appkey = '3argexb63qyge';
    RongIMLib.RongIMClient.init(appkey);
    this.beforeIm();
    // 获取token
    getToken().then(res => {
      this.setState({
        myToken: res.result.token,
      });
      this.nowIm();
    });
  }
  // 复制时触发
  keyDown = e => {
    if (e.ctrlKey && e.keyCode == 86) {
      console.log('ctrl+v');
    }
  };
  // 初始化
  beforeIm = () => {
    var _this = this;
    const text = _this.state.nowUser;
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
            // message.content.content => 文字内容
            let con = message.content.content
            con = RongIMLib.RongIMEmoji.symbolToEmoji(con);
            console.log('8080', message,con );
            _this.setState({
              chating:message.content.extra
            })
            console.log(message.content.extra)
            _this.refs.chatCon.style.display='block';
            _this.createEle(message.content.user.avatar,con)
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // message.content.content => 格式为 AMR 的音频 base64
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64
            // message.content.imageUri => 原图 URL
            break;
          case RongIMClient.MessageType.LocationMessage:
            // message.content.latiude => 纬度
            // message.content.longitude => 经度
            // message.content.content => 位置图片 base64
            break;
          case RongIMClient.MessageType.RichContentMessage:
            // message.content.content => 文本消息内容
            // message.content.imageUri => 图片 base64
            // message.content.url => 原图 URL
            break;
          case RongIMClient.MessageType.InformationNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.ContactNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.ProfileNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.CommandNotificationMessage:
            // do something
            break;
          case RongIMClient.MessageType.CommandMessage:
            // do something
            break;
          case RongIMClient.MessageType.UnknownMessage:
            // do something
            break;
          default:
          // do something
        }
      },
    });
  };
  // 连接接口
  nowIm = () => {
    var token = this.state.myToken;
    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        console.log('Connect successfully. ' + userId);
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
        console.log(info);
      },
    });
  };
  // 点击发送
  sendInfo = () => {
    this.emojiNone()
    let val = this.refs.chatarea.value;
    RongIMLib.RongIMEmoji.emojiToSymbol(val);
    console.log("send")
    this.send(this, val);
  };
  // 发送消息
  send = (that, val) => {
    let {chating,nowGroup} = this.state;
    console.log(val,chating.no,'======')
    // this.sendText(val)
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    chating.no?this.sendText(val,one,`${chating.no}`,chating):this.sendText(val,group,`${chating.id}`,chating,nowGroup);
    // this.getChatList()
  };
  // 获取会话列表
  getChatList = () => {
    var conversationTypes = [RongIMLib.ConversationType.PRIVATE];
    var count = 150;
    var _this = this;
    RongIMClient.getInstance().getConversationList(
      {
        onSuccess: function(list) {
          console.log('获取会话列表成功', list);
          _this.getChatOne();
        },
        onError: function(error) {
          console.log('获取会话列表失败', error);
        },
      },
      conversationTypes,
      count
    );
  };
  // 获取指定会话
  getChatOne = () => {
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = `${this.state.chating.no}`;
    RongIMClient.getInstance().getConversation(conversationType, targetId, {
      onSuccess: function(conversation) {
        if (conversation) {
          console.log('获取指定会话成功', conversation);
        }
      },
    });
  };
  // 获取历史聊天记录
  getHistory = () => {
    var conversationType = RongIMLib.ConversationType.PRIVATE;
    var targetId = `${this.state.chating.no}`;
    var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
    var count = 20;
    RongIMLib.RongIMClient.getInstance().getHistoryMessages(
      conversationType,
      targetId,
      timestrap,
      count,
      {
        onSuccess: function(list, hasMsg) {
          /*
                    list: 获取的历史消息列表
                    hasMsg: 是否还有历史消息可以获取
                */
          console.log('获取历史消息成功', list);
        },
        onError: function(error) {
          // 请排查：单群聊消息云存储是否开通
          console.log('获取历史消息失败', error);
        },
      }
    );
  };
  // 创建消息
  createEle = (imgsrc,text)=>{
    let chatItem = document.createElement('div');
    let userImg = document.createElement('img');
    userImg.src = imgsrc
    userImg.style.width = '100px'
    let chatText = document.createElement('p');
    chatText.innerHTML = text
    chatItem.appendChild(userImg)
    chatItem.appendChild(chatText)
    console.log(this.refs.chatShow,'-------++++++++')
    this.refs.chatShow.appendChild(chatItem)
  }
  // 发送文本消息
  sendText = (val,cType,targetId,info,userIdList=[]) => {
    var isMentioned = true; // @ 消息
    var mentioneds = new RongIMLib.MentionedInfo(); // @ 消息对象
    mentioneds.type = RongIMLib.MentionedType.PART;
    mentioneds.userIdList = userIdList;
    var msg = new RongIMLib.TextMessage({
      content: val,
      user : this.state.nowUser,
      extra: info,
      mentionedInfo: mentioneds
    });
    var conversationType = cType;
    // var targetId = `${this.state.chating.no}`; // 目标 Id
    var pushContent = 'user 发送了一条消息'; // Push 显示内容
    var pushData = null; // Push 通知时附加信息, 可不填
    var _this = this
    RongIMClient.getInstance().sendMessage(
      conversationType,
      targetId,
      msg,
      {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 id 和发送消息时间戳
          console.log('发送文本消息成功', message,message.content.user);
          _this.createEle(_this.state.nowUser.avatar,message.content.content)
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
  // 发送表情
  sendEmoji = item => {
    this.refs.chatarea.value += item.emoji;
  };
  // 表情图消失
  emojiNone = () =>{
    this.refs.showEmoji.style.display = "none";
  }
  // 获取表情图
  getEmoji = () => {
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
    this.refs.showEmoji.style.display = 'block';
  }
  // 点击进行聊天
  chooseOne = (item) =>{
    console.log(item)
    item.id?this.getGroupInfos(item.id):''
    this.setState({
      chating:item
    })
    this.refs.chatCon.style.display='block';
  }
  // 全部
  chatAll = () =>{
    let {userOne,userGroup} = this.state
    let userList = userOne.concat(userGroup)
    this.setState({
      userList
    });
  }
  // 单聊
  chatOne = () =>{
    let userList = this.state.userOne
    this.setState({
      userList
    });
    console.log(this.state.userList)
  }
  // 群聊
  chatGroup = () =>{
    let userList = this.state.userGroup
    this.setState({
      userList
    });
    console.log(this.state.userList)
  }
  // 创建群聊
  setGroup = () =>{
    this.refs.group.style.display = "block";
  }
  // 关闭创建群聊
  closeGroup = () =>{
    this.refs.group.style.display = "none";
  }
  // 搜索
  sousuo = (e) =>{
    console.log(e.target.value)
    searchUser(e.target.value).then(res=>{
      console.log(res)
    })
  }
  render() {
    const { userList, chating, emoliList, nowGroup,isAdd,group_id } = this.state;

      return (
        <div className={style.news}>
          <div className={style.leftList}>
            <div className={style.topSou}>
              <img className={style.sousuo} src={sousuo} />
              <input type="text" placeholder="搜索" onBlur={this.sousuo} />
              <img className={style.add} src={add} onClick={this.setGroup} />
              <div ref="group" className={style.group}>
                <Group isAdd={isAdd} group_id={group_id} closeGroup={this.closeGroup} />
              </div>
            </div>
            <div className={style.chatWay}>
              <p className={style.chatClass} onClick={this.chatAll}>全部</p>
              <p className={style.chatClass} onClick={this.chatOne}>单聊</p>
              <p className={style.chatClass} onClick={this.chatGroup}>群聊</p>
            </div>
            <div className={style.chatList}>
              <div className={style.chatitem}>
                {userList.map(item => (
                  <div className={style.userItem}
                       onClick={()=>this.chooseOne(item)}
                       key={item.no?item.no:item.id}>
                    <img src={item.avatar?item.avatar:item.image} alt="" />
                    <span>{item.nickname?item.nickname:item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref='chatCon' className={style.chatCon}>
            <div className={style.chatConHeader}>
              {chating.nickname?chating.nickname:chating.name}
              <div className={style.getmore} onClick={this.getmore}></div>
              <div className={style.moreInfo} ref="moreInfo" >
                {
                  nowGroup.length?<More userAdd={this.userAdd} nowGroup={nowGroup} chating={chating} />:''
                }
              </div>
            </div>
            <div ref='chatShow' className={style.chatShow}></div>
            <div className={style.chating}>
              <div className={style.chatElse}>
                <div ref='showEmoji' className={style.showEmoji}>
                  {emoliList.map(item => (
                    <span key={item.unicode} onClick={() => this.sendEmoji(item)}>
                    {item.emoji}
                  </span>
                  ))}
                </div>
                <img onClick={this.getEmoji} src={smile} alt="" />
                <img src={cutter} alt="" />
                <img src={folder} alt="" />
                <img src={minenew} alt="" />
                {/* <input id="uploadFile" type="file" onChange={this.getFile} /> */}
              </div>
              <div>
              <textarea
                className={style.chatarea}
                ref="chatarea"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
              </div>
              <button className={style.sendInfo} onClick={this.sendInfo}>
                发送
              </button>
            </div>
          </div>
        </div>
      );


  }
}

export default News;
