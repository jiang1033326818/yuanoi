import React from 'react';

import style from './chat.less';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import Sousuo from './Sousuo';
import {
  Form,
  Input,
  Tag,
  Card,
  Tabs,
  Checkbox,
  Button,
  Select,
  multiple,
  DatePicker,
  InputNumber,
  Radio,
  Divider,
  Upload,
  TimePicker,
  Switch,
  Cascader,
  Steps,
  Icon,
  message,
  Modal,
} from 'antd';
import logo from '../../../images/colorlogo.png';
import toMax from '../../../images/chat/toMax.png';
import toMin from '../../../images/chat/toMin.png';
import jiaji from '../../../images/flow/jiaji.png';
import add from '../../../images/chat/+@2x.png';
import { connect } from 'dva';
import styles from '../Process/index.less';
import router from 'umi/router';
import moment from 'moment';


const { Step } = Steps;
const { TabPane } = Tabs;
const { TextArea } = Input;

@connect(({ flow, forms, menu, loading }) => ({
  flow,
  forms,
  menu,
  loading: loading.effects['flow/fetch'],
}))
class Chat extends React.Component {
  state = {
    faqi: [],
    jinxing: [],
    showRight: true,
    isToMax: true,
    mianban: '人事面板',
    showmianban: false,
    youce: '3',
    form_id: 10,
    nowname: '',
    panel_id: 3,
    panel: [{
      name: '人事面板',
      panel_id: 3,
    }],
    form0: [],
    form1: [],
    liucheng: {},
    number: 0,
    xiugai:'0',
    jinxingyou: {
      addtime: '',
      form_id: 1,
      form_info_val: '',
      form_server_id: 0,
      form_type_id: 0,
      form_type_name: '',
      identity: 1,
      if_upda: 1,
      image: '',
      name: '',
      number: '',
      jinxingkey:0,
      state: '',
      status: 0,
      title: '',
      urgent: 0,
      username: '',
    },
    qingjia:false,
    qingjiadata:[],
    qingjiablue:0,
    goucha:{
      approval:[],
      info:[],
      identity:1,
    },
    mingzi:'',
    nowyijian:'',
    visible: false,
    lishidata:[],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { flow } = this.props;
    dispatch({
      type: 'forms/getfaqi',
      payload: {
        panel_id: this.state.panel_id,
      },
      callback: (res) => {
        this.setState({
          faqi: res.result,
        });
        console.log(888, res);
        if (res.result.length > 0) {
          //这里是初始值的判断,先注释掉



          dispatch({
            type: 'forms/examine',
            payload: {
              form_id: res.result[0].form[0].form_id,
            },
            callback: (res2) => {
              console.log(999, res2);
              this.setState({
                form1: res2.result,
              });
              this.setState({
                liucheng:res.result[0].form[0],
                form_id: res.result[0].form[0].form_id,
              })
            },
          });
        }
      },
    });

    //确认是不是请假


    dispatch({
      type: 'menu/getPanel',
      payload: {},
      callback: (res) => {
        this.setState({
          panel: res.result,
        });
      },
    });

    this.chajinxing()

  }


  // 查询进行中的列表

  chajinxing=()=>{
    //获取正在进行的列表
    const{dispatch}=this.props
    dispatch({
      type: 'forms/getjinxing',
      payload: {},
      callback: (res) => {
        let qwe = res.result;

        if(res.result.length<1){
          this.setState({
            youce:'3'
          })
        }else{
          this.setState({
            youce:'1'
          })
        }

        for (let i in qwe) {
          qwe[i].addtime = this.getLocalTime(qwe[i].addtime);
        }

        this.setState({
          jinxing: qwe,
          number: qwe[0].number,
          jinxingyou: qwe.length > 0 ? qwe[0] : {},
        });


        //查一下第一条的数据

        dispatch({
          type: 'forms/guocheng',
          payload: {
            number:qwe[0].number,
          },
          callback: (res) => {
            this.setState({
              goucha:res.result
            })
          },
        });




        // 查询审批历史
        dispatch({
          type: 'forms/guocheng',
          payload: {
            number:qwe[0].number,
          },
          callback: (res) => {
            console.log(res)
            this.setState({
              goucha:res.result
            })
          },
        });


      },
    });
  }

  // 时间戳转时间
  getLocalTime = (nS) => {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  };

