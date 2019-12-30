import React from 'react';
import { connect } from 'dva';

import style from './Group.less';
import Sousuo from './Sousuo';

import ready from '../../../images/chat/ready@2x.png';
import add from '../../../images/chat/add@2x.png';
import close from '../../../images/chat/close@2x.png';
import dels from '../../../images/chat/dels@2x.png';

@connect(({ userlist, groups, loading }) => ({
    userlist,
    groups,
    loading: loading.effects['userlist/fetch'],
}))

class Group extends React.Component {
    state = {
        userList:[],
        chooseList:[]
    }
    componentDidMount(){
        console.log(this.props)
        this.userInit()
    }
    // 获取用户列表
    userInit = () =>{
        let {dispatch} = this.props;
        let {chooseList,userList} = this.state;
        dispatch({
            type: 'userlist/fetch',
            payload:{
                type:1
            },
            callback: res => {
                // console.log(res,'fetch');
                let userList = res.result?res.result:[];
                userList.map(item=>{
                    item.content.map(it=>{
                        it.isChoose = false
                        return it;
                    })
                })
                this.setState({
                    userList
                });
            },
        });
    }
    // 选择人员
    chooseOne = (item) =>{
        let {chooseList,userList} = this.state;
        userList.map(ite=>{
            ite.content.map(it=>{
                if(item.no==it.no){
                    it.isChoose = !it.isChoose
                }
                return it;
            })
        })
        let hasUser = chooseList.find(it=>item.no==it.no);
        if(hasUser){
            chooseList.map(it=>{
                if(it.no==item.no){
                    it.isChoose = false
                }
                return it;
            })
        }else{
            chooseList.push(item)
        }
        // hasUser?chooseList:chooseList.push(item);
        chooseList = chooseList.filter(item=>item.isChoose)
        // console.log(item,userList,chooseList,'qqqqqq')
        this.setState({
            chooseList,
            userList
        })
    }
    // 删除选择成员
    delUser = (item,index) =>{
        let {chooseList,userList} = this.state;
        userList.map(ite=>{
            ite.content.map(it=>{
                if(item.no==it.no){
                    it.isChoose = false
                }
                return it;
            })
        })
        chooseList.splice(index,1)
        // console.log(chooseList,'----------')
        this.setState({
            chooseList,
            userList
        })
    }
    // 搜索
    sousuo = (val) =>{
        let {dispatch} = this.props;
        dispatch({
            type: 'userlist/fetch',
            payload:{
                name:val,
                type:1
            },
            callback: res => {
                let userList = res.result?res.result:[];
                let {chooseList} = this.state;
                userList = userList.map(item=>{
                    item.content.map(it=>{
                        it.isChoose = false
                        chooseList.map(i=>{
                            // console.log(i,'chooseList')
                            if(i.no==it.no){
                                it.isChoose = true
                            }
                        })
                        return it;
                    })
                    return item;
                })
                this.setState({
                    userList
                });
            },
        });
    }
    // 创建群聊
    setGroup = () =>{
        let {chooseList} = this.state;
        console.log(chooseList)
        let str = chooseList.map(item=>item.no).join()
        let {dispatch} = this.props;
        console.log(this.props,'create')
        this.close()
        if(!this.props.groups.isadd){
            dispatch({
                type: 'groups/add',
                payload:{
                    type:'work',
                    name:`群聊(${chooseList.length+1})`,
                    members:str
                },
                callback: res => {
                    console.log(res,'addGroup')
                    dispatch({
                        type: 'groups/fetch',
                        callback: res=>{
                            console.log(res,this.props.addGroup,'okokokok')
                            this.props.addGroup(res.result)
                        }
                    });
                },
            });
        }else{ 
            console.log(this.props.groups.isadd,'addUser')
            let group_id = this.props.groups.isadd;
            dispatch({
                type: 'groups/addUser',
                payload:{
                    group_id:group_id,
                    members:str
                },
                callback: res => {
                    console.log(res,'addUser成功！');
                },
            });
        }
        
    }
    // 关闭
    close = () =>{
        let {dispatch} = this.props;
        dispatch({
            type: 'groups/show',
            payload:false,
        });
    }
    stopEvent = (e) =>{
        e?e.stopPropagation() : window.event.cancelBubble = true;
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return;
        }
    }
    render(){
        let {userList,chooseList} = this.state;
        let {nowUser} = this.props.userlist;
        let allUser = (
            <div className={style.allUser}>
                {
                    userList.map(item=>(
                        <div key={item.word}>
                            {item.content.length==1&&item.content[0].no==nowUser[0].no?'':<p className={style.word}>{item.word}</p>}
                            {
                                item.content.map(item=>(
                                    item.no==nowUser[0].no?'':(
                                        <div className={style.userItem} key={item.no} onClick={()=>this.chooseOne(item)}>
                                            <img className={style.userImg} src={item.avatar} alt=""/>
                                            <div className={style.userInfo}>
                                                <p className={style.userName}>{item.truename}</p>
                                                <p className={style.userChat}>{item.dept}-{item.pos}</p>
                                            </div>
                                            <img className={style.ready} src={item.isChoose?add:ready} alt=""/>
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        )
        let chooseUser = (
            <div className={style.allUser}>
                {   
                    chooseList.map((item,index)=>(
                        <div className={style.userItem} key={item.no}>
                            <img className={style.userImg} src={item.avatar} alt=""/>
                            <div className={style.userInfo}>
                                <p className={style.userName}>{item.truename}</p>
                                <p className={style.userChat}>{item.dept}-{item.pos}</p>
                            </div>
                            <img className={style.ready} onClick={()=>this.delUser(item,index)} src={dels} alt=""/>
                        </div>
                    ))
                }
            </div>
        )
        return (
            <div className={style.groupMask}>
                <div className={style.group} onClick={this.stopEvent}>
                    <div className={style.groupLeft}>
                        <div className={style.sousuo}><Sousuo sousuo={this.sousuo} /></div>
                        {allUser}
                    </div>
                    <div className={style.groupRight}>
                        <p className={style.groupTip}>请勾选需要添加的联系人</p>
                        <img className={style.close} src={close} alt="" onClick={this.close}/>
                        {chooseUser}
                        <div className={style.btns}>
                            <button className={style.sure} onClick={this.setGroup}>确定</button>
                            <button onClick={this.close}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Group;