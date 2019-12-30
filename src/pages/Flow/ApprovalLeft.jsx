import React from 'react';
import style from './Approval.less';

import yeslevel from '../../../images/flow/yeslevel.png';
import nolevel from '../../../images/flow/nolevel.png';
import plus from  '../../../images/flow/plus.png'
import {Select,Input,message} from 'antd'
import { connect } from 'dva';
import delite from '../../../images/flow/delete2.png';
import suo from '../../../images/flow/suo.png';
import suo2 from '../../../images/flow/suo2.png';

@connect(({ flow,forms,menu, loading }) => ({
  flow,
  forms,
  menu,
  loading: loading.effects['flow/fetch'],
}))
class ApprovalLeft extends React.Component {
  state = {
    termone: false,
    termtwo: false,
    termthree: true,
    condition:[],
    condition2:[{
      name:'0'
    }],
    xuanzhong:0,
    showname:'',
  };
  // 按照汇报线


  componentDidMount() {
    //查询所有的审批条件   先获取审批id
    const { dispatch } = this.props;
    let create=localStorage.getItem("isCreate")
    let form_id=localStorage.getItem("form_id")
    dispatch({
      type: 'forms/fetchtiaojian',
      payload: {
        form_id:form_id==='null'?null:form_id,
      },
      callback: res => {
        localStorage.setItem("approval_id",res.result.approval_id)
        this.setState({
          condition:res.result
        })
        dispatch({
          type: 'forms/gongju2',
          payload: {
            data:res.result[0].examine_rule_id
          },
          callback: (res2) => {

          },
        });

      },
    });

    //获取规则表单列表
    dispatch({
      type: 'forms/ruleform',
      payload: {
        form_id:form_id==='null'?null:form_id,
      },
      callback: res => {
        this.setState({
          condition2:res.result
        })
      },
    });



  }


  delite=(e,a)=>{

    const{ dispatch }=this.props
    dispatch({
      type: 'forms/removetiaojian',
      payload: {
        rule_id:e.examine_rule_id
      },
      callback:res=>{
        if (res.code===0){
          message.success("删除成功")
          dispatch({
            type: 'forms/fetchtiaojian',
            payload: {
              form_id:localStorage.getItem("form_id"),
            },
            callback: res => {
              localStorage.setItem("approval_id",res.result.approval_id)
              this.setState({
                condition:res.result
              })
            },
          });
        } else{
          message.error(res.msg)
        }

      }
    });


  }

  addtiaojian=()=>{
    const{ dispatch }=this.props
    let a ={
      type:0,
    }
      // this.setState({
      //   condition:a
      // })
      dispatch({
        type: 'forms/savetiaojian',
        payload: {
          form_id:localStorage.getItem("form_id"),
          ...a
        },
        callback:res=>{
          if (res.code===0){
            console.log("添加?")
            dispatch({
              type: 'forms/fetchtiaojian',
              payload: {
                form_id:localStorage.getItem("form_id"),
              },
              callback:res2=>{
                this.setState({
                  condition:res2.result
                })
              }
            });
          }
        }
      });
  }

