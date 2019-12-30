import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, message,Modal,Checkbox,Icon } from 'antd';
import styles from './jurisdiction.less';
import copy from 'copy-to-clipboard';

import bumen from '../../../images/bumen.png'


const Search = Input.Search;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

@connect(({ user,jurisd,userlist,loading }) => ({
  user,
  jurisd,
  userlist,
  submitting: loading.effects['user/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
    message:"复制这段话发送到工作群中。请各位伙伴在企业专链位伙伴www.yuanji.urojfsf.com进行注册。",
    list:[],
    visible: false,
    checkedList:[],
    userlist:[],
    chooselist:[],
    sureAdd:[],
    deptlist:[],
    visibles: false,
    checkedLists:[],
    chooselists:[],
    sureAdds:[],
    panel_id:''
  };

  componentDidMount() {
    const {dispatch} =this.props
    dispatch({
      type: 'user/fetchCurrent',
    });
    const {user} =this.props;
    // 获取面板列表
    this.getPanels()
    // 获取人员列表
    this.getUsers()
    // 获取部门列表
    this.getDept()
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  copy=()=>{
    copy(this.state.message)
    message.success("复制成功")
  }

  set=(e)=>{
    this.setState({
      message:e.target.value
    })
  }

  // 获取流程面板列表
  getPanels = () =>{
    const {dispatch} =this.props
    dispatch({
      type: 'jurisd/fetch',
      callback: res=>{
        console.log(res,'-----------------')
        if(res.code==0){
          this.setState({
            list:res.result
          })
        }
      }
    });
  }
  // 获取人员列表
  getUsers = () =>{
    const {dispatch} =this.props
    dispatch({
      type: 'userlist/fetch',
      callback: res=>{
        // console.log(res,'userlist-----------------')
        if(res.code==0){
          this.setState({
            userlist:res.result
          })
        }
      }
    });
  }
  // 获取部门列表
  getDept = () =>{
    const {dispatch} =this.props
    dispatch({
      type: 'jurisd/fetchd',
      callback: res=>{
        console.log(res,'fetchd-----------------')
        if(res.code==0){
          this.setState({
            deptlist:res.result
          })
        }
      }
    });
  }

  // 添加/删除面板人员
  addPanUser = (panel_id,list,type) =>{
    const {dispatch} =this.props;
    let nos = list.join()
    let payload = {nos,panel_id,type};
    dispatch({
      type: 'jurisd/addp',
      payload:payload,
      callback: res=>{
        console.log(res,'addp-----------------')
        if(res.code==0){
          message.success(type==0?"添加人员成功":"删除人员成功")
          this.getPanels()
        }else{
          message.warn(res.msg)
        }
      }
    });
  }
  // 添加/删除面板部门
  addDept = (list,type) =>{
    const {dispatch} =this.props;
    let {panel_id} = this.state;
    let depts = list.join();
    let payload = {depts,panel_id,type}
    dispatch({
      type: 'jurisd/addd',
      payload:payload,
      callback: res=>{
        console.log(res,'addd-----------------')
        if(res.code==0){
          message.success(type==0?"添加部门成功":"删除部门成功")
          this.getPanels()
        }else{
          message.warn(res.msg)
        }
      }
    });
  }

  // 显示添加人员
  showModal = panel_id => {
    this.setState({
      visible: true,
      panel_id,
      checkedList:[],
      chooselist:[]
    });
  };
  // 点击添加人员确定
  handleOk = e => {
    let {checkedList,panel_id} = this.state;
    this.addPanUser(panel_id,checkedList,0)
    this.setState({
      visible: false,
      sureAdd: checkedList
    });
  };
  // 点击添加人员取消
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  // 选中成员
  onChange = checkedList => {
    // console.log(checkedList,'checkedList-----------')
    let {chooselist,userlist} = this.state;
    let arr = [];
    checkedList.map(item=>{
      userlist.map(ite=>{
        if(item==ite.no){
          arr.push(ite)
        }
      })
    })
    this.setState({
      checkedList,
      chooselist:arr
    });
  };
  // 删除成员
  moveUser = id =>{
    let {chooselist,checkedList} = this.state;
    let a = checkedList.filter(item=>id!==item);
    let b = chooselist.filter(item=>item.no!==id);
    console.log(checkedList,chooselist,'-----------')
    this.setState({
      checkedList:[...a],
      chooselist:[...b]
    })
  }

  // 显示添加部门
  showModals = panel_id => {
    this.setState({
      visibles: true,
      panel_id,
      checkedLists:[],
      chooselists:[]
    });
  };
  // 点击添加部门确定
  handleOks = e => {
    let {checkedLists} = this.state;
    this.addDept(checkedLists,0)
    this.setState({
      visibles: false,
      sureAdds: checkedLists
    });
  };
  // 点击添加部门取消
  handleCancels = e => {
    console.log(e);
    this.setState({
      visibles: false,
    });
  };
  // 选中部门
  onChanges = checkedLists => {
    // console.log(checkedList,'checkedList-----------')
    let {chooselists,deptlist} = this.state;
    let arr = [];
    checkedLists.map(item=>{
      deptlist.map(ite=>{
        if(item==ite.dept_id){
          arr.push(ite)
        }
      })
    })
    this.setState({
      checkedLists,
      chooselists:arr
    });
  };
  // 删除部门
  moveUsers = id =>{
    let {chooselists,checkedLists} = this.state;
    let a = checkedLists.filter(item=>id!==item);
    let b = chooselists.filter(item=>item.dept_id!==id);
    console.log(checkedLists,chooselists,'-----------')
    this.setState({
      checkedLists:[...a],
      chooselists:[...b]
    })
  }
  // 删除人员
  itemMove = (id,one) =>{
    console.log(one,'one-------------')
    this.addPanUser(id,[one.no],1)
  }

  render() {
    const {user}=this.props
    let {list,checkedList,userlist,chooselist,deptlist,checkedLists,chooselists} = this.state;
    // console.log(list,'--------------')
    return (
      <div className={styles.jurisdiction}>
        <p className={styles.jTitle}>面板分配</p>
        <div className={styles.all}>
          {
            list.map(item=>(
              <div key={item.panel_id} className={styles.userBox}>
                <div className={styles.topBox}>
                  <p className={styles.tTit}>{item.name}</p>
                  <p className={styles.tInfo}>{item.explain}</p>
                </div>
                <div className={styles.botBox}>
                  <div className={styles.userAll}>
                    {
                      item.users.map(ite=>(
                        <div key={ite.no} className={styles.userItem}>
                          <div className={styles.imgBox}>
                            <img className={styles.itemImg} src={ite.avatar} alt=""/>
                            <p onClick={()=>this.itemMove(item.panel_id,ite)} className={styles.itemMove}>删除</p>
                          </div>
                          <span className={styles.itemName}>{ite.name}</span>
                        </div>
                      ))
                    }
                  </div>
                  <p className={styles.addUser} onClick={item.addtype==1?()=>this.showModal(item.panel_id):()=>this.showModals(item.panel_id)}>{item.addtype==1?'添加人员':'添加部门'}</p>
                </div>
              </div>
            ))
          }
        </div>
        <Modal
          title="添加人员"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width = {710}
          bodyStyle={{width:710,height:541}}
        >
          <div className={styles.sousuo}>
            <Search
              placeholder="搜索"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>
          <div className={styles.allUser}>
              <div className={styles.leftUser}>
              <CheckboxGroup
                // options={plainOptions}
                value={checkedList}
                onChange={this.onChange}
              >
                {
                  userlist.map(item=>(
                    <div key={item.no} className={styles.itemUser}>
                      <Checkbox value={item.no}>
                        <div className={styles.userInfo}>
                          <img className={styles.userImg} src={item.avatar} alt=""/>
                          <div className={styles.userText}>
                            <p className={styles.userName}>{item.truename}</p>
                            <p className={styles.userPower}>{item.dept==''?item.dept:'-'+item.dept}{item.pos}</p>
                          </div>
                        </div>
                      </Checkbox>
                    </div>
                  ))
                }
              </CheckboxGroup>
              </div>
              <div className={styles.rightUser}>
                {
                  chooselist.map(item=>(
                    <div key={item.no} className={styles.itemUser}>
                      <div className={styles.userInfo}>
                        <img className={styles.userImg} src={item.avatar} alt=""/>
                        <div className={styles.userText}>
                          <p className={styles.userName}>{item.truename}</p>
                          <p className={styles.userPower}>{item.dept==''?item.dept:'-'+item.dept}{item.pos}</p>
                        </div>
                      </div>
                      <Icon onClick={()=>this.moveUser(item.no)} type="close" style={{cursor: 'pointer'}} />
                    </div>
                  ))
                }
              </div>
          </div>
        </Modal>
        <Modal
          title="添加部门"
          visible={this.state.visibles}
          onOk={this.handleOks}
          onCancel={this.handleCancels}
          width = {710}
          bodyStyle={{width:710,height:541}}
        >
          <div className={styles.sousuo}></div>
          <div className={styles.allUser}>
              <div className={styles.leftUser}>
              <CheckboxGroup
                // options={plainOptions}
                value={checkedLists}
                onChange={this.onChanges}
              >
                {
                  deptlist.map(item=>(
                    <div key={item.dept_id} className={styles.itemUser}>
                      <Checkbox value={item.dept_id}>
                        <div className={styles.userInfo}>
                          <img className={styles.userImg} src={bumen} alt=""/>
                          <div className={styles.userText}>
                            <p className={styles.userName}>{item.name}</p>
                          </div>
                        </div>
                      </Checkbox>
                    </div>
                  ))
                }
              </CheckboxGroup>
              </div>
              <div className={styles.rightUser}>
                {
                  chooselists.map(item=>(
                    <div key={item.dept_id} className={styles.itemUser}>
                      <div className={styles.userInfo}>
                        <img className={styles.userImg} src={bumen} alt=""/>
                        <div className={styles.userText}>
                          <p className={styles.userName}>{item.name}</p>
                        </div>
                      </div>
                      <Icon onClick={()=>this.moveUsers(item.dept_id)} type="close" style={{cursor: 'pointer'}} />
                    </div>
                  ))
                }
              </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Register;
