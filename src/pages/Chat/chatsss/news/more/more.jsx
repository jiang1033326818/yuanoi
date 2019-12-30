import React from 'react';
import { getGroupList,getGroupInfo,noGroup,resetGroupName,searchUser } from '../../../../services/api.js';
import style from './more.less';
import add from '../../../../../images/chat/addUser@2x.png';
import del from '../../../../../images/chat/delUser@2x.png';
import pen from '../../../../../images/chat/pen@2x.png';
import sousuo from '../../../../../images/chat/sousuo@2x.png';
import close from '../../../../../images/chat/close@2x.png';

class More extends React.Component {
    state = {
        souList:[]
    }
    componentDidMount(){
        // this.refs.rename.value = this.props.chating.name
    }
    // 添加群成员
    addUser = () =>{
        this.props.userAdd('add',this.props.chating.id)
    }
    // 退出
    delUser = () =>{
        
    }
    // 解散群
    no = () =>{
        noGroup(this.props.chating.id).then(res=>{
            console.log(res,"解散群聊成功",this.props.chating)
        })
    }
    // 修改群名
    resetName = (e) =>{
        e.target.style.background = '#F6F6F6';
        let val = e.target.value
        console.log(this.props.chating,val)
        if(this.props.chating.name!=val){
            resetGroupName(this.props.chating.id,val).then(res=>{
                console.log(res)
            })
        }
    }
    // 可编辑
    reName = (e) =>{
        e.target.style.background = '#ffffff';
        this.refs.rename.value = this.props.chating.name;
    }
    // 聚焦
    souFocus = (e) =>{
        this.refs.souCon.style.display = 'block';
        this.refs.close.style.display = 'block';
    }
    // 关闭搜索
    closeSou = () =>{
        this.refs.souCon.style.display = 'none';
        this.refs.close.style.display = 'none';
    }
    // 搜索
    sousuo = (e) =>{
        console.log(e.target.value)
        let val = e.target.value.trim()
        if(val!==''){
            searchUser(e.target.value).then(res=>{
                let souList = res.result.groups.concat(res.result.users)
                console.log(souList)
                this.setState({
                    souList
                })
            })
        }
    }
    render(){
        let {startName,souList} = this.state
        return (
            <div className={style.more}>
                {
                    this.props.chating.name?(
                        <div className={style.topSou}>
                            <img className={style.sousuo} src={sousuo} />
                            <input type="text" placeholder="搜索" onFocus={this.souFocus} onBlur={this.sousuo} />
                            <img src={close} ref='close' onClick={this.closeSou} className={style.close} alt=""/>
                        </div>
                    ):''
                }
                <div className={style.tapDown}>
                    <div className={style.souCon} ref='souCon'>
                        {souList.length==0?"暂无结果":souList.map(item => (
                            <div className={style.userItem} 
                            key={item.no?item.no:item.id}>
                            <img src={item.avatar?item.avatar:item.image} alt="" />
                            <p>{item.nickname?item.nickname:item.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className={style.groupUsers}>
                        <div>
                            <img src={add} onClick={this.addUser} alt=""/>
                            <p>添加</p>
                        </div>
                        {
                            this.props.nowGroup.map(item=>(
                                <div key={item.no}>
                                    <img src={item.avatar} alt=""/>
                                    <p>{item.nickname}</p>
                                </div>
                            ))
                        }
                    </div>
                    {
                        this.props.chating.name?(
                            <div className={style.reName}>
                                <p>群名</p>
                                <input type="text" ref='rename' onFocus={this.reName} placeholder={this.props.chating.name} onBlur={this.resetName} />
                                <img src={pen} alt="" className={style.pen} />
                            </div>
                        ):''
                    }
                    <p onClick={this.no}>解散群聊</p>
                </div>
            </div>
        )
    }
}

export default More;