import React from 'react';

import style from './chat.less';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';

import logo from '../../../images/colorlogo.png';
import toMax from '../../../images/chat/toMax.png';
import toMin from '../../../images/chat/toMin.png';


class Chat extends React.Component {
    state={
        showRight:false,
        isToMax:true
    }
    showR = () =>{
        this.setState({
            showRight:true
        })
    }
    maxTap = () =>{
        this.setState({
            isToMax:!this.state.isToMax
        })
        this.props.changeSize()
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        let {showRight,isToMax} = this.state;
        return (
            <div className={style.chat}>
                <div className={style.chatLeft}>
                    <ChatLeft showR={this.showR} />
                </div>
                <div className={style.chatRight}>
                    <div style={{height:'100%',display:showRight?'block':'none'}}>
                        <ChatRight {...this.props} showRight={showRight} isToMax={isToMax} />
                    </div>
                    <img onClick={this.maxTap} className={style.toMax} src={isToMax?toMax:toMin} alt=""/>
                    <img style={{display:showRight?'none':'block'}} className={style.logo} src={logo} alt=""/>
                </div>
            </div>
        );
    }
}

export default Chat;
