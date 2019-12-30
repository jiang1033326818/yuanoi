import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
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
  Icon, message,
} from 'antd';
import styles from './index.less';
import Titles from '../../components/FormTitle/index';
import delite from '../../../images/flow/delite.png';
import copy from '../../../images/flow/copy.png';

import Yulan from './Yulan';

const Search = Input.Search;
const { TabPane } = Tabs;
const { TextArea } = Input;


@connect(({ forms, flow, loading }) => ({
  forms,
  flow,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
    nicedddd: 1,
    data: [],
    dataleft: [],
    xzkey: 100,
    bluekey: 100,
    noth: [],
    params: {},
    isTipShow: false,
    qingjia:false,
    qingjiadata:[],
    qingjiablue:0,
    changesssss:'',
    form_type_id:1,
  };



  savesavesave=()=>{
    let {params} = this.state;
    const { dispatch} =this.props;
    let a =JSON.stringify(this.state.data)
    let c= localStorage.getItem('modular_id');
    let d= localStorage.getItem('form_id');
    let e= localStorage.getItem('approval_id');
    let b ={
      data:a,
      modular_id:c==='undefined'?null:c,
      name:params.name,
      form_id:d==='null'?null:d,
    }
    dispatch({
      type: 'forms/saveform',
      payload: b,
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  }

  componentDidMount() {
    const { dispatch, flow, forms } = this.props;
    let { params } = this.state;
    // params.modular_id = flow.modelIdInit?flow.modelIdInit:'';
    params.modular_id = localStorage.getItem('modular_id');
    params.name = '未命名表单';
    dispatch({
      type: 'forms/fetch',
      payload: {},
      callback: res => {
        // console.log(res);
        this.setState({
          dataleft: res.result.stock
        });
      },
    });
    let a = JSON.parse(localStorage.getItem('isCreate'));
    let form_id = localStorage.getItem('form_id');
    // console.log(form_id, 'form_id');
    params.form_id = form_id;
    dispatch({
      type: 'forms/getformId',
      payload: {
        form_id:form_id==="null"?null:form_id,
      },
      callback: res => {
        // console.log(res, 'form_id');
        this.setState({
          data: res.result.content,
          bluekey: res.result.content.length === 0 ? 0 : res.result.content.length - 1,
        });
      },
    });

    //在这里确认是不是请假
    dispatch({
      type: 'forms/qingjiaform',
      payload: {
        form_id:form_id==="null"?null:form_id,
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
            callback: res => {
              // console.log(res, 'form_id');
              this.setState({
                data: res.result.content,
                bluekey: res.result.content.length === 0 ? 0 : res.result.content.length - 1,
              });
            },
          });


        }else{
          this.setState({
            qingjia:false,
            qingjiadata:[],
          })
        }
      },
    });


  }


  dragStart = (e, item, value) => {
    e.dataTransfer.setData('item', JSON.stringify(item));// 拖拽元素携带的数据
    // console.log('拖拽开始', this.props);
    // console.log('参数', value);
    // let noth =this.state.data
    // noth.push(value)
    this.setState({
      xzkey: item,
      noth: value,
    });
  };


  //点击放在右边
  clickStart = (e, item, value) => {
    // console.log(e)
    // console.log(item)
    // console.log(value)
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let w={
      ...value,
      id:this.numRandom()
    }
    noth.push(w);
    let { params } = this.state;
    params.data = noth;
    this.setState({
      xzkey: item,
      data: noth,
      params,
      bluekey: this.state.data.length - 1,
    });
    // this.savesavesave()
     console.log(value)
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...value,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });

  };


// 拖拽元素经过放置元素时
  dragOver = (e) => {
    e.preventDefault();// 此处的代码是必须的  不然无法拖拽
    // // console.log('拖拽中');
  };


// 拖拽元素放到放置元素时
  drop = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let w={
      ...this.state.noth,
      id:this.numRandom()
    }
    noth.push(w);
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
      bluekey: this.state.data.length - 1,
    });

    // console.log(value)
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...this.state.noth,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  blue = (e, a) => {
    if (e.target.nodeName === 'DIV') {
      this.setState({
        bluekey: a,
      });
    } else {

    }

  };

