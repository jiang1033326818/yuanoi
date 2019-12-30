import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';

import style from './Setup.less';
import Titles from '../../components/FormTitle/index';
import { Checkbox, Row, Col, message } from 'antd';
import travel from '../../../images/flow/travel@2x.png';
import yeslevel from '../../../images/flow/yeslevel.png';
import nolevel from '../../../images/flow/nolevel.png';
import downlevel from '../../../images/flow/downlevel.png';
import phoneSet from '../../../images/flow/phoneSet.png';
import success from '../../../images/flow/success.png';

@connect(({ icon,flow,forms, loading }) => ({
  icon,
  flow,
  forms,
  name:'',
  loading: loading.effects['icon/fetch'],
}))
class Setup extends React.Component {
  state = {
    panelList: [
      {
        con: 'CEO面板',
      },
      {
        con: '管理层面板',
      },
      {
        con: '人事面板',
      },
      {
        con: '财务面板',
      },
      {
        con: '工作面板',
      },
    ],
    gongxiangList: [
      {
        con: '财务面板',
      },
      {
        con: '人事面板',
      },
    ],
    nicedddd: 3,
    icons: [],
    travel: travel,
    nowInd: 0,
    nowInd2: 0,
    nowInds: 0,
    panelName: '',
    panInd:0,
    nowList:[],
    panel_id:3,
    params:{
      panel:["1"],
      panel_share:[],
      one_repeat:0,
      of_repeat:0,
      upper:0,
      highest:0,
      form1:[],
    },
    isfubu:false,
    defults:{
      panel:[0,1],
      panel_share:[],
    },
    faqi:[],
  };

  //保存
  savasavesave=()=>{
    const{dispatch}=this.props
    let {params}=this.state
    dispatch({
      type: 'forms/setsettting',
      payload: {
        ...params,
        form_id:localStorage.getItem("form_id"),
      },
      callback:(res)=>{
        if(res.code===0){
        }else{
          message.error(res.msg)
        }
      }
    });
    dispatch({
      type: 'forms/savesetting',
      payload: {
        ...params,
        form_id:localStorage.getItem("form_id"),
      },
    });
  }


  componentDidMount = () => {
    const { dispatch } = this.props;
    console.log(this.props.flow)
    let {nowInd,nowList,params,panel_id} = this.state;
    let {flow,forms} = this.props;
    this.nowPanel(nowInd);
    params.modular_id = localStorage.getItem('modular_id');
    params.panel_id = panel_id
    let a = JSON.parse(localStorage.getItem('isCreate'));
    console.log(a)
    if(!a){

    }
    dispatch({
      type: 'forms/getfaqi',
      payload: {
        panel_id: this.state.panel_id,
      },
      callback: (res2) => {
        console.log(999,res2)
        this.setState({
          faqi:res2.result
        })
      },
    });


    this.setState({
      params,
      name:localStorage.getItem("form_name")
    })

    dispatch({
      type: 'forms/getformId',
      payload: {
        form_id:localStorage.getItem("form_id")
      },
      callback: res => {
        console.log(96852,res)
        if(res.msg==="没有数据"){

        }else{
          this.setState({
            defults:res.result,
            travel:res.result.image
          })
        }

      },
    });



  };
  // 流程填写入口
  changeLevel = ind => {
    console.log(ind)
    let a=this.state.params
    let b=this.state.defults
    b.panel[0]=ind+1
    let u=parseInt(ind)+1
    a.panel=[u.toString()]
    this.nowPanel(ind)
    this.setState({
      nowInd: ind,
      panInd: ind+1,
      params:a,
      defults:b,
    });
    this.savasavesave()
  };

  changegongxiang=(e)=>{
    console.log(e)
    let a=this.state.params
    a.panel_share=e
    let w =this.state.defults
    w.panel_share=e
    this.setState({
      nowInd2: e,
      params:a,
      defults:w
    });
    this.savasavesave()
  }

  changegongxiang2=(e)=>{
    console.log(e)
    let a=this.state.params
    a.panel=e
    let w =this.state.defults
    w.panel=e
    this.setState({
      nowInd: e,
      params:a,
      defults:w
    });
    this.savasavesave()
  }


  changesetting1=(e)=>{
    console.log(e)
    let a=this.state.params
    a.one_repeat=e.target.checked===true?1:0;
    let w=this.state.defults
    w.one_repeat=e.target.checked===true?1:0;
    this.setState({
      params:a,
      defults:w,
    });
    this.savasavesave()
  }

  changesetting2=(e)=>{
    console.log(e)
    let a=this.state.params
    a.of_repeat=e.target.checked===true?1:0;
    let w=this.state.defults
    w.of_repeat=e.target.checked===true?1:0;
    this.setState({
      params:a,
      defults:w,
    });
    this.savasavesave()
  }

