import React from 'react';
import { connect } from 'dva';

import style from './Sousuo.less';

import sousuo from '../../../images/chat/sousuo@2x.png';
import add from '../../../images/chat/+@2x.png';
import close from '../../../images/chat/close@2x.png';

@connect(({ userlist, loading }) => ({
    userlist,
    loading: loading.effects['userlist/fetch'],
}))

class Sousuo extends React.Component {
    state = {
        closeShow:false
    }
    componentDidMount(){
        window.addEventListener('keydown',this.enterDown)
    }
    // 聚焦时触发
    souFocus = (e) =>{
        // this.props.sousuoInit?this.props.sousuoInit():'';
        this.setState({
            closeShow:true
        })
    }
    // 失焦时触发
    sousuo = (e) =>{
        let val = e.target.value;
        this.props.sousuo?this.props.sousuo(val):'';
        this.refs.sousuo.value = '';
        // 搜索
        this.setState({
            closeShow:false
        })
    }
    // 按 enter 时 触发失焦事件
    enterDown = (e) =>{
        if(e.keyCode==13){
            this.refs.sousuo?this.refs.sousuo.blur():'';
        }
    }
    // 关闭搜索
    closeSousou = () =>{
        if(this.refs.sousuo){
            this.refs.sousuo.value = '';
            this.props.sousuo?this.props.sousuo(''):'';
        }
        // this.props.closeSou?this.props.closeSou():'';
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render() {
        let {closeShow} = this.state;
        return (
            <div className={style.sousuo}>
                <div className={style.souBox}>
                    <img className={style.souImg} src={sousuo} />
                    <input className={style.souInp} 
                        type="text" 
                        placeholder="搜索"
                        ref='sousuo'
                        onBlur={this.sousuo}
                        onFocus={this.souFocus}
                    />
                    <img src={closeShow?close:''} className={style.close} onClick={this.closeSousou} />
                </div>
            </div>
        );
    }
}

export default Sousuo;