//生成一个随机数
  numRandom = () => {
    var num = parseInt(Math.random() * 100000);
    var numString = num.toString();
    var numLen = numString.length;
    var obj = {};//介入对象就可以解决 ju
    for (var i = 0; i < numLen; i++) {
      obj[i] = parseInt(numString[i]);
    }
    // console.log('该数为' + numString + '，该数共有' + numLen + '位。');
    return parseInt(numString);
  };


  //复制一个栏目

  copy = (e, a) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let o = {
      ...e,
      id: this.numRandom(),
    };
    noth.push(o);
    // // console.log(noth)
    // // console.log(noth.length)
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
      bluekey: noth.length - 1,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...e,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  //删除
  delite = (e, a) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth.splice(a, 1);
    this.setState({
      bluekey: noth.length - 1,
      data: noth,
    });
    dispatch({
      type: 'forms/delform2',
      payload: {
        form_content_id:e.id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  changename = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let soth = this.state.bluekey;
    let w = e.target.value;
    noth[soth].data = w
    let { params } = this.state;


    this.setState({
      data: noth,
      // params,
    });
  };

  changename2=(e)=>{
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let soth = this.state.bluekey;
    let w = e.target.value;
    noth[soth].data = w
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[soth],
        form_content_id:noth[soth].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  }




  changesm=(e)=>{
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let soth = this.state.bluekey;
    let w = e.target.value;
    noth[soth].name = w
    let { params } = this.state;
    this.setState({
      data: noth,
      // params,
    });
  }

  changesm2=(e)=>{
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let soth = this.state.bluekey;
    let w = e.target.value;
    noth[soth].name = w
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[soth],
        form_content_id:noth[soth].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  }


  min = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].min = e;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  mix = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].mix = e;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  changetishi = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].placeholder = e.target.value;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  bitian = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].required = e.target.checked === true ? 1 : 0;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  jinyong = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].disabled = e.target.checked === true ? 1 : 0;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  zhengshu = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].integer = e.target.checked === true ? 0 : 1;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  fanwei = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].range = e.target.checked === true ? 1 : 0;
    let { params } = this.state;
    params.data = noth;
    this.setState({
      data: noth,
      params,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  onChangeradio = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].option[0].value = e.target.value;
    this.setState({
      data: noth,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  onChangeradio2 = (e, a, b) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].option[b].name = e.target.value;

    this.setState({
      data: noth,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  duoxuan = (e, a, b) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    noth[this.state.bluekey].option[b].value = e.target.checked ? 0 : 1;
    this.setState({
      data: noth,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  //删除option
  onChangeradio3 = (e, a, b) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    // console.log(e);
    // console.log(a);
    // console.log(b);
    noth[this.state.bluekey].option.splice(b, 1);
    this.setState({
      data: noth,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };

  addradio = (e) => {
    const { dispatch, forms } = this.props;
    let noth = this.state.data;
    let u = {
      value: noth[this.state.bluekey].option.length + 1,
      name: '选项' + (noth[this.state.bluekey].option.length + 1),
    };
    noth[this.state.bluekey].option.push(u);
    // console.log(noth[this.state.bluekey].option);
    this.setState({
      data: noth,
    });
    dispatch({
      type: 'forms/saveform2',
      payload: {
        ...noth[this.state.bluekey],
        form_content_id:noth[this.state.bluekey].id ,
        form_id:localStorage.getItem("form_id")
      },
      callback:(res)=>{
        // console.log(res,1)
        if(res.code===0){
          if(localStorage.getItem("isCreate")==="true"){
            localStorage.setItem("isCreate",false)
          }
        }else{
          message.error(res.msg)
        }
        this.setState({
          isSave1:true
        })
      }
    });
  };


  // 关闭预览
  closeYulan = () => {
    const { dispatch, forms } = this.props;
    dispatch({
      type: 'forms/yulankey',
      payload: {
        yulankey: false,
      },
    });
  };

  // 提示出现
  tipShow = () => {
    this.setState({
      isTipShow: true,
    });
  };
  // 提示隐藏
  tipHidden = () => {
    this.setState({
      isTipShow: false,
    });
  };
  // 跳转到下一页
  isGaveUp = () => {
    this.tipHidden();
    router.push({
      pathname: '/process/approval',
    });
  };

  changeType=(e,a)=>{
    const { dispatch, forms } = this.props;
    // console.log(e,a)
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
        // console.log(res, 'form_id');
        this.setState({
          data: res.result.content,
          bluekey: res.result.content.length === 0 ? 0 : res.result.content.length - 1,
          form_type_id:e.form_type_id,
        });
      },
    });

  }

  changeguiding=(e)=>{
    // console.log(e.target.value)
    this.setState({
      changesssss:e.target.value
    })


  }

  gaiguiding=(e)=>{
    const{dispatch}=this.props
    dispatch({
      type: 'forms/settiaojian',
      payload: {
        content:this.state.changesssss,
        form_type_id:this.state.form_type_id,
      },
      callback: res => {
        dispatch({
          type: 'forms/qingjiaform',
          payload: {
            form_id:this.state.qingjiadata[this.state.qingjiablue].form_id
          },
          callback: res2 => {
            this.setState({
              qingjia:true,
              qingjiadata:res2.result,
              changesssss:'',
            })
          },
        });
      },
    });
  }

  render() {
    let { forms } = this.props;
    const { data, bluekey, xzkey, params, isTipShow } = this.state;
    // 提示是否保存
    let isSave = (
      <div className={styles.saveMask}>
        <div className={styles.isSave}>
          <p className={styles.tipCon}>是否保存当前页面</p>
          <div className={styles.saveBtn}>
            <p className={styles.sureSave} onClick={this.tipHidden}>前往保存</p>
            <p className={styles.cancalSave} onClick={this.isGaveUp}>放弃</p>
          </div>
        </div>
      </div>
    );
    return (
      <div className={styles.mainbox}>
        <Titles iiiidata={this.state.nicedddd} params={params} tipShow={this.tipShow}/>

        <div className={styles.drag}>
          {/*上方的保存按钮*/}
          <div className={styles.savediv}></div>

          <div className={styles.dragleft}>
            <div className={styles.zhezhaoleft} style={{display:this.state.qingjia===true?"block":"none"}}></div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="基础控件" key="1">
                <div>
                  <h4 style={{ fontSize: '16px', clear: 'both' }}>关联表单</h4>
                  <div>
                    {
                      this.state.dataleft.length>0&&this.state.dataleft.map((value, key) => {
                        if (value.type === 3) {
                          return (
                            <Tag draggable={true}
                                 className={key === xzkey ? styles.tags2 : styles.tags}
                                 onDragStart={(e) => this.dragStart(e, key, value)}
                                 onClick={(e) => this.clickStart(e, key, value)}
                            >
                              {value.name}
                            </Tag>
                          );
                        }
                      })}
                  </div>
                  <br/>
                  <h4 style={{ fontSize: '16px', clear: 'both' }}>系统字段</h4>
                  <div>
                    {
                      this.state.dataleft.length>0&&this.state.dataleft.map((value, key) => {
                        if (value.type === 4) {
                          return (
                            <Tag draggable={true}
                                 className={key === xzkey ? styles.tags2 : styles.tags}
                                 onDragStart={(e) => this.dragStart(e, key, value)}
                                 onClick={(e) => this.clickStart(e, key, value)}
                            >
                              {value.name}
                            </Tag>
                          );
                        }
                      })}
                  </div>

                  <br/>
                  <h4 style={{ fontSize: '16px', clear: 'both' }}>基础字段</h4>
                  <div>
                    {
                      this.state.dataleft.map((value, key) => {
                        if (value.type === 5) {
                          return (
                            <Tag draggable={true}
                                 className={key === xzkey ? styles.tags2 : styles.tags}
                                 onDragStart={(e) => this.dragStart(e, key, value)}
                                 onClick={(e) => this.clickStart(e, key, value)}
                            >
                              {value.name}
                            </Tag>
                          );
                        }
                      })}
                  </div>
                  <br/>
                  <h4 style={{ fontSize: '16px', clear: 'both' }}>高级字段</h4>
                  <div>
                    {
                      this.state.dataleft.map((value, key) => {
                        if (value.type === 6) {
                          return (
                            <Tag draggable={true}
                                 className={key === xzkey ? styles.tags2 : styles.tags}
                                 onDragStart={(e) => this.dragStart(e, key, value)}
                                 onClick={(e) => this.clickStart(e, key, value)}
                            >
                              {value.name}
                            </Tag>
                          );
                        }
                      })}
                  </div>
                  <br/>
                </div>
              </TabPane>
              <TabPane tab="薪酬控件" key="2">
                <div>
                  <h4 style={{ fontSize: '16px', clear: 'both' }}>试用期薪酬</h4>
                  <div>
                    {
                      this.state.dataleft.map((value, key) => {
                        if (value.type === 7) {
                          return (
                            <Tag draggable={true}
                                 className={key === xzkey ? styles.tags2 : styles.tags}
                                 onDragStart={(e) => this.dragStart(e, key, value)}
                                 onClick={(e) => this.clickStart(e, key, value)}
                            >
                              {value.name}
                            </Tag>
                          );
                        }
                      })}
                  </div>
                  <br/>
                  <h4 style={{ fontSize: '16px', clear: 'both' }}>转正后薪酬</h4>
                  <div>
                    {
                      this.state.dataleft.map((value, key) => {
                        if (value.type === 8) {
                          return (
                            <Tag draggable={true}
                                 className={key === xzkey ? styles.tags2 : styles.tags}
                                 onDragStart={(e) => this.dragStart(e, key, value)}
                                 onClick={(e) => this.clickStart(e, key, value)}
                            >
                              {value.name}
                            </Tag>
                          );
                        }
                      })}
                  </div>
                  <br/>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className={styles.dragcon}>

            <div className={styles.qingjiatop} style={{display:this.state.qingjia===true?"block":"none"}}>
              <h4 style={{ fontSize: '14px', clear: 'both' }}>请假类型</h4>
              <div>
                {
                 this.state.qingjiadata.length>0&& this.state.qingjiadata.map((value,key)=>{
                      return (
                        <Button  type={this.state.qingjiablue===key?"primary":"Default"} onClick={e=>this.changeType(value,key)} className={styles.qingjiabutton}>{value.name}</Button>
                  )
                })

                }
              </div>
              <h4 style={{ fontSize: '14px', clear: 'both',marginTop:"24px" }}>请假规定</h4>
              <div>
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

            <Card className={styles.zzzzzz}>
              <Card.Grid
                onDrop={e => this.drop(e)}
                onDragOver={e => this.dragOver(e)}
                className={styles.zzzzzz2}
              >
                <div className={styles.zhezhaocon} style={{display:this.state.qingjia===true?"block":"none"}}></div>

                <div style={{paddingBottom:"24px",minHeight:850}}>
                  {
                    data.length > 0 ?
                      data.map((value, key) => {

                          if (value.label === 'Input') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}
                              >
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Input className={styles.width40} placeholder={value.placeholder}
                                       disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'count') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}
                              >
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Input className={styles.width40} placeholder={value.placeholder}
                                       disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }

                          if (value.label === 'Checkbox') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>

                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                {
                                  value.option.length > 0 && value.option.map((value2, key2) => {
                                    return (
                                      <div>
                                        <Checkbox checked={value2.value === 0 ? true : false}
                                                  disabled={value.disabled === 1 ? true : false}
                                                  style={{ marginTop: '10px', marginLeft: 0 }}>
                                          {value2.name}
                                        </Checkbox>
                                        <br/>
                                      </div>

                                    );
                                  })
                                }
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Button') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>

                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Button type="primary" disabled={value.disabled === 1 ? true : false}>{'按钮'}</Button>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                        if (value.label === 'Description') {
                          return (
                            <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                 style={{ background: key === bluekey ? '#f1faff' : 'none' }}>

                              <h2>{value.name === '' ?value.data: value.name} <span className={styles.xinghao}
                                                                                        style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                              </h2>
                              <div className={styles.zhezhao}></div>
                              <img
                                src={delite}
                                alt=""
                                className={styles.delite}
                                onClick={e => this.delite(value, key)}
                              />
                              <img
                                src={copy}
                                alt=""
                                className={styles.copy}
                                onClick={e => this.copy(value, key)}
                              />
                            </div>
                          );
                        }
                          if (value.label === 'Select') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Select className={styles.width40} placeholder={value.placeholder}
                                        disabled={value.disabled === 1 ? true : false}>
                                  <Option value="1">选项1</Option>
                                  <Option value="2">选项2</Option>
                                  <Option value="3">选项3</Option>
                                </Select>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'multiple' || value.label === 'Relevant') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Select className={styles.width40} placeholder={value.placeholder}
                                        disabled={value.disabled === 1 ? true : false}>
                                  <Option value="1">选项1</Option>
                                  <Option value="2">选项2</Option>
                                  <Option value="3">选项3</Option>
                                </Select>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }

                          if (value.label === 'DatePicker') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <DatePicker placeholder={value.placeholder}
                                            disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }

                          if (value.label === 'InputNumber') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <InputNumber min={1} max={10} placeholder={value.placeholder}
                                             disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Radio') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>

                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Radio.Group value={value.option[0].value} disabled={value.disabled === 1 ? true : false}>
                                  {
                                    value.option.length > 0 && value.option.map((value2, key) => {
                                      return (
                                        <div>
                                          <Radio value={value2.name}
                                                 style={{ marginTop: '10px' }}> {value2.name}   </Radio>
                                          <br/>
                                        </div>
                                      );
                                    })
                                  }
                                </Radio.Group>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Divider') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>

                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Divider/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'TextArea') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <TextArea rows={4} placeholder={value.placeholder}
                                          disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Upload') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Button disabled={value.disabled === 1 ? true : false}>
                                  <Icon type="upload"/> 点击上传
                                </Button>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'TimePicker') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <TimePicker className={styles.width40} placeholder={value.placeholder}
                                            disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Tag') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                                <Tag color="orange">orange</Tag>
                                <Tag color="gold">gold</Tag>
                                <Tag color="lime">lime</Tag>
                                <Tag color="green">green</Tag>
                                <Tag color="cyan">cyan</Tag>
                                <Tag color="blue">blue</Tag>
                                <Tag color="geekblue">geekblue</Tag>
                                <Tag color="purple">purple</Tag>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }

                          if (value.label === 'Switch') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Switch defaultChecked placeholder={value.placeholder}
                                        disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Cascader') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Select className={styles.width40} placeholder={value.placeholder}
                                        disabled={value.disabled === 1 ? true : false}>
                                  <Option value="1">选项1</Option>
                                </Select>
                                <Select className={styles.width40}>
                                  <Option value="1">选项1</Option>
                                </Select>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.label === 'Location') {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <Button disabled={value.disabled === 1 ? true : false}>
                                  <Icon type="location"/> 点击获取位置
                                </Button>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                          if (value.type === 7) {
                            return (
                              <div className={styles.wai} onClick={(e) => this.blue(event, key)}
                                   style={{ background: key === bluekey ? '#f1faff' : 'none' }}>
                                <h2>{value.data === '' ? value.name : value.data} <span className={styles.xinghao}
                                                                                          style={{ display: value.required === 0 ? 'none' : 'inline-block' }}>*</span>
                                </h2>
                                <InputNumber min={1} max={10} placeholder={value.placeholder}
                                             disabled={value.disabled === 1 ? true : false}/>
                                <div className={styles.zhezhao}></div>
                                <img
                                  src={delite}
                                  alt=""
                                  className={styles.delite}
                                  onClick={e => this.delite(value, key)}
                                />
                                <img
                                  src={copy}
                                  alt=""
                                  className={styles.copy}
                                  onClick={e => this.copy(value, key)}
                                />
                              </div>
                            );
                          }
                        },
                      ) : (
                        <div className={styles.centera}>从左侧拖拽来添加字段</div>
                      )}
                </div>
              </Card.Grid>
            </Card>
          </div>
          <div className={styles.dragright}>

            {
              this.state.qingjia===false&&data.length > 0 ?
                <div className={styles.righttop}>

                  {
                    data[bluekey].label === 'Description' ?
                      <div>
                        <h2>修改说明</h2>
                        <TextArea
                          rows={10} onChange={this.changesm} onBlur={this.changesm2}  value={data[bluekey].name === '' ? '' : data[bluekey].name} />
                      </div>:
                      <div>
                        <h2>标题</h2>
                        <Input value={data.length === 0 ? '0测试' : data[bluekey].data === '' ? '' : data[bluekey].data}
                               onChange={this.changename} onBlur={this.changename2} />
                        <Divider/>
                        <h2>提示信息</h2>
                        <TextArea
                          value={data.length === 0 ? '0测试' : data[bluekey].placeholder === '1' ? '' : data[bluekey].placeholder}
                          rows={4} onChange={this.changetishi}/>
                        <Divider/>
                        <h2>校验</h2>
                        <Checkbox onChange={this.bitian}
                                  checked={data.length === 0 ? false : data[bluekey].required === 1 ? true : false}>必填</Checkbox>
                        <br/>
                        <Checkbox onChange={this.jinyong}
                                  checked={data.length === 0 ? false : data[bluekey].disabled === 1 ? true : false}>禁用</Checkbox>
                        <br/>
                        <div>
                          {
                            data[bluekey].label === 'InputNumber' ?
                              <div>
                                <Checkbox onChange={this.zhengshu}
                                          checked={data.length === 0 ? false : data[bluekey].integer === 0 ? true : false}>仅允许整数</Checkbox>
                                <br/>
                                <Checkbox onChange={this.fanwei}
                                          checked={data.length === 0 ? false : data[bluekey].range === 1 ? true : false}>限定数值范围</Checkbox>
                                <div>
                                  {
                                    data[bluekey].range === 1 ?
                                      <div style={{ display: 'flex', marginTop: '10px' }}>
                                        <InputNumber size={'small'} value={data[bluekey].min} onChange={this.min}/>
                                        <span>~</span> <InputNumber size={'small'} value={data[bluekey].mix}
                                                                    onChange={this.mix}/>
                                      </div> :
                                      <div></div>
                                  }
                                </div>
                              </div> : data[bluekey].label === 'Radio' ?
                              <div>
                                <Divider/>
                                <h2>单选</h2>
                                {
                                  data[bluekey].option.length >= 1 ?
                                    <Radio.Group onChange={this.onChangeradio} value={data[bluekey].option[0].value}>
                                      {

                                        data[bluekey].option.length > 0 && data[bluekey].option.map((value, key) => {
                                          return (
                                            <Radio value={value.name} style={{ marginTop: '10px' }}> <Input placeholder={value.name}
                                                                                                            style={{ width: '75%' }}
                                                                                                            onChange={(e) => this.onChangeradio2(e, value, key)}/>
                                              <Icon type={'delete'} style={{ fontSize: '18px', marginLeft: '20px' }}
                                                    onClick={(e) => this.onChangeradio3(e, value, key)}/> </Radio>
                                          );
                                        })
                                      }
                                    </Radio.Group> :
                                    <div></div>
                                }

                                <p style={{ color: '#189df3', cursor: 'pointer' }} onClick={this.addradio}>添加选项</p>
                              </div>
                              : data[bluekey].label === 'Checkbox' ?
                                <div>
                                  <Divider/>
                                  <h2>多选</h2>
                                  {
                                    data[bluekey].option.length > 0 && data[bluekey].option.map((value, key) => {
                                      return (
                                        <Checkbox checked={value.value === 0 ? true : false}
                                                  onChange={(e) => this.duoxuan(e, value, key)}
                                                  style={{ marginTop: '10px', marginLeft: 0 }}>
                                          <Input placeholder={value.name} style={{ width: '60%' }}
                                                 onChange={(e) => this.onChangeradio2(e, value, key)}/>
                                          <Icon type={'delete'} style={{ fontSize: '18px', marginLeft: '20px' }}
                                                onClick={(e) => this.onChangeradio3(e, value, key)}/>
                                        </Checkbox>
                                      );
                                    })
                                  }

                                  <p style={{ color: '#189df3', cursor: 'pointer' }} onClick={this.addradio}>添加选项</p>
                                </div> : data[bluekey].label === 'Select' ?
                                  <div>
                                    <Divider/>
                                    <h2>下拉单选</h2>
                                    {
                                      data[bluekey].option.length >= 1 ?
                                        <Radio.Group onChange={this.onChangeradio} value={data[bluekey].option[0].value}>
                                          {
                                            data[bluekey].option.length > 0 && data[bluekey].option.map((value, key) => {
                                              return (
                                                <Radio value={value.name} style={{ marginTop: '10px' }}> <Input
                                                  placeholder={value.name} style={{ width: '75%' }}
                                                  onChange={(e) => this.onChangeradio2(e, value, key)}/>
                                                  <Icon type={'delete'} style={{ fontSize: '18px', marginLeft: '20px' }}
                                                        onClick={(e) => this.onChangeradio3(e, value, key)}/> </Radio>
                                              );
                                            })
                                          }
                                        </Radio.Group> :
                                        <div></div>
                                    }

                                    <p style={{ color: '#189df3', cursor: 'pointer' }} onClick={this.addradio}>添加选项</p>
                                  </div> : data[bluekey].label === 'multiple' ?
                                    <div>
                                      <Divider/>
                                      <h2>下拉多选</h2>
                                      {
                                        data[bluekey].option.length > 0 && data[bluekey].option.map((value, key) => {
                                          return (
                                            <Checkbox checked={value.value === 0 ? true : false}
                                                      onChange={(e) => this.duoxuan(e, value, key)}
                                                      style={{ marginTop: '10px', marginLeft: 0 }}>
                                              <Input placeholder={value.name} style={{ width: '60%' }}
                                                     onChange={(e) => this.onChangeradio2(e, value, key)}/>
                                              <Icon type={'delete'} style={{ fontSize: '18px', marginLeft: '20px' }}
                                                    onClick={(e) => this.onChangeradio3(e, value, key)}/>
                                            </Checkbox>
                                          );
                                        })
                                      }

                                      <p style={{ color: '#189df3', cursor: 'pointer' }} onClick={this.addradio}>添加选项</p>
                                    </div> : data[bluekey].label === 'count' ?
                                      <div>
                                        <Divider/>
                                        <h2>计算公式</h2>

                                      </div> :
                                      <div></div>
                          }
                        </div>
                      </div>
                  }



                  {/*<Checkbox  checked={data.length===0?false:data[bluekey].disabled===1?true:false}  >禁用</Checkbox>*/}
                </div> :this.state.qingjia===true ?

                  <div className={styles.righttop}>
                    <h2>修改规定</h2>
                    <TextArea
                      rows={10} onChange={this.changeguiding}  value={this.state.changesssss} />

                      <Button type='primary' style={{marginTop:'24px',marginLeft:'180px'}} onClick={this.gaiguiding}>修改</Button>

                    <Divider/>
                  </div> :
                <div className={styles.centera} style={{ display: data.length > 0 ? 'none' : 'block' }}>
                  请添加字段
                </div>
            }


          </div>
        </div>

        {/* 预览 */}
        {forms.yulan ? <Yulan closeYulan={this.closeYulan} data={this.state.data}/> : ''}
        {/* 提示 */}
        {isTipShow ? isSave : ''}
      </div>
    );
  }
}

export default Register;
