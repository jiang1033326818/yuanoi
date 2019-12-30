import React from 'react';
import { connect } from 'dva';

import style from './index.less';
import Chat from './Chat';
import Work from './Work';
import Group from './Group';

import newsImg from '../../../images/chat/news.png';
import worksImg from '../../../images/chat/works.png';
import newImg from '../../../images/chat/neww.png';
import workImg from '../../../images/chat/work.png';
import { Icon, Spin } from 'antd';
import styles from '../Admin/origin.less';
@connect(({ userlist,groups,allclick,chartabout, loading }) => ({
    userlist,
    groups,
    allclick,
  chartabout,
    loading: loading.effects['userlist/fetch'],
}))

class Index extends React.Component {
    state={
        showNews:true,
        nowUser:[],
        hasInfo:false,
        ismove:false,
        offX:0,
        offY:0,
        showThisImg:'',
        isShowImg:false,
        newInfos:{},
        minSize:true,
        x:null,
        y:null,
    }
    componentDidMount(){
        this.getNowUser();
        window.addEventListener('mousemove',this.move);
        window.addEventListener('mouseup',this.moveUp);
    }
    changeSize = () =>{
        let {minSize,x,y} = this.state;
        if(minSize){
            this.refs.content.style.left = 0;
            this.refs.content.style.top = 0;
        }else{
            this.refs.content.style.left = x;
            this.refs.content.style.top = y;
        }
        this.setState({
            minSize:!minSize
        })
    }
    // 移动聊天界面
    moveDown = (e) =>{
        let {minSize} = this.state;
        if(minSize&&e.target.className=='antd-pro-pages-chat-index-leftNav'){
            this.setState({
                ismove:true,
                offX:e.nativeEvent.offsetX,
                offY:e.nativeEvent.offsetY
            })
        }
    }
    move = (e) =>{
        let {minSize} = this.state;
        if(minSize&&this.state.ismove){
            let {offX,offY} = this.state;
            this.refs.content.style.left = e.clientX - offX + 'px';
            this.refs.content.style.top = e.clientY - 54 - offY + 'px';
            this.setState({
                x:e.clientX - offX + 'px',
                y:e.clientY - 54 - offY + 'px'
            })
        }
    }
    moveUp = (e) =>{
        this.setState({
            ismove:false
        })
    }
    // 获取当前用户
    getNowUser = () =>{
        let {dispatch} = this.props;
        dispatch({
            type: 'userlist/fetchnow',
            callback: res => {
            //   console.log(res,'userlists');
              let nowUser = res.result[0]?res.result[0]:{avatar:''}
              this.setState({
                nowUser
              });
            },
        });
    }
    // 点击消息
    goNews = () =>{
        this.setState({
            showNews:true
        })
    }
    // 点击工作
    goWorks = () =>{
        this.setState({
            showNews:false
        })
    }
    // 个人简介
    infoBlock=(e)=>{
        e?e.stopPropagation() : window.event.cancelBubble = true;
        let {hasInfo} = this.state;
        this.setState({
          hasInfo:!hasInfo
        })
    }
    // 图片预览
    showImgs = (imgSrc,e) =>{
        console.log(imgSrc,e)
        e?e.stopPropagation() : window.event.cancelBubble = true;
        this.setState({
            showThisImg:imgSrc,
            isShowImg:true
        })
    }
    allClicks = ()=>{
        let {dispatch,groups,allclick} = this.props;
        dispatch({
            type: 'groups/show',
            payload: false
        });
        dispatch({
            type:"allclick/emoji",
            payload: false
        })
        dispatch({
            type:"allclick/history",
            payload: false
        })
        dispatch({
            type:"allclick/more",
            payload: false
        })
        this.setState({
            hasInfo:false,
            isShowImg:false
        })
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        let {showNews,nowUser,hasInfo,showThisImg,isShowImg,newInfos,minSize} = this.state;
        let {groups} = this.props;
        // console.log(nowUser)
        // 右侧内容
        let rightCon = (
            <div className={style.rightCon}>
                {
                    showNews?(

                      <div className={style.newCon}><Chat changeSize={this.changeSize} showImgs={this.showImgs} newInfos={newInfos} /></div>
                    ):(
                      <div className={style.workCon}><Work changeSize={this.changeSize} showImgs={this.showImgs} newInfos={newInfos} /></div>
                    )
                }
            </div>
        )
        // 当前用户信息
        let userInfo = (
            <div className={style.userInfo}>
                <p>{nowUser.nickname}</p>
                <img src={nowUser.avatar} />
                <p>职位：{nowUser.pos}</p>
            </div>
        )
        let imgPrew = (
            <div className={style.showImg}>
                <img src={showThisImg} alt=""/>
            </div>
        )


          return (
            <div className={style.max} onClick={this.allClicks}>
              <div className={minSize?style.content:style.contentMax} onMouseDown={this.moveDown} ref='content'>
                {/* {groups.isGroupShow?<Group {...this.props} />:''} */}
                <div className={style.leftNav}>
                  <div className={style.userImg} onClick={this.infoBlock}>
                    <img src={nowUser.avatar} alt=""/>
                    {hasInfo?userInfo:''}
                  </div>
                  <div className={showNews?style.nowNav:style.elseNav} onClick={this.goNews}>
                    <img className={style.navImg} src={showNews?newsImg:newImg} alt=""/>
                    <p className={style.navCon}>消息</p>
                  </div>
                  <div className={showNews?style.elseNav:style.nowNav} onClick={this.goWorks}>
                    <img className={style.navImg} src={showNews?workImg:worksImg} alt=""/>
                    <p className={style.navCon}>工作</p>
                  </div>
                </div>
                {/* 右侧内容 */}
                {rightCon}
              </div>
              {isShowImg?imgPrew:''}
            </div>
          );


    }
}

export default Index;
