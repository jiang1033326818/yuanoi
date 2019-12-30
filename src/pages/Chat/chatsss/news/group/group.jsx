import React from 'react';
import { async } from 'q';
import style from './group.less';

import sousuo from '../../../../../images/chat/sousuo@2x.png';
import ready from '../../../../../images/chat/ready@2x.png';
import add from '../../../../../images/chat/add@2x.png';
import close from '../../../../../images/chat/close@2x.png';
import { getUser, getGroup, inGroup, outGroup, searchUser } from '../../../../services/api.js';

class Group extends React.Component{
    state = {
        userList:[],
        souList:[]
    }
    // 获取好友列表
    getUserList = async()=>{
        let userList = await getUser();
        userList = userList.result?userList.result.map(item=>{
            item.isadd=false
            return item
        }):[]
        this.setState({
            userList
        });
    }
    componentDidMount(){
        this.getUserList()
    }
    // 选择好友
    chooseOne = (index) =>{
        this.state.userList[index].isadd = !this.state.userList[index].isadd
        this.setState({
            userList:this.state.userList
        })
    }
    // 操作群聊
    setGroup = () =>{
        let list = this.state.userList.filter(item=>item.isadd==true)
        let str = list.map(item=>item.no).join()
        console.log(list)
        switch(this.props.isAdd){
            case "no":
                    // 创建群聊
                    getGroup(`群聊(${list.length})`,str).then(res=>{
                        console.log(res,'创建群聊成功！')
                        this.props.updateGroup()
                    })
                break;
            case "add":
                    // 添加群成员
                    inGroup(this.props.group_id,str).then(res=>{
                        console.log(res,"添加成员成功！")
                    })
                break;
        }
        this.close()
    }
    // 关闭群聊
    close = () =>{
        this.props.closeGroup()
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
        let {userList,souList} = this.state
        return (
            <div className={style.group}>
                <div className={style.left}>
                    <div className={style.topSou}>
                        <img className={style.sousuo} src={sousuo} />
                        <input type="text" placeholder="搜索" onFocus={this.souFocus} onBlur={this.sousuo} />
                        <img src={close} ref='close' onClick={this.closeSou} className={style.close} alt=""/>
                    </div>
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
                        {userList.map((item,index) => (
                            <div className={style.userItem} 
                                onClick={()=>this.chooseOne(index)}
                                key={item.no}>
                                <img src={item.avatar} alt="" />
                                <p>{item.nickname}</p>
                                <img className={style.chooseMe} src={item.isadd?add:ready} alt=""/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.right}>
                    <img className={style.close} src={close} alt="" onClick={this.close}/>
                    <p className={style.titleTip}>请勾选需要添加的联系人</p>
                    {
                        userList.filter(item=>item.isadd==true).map(item=>(
                            <div className={style.userItem} 
                                onClick={()=>this.chooseOne(item,index)}
                                key={item.no}>
                                <img src={item.avatar} alt="" />
                                <p>{item.nickname}</p>
                                <img className={style.chooseMe} src={item.isadd?add:ready} alt=""/>
                            </div>
                        ))
                    }
                    <div className={style.btns}>
                        <button className={style.sure} onClick={this.setGroup}>确定</button>
                        <button onClick={this.close}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group
