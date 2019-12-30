import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import News from './news/news';
import Work from './works/works';
import style from './Chat.less';
import { getNow } from '../../services/api.js';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowUser: [],
      isActive:1,
      ismove:false,
      offX:0,
      offY:0,
      hasInfo:false
    };
  }
  getNews = () => {
    this.setState({
      isActive: 1
    })
  }
  getWork = () => {
    this.setState({
      isActive: 2
    })
  }
  componentDidMount() {
    getNow().then(res => {
      console.log(res)
      let nowUser;
      if(res.result[0]){
        nowUser = res.result[0]
      }else{
        nowUser = []
        history.go(0)
      }
      this.setState({
        nowUser
      });
    });
    window.addEventListener('mousemove',this.move)
  }
  moveDown = (e) =>{
    if(e.target.className=='antd-pro-pages-chat-chat-leftNav'){
      this.setState({
        ismove:true,
        offX:e.nativeEvent.offsetX,
        offY:e.nativeEvent.offsetY
      })
    }
  }
  move = (e) =>{
    if(this.state.ismove){
      let {offX,offY} = this.state;
      this.refs.content.style.left = e.clientX - offX + 'px';
      this.refs.content.style.top = e.clientY - offY + 'px';
    }
  }
  moveUp = (e) =>{
    this.setState({
      ismove:false
    })
  }
  infoBlock=(e)=>{
    e?e.stopPropagation() : window.event.cancelBubble = true;
    let {hasInfo} = this.state;
    hasInfo?this.refs.userInfo.style.display = 'none':this.refs.userInfo.style.display = 'block';
    this.setState({
      hasInfo:!hasInfo
    })
  }
  allClick = ()=>{
    this.refs.userInfo.style.display = 'none'
  }
  render() {
    let {nowUser, isActive} = this.state;
    console.log(nowUser)
    return (
      <Router>
        <div className={style.container} onClick={this.allClick}>
          <div className={style.content} ref='content'>
            <div className={style.leftNav} onMouseDown={this.moveDown} onMouseUp={this.moveUp}>
              <div className={style.userImg}>
                <img src={nowUser.avatar} onClick={this.infoBlock} />
                <div ref='userInfo' className={style.userInfo}>
                  <p>{nowUser.nickname}</p>
                  <img src={nowUser.avatar} />
                  <p>职位：{nowUser.pos}</p>
                </div>
              </div>
              <div className={isActive==1?style.active:style.classIcon} ref="userNews" onClick={this.getNews}>
                <NavLink exact to="/chat/news">
                  <div className={style.userNews}></div>
                  <p className={style.classIconText} >消息</p>
                </NavLink>
              </div>
              <div className={isActive==2?style.active:style.classIcon} ref="userWork" onClick={this.getWork}>
                <NavLink to="/chat/work">
                  <div className={style.userWork}></div>
                  <p className={style.classIconText}>工作</p>
                </NavLink>
              </div>
            </div>
            <div className={style.rightCon}>
              <Switch>
                <Route path="/chat/work" component={Work} />
                <Route path="/chat/chat" component={News} />
                <Redirect to="/chat/chat" />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Chat;