  selectmianban = () => {
    if (this.state.showmianban === true) {
      this.setState({
        showmianban: false,
      });
    } else {
      this.setState({
        showmianban: true,
      });
    }

  };


  showR = () => {
    this.setState({
      showRight: true,
    });
  };
  maxTap = () => {
    this.setState({
      isToMax: !this.state.isToMax,
    });
    this.props.changeSize();
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  ciugaipanel = (e, a, b) => {
    const { dispatch } = this.props;
    console.log(e, a, b);
    this.setState({
      mianban: e.name,
      showmianban: false,
    });

    dispatch({
      type: 'forms/getfaqi',
      payload: {
        panel_id: e.panel_id,
      },
      callback: (res) => {
        this.setState({
          faqi: res.result,
        });
        console.log(888, res);
        if (res.result.length > 0) {
          //这里是初始值的判断,先注释掉
          dispatch({
            type: 'forms/examine',
            payload: {
              form_id: res.result[0].form[0].form_id,
            },
            callback: (res2) => {
              console.log(999, res2);
              this.setState({
                form1: res2.result,
              });
            },
          });
        }
      },
    });


  };

  callback = (e) => {
    this.setState({
      youce: e,
    });
    console.log(e);
    if(e==='1'){
      this.chajinxing()
    }

  };

  changeType=(e,a)=>{
    const { dispatch, forms } = this.props;
    console.log(e,a)
    this.setState({
      qingjiablue:a
    })
    dispatch({
      type: 'forms/getformId',
      payload: {
        form_id:e.form_id==="null"?null:e.form_id,
        form_type_id:e.form_type_id,
      },
      callback: res => {
        console.log(res, 'form_id');
        this.setState({
          form1: res.result.content,
          bluekey: res.result.content.length === 0 ? 0 : res.result.content.length - 1,
          form_type_id:e.form_type_id,
        });
      },
    });

  }

  changesl = (e, a) => {
    console.log(e);
    this.setState({
      liucheng: e,
    });
    const { dispatch } = this.props;


    dispatch({
      type: 'forms/qingjiaform',
      payload: {
        form_id:e.form_id,
      },
      callback: res => {
        if(res.result.length>0){
          this.setState({
            qingjia:true,
            qingjiadata:res.result
          })
          dispatch({
            type: 'forms/getformId',
            payload: {
              form_id:form_id==="null"?null:form_id,
              form_type_id:res.result[0].form_type_id,
            },
            callback: res3 => {
              console.log("chenggongle",res3.result[0].form_id);
              dispatch({
                type: 'forms/examine',
                payload: {
                  form_id: res.result[0].form_id,
                },
                callback: (res4) => {
                  console.log(999, res4);
                  this.setState({
                    form1: res4.result,
                  });
                },
              });

            },
          });


        }else{
          this.setState({
            qingjia:false,
            qingjiadata:[],
          })

          dispatch({
            type: 'forms/examine',
            payload: {
              form_id: e.form_id,
            },
            callback: (res2) => {
              console.log(999, res2);
              this.setState({
                form1: res2.result,
              });
            },
          });
          this.setState({
            form_id: e.form_id,
            nowname: e.name,
            showRight: false,
          });
        }
      },
    });

  };


  allchange = (e, a, b, c) => {
    let noth = this.state.form1;
    console.log(e);
    console.log(a);
    console.log(b.target.value);
    if (e.label === 'Input' || e.label === 'InputNumber'||  e.label === 'TextArea') {
      noth[a].val = b.target.value;
    }else if (e.label === 'Radio') {
      noth[a].val = b.target.value;
    }else if (e.label === 'DatePicker') {
      console.log(moment(b));
      noth[a].val = moment(c)
    }


    this.setState({
      form1: noth,
    });
  };


  tijiao = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'forms/faqiform',
      payload: {
        form_id: this.state.form_id,
        data: JSON.stringify(this.state.form1),
      },
      callback: (res) => {
        console.log(res);
        message.success('提交成功');
        window.location.reload();
      },
    });
  };

  changejinxing = (e, a, b) => {
    const{dispatch}=this.props

    console.log(a)

    this.setState({
      number: e.number,
      jinxingyou: e,
      xiugai:"0",
      jinxingkey:a,
    });

    dispatch({
      type: 'forms/guocheng',
      payload: {
        number:e.number
      },
      callback: (res) => {
        this.setState({
          goucha:res.result
        })
      },
    });

  };



  cuishen = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'forms/chexiao',
      payload: {
        number: this.state.jinxingyou.number,
        type:e,
      },
      callback: (res) => {
        if(res.code===0){
          message.success("操作成功")
          this.chajinxing()
        }else{
          message.error(res.msg)
        }
      },
    });
  };


  tijiaoform=()=>{
    const { dispatch } = this.props;
    console.log("修改")
    let formid=this.state.goucha.form_id
    this.setState({
      xiugai:'1',
      form_id:formid,
    })
  }


  mingzi=(e,a)=>{
    console.log(e,a)
    this.setState({
      mingzi:e.explain
    })
  }

  setyijian=(e)=>{
    this.setState({
      nowyijian:e.target.value
    })
  }

  tongyi=(e)=>{
    const {dispatch}=this.props

    let w=1


    for(let i in this.state.goucha.approval){
      if(this.state.goucha.approval[i].state===1){
        w=this.state.goucha.approval[i].examine_info_id
      }
    }

    dispatch({
      type: 'forms/tijiao',
      payload: {
        examine_info_id: w,
        number: this.state.goucha.number,
        state:e,
        explain:this.state.nowyijian
      },
      callback: (res) => {
        if(res.code===0){
          message.success("审批成功")
          this.chajinxing()
        }else{
          message.error(res.msg)
        }
      },
    });
  }

  showModal = () => {
    const {dispatch}=this.props
    this.setState({
      visible: true,
    });

    dispatch({
      type: 'forms/lishi',
      payload: {
        status: '0,1,2,3',
      },
      callback: (res) => {
        console.log(res)
        this.setState({
          lishidata:res.result
        })
      },
    });

  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };



  render() {
    let { showRight, isToMax } = this.state;
    return (
      <div className={style.chat}>

        <div className={style.chatLeft}>
          <div className={style.sousuo}>
            <Sousuo sousuo={this.sousuo}/>
          </div>
          <Tabs defaultActiveKey="1" style={{}} onChange={this.callback}>
            <TabPane tab="" key="6">
            </TabPane>
            <TabPane tab="进行中" key="1">
              {
                this.state.jinxing.map((value, key) => {
                  return (
                    <div className={this.state.jinxingkey == key ? style.jinxinglist2 : style.jinxinglist}
                         onClick={(e) => this.changejinxing(value, key, event)}>
                      <img src={value.image} alt=""/>
                      <div className={style.bbb}>{value.title}</div>
                      <br/>
                      <div className={style.ccc}>{value.addtime}</div>
                      <div className={style.ddd}
                           style={{ color: value.status == 1 ? 'green' : value.status == 2 ? 'red' : value.status == 3 ? '#666' : '#189DF3' }}>{value.state}</div>

                      <div className={style.jiaji} style={{display:value.urgent==1?"block":"none"}}>
                        <img src={jiaji} alt=""/>
                      </div>
                    </div>
                  );
                })
              }
            </TabPane>
            <TabPane tab="发起" key="2">
              <div style={{height:581, overflowY:"scroll" }}>
                {
                  this.state.faqi.map((value, key) => {
                    if (value.form.length > 0) {
                      return (
                        <div className={style.liuchenglist}>
                          <p>{value.name}</p>
                          <div>
                            {
                              value.form.map((value2, key2) => {
                                return (
                                  <div className={this.state.form_id === value2.form_id ? style.aha : style.aha2}
                                       onClick={(e) => this.changesl(value2, key2)}>
                                    <img src={value2.image} alt=""/>
                                    <div className={style.bbb}>{value2.name}</div>
                                  </div>
                                );
                              })
                            }
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div></div>
                      );
                    }

                  })
                }
              </div>
            </TabPane>
            <TabPane tab="" key="7">
            </TabPane>
          </Tabs>

          {/*这里放列表*/}
          <div>
            {

            }
          </div>


          {/*这里是底部的切换面板*/}
          {
            this.state.youce=="1"?
              <div className={style.mianbanmianban}>
                <div className={style.title} onClick={this.showModal}>历史记录</div>
              </div> :this.state.youce=="3"?
              <div className={style.mianbanmianban}>
                <div className={style.title} onClick={this.showModal}>历史记录</div>
              </div>:
              <div className={style.mianbanmianban}>
                <div className={style.title} onClick={this.selectmianban}>{this.state.mianban}</div>
              </div>
          }




          <div className={style.listsss} style={{ display: this.state.showmianban === true ? 'block' : 'none' }}>
            {
              this.state.panel.map((value, key) => {
                return (
                  <div className={style.item} onClick={e => this.ciugaipanel(value, key)}>{value.name}</div>
                );
              })
            }
          </div>

          {/*历史记录弹出框*/}
          <Modal
            title="历史记录"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            {
              this.state.lishidata.length>0&&this.state.lishidata.map((value,key)=>{
                return (
                  <div className={style.jinxinglist}
                      >
                    <img src={value.image} alt=""/>
                    <div className={style.bbb}>{value.title}</div>
                    <br/>
                    <div className={style.ccc}>{this.getLocalTime(value.addtime)}</div>
                    <div className={style.ddd}
                         style={{ color: value.status == 1 ? 'green' : value.status == 2 ? 'red' : value.status == 3 ? '#666' : '#189DF3' }}>{value.state}</div>

                    <div className={style.jiaji} style={{display:value.urgent==1?"block":"none"}}>
                      <img src={jiaji} alt=""/>
                    </div>
                  </div>
                );
              })
            }
          </Modal>
        </div>


        <div className={style.chatRight}>
          {/*先判断是进行中还是发起*/}
          <img onClick={this.maxTap} className={style.toMax} src={isToMax ? toMax : toMin} alt=""/>
          {
            this.state.youce === '1' ?
              <div>

                {
                  this.state.xiugai ==='0'?
                    <div>
                      <div className={style.title0}>
                        <p>{this.state.jinxingyou.name}</p>
                      </div>
                      <div className={style.zhongjian}>
                        {/*<p>流水号: &nbsp;{this.state.jinxingyou.number}</p>*/}
                        {/*<p>表单题目:  &nbsp;{this.state.jinxingyou.title}</p>*/}
                        {/*<Divider/>*/}

                        <div className={style.hhhhh}>
                          {
                            this.state.goucha.info.length>0&& this.state.goucha.info.map((value,key)=>{
                              return(
                                <p>{value.name}&nbsp;: &nbsp;{value.val}</p>
                              )
                            })
                          }
                        </div>



                      </div>

                      <Divider/>
                      <div className={style.buzhou}>
                        <Steps>
                          {
                            this.state.goucha.approval.length>0&& this.state.goucha.approval.map((value,key)=>{
                              return(
                                <Step
                                  status={value.state===2?"finish":value.state===1?"process":value.state===3?"error":"wait"}
                                  title={value.name}
                                  icon={<Icon type={value.state===2?"check-circle":value.state===1?"minus-circle":value.state===3?"check-circle":"minus-circle"} /> }
                                  onClick={e=>this.mingzi(value,key)}
                                  style={{cursor:"pointer"}}
                                />
                              )
                            })
                          }
                        </Steps>

                        {
                          this.state.jinxingyou.identity==1?
                            <div className={style.dibuneirong}>
                              {this.state.mingzi}
                            </div>:
                            <div className={style.dibuneirong}>
                              <TextArea placeholder={"输入审批意见"} onChange={this.setyijian} />
                            </div>
                        }




                      </div>
                      <div>
                        {/*这里写上修改意见*/}
                      </div>


                      {
                        this.state.jinxingyou.identity==1?

                          <div className={style.chexiao}>
                            <Button type={'default'} style={{ marginLeft: '50%' }} onClick={e=>this.cuishen(2)}>撤销</Button>
                            <Button type="primary" style={{ marginLeft: '24px' }} onClick={this.tijiaoform}>修改并提交</Button>
                            <Button type="primary" style={{ marginLeft: '24px' }} onClick={e=>this.cuishen(1)}>催审</Button>
                          </div>:
                          <div className={style.chexiao}>
                            <Button type={'default'} style={{ marginLeft: '75%' }} onClick={e=>this.tongyi(2)}>拒绝</Button>
                            <Button type="primary" style={{ marginLeft: '24px' }} onClick={e=>this.tongyi(1)}>同意</Button>
                          </div>

                      }
                    </div>:
                    <div>
                      {
                        this.state.goucha.info.length > 0 ?
                          <div style={{ height: '100%' }}>
                            <div className={style.title0}>
                              <p>{this.state.goucha.name}</p>
                            </div>

                            <div className={style.formsssss}>
                              {
                                this.state.goucha.info.map((value, key) => {
                                  if (value.label === 'Input') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        <Input onChange={(e) => this.allchange(value, key, event, e)}
                                               placeholder={value.placeholder}
                                               disabled={value.disabled === 1 ? true : false}
                                               defaultValue={value.val}
                                        />
                                      </div>
                                    );
                                  } else if (value.label === 'TextArea') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        <TextArea onChange={(e) => this.allchange(value, key, event, e)}
                                                  placeholder={value.placeholder}
                                                  disabled={value.disabled === 1 ? true : false}
                                                  defaultValue={value.val}
                                        />
                                      </div>
                                    );
                                  }  else if (value.label === 'DatePicker') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        <DatePicker onChange={(e) => this.allchange(value, key, event, e)}
                                                    placeholder={value.placeholder}
                                                    showTime
                                                    disabled={value.disabled === 1 ? true : false}
                                        />
                                      </div>
                                    );
                                  } else if (value.label === 'Checkbox') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        {
                                          value.option.length > 0 && value.option.map((value2, key2) => {
                                            return (
                                              <div className={style.fll}>
                                                <Checkbox
                                                  style={{ marginTop: '10px', marginLeft: 0 }}
                                                  onChange={(e) => this.allchange(value, key, event, e)}>
                                                  {value2.name}
                                                  defaultValue={value.val}
                                                </Checkbox>
                                                {/*<br/>*/}
                                              </div>

                                            );
                                          })
                                        }
                                        <div style={{ clear: 'both' }}></div>
                                      </div>
                                    );
                                  } else if (value.label === 'Select' || value.label === 'multiple') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>


                                        <div>
                                          <Select placeholder={value.placeholder} style={{ width: '100%' }}
                                                  onChange={(e) => this.allchange(value, key, event, e)}
                                          >
                                            {
                                              value.option.length > 0 && value.option.map((value2, key2) => {
                                                return (
                                                  <Option value={value2.value}>{value2.name}</Option>
                                                );
                                              })
                                            }
                                          </Select>
                                          {/*<br/>*/}
                                        </div>
                                      </div>
                                    );
                                  } else if (value.label === 'Radio') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        <Radio.Group onChange={(e) => this.allchange(value, key, event, e)} value={value.val}>
                                          {
                                            value.option.length > 0 && value.option.map((value2, key) => {
                                              return (
                                                <div className={style.fll}>
                                                  <Radio
                                                    style={{ marginTop: '10px' }}> {value2.name}   </Radio>
                                                  <br/>
                                                </div>
                                              );
                                            })
                                          }
                                        </Radio.Group>
                                        <div style={{ clear: 'both' }}></div>
                                      </div>
                                    );
                                  } else if (value.label === 'InputNumber') {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        <InputNumber onChange={(e) => this.allchange(value, key, event, e)}
                                                     placeholder={value.placeholder}
                                                     disabled={value.disabled === 1 ? true : false}
                                                     min={value.min} max={value.mix}
                                                     style={{ width: '100%' }}
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div>
                                        <p>{value.name} <span className={style.xinghao}
                                                              style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                        </p>
                                        <Input onChange={(e) => this.allchange(value, key, event, e)}
                                               placeholder={value.placeholder}
                                               disabled={value.disabled === 1 ? true : false}
                                        />
                                      </div>
                                    );
                                  }


                                })
                              }

                            </div>
                            <div className={style.dibutijiao2}>
                              <Button type={'primary'} onClick={this.tijiao} className={style.tijiao}>提交</Button>
                            </div>
                          </div> :
                          <div>
                            <img className={style.logo} src={logo} alt=""/>
                          </div>
                      }
                    </div>
                }







              </div> :this.state.youce==='2'?
              <div style={{ height: '100%' }}>
                {
                  this.state.form1.length > 0 ?
                    <div style={{ height: '100%' }}>
                      <div className={style.title0}>
                        <p>{this.state.liucheng.name}</p>
                      </div>


                      <div className={style.qingjia2} style={{display:this.state.qingjia===true?"block":"none"}}>
                        <h4 style={{ fontSize: '14px', clear: 'both' }}>请假类型</h4>
                        <div>
                          {
                            this.state.qingjiadata.length>0&& this.state.qingjiadata.map((value,key)=>{
                              return (
                                <Button  type={this.state.qingjiablue===key?"primary":"Default"} onClick={e=>this.changeType(value,key)} className={style.qingjiabutton}>{value.name}</Button>
                              )
                            })

                          }
                        </div>
                        <h4 style={{ fontSize: '14px', clear: 'both',marginTop:"24px" }}>请假规定</h4>
                        <div className={style.qingjia3} >
                          {

                            this.state.qingjiadata.length>0&&this.state.qingjiadata.map((value,key)=>{
                              if(key===this.state.qingjiablue){
                                return(
                                  <div>
                                    {
                                      value.content.map((value2,key2)=>{
                                        return(
                                          <p>{value2}</p>
                                        )
                                      })
                                    }
                                  </div>
                                )
                              }

                            })
                          }
                        </div>
                      </div>


                      <div className={this.state.qingjia===true?style.formsssss2:style.formsssss}>
                        {
                          this.state.form1.map((value, key) => {
                            if (value.label === 'Input') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  <Input onChange={(e) => this.allchange(value, key, event, e)}
                                         placeholder={value.placeholder}
                                         disabled={value.disabled === 1 ? true : false}
                                  />
                                </div>
                              );
                            } else if (value.label === 'TextArea') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  <TextArea onChange={(e) => this.allchange(value, key, event, e)}
                                         placeholder={value.placeholder}
                                         disabled={value.disabled === 1 ? true : false}
                                  />
                                </div>
                              );
                            }  else if (value.label === 'DatePicker') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  <DatePicker onChange={(e) => this.allchange(value, key, event, e)}
                                            placeholder={value.placeholder}
                                            disabled={value.disabled === 1 ? true : false}
                                  />
                                </div>
                              );
                            } else if (value.label === 'Checkbox') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  {
                                    value.option.length > 0 && value.option.map((value2, key2) => {
                                      return (
                                        <div className={style.fll}>
                                          <Checkbox
                                            style={{ marginTop: '10px', marginLeft: 0 }}
                                            onChange={(e) => this.allchange(value, key, event, e)}>
                                            {value2.name}
                                          </Checkbox>
                                          {/*<br/>*/}
                                        </div>

                                      );
                                    })
                                  }
                                  <div style={{ clear: 'both' }}></div>
                                </div>
                              );
                            } else if (value.label === 'Select' || value.label === 'multiple') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>


                                  <div>
                                    <Select placeholder={value.placeholder} style={{ width: '100%' }}
                                            onChange={(e) => this.allchange(value, key, event, e)}>
                                      {
                                        value.option.length > 0 && value.option.map((value2, key2) => {
                                          return (
                                            <Option value={value2.value}>{value2.name}</Option>
                                          );
                                        })
                                      }
                                    </Select>
                                    {/*<br/>*/}
                                  </div>
                                </div>
                              );
                            } else if (value.label === 'Radio') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  <Radio.Group onChange={(e) => this.allchange(value, key, event, e)} value={value.val}>
                                    {
                                      value.option.length > 0 && value.option.map((value2, key) => {
                                        return (
                                          <div className={style.fll}>
                                            <Radio
                                              style={{ marginTop: '10px' }}> {value2.name}   </Radio>
                                            <br/>
                                          </div>
                                        );
                                      })
                                    }
                                  </Radio.Group>
                                  <div style={{ clear: 'both' }}></div>
                                </div>
                              );
                            } else if (value.label === 'InputNumber') {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  <InputNumber onChange={(e) => this.allchange(value, key, event, e)}
                                               placeholder={value.placeholder}
                                               disabled={value.disabled === 1 ? true : false}
                                               min={value.min} max={value.mix}
                                               style={{ width: '100%' }}
                                  />
                                </div>
                              );
                            } else {
                              return (
                                <div>
                                  <p>{value.name} <span className={style.xinghao}
                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                  </p>
                                  <Input onChange={(e) => this.allchange(value, key, event, e)}
                                         placeholder={value.placeholder}
                                         disabled={value.disabled === 1 ? true : false}
                                  />
                                </div>
                              );
                            }


                          })
                        }

                      </div>
                      <div className={style.dibutijiao}>
                        <Button type={'primary'} onClick={this.tijiao} className={style.tijiao}>提交</Button>
                      </div>
                    </div> :
                    <div>
                      <img className={style.logo} src={logo} alt=""/>
                    </div>
                }
              </div> :
              <div>
                <img  className={style.logo} src={logo} alt=""/>
              </div>
          }


        </div>
      </div>
    );
  }
}

export default Chat;
