import React from 'react';
import { connect } from 'dva';

import style from './Historys.less';
import Sousuo from './Sousuo';

import close from '../../../images/chat/close@2x.png';

@connect(({ allclick }) => ({
    allclick
}))

class Historys extends React.Component {
    state = {
        isAll:true
    }
    componentDidMount(){
        this.scrollBom()
        if(this.refs.chatShow){
            let num = 0;
            let obj2 = this.refs.chatShow;
            this.props.addEvent(obj2,"mousewheel",this.wheel);
            this.props.addEvent(obj2,"DOMMouseScroll",this.wheel);  
        }
    }
    wheel = (e) =>{
        var ev = window.event||e;
        var dir = -ev.detail||ev.wheelDelta
        if(dir>0){
            if(this.refs.chatShow){
                let {chating} = this.props;
                let list = this.refs.chatShow;
                let top = list.scrollTop;
                let one = RongIMLib.ConversationType.PRIVATE;
                let group = RongIMLib.ConversationType.GROUP;
                if(top<=10){
                    list.scrollTop = 10
                    if(chating.no){
                        this.props.getHistory(one,`${chating.no}`,null,20)
                    }else{
                        this.props.getHistory(group,`${chating.id}`,null,20)       
                    }
                }
            }
        }
    }
    // 滚动到底部
    scrollBom = () =>{
        if(this.refs.chatShow){
            let list = this.refs.chatShow;
            list.scrollTop = list.scrollHeight;
        }
    }
    // 显示全部
    showAll = () =>{
        this.setState({
            isAll:true
        })
    }
    // 显示图片
    showImg = () =>{
        this.setState({
            isAll:false
        })
    }
    // 聊天信息显示
    msg = (item) =>{
        switch(item.content.messageName){
            case "TextMessage":
                let val = item.content.content.split('\n');
                return (<p className={style.textMsg}>{
                    val.map(i=>(<li>{i}</li>))
                }</p>)
                // return (<p className={}>{item.content.content}</p>)
                break;
            // case "VoiceMessage":
            //     return (
            //     <p className={item.isLeft?style.you:''}>
            //         <img src={video} alt=""/>
            //     </p>
            //     )
            //     break;
            case "ImageMessage":
                return (<img className={style.chatImg} src={item.content.imageUri} onClick={()=>this.showImg(item.content.imageUri)} alt=""/>)
                break;
            default:
                return (<p className={item.isLeft?style.you:''}>不支持该消息，可在手机查看</p>)
                break;
        }
    }
    // 获取时间
    getTime = (date) =>{
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes()+1;
        let seconds = date.getSeconds();
        minutes = minutes>=10?minutes:'0'+minutes;
        seconds = seconds>=10?seconds:'0'+seconds;
        return {year,month,day,hour,minutes,seconds}
    }
    // 时间戳转换为时间
    showDate = (time) =>{
        let dates = new Date(time);
        let dateNow = new Date();
        let now = this.getTime(dateNow);
        let send = this.getTime(dates);
        if(now.day==send.day){
            return `${send.hour}:${send.minutes}:${send.seconds}`;
        }else{
            return `${send.year}/${send.month}/${send.day}`;
        }
    }
    stopEvent = (e) =>{
        e?e.stopPropagation() : window.event.cancelBubble = true;
    }
    close = () =>{
        let {dispatch,allclick} = this.props;
        dispatch({
            type:"allclick/history",
            payload: false
        })
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render(){
        let {isAll} = this.state;
        // 显示全部聊天信息
        let chatShow = (
            <div ref='chatShow' className={style.chatShow}>
                {/* {this.props.hasMoreTip?(<li className={style.moreTip}>暂无更多</li>):''} */}
                {
                    this.props.chatList.map(item=>(
                        <div key={item.messageId} className={style.chatyou}>
                            <img className={style.userImg} src={item.user.avatar} alt=""/>
                            <div className={style.chatItem}>
                                <p className={style.chatUser}>
                                    <span>{item.user.truename}-{item.user.pos}</span>
                                    <span>{this.showDate(item.sentTime)}</span>
                                </p>
                                {this.msg(item)}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
        // 显示图片
        let chatImg = (
            <div ref='chatShow' className={style.chatShow}>
                {/* {this.props.hasMoreTip?(<li className={style.moreTip}>暂无更多</li>):''} */}
                {
                    this.props.chatList.map(item=>(
                        item.content.messageName=="ImageMessage"?
                        (<div key={item.messageId} className={style.chatyou}>
                            <img className={style.userImg} src={item.user.avatar} alt=""/>
                            <div className={style.chatItem}>
                                <p className={style.chatUser}>
                                    <span>{item.user.nickname}-{item.user.pos}</span>
                                    <span>{this.showDate(item.sentTime)}</span>
                                </p>
                                {this.msg(item)}
                            </div>
                        </div>):''
                    ))
                }
            </div>
        )
        return (
            <div className={style.historys} onClick={this.stopEvent}>
                <img onClick={this.close} src={close} className={style.close} alt=""/>
                <div className={style.sousuo}>
                    {/* <Sousuo /> */}
                </div>
                <div className={style.chatTap}>
                    <span className={isAll?style.nowspan:''} onClick={this.showAll}>
                        全部
                    </span>
                    {/* <span>文件</span> */}
                    <span className={isAll?'':style.nowspan} onClick={this.showImg}>
                        图片
                    </span>
                </div>
                <div className={style.chatCon}>{isAll?chatShow:chatImg}</div>
            </div>
        )
    }
}

export default Historys;