  changesetting3=(e)=>{
    console.log(e)
    let a=this.state.params
    a.upper=e.target.checked===true?1:0;
    let w=this.state.defults
    w.upper=e.target.checked===true?1:0;
    this.setState({
      params:a,
      defults:w,
    });
    this.savasavesave()
  }

  changesetting4=(e)=>{
    console.log(e)
    let a=this.state.params
    a.highest=e.target.checked===true?1:0;
    let w=this.state.defults
    w.highest=e.target.checked===true?1:0;
    this.setState({
      params:a,
      defults:w,
    });
    this.savasavesave()
  }

  // 查看数据
  changeLevels = ind => {
    this.setState({
      nowInds: ind,
    });
  };
  // 点击选择图标
  chooseIcon = e => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    const { dispatch } = this.props;
    dispatch({
      type: 'icon/fetch',
      callback: res => {
        this.setState({
          icons: res.result,
        });
        this.refs.iconBox.style.display = 'block';
      },
    });
    this.savasavesave()
  };
  // 选择图标
  chooseThis = item => {
    // travel = item
    let {params} = this.state;
    // let val = e.target.value;
    params.image = item;
    this.setState({
      travel: item,
      params
    });
    this.savasavesave()
  };
  // 继续编辑
  keepEdit = () =>{
    this.setState({
      isfubu:false
    })
  }
  // 完成
  pubSuccess = () =>{
    this.setState({
      isfubu:false
    })
    router.push({
      pathname:"/flow/index"
    })
  }
  // 当前面板
  nowPanel = (ind) =>{
    let {panelList} = this.state;
    let panelName = panelList[ind].con;
    this.setState({
      panelName
    })
  }
  // 切换面板
  changePanel = () =>{
    const{dispatch}=this.props
    let {panelList,panInd} = this.state;
    panInd++
    if(panInd>=panelList.length){
      panInd = 0
    }

    dispatch({
      type: 'forms/getfaqi',
      payload: {
        panel_id: panInd,
      },
      callback: (res2) => {
        console.log(999,res2)
        this.setState({
          faqi:res2.result
        })
      },
    });

    this.setState({
      panInd,
      panel_id:panInd,
    })
    this.nowPanel(panInd)
  }



  setName = (e) =>{
    let {params} = this.state;
    let val = e.target.value;
    params.name	 = val.trim()==""?"未命名表单":val;
    this.setState({
      params
    })
    this.savasavesave()
  }
  // 发布
  fabu = () =>{
    this.setState({
      isfubu:true
    })
  }
  // 点任何位置 执行某些操作
  allClick = () => {
    this.refs.iconBox.style.display = 'none';
  };
  render() {
    console.log(this.state.faqi)
    let { panelList, icons, travel, nowInd,nowInd2, nowInds, panelName,nowList,params,isfubu,gongxiangList } = this.state;
    // 发布成功
    let publishMask = (
      <div className={style.publishMask} ref='publishMask'>
        <div className={style.pubSucc}>
          <div className={style.pubTop}>
            <img src={success} alt=""/>
            <p>审批名称发布成功！</p>
          </div>
          <div className={style.pubTip}>
            <p>员工可以通过以下方式提交审批单：</p>
            <p><span>①</span> 进入龙神OI系统管理员可进行编辑提交</p>
            <p><span>②</span> 打开手机龙神Ol系统进行扫码进行提交</p>
          </div>
          <div className={style.handle}>
            <p className={style.keepEdit} onClick={this.keepEdit}>继续编辑</p>
            <p className={style.pubSuccess} onClick={this.pubSuccess}>完成</p>
          </div>
        </div>
      </div>
    )
    // 流程填写入口
    let panel = (
      <div className={style.allPanel}>
        {panelList.map((item, index) => (
          <div className={style.panelItem} key={index} onClick={() => this.changeLevel(index)}>
            {/* <img src={item.isChoose?yeslevel:nolevel} alt=""/> */}
            <img src={parseInt(this.state.defults.panel[0])-1 == index ? yeslevel : nolevel} alt="" />
            <span>{item.con}</span>
          </div>
        ))}
      </div>
    );

    let spsettings=(
      <div className={style.allPanel}>
          <Row>
            <Col span={24}  >
              <Checkbox value="a" style={{fontSize:"12px",marginTop:"10px"}} checked={this.state.defults.one_repeat=='1'?true:false}  onChange={this.changesetting1}>同一个流程,相同审批人自动去重</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="b" style={{fontSize:"12px",marginTop:"10px"}}  checked={this.state.defults.of_repeat=='1'?true:false}  onChange={this.changesetting2}>关联流程中的同一个审批人自动去重。</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="c" style={{fontSize:"12px",marginTop:"10px"}} checked={this.state.defults.upper=='1'?true:false} onChange={this.changesetting3}>汇报线中的人员离职后，自动向上多汇报一层。</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="d" style={{fontSize:"12px",marginTop:"10px"}} checked={this.state.defults.highest=='1'?true:false} onChange={this.changesetting4}>汇报线中其他部门审批人离职后，自动切换到该部门 的最高负责人。</Checkbox>
            </Col>
          </Row>
      </div>
    )

    // 查看数据
    let panels = (
      <div className={style.allPanel}>
        {/* {panelList.map((item, index) => (
          <div className={style.panelItem} key={index} onClick={() => this.changeLevels(index)}>
            <img src={nowInds == index ? yeslevel : nolevel} alt="" />
            <span>{item.con}</span>
          </div>
        ))} */}
      </div>
    );
    // 图标
    let iconbox = (
      <div className={style.iconBox} ref="iconBox">
        {icons.map(item => (
          <img
            className={style.iconSet}
            onClick={() => this.chooseThis(item)}
            src={item}
            alt=""
          />
        ))}
      </div>
    )
    let nowPanel = (
      <div>
        {
          nowList.map(item=>(
            <div className={style.dataItem} key={item.modular_id}>
              <img src={item.image} alt=""/>
              <span>{item.name}</span>
            </div>
          ))
        }
      </div>
    )
    return (
      <div style={{height:'100%'}} onClick={this.allClick}>
        <Titles iiiidata={this.state.nicedddd} params={params} fabu={this.fabu} />
        <div className={style.setup}>
          <div className={style.panelSet}>
            <p className={style.setTitle}>面板设置</p>
            <div className={style.setCon}>
              <div className={style.approvalSet}>
                <p>审批名称</p>
                <input className={style.appSetInp} type="text" ref='appSetInp' defaultValue={this.state.name} onChange={this.setName} />
              </div>
              <div className={style.tempSet}>
                <p>模板图标修改</p>
                <div className={style.tempIcon}>
                  <img className={style.iconSet} src={travel} alt="" />
                  <button className={style.chooseIcon} onClick={this.chooseIcon}>
                    选择图标
                  </button>
                  {/* 图标 */}
                  {iconbox}
                </div>
              </div>
              <div className={style.flowSet}>
                <p>流程归属面板</p>
                {/*{panel}*/}
                <Checkbox.Group style={{ width: '100%' }} onChange={this.changegongxiang2} value={this.state.defults.panel.join(",")} >
                  <Row>
                    <Col span={12}>
                      <Checkbox value="1" style={{fontSize:"12px",marginTop:"10px"}}>CEO面板</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="2" style={{fontSize:"12px",marginTop:"10px"}}>管理层面板</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="3" style={{fontSize:"12px",marginTop:"10px"}}>人事面板</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="4" style={{fontSize:"12px",marginTop:"10px"}}>财务面板</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="5" style={{fontSize:"12px",marginTop:"10px"}}>工作面板</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
              <div className={style.flowSet}>
                <p>共享数据到</p>
                <div className={style.allPanel}>
                  <Checkbox.Group style={{ width: '100%' }} onChange={this.changegongxiang} value={this.state.defults.panel_share.length>1?"3,4":this.state.defults.panel_share.length<1?"":this.state.defults.panel_share[0]=='3'?'3':this.state.defults.panel_share[0]=='4'?'4':false} >
                    <Row>
                      <Col span={12}>
                        <Checkbox value="3" style={{fontSize:"12px",marginTop:"10px"}}>人事面板</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="4" style={{fontSize:"12px",marginTop:"10px"}}>财务面板</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>

              <div className={style.flowSet}>
                <p>审批设置</p>
                {spsettings}
              </div>
              {/* <div className={style.recordSet}>
                <p>查看数据</p>
                {panels}
              </div> */}
            </div>
          </div>
          <div className={style.appSet}>
            <p className={style.setTitle}>APP工作面板设置</p>
            <div className={style.setCon}>
              <div className={style.appPanel}>
                <p>{panelName}</p>
                {/* <img src={downlevel} alt=""/> */}
              </div>
              <img className={style.phoneSet} src={phoneSet} alt="" />
              <div className={style.phoneData}>
                <div className={style.phoneItem}>
                  {
                    this.state.faqi.length>0&&this.state.faqi.map((value,key)=>{
                      if(value.form.length>0){
                        return(
                          <div>
                            <p className={style.phoneTitle}>{value.name}</p>
                            <div>
                              {
                                value.form.map((value2,key2)=>{
                                  return(
                                    <div className={style.dataItem} onClick={(e)=>this.changesl(value2,key2)}>
                                      <img src={value2.image} alt=""/>
                                      <div>{value2.name}</div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        )
                      }else{
                        return(
                          <div></div>
                        )
                      }

                    })
                  }
                </div>
                <div className={style.changePanel} onClick={this.changePanel}>切换面板</div>
              </div>
            </div>
          </div>
          {/*<div className={style.dataSet}>*/}
          {/*  <p className={style.setTitle}>查看数据面板设置</p>*/}
          {/*</div>*/}
        </div>
        {/* 发布成功 */}
        { isfubu?publishMask:'' }
      </div>
    );
  }
}

export default Setup;
