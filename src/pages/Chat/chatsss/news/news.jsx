import React from 'react';
import style from './news.less';
import Group from './group/group';
import More from './more/more';
import sousuo from '../../../../images/chat/sousuo@2x.png';
import close from '../../../../images/chat/close@2x.png'
import add from '../../../../images/chat/+@2x.png';
import NavLink from 'umi/navlink';
import smile from '../../../../images/chat/smile@2x.png';
import cutter from '../../../../images/chat/cutter@2x.png';
import folder from '../../../../images/chat/folder@2x.png';
import minenew from '../../../../images/chat/minenew@2x.png';
import video from '../../../../images/chat/video.png';
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
    news:[],
    souList:[],
    ind:null,
    nowInd:null
  };
  componentDidMount() {
    // console.log(this.state.nowUser)
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
    // ctrl+v
    window.addEventListener('keydown', this.keyDown);
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
    // console.log(this.state.hasmore)
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
    // console.log(nowUser)
    return nowUser;
  }
  // 获取好友列表
  getUserList = async()=>{
    let userOne = await getUser();
    let {userGroup, userList} = this.state;
    userOne = userOne.result?userOne.result:[]
    userList = userList.length==0?userOne:userOne.concat(userGroup)
    // console.log(userList,'---------')
    this.setState({
      userOne,
      userList
    });
    // console.log(userOne)
  }
  // 获取群列表
  getGroupsList = async()=>{
    let userGroup = await getGroupList();
    let {userOne, userList} = this.state;
    userGroup = userGroup.result
    // console.log(userGroup,'dhytdjjjjjjjjggdjhtdiyt')
    userList = userList.length==0?userGroup:userGroup.concat(userOne)
    // console.log(userList,'---------')
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
    // console.log(nowGroup)
  }
  // 初始化聊天信息
  chatInit = ()=>{
    var appkey = '3argexb63qyge';
    RongIMLib.RongIMClient.init(appkey);
    RongIMLib.RongIMVoice.init();
    this.beforeIm();
    // 获取token
    getToken().then(res => {
      this.setState({
        myToken: res.result.token,
      });
      this.nowIm();
      this.getChatList();
      this.getUserNoRead();
    });
  }
  // 复制时触发
  keyDown = e => {
    if (e.ctrlKey && e.keyCode == 86) {
      // console.log('ctrl+v');
    }
  };
  // 初始化
  beforeIm = () => {
    var _this = this;
    var ind;
    let userId,user;
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
            alert('其他设备登录！')
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
            var one = RongIMLib.ConversationType.PRIVATE;
            var group = RongIMLib.ConversationType.GROUP;
            con = RongIMLib.RongIMEmoji.symbolToEmoji(con);
            var {userOne,userList} = _this.state;
            console.log('8080', message,con );
            var targetId = message.targetId;
            var userId = message.senderUserId;
            var user = userOne.find(item=>item.no==userId);
            console.log(_this.state.nowInd,_this.state.ind)
            userList.map((item,index)=>{
              if(item.no==targetId||item.id==targetId){
                if(_this.state.nowInd){
                  userList[_this.state.nowInd].id==item.id||userList[_this.state.nowInd].no==item.no?
                  _this.createEle(user.avatar,'p',con,true):'';
                }
                item.no?
                _this.getNoRead(one,`${item.no}`):
                _this.getNoRead(group,`${item.id}`)
                ind = index
              }
              return item;
            })
            _this.lastUpdate(_this,userList,ind,con)
            break;
          case RongIMClient.MessageType.VoiceMessage:
            // message.content.content => 格式为 AMR 的音频 base64
            console.log(message.content.content)
            var audioFile = message.content.content;
            // 音频文件长度   
            // var duration = audioFile.length / 1024;
            // 预加载
            // RongIMLib.RongIMVoice.preLoaded(audioFile, function(){
            //     // 播放声音
            //   RongIMLib.RongIMVoice.play(audioFile, duration);
            // });
            break;
          case RongIMClient.MessageType.ImageMessage:
            // message.content.content => 图片缩略图 base64
            // message.content.imageUri => 原图 URL
            var {userOne,userList} = _this.state;
            // console.log(message)
            var targetId = message.targetId;
            var userId = message.senderUserId;
            var user = userOne.find(item=>item.no==userId);
            var one = RongIMLib.ConversationType.PRIVATE;
            var group = RongIMLib.ConversationType.GROUP;
            userList.map((item,index)=>{
              if(item.no==targetId){
                let imgSrc = message.content.imageUri;
                if(_this.state.nowInd){
                  userList[_this.state.nowInd].id==item.id||userList[_this.state.nowInd].no==item.no?
                  _this.createEle(user.avatar,'img',imgSrc,true):'';
                }
                item.no?
                _this.getNoRead(one,`${item.no}`):
                _this.getNoRead(group,`${item.id}`)
                ind = index 
              }
              return item;
            })
            console.log(userList)
            _this.lastUpdate(_this,userList,ind,'[图片]')
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
    var _this = this;
    RongIMClient.connect(token, {
      onSuccess: function(userId) {
        console.log('Connect successfully. ' + userId);
        _this.getChatList();
        _this.getUserNoRead();
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
  // 点击发送
  sendInfo = () => {
    this.emojiNone()
    let val = this.refs.chatarea.value;
    RongIMLib.RongIMEmoji.emojiToSymbol(val);
    this.send(this, val);
    this.refs.chatarea.value = ''
  };
  // 更新最后一条消息
  lastUpdate = (_this,userList,ind,val) =>{
    if(userList[ind]){
      userList[ind].lastMsg = val
      var now = userList[ind];
      userList.splice(ind,1)
      userList.unshift(now)
      _this.setState({
        userList,
        ind:0
      })
    }
  }
  // 发送消息
  send = (that, val) => {
    // this.sendText(val);
    // this.getChatList()
    let {chating,nowGroup,userList,ind} = this.state;
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    chating.no?this.sendText(val,one,`${chating.no}`,chating):this.sendText(val,group,`${chating.id}`,chating,nowGroup);
    this.lastUpdate(this,userList,ind,val)
  };
  // 获取会话列表
  getChatList = () => {
    var conversationTypes = [RongIMLib.ConversationType.PRIVATE,RongIMLib.ConversationType.GROUP];
    var count = 150;
    var _this = this;
    RongIMClient.getInstance().getConversationList(
      {
        onSuccess: function(list) {
          console.log('获取会话列表成功', list);
          let {userList} = _this.state;
          userList.map(item=>{
            let haslast = list.find(it=>it.targetId==item.no||it.targetId==item.id);
            if(haslast){
              // item.lastMsg = (haslast.latestMessage.content.content);
              item.lastMsg = haslast.latestMessage.content.messageName=="TextMessage"?
              RongIMLib.RongIMEmoji.symbolToEmoji(haslast.latestMessage.content.content):
              '[图片]'
              // item.lastMsg = RongIMLib.RongIMEmoji.symbolToEmoji(haslast.latestMessage.content.content);
              item.sentTime = haslast.sentTime;
            }
            return item
          })
          var max = -Infinity
          var someList = userList.filter(item=>item.sentTime)
          var elseList = userList.filter(item=>!item.sentTime)
          for(var i=0;i<someList.length-1;i++){
            for(var j=0;j<someList.length-1-i;j++){
              if(someList[j].sentTime<someList[j+1].sentTime){
                var temp;
                temp = someList[j];
                someList[j] = someList[j+1];
                someList[j+1] = temp
              }
            }
          }
          // console.log(userList,elseList,'fbwkuefwe')
          userList = someList.concat(elseList)
          _this.setState({
            userList
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
  // 获取指定未读
  getUserNoRead = () =>{
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    let {userList} = this.state;
    userList.map((item,index)=>{
      item.no?this.getNoRead(one,`${item.no}`,index):this.getNoRead(group,`${item.id}`,index);
      // console.log(item)
    })
  }
  // 获取未读消息
  getNoRead = (conversationType,targetId,index='') => {   
    let _this = this; 
    RongIMLib.RongIMClient.getInstance().getUnreadCount(conversationType, targetId, {
      onSuccess: function(count) {
        console.log('获取指定会话未读消息数成功', count);
        let {userList} = _this.state;
        console.log(conversationType,targetId,'------')
        if(index==''){
          // console.log(index)
          userList.map(item=>{
            if(item.no==targetId||item.id==targetId){
              item.noRead = count;
            }
            return item;
          })
        }else{
          userList[index].noRead = count;
        }
        _this.setState({
          userList
        })
      },
      onError: function(error) {
        console.log('获取指定会话未读消息数失败', error);
      }
    });
  }
  // 清除未读数
  delNoRead = (conversationType,targetId) =>{
    // console.log(conversationType,targetId)
    RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
      onSuccess: function() {
        console.log('清除指定会话未读消息数成功');
      },
      onError: function(error) {
        console.log('清除指定会话未读消息数失败', error);
      }
    });
  }
  // 获取历史聊天记录
  getHistory = (cType,targetId,timestrap,count) => {
    var conversationType = cType;
    // var targetId = `${this.state.chating.no}`;
    // var timestrap = 0; // 默认传 null, 若从头开始获取历史消息, 请赋值为 0
    // var count = 20;
    var {nowUser,userOne} = this.state;
    var _this = this
    RongIMLib.RongIMClient.getInstance().getHistoryMessages(
      conversationType,
      targetId,
      timestrap,
      count,
      {
        onSuccess: function(list, hasMsg) {
          // console.log(list)
          if(list.length!=0){
            list = list.map(item=>{
              let userId = item.senderUserId
              let user = userOne.find(item=>item.no==userId);
              item.user = user;
              if(userId==nowUser.no){
                item.isLeft = false
                item.user = nowUser
              }else{
                item.isLeft = true
              }
              item.content.content = item.content.messageName=="TextMessage"?
              RongIMLib.RongIMEmoji.symbolToEmoji(item.content.content):
              item.content.content
              return item
            })
          }
          _this.setState({
            news:list
          })
          _this.refs.chatShow.scrollTop = _this.refs.chatShow.scrollHeight;
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
          let val = message.content.content
          // val = RongIMLib.RongIMEmoji.symbolToEmoji(val)
          _this.createEle(_this.state.nowUser.avatar,'p',val)
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
  getEmoji = (e) => {
    e?e.stopPropagation() : window.event.cancelBubble = true;
    this.historyNone()
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
  chooseOne = (item,index) =>{
    let chatItem = document.querySelectorAll('.antd-pro-pages-chat-news-news-chatItems');   
    Array.from(chatItem).map(item=>{
      item.style.display = 'none';
      // console.log(item,'====')
    })
    // console.log(item)
    item.id?this.getGroupInfos(item.id):''
    let {userList} = this.state;
    userList[index].noRead = 0
    let one = RongIMLib.ConversationType.PRIVATE;
    let group = RongIMLib.ConversationType.GROUP;
    this.setState({
      chating:item,
      ind:index,
      nowInd:index,
      userList
    })
    if(item.no){
      this.setState({
        nowGroup:[item]
      })
      this.getHistory(one,`${item.no}`,0,20)
      this.delNoRead(one,`${item.no}`)
    }else if(item.id){
      this.getHistory(group,`${item.id}`,0,20)
      this.delNoRead(group,`${item.id}`)
    }
    this.refs.chatCon?this.refs.chatCon.style.display='block':'';
  }
  // 点击 textarea 取消未读
  nowRead = () =>{
    let {userList,ind} = this.state;
    userList[ind].noRead = 0;
    this.setState({
      userList
    })
  }
  // 聊天历史消失
  historyNone = () =>{
    this.refs.historyChat.style.display = 'none';
  }
  // 显示聊天历史
  showHistory = (e) =>{
    this.emojiNone()
    e?e.stopPropagation() : window.event.cancelBubble = true;
    this.refs.historyChat.style.display = 'block';
  }
  // 创建群聊
  setGroup = () =>{
    this.refs.group.style.display = "block";
  }
  // 关闭创建群聊
  closeGroup = () =>{
    this.refs.group.style.display = "none";
  }
  // 聚焦
  souFocus = (e) =>{
    var e = e||window.event;
    this.refs.souCon.style.display = 'block';
    this.refs.close.style.display = 'block';
  }
  // 关闭搜索
  closeSou = () =>{
    this.refs.souCon.style.display = 'none';
    this.refs.close.style.display = 'none';
    this.refs.souchat.value = '';
    this.setState({
      souList:[]
    })
  }
  // 搜索
  sousuo = (e) =>{
    var e = e||window.event;
    let val = e.target.value.trim()
    if(val!==''){
      searchUser({words:e.target.value}).then(res=>{
        console.log(res)
        if(res.result.groups&&res.result.users){
          let souList = res.result.groups.concat(res.result.users)
          console.log(souList)
          this.setState({
            souList
          })
        }
      })
    }
  }
  // 更新用户展示列表
  updateGroup = () =>{
    this.getGroupsList()
  }
  // 创建消息
  createEle = (imgsrc,ele,text,isLeft=false)=>{
    let chatItem = document.createElement('div');
    chatItem.className = style.chatItems;
    let userImg = document.createElement('img');
    userImg.src = imgsrc
    userImg.className = style.userImg;
    let chatText = document.createElement(ele);
    switch (ele) {
      case 'img':
          chatText.src = text
          chatText.className= style.chatImg
        break;
      case 'p':
          chatText.innerHTML = text
        break;
      default:
          
        break;
    }
    chatItem.appendChild(userImg)
    chatItem.appendChild(chatText)
    // console.log(this.refs.chatShow,'-------++++++++')
    this.refs.chatShow.appendChild(chatItem)
    let list = this.refs.chatShow;
    list.scrollTop = list.scrollHeight;
    if(isLeft){
      chatItem.style.flexDirection = 'row';
      chatText.style.background = '#F6F6F6';
      chatText.className = style.you
    }
  }
  componentWillUnmount(){
    this.setState = (state, callback) => {
        return;
    }
  }
  // 点击其它地方 表情 和 历史记录
  allClick = ()=>{
    this.emojiNone()
    this.historyNone()
  }
  msg = (item) =>{
    switch(item.content.messageName){
      case "TextMessage":
        return (<p className={item.isLeft?style.you:''}>{item.content.content}</p>)
        break;
      case "VoiceMessage":
        return (
          <p className={item.isLeft?style.you:''}>
            <img src={video} alt=""/>
          </p>
        )
        break;
      case "ImageMessage":
        return (<img className={style.chatImg} src={item.content.imageUri} alt=""/>)
        break;
      default:
          return (<p className={item.isLeft?style.you:''}>不支持该消息，可在手机查看</p>)
        break;
    }
  }
  render() {
    const { userList, chating, emoliList, nowGroup,isAdd,group_id,nowClass,news,souList,ind,nowInd } = this.state;
    // console.log(news)
    // 搜索
    let souCon = (
      <div className={style.souCon} ref='souCon'>
        {souList.length==0?"暂无结果":souList.map(item => (
          <div className={style.userItem} 
            key={item.no?item.no:item.id}>
            <img src={item.avatar?item.avatar:item.image} alt="" />
            <p>{item.nickname?item.nickname:item.name}</p>
          </div>
        ))}
      </div>
    )
    // 用户列表
    let chatList = (
      <div className={style.chatList} ref='chatList'>
        {userList.map((item,index) => (
          <div className={index==ind?style.nowItem:style.userItem} 
            onClick={()=>this.chooseOne(item,index)}
            key={item.no?item.no:item.id}>
            <img src={item.avatar?item.avatar:item.image} alt="" />
            <div>
              <p>{item.nickname?item.nickname:item.name}</p>
              <p className={style.lastMsg}>{item.lastMsg}</p>
            </div>
            <p className={item.noRead?style.noRead:style.read}>{item.noRead}</p>
          </div>
        ))}
      </div>
    )
    // 显示聊天信息
    let chatShow = (
      <div ref='chatShow' className={style.chatShow}>
          {
            news.map(item=>(
              <div key={item.messageId} className={item.isLeft?style.chatyou:style.chatItem}>
                <img className={style.userImg} src={item.user.avatar} alt=""/>
                {this.msg(item)}
              </div>
            ))
          }
      </div>
    )
    // 显示表情
    let showEmoji = (
      <div ref='showEmoji' className={style.showEmoji}>
        {emoliList.map(item => (
          <span key={item.unicode} onClick={() => this.sendEmoji(item)}>
            {item.emoji}
          </span>
        ))}
      </div>
    )
    // 显示历史消息
    let chatShows = (
      <div className={style.chatShow}>
        {
          news.map(item=>(
            <div key={item.messageId} className={item.isLeft?style.chatyou:style.chatItem}>
              <img className={style.userImg} src={item.user.avatar} alt=""/>
              {
                item.content.messageName=="ImageMessage"?
                (<img className={style.chatImg} src={item.content.imageUri} alt=""/>):
                (<p className={item.isLeft?style.you:''}>{item.content.content}</p>)
              }
            </div>
          ))
        }
      </div>
    )
    return (
      <div className={style.news} onClick={this.allClick}>
        <div className={style.leftList}>
          <div className={style.topSou}>
            <img className={style.sousuo} src={sousuo} />
            <input type="text" ref='souchat' placeholder="搜索" onFocus={this.souFocus} onBlur={this.sousuo} />
            <img src={close} ref='close' onClick={this.closeSou} className={style.close} alt=""/>
            <img className={style.add} src={add} onClick={this.setGroup} />
            <div ref="group" className={style.group}>
              <Group isAdd={isAdd} 
                group_id={group_id} 
                closeGroup={this.closeGroup} 
                updateGroup={this.updateGroup} />
            </div>
          </div>
          <div className={style.tapDown}>
            {souCon}
            {chatList}
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
          {chatShow}
          <div className={style.chating}>
            <div className={style.chatElse}>
              {showEmoji}
              <div ref='historyChat' className={style.historyChat}>
                {chatShows}
              </div>
              <img onClick={this.getEmoji} src={smile} alt="" />
              {/* <img src={cutter} alt="" /> */}
              {/* <img src={folder} alt="" /> */}
              <img onClick={this.showHistory} src={minenew} alt="" />
            </div>
            <div onClick={this.nowRead}>
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
