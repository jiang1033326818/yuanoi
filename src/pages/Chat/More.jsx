import React from 'react';
import { connect } from 'dva';

import style from './More.less';
import Sousuo from './Sousuo';

import add from '../../../images/chat/addUser@2x.png';
import pen from '../../../images/chat/pen@2x.png';

@connect(({ userlist,chatabout,groups,allclick, loading }) => ({
    userlist,
    chatabout,
    groups,
    allclick,
    loading: loading.effects['userlist/fetch'],
}))

class More extends React.Component {
    state = {
        userList:[],
        group_id:'',
        name:''
    }
    componentWillReceiveProps(nextprops){
        // console.log(nextprops,'addUsers')
        if(this.props.chatabout.nowChoose!==nextprops.chatabout.nowChoose){
            // console.log(this.props,nextprops,'more');
            let nowChoose = nextprops.chatabout.nowChoose;
            if(nowChoose.id){
                this.userInit(nowChoose.id)
                this.setState({
                    name:nowChoose.name
                })
            }
        }
    }
    // 获取用户
    userInit = (group_id) =>{
        let {dispatch} = this.props;
        dispatch({
            type: 'groups/groupInfo',
            payload:{
                group_id
            },
            callback: res => {
                // console.log(res,'groups');
                this.setState({
                    userList:res.result.users,
                    group_id:group_id
                })
            },
        });
    }
    // 添加群成员
    addUser = () =>{
        let {dispatch} = this.props;
        let {group_id,userList} = this.state;
        dispatch({
            type: 'groups/adds',
            payload:group_id
        });
        dispatch({
            type: 'groups/show',
            payload:true,
        });
    }
    // 修改群名
    resetName = (e) =>{
        e.target.style.background = '#F6F6F6';
        let val = e.target.value;
        let {name} = this.state;
        // console.log(name,val,'name,val')
        if(name!=val){
            let {dispatch} = this.props;
            let {group_id} = this.state;
            dispatch({
                type: 'groups/reset',
                payload:{
                    group_id:group_id,
                    name:val
                },
                callback:()=>{
                    dispatch({
                        type: 'groups/fetch'
                    });
                }
            });
        }
    }
    // 可编辑
    reName = (e) =>{
        e.target.style.background = '#ffffff';
        this.refs.rename.value = this.state.name;
    }
    // 搜索
    sousuo = (val) =>{
        let {dispatch} = this.props;
        // console.log(val,'sousuo')
        dispatch({
            type: 'userlist/fetch',
            payload:{
                name:val
            },
            callback: res => {
                // console.log(res,'fetch');
                let userList = res.result?res.result:[]
                this.setState({
                    userList
                });
            },
        });
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render(){
        let {userList,name} = this.state;
        let users = (
            <div className={style.users}>
                <div className={style.userItem} onClick={this.addUser}>
                    <img src={add} alt=""/>
                    <p>添加</p>
                </div>
                {
                    userList.map(item=>(
                        <div className={style.userItem} key={item.no}>
                            <img src={item.avatar} alt=""/>
                            <p>{item.truename}</p>
                        </div> 
                    ))
                }
            </div>
        )
        return (
            <div className={style.more}>
                <div className={style.sousuo}><Sousuo sousuo={this.sousuo} /></div>
                {users}
                <div className={style.reName}>
                    <p>群名</p>
                    <input ref="rename" onFocus={this.reName} placeholder={name} onBlur={this.resetName} maxLength='10' type="text" />
                    <img src={pen} alt="" className={style.pen} />
                </div>
            </div>
        )
    }
}

export default More;