  gaitiaojian=(e,a,b)=>{
    console.log(e,a,b)
    const{dispatch}=this.props
    let noth = this.state.condition;
    let noth2 = this.state.condition2;
    noth[a].form_content_id=b
    for (let i in noth2){
      if (noth2[i].form_content_id===b) {
        this.setState({
          showname:noth2[i].title,
        })
      }
    }
    this.setState({
      condition:noth,
    })
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        ...noth[a],
        form_id:localStorage.getItem("form_id"),
        rule_id:noth[a].examine_rule_id,
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
      },
    });
  }



  gaishuliang=(e,a,b)=>{
    const{ dispatch }=this.props
    console.log(e)
    console.log(a)
    console.log(b)
    let noth = this.state.condition;
    noth[a].contrast=b
    this.setState({
      condition:noth
    })
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        ...noth[a],
        form_id:localStorage.getItem("form_id"),
        rule_id:noth[a].examine_rule_id,
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
      },
    });
  }

  gaishuzi=(e,a,b)=>{
    const{ dispatch }=this.props
    console.log(e)
    console.log(a)
    console.log(b)
    let noth = this.state.condition;
    noth[a].val1=b.target.value
    this.setState({
      condition:noth
    })
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        ...noth[a],
        form_id:localStorage.getItem("form_id"),
        rule_id:noth[a].examine_rule_id,
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
      },
    });
  }

  gaishuzi2=(e,a,b)=>{
    const{ dispatch }=this.props
    console.log(e)
    console.log(a)
    console.log(b)
    let noth = this.state.condition;
    noth[a].val2=b.target.value
    this.setState({
      condition:noth
    })
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        ...noth[a],
        form_id:localStorage.getItem("form_id"),
        rule_id:noth[a].examine_rule_id,
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
      },
    });
  }

  gaijibie=(e,a,b)=>{
    const{ dispatch }=this.props
    let noth = this.state.condition;
    noth[a].grade=b
    this.setState({
      condition:noth
    })
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        grade:noth[a].grade,
        rule_id:noth[a].examine_rule_id,
        form_id:localStorage.getItem("form_id"),
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
      },
    });
  }

  xuanzhong=(e)=>{
    const{dispatch}=this.props
    this.setState({
      xuanzhong:e
    })
    let noth = this.state.condition;
    dispatch({
      type: 'forms/fetchtiaojian',
      payload: {
        form_id:localStorage.getItem("form_id"),
      },
      callback: res => {
        dispatch({
          type: 'forms/gongju',
          payload: {
            data:res.result[e]
          },
          callback: (res) => {
            console.log(res, 2);
            if (res.code === 0) {
            } else {
              message.error(res.msg);
            }
          },
        });
        dispatch({
          type: 'forms/gongju2',
          payload: {
            data:res.result[e].examine_rule_id
          },
          callback: (res) => {
            console.log(res, 2);
            if (res.code === 0) {
            } else {
              message.error(res.msg);
            }
          },
        });
      },
    });


  }

  suo=(e,a,b)=>{
    const{ dispatch }=this.props
    let noth = this.state.condition;
    if(noth[a].status===0){
      noth[a].status=1
    }else{
      noth[a].status=0
    }
    this.setState({
      condition:noth
    })
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        status:noth[a].status,
        rule_id:noth[a].examine_rule_id,
        form_id:localStorage.getItem("form_id"),
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
      },
    });
  }



  render() {
    let { termone, termtwo, condition } = this.state;
    return (
      <div className={style.approvalLeft}>
        <p className={style.leftTitle}>审批条件设置 <img src={plus} style={{width:"16px"}} onClick={this.addtiaojian} alt=""/> </p>
        <div style={{marginLeft:10}}>
          {
            this.state.condition.length>0&&this.state.condition.map((value, key) => (
              <div style={{lineHeight:"40px"}} className={this.state.xuanzhong===key?style.bluebor:style.bluebor2} onClick={e=>this.xuanzhong(key)} >
               <div className={style.blue}>
                 <img src={value.status===1?suo:suo2} onClick={e=>this.suo(value, key,e)} alt=""/>
               </div>
                {
                  value.type===0?
                    <span>
                      默认条件下
                    </span>:
                    <div>
                      当 &nbsp;&nbsp;
                      <Select style={{width:"100px"}} defaultValue={value.name} size='small'  onChange={e => this.gaitiaojian(value, key,e)} >
                        {
                          this.state.condition2.length>0&&this.state.condition2.map((value2, key2) => (
                            <option value={value2.form_content_id}>{value2.title}</option>
                          ))
                        }
                      </Select>

                      <Select style={{width:"70px"}} defaultValue={value.contrast.toString()} size='small' onChange={e => this.gaishuliang(value, key,e)}  >
                        <option value="0" title="大于">大于</option>
                        <option value="1" title="大于等于">大于等于</option>
                        <option value="2" title="等于">等于</option>
                        <option value="3" title="小于等于">小于等于</option>
                        <option value="4" title="小于">小于</option>
                        <option value="5" title="介于两者之间">介于两者之间</option>
                      </Select>

                      <Input onChange={e => this.gaishuzi(value, key,e)} style={{width:"30px"}} size='small' />



                      {
                        value.contrast==5?
                          <div>
                            <Select style={{width:"70px"}} defaultValue={value.than1.toString()} size='small' onChange={e => this.gaishuliang(value, key,e)}  >
                              <option value="0" title="＞">大于</option>
                              <option value="1" title="≥">大于等于</option>
                              <option value="2" title="＝">等于</option>
                              <option value="3" title="≤">小于等于</option>
                              <option value="4" title="＜">小于</option>
                            </Select>
                            <Select style={{width:"100px"}} value={this.state.showname} size='small'  disabled={true} >
                              {
                                this.state.condition2.length>0&&this.state.condition2.map((value2, key2) => (
                                  <option value={value2.form_content_id}>{value2.title}</option>
                                ))
                              }
                            </Select>
                            <Select style={{width:"70px"}} defaultValue={value.than2.toString()} size='small' onChange={e => this.gaishuliang(value, key,e)}  >
                              <option value="0" title="＞">大于</option>
                              <option value="1" title="≥">大于等于</option>
                              <option value="2" title="＝">等于</option>
                              <option value="3" title="≤">小于等于</option>
                              <option value="4" title="＜">小于</option>
                            </Select>
                            <Input onChange={e => this.gaishuzi2(value, key,e)} style={{width:"30px"}} size='small' />
                          </div>:
                          <span></span>
                      }
                    </div>
                }







                ,按照汇报线,需要审批到
                <Select style={{width:"50px"}} defaultValue={value.grade} size='small' onChange={e => this.gaijibie(value, key,e)}  >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Select>
                级且最少包含一个直属上级

                <img src={delite} alt="" className={style.deliteimg}   onClick={e => this.delite(value, key)} />

              </div>
              ))
          }
        </div>

      </div>
    );
  }
}

export default ApprovalLeft;
