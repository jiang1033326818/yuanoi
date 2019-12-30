import React from 'react';
import style from './Flow.less';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import {
  Input,
  message, Modal,
  Icon,
} from 'antd';
import createUses from '../../../images/flow/createUse@2x.png';
import travel from '../../../images/flow/travel@2x.png';
import down from '../../../images/flow/down.png';
import updown from '../../../images/flow/updown.png';
import renflow from '../../../images/flow/renflow.png';
import renflows from '../../../images/flow/renflows.png';
import tiflow from '../../../images/flow/tiflow.png';
import tiflows from '../../../images/flow/tiflows.png';
import caiflow from '../../../images/flow/caiflow.png';
import caiflows from '../../../images/flow/caiflows.png';
import elseflow from '../../../images/flow/elseflow.png';
import elseflows from '../../../images/flow/elseflows.png';
import shenpiimg from '../../../images/data/shenpi.png';
import shujuimg from '../../../images/data/shuju.png';

@connect(({ flow, forms, menu, loading }) => ({
  flow,
  forms,
  menu,
  loading: loading.effects['flow/fetch'],
}))
class Flow extends React.Component {
  state = {
    // 未采用的流程
    spareList: [],
    // 确定的流程
    sureList: [],
    // 操作列表
    handledList: ['删除', '编辑', '修改', '启用'],
    handledList2: [ '编辑',  '启用'],
    handList: ['编辑',  '修改', '禁用'],
    ind: null,
    panel_id: '3',    //列表id
    isReset0: false,
    isReset1: false,
    isReset2: false,
    showMask: false,
    itemNow: {},
    modalVisible:false,
    indNow: '',
    nowid: '0',     //左侧流程id
    panel: [],
    flowList: [
      {
        imgSrc: renflow,
        imgSrcs: renflows,
        con: '人事流程',
      },
      {
        imgSrc: tiflow,
        imgSrcs: tiflows,
        con: '行政流程',
      },
      {
        imgSrc: caiflow,
        imgSrcs: caiflows,
        con: '财务流程',
      },
      {
        imgSrc: elseflow,
        imgSrcs: elseflows,
        con: '其他流程',
      },
    ],
  };

  componentDidMount() {
    let { spareList, sureList } = this.state;
    let { flow, menu } = this.props;
    //   console.log(96369636,menu.all.result[menu.panel].panel_id)
    // this.panelInit();
    let w=localStorage.getItem("modular_id")
    this.setState({
      nowid:w
    })
    this.getprolist();
  }

  // 获取流程列表
  getprolist = () => {
    const { dispatch } = this.props;
    const { flow, menu } = this.props;
    dispatch({
      type: 'flow/fetchpro',
      payload: {
        status: '0',
        page: '1',
        limit: '10',
      },
      callback: res => {
        //   console.log(res,444444)
        for (let i in res.result.list) {
          // if (res.result.list[i].name === '人事流程') {
            // this.setState({
            //   nowid: res.result.list[i].modular_id,
            // });
           // localStorage.setItem("nowid",res.result.list[i].modular_id)

            dispatch({
              type: 'flow/fetch',
              payload: {
                status: '0',
                page: '1',
                limit: '10',
                modular_id: localStorage.getItem("modular_id"),
              },
              callback: res2 => {
                //   console.log(res2,5555)
                let { spareList } = this.state;
                spareList = res2.result ? res2.result : [];
                //   console.log(res2, '1111111111111');
                this.setState({
                  spareList,
                });
                this.spareInit(spareList);
                this.bianhui(spareList)
                this.setState({
                  isReset0: false,
                });
              },
            });
            dispatch({
              type: 'flow/fetch',
              payload: {
                status: '1',
                page: '1',
                limit: '10',
                modular_id: localStorage.getItem("modular_id"),
              },
              callback: res3 => {
                let { sureList } = this.state;
                sureList = res3.result ? res3.result : [];
                //   console.log(res3, '2222222222222');
                this.setState({
                  sureList,
                });
                this.spareInit(sureList);
                this.setState({
                  isReset1: false,
                });
              },
            });


            //获取龙神oi智能流程
            dispatch({
              type: 'flow/default',
              payload: {
                modular_id: localStorage.getItem("modular_id"),
              },
              callback: res4 => {
                console.log(res4);
                this.setState({
                  panel: res4.result,
                });
                this.spareInit(this.state.panel);
              },
            });


        }
      },
    });
  };
  // 获取采用和未采用模块列表

  // 获取默认列表
  // panelInit = () => {
  //   const { dispatch } = this.props;
  //   const { flow } = this.props;
  //   dispatch({
  //     type: 'flow/default',
  //     payload: {
  //       // panel_id:'3'
  //     },
  //   });
  // };
  // 初始化模块列表
  bianhui = list => {
    list.map(item => {
      item.image=item.image.slice(0,item.image.indexOf("@2x"))+"2.png"
      return item;
    });
    let obj = {};
    obj[list] = list;
    this.setState(obj);
  };

  spareInit = list => {
    list.map(item => {
      item.isDown = true;
      return item;
    });
    let obj = {};
    obj[list] = list;
    this.setState(obj);
  };



  gogogo=(e)=>{
      const { dispatch } = this.props;
      dispatch({
        type: 'forms/savesetting',
        payload: {
          modular_id: this.state.nowid,
          name: '未命名表单',
          type:e==1?0:1
        },
        callback: res => {
          let modular_id = this.state.nowid;
          localStorage.setItem('modular_id', modular_id);
          localStorage.setItem('approval_id', 0);
          localStorage.setItem('form_id', res.result.form_id);
          localStorage.setItem('form_name', '');
          localStorage.setItem('isCreate', true);
          localStorage.setItem('form_type', e==1?0:1);
          router.push({
            pathname: '/process/form',
          });
        },
      });


  }


  // 创建应用
  createUse = () => {
      this.setState({
        modalVisible:true,
      })
  };
  // 操作模块
  handledOne = (item, ind, type, e) => {
    console.log(item, ind, type, e);
    const { dispatch } = this.props;
    let { spareList, sureList, panel } = this.state;
    //   console.log(item);
    if (type == 'sure') {
      ind = ind + 1;
    }
    switch (ind) {
      case 0: // 删除
              //   console.log(ind,item.modular_id,'del');
        this.setState({
          showMask: true,
          itemNow: item,
          indNow: ind,
        });
        break;
      case 1: // 编辑
        localStorage.setItem('isCreate', false);
        localStorage.setItem('form_id', item.form_id === undefined ? item.form_server_id : item.form_id);
        localStorage.setItem('form_name', item.name);
        localStorage.setItem('isServer', false);
        localStorage.setItem('modular_id', this.state.nowid);
        localStorage.setItem('approval_id', item.approval_id);
        localStorage.setItem('form_type', item.type);
        router.push({
          pathname: '/process/form',
        });
        break;
      // case 2: // 复制
      //   dispatch({
      //     type: 'flow/copy',
      //     payload: {
      //       modular_id: item.modular_id,
      //     },
      //     callback: res => {
      //       this.useInit();
      //     },
      //   });
      //   break;
      case 2: // 修改
        if (type == 'spare') {
          this.setState({
            isReset0: true,
          });
        } else {
          this.setState({
            isReset1: true,
          });
        }
        break;
      case 3: // 启用 或 禁用
        if (type == 'spare') {
          dispatch({
            type: 'forms/startform',
            payload: {
              form_id: item.form_id,
              // panel_id: '3',
              status: '1',
            },
            callback: res => {
              if (res.code === 0) {
                message.success('启用成功');
              } else {
                message.error(res.msg);
              }
              this.getprolist();
            },
          });
        } else {
          dispatch({
            type: 'forms/startform',
            payload: {
              form_id: item.form_id,
              // panel_id: '3',
              status: '0',
            },
            callback: res => {
              this.getprolist();
            },
          });
        }
        break;
      default:
        break;
    }
  };
  // 修改模块
  xiugaiflow = (item, e) => {
    //   console.log(e.target.value);
    console.log(item, e);
    const { dispatch } = this.props;
    let { panel_id } = this.state;
    dispatch({
      type: 'forms/saveform',
      payload: {
        form_id: item.form_id,
        name: e.target.value,
      },
      callback: res => {
        this.useInit();
      },
    });
  };
  // 显示操作列表
  hasDown = (list, ind, e) => {
    e ? e.stopPropagation() : (window.event.cancelBubble = true);
    if (ind !== this.state.ind) {
      this.allClick();
    }
    list[ind].isDown = !list[ind].isDown;
    let obj = {};
    obj[list] = list;
    obj.ind = ind;
    this.setState(obj);
  };
  // 点击存储下标
  flowClick = ind => {
    console.log(23213);
    this.setState({
      ind,
    });
  };
  // 点击其它位置，执行某些操作
  allClick = () => {
    let { spareList, sureList, panel } = this.state;
    this.spareInit(spareList);
    this.spareInit(sureList);
    this.spareInit(panel);
  };
  // 确认删除
  isGaveUp = () => {
    const { dispatch } = this.props;
    let { spareList, sureList, panel, itemNow, indNow } = this.state;
    dispatch({
      type: 'flow/del',
      payload: {
        form_id: itemNow.form_id,

      },
      callback: res => {
        //   console.log(res,'del');
        this.tipHidden();
        this.getprolist();
        this.setState({
          spareList,
        });
      },
    });
  };
  // 取消删除
  tipHidden = () => {
    this.setState({
      showMask: false,
    });
  };

  bianji = (item, a, e) => {
    const { dispatch } = this.props;
    console.log(item);

    if (item.form_server_id) {
      dispatch({
        type: 'forms/savesetting',
        payload: {
          ...item,
          modular_id:this.state.nowid
        },
        callback: res => {
          let modular_id = this.state.nowid;
          localStorage.setItem('modular_id', modular_id);
          localStorage.setItem('approval_id', 0);
          localStorage.setItem('form_id', res.result.form_id);
          localStorage.setItem('form_name', '');
          localStorage.setItem('isCreate', true);
          localStorage.setItem('form_type', item.type);
          localStorage.setItem('form_server_id', item.form_server_id);
          router.push({
            pathname: '/process/form',
          });
        },
      });
    } else {
      if (e.target.className === 'bianji') {

      } else if (e.target.className === 'antd-pro-pages-flow-flow-xiugai') {

      } else if (e.target.className === 'antd-pro-pages-flow-flow-bluet') {
        if (e.target.innerHTML === '启用') {
          dispatch({
            type: 'forms/startform',
            payload: {
              form_id: item.form_id,
              // panel_id: '3',
              status: '1',
            },
            callback: res => {
              if (res.code === 0) {
              } else {
                if (res.msg === '参数缺失') {
                  message.error('请编辑后启用');
                } else {
                  message.error(res.msg);
                }
              }
              this.getprolist();
            },
          });
        } else {
          dispatch({
            type: 'forms/startform',
            payload: {
              form_id: item.form_id,
              // panel_id: '3',
              status: '0',
            },
            callback: res => {
              if (res.code === 0) {
              } else {
                message.error(res.msg);
              }
              this.getprolist();
            },
          });
        }
      } else {
        localStorage.setItem('isCreate', false);
        localStorage.setItem('form_id', item.form_id === undefined ? item.form_server_id : item.form_id);
        localStorage.setItem('form_name', item.name);
        localStorage.setItem('form_type', item.type);
        localStorage.setItem('approval_id', item.approval_id);
        if (item.form_id) {
          localStorage.setItem('isServer', false);
        } else {
          localStorage.setItem('isServer', true);
        }
        router.push({
          pathname: '/process/form',
        });
      }
    }
  };

  choose = (ind) => {
    const { dispatch } = this.props;
    console.log(ind);
    this.setState({
      nowid:ind+1,
    });
    localStorage.setItem("modular_id",ind+1)
    dispatch({
      type: 'flow/fetch',
      payload: {
        status: '0',
        page: '1',
        limit: '10',
        modular_id: ind+1,
      },
      callback: res2 => {
        //   console.log(res2,5555)
        let { spareList } = this.state;
        spareList = res2.result ? res2.result : [];
        //   console.log(res2, '1111111111111');
        this.setState({
          spareList,
        });
        this.spareInit(spareList);
        this.bianhui(spareList)
        this.setState({
          isReset0: false,
        });
      },
    });
    dispatch({
      type: 'flow/fetch',
      payload: {
        status: '1',
        page: '1',
        limit: '10',
        modular_id: ind+1,
      },
      callback: res3 => {
        let { sureList } = this.state;
        sureList = res3.result ? res3.result : [];
        //   console.log(res3, '2222222222222');
        this.setState({
          sureList,
        });
        this.spareInit(sureList);
        this.setState({
          isReset1: false,
        });
      },
    });


    //获取龙神oi智能流程
    dispatch({
      type: 'flow/default',
      payload: {
        modular_id: ind+1,
      },
      callback: res4 => {
        console.log(res4);
        this.setState({
          panel: res4.result,
        });
        this.spareInit(this.state.panel);
      },
    });

  };


  handleModalVisible = flag => {
    this.setState({
      modalVisible: false,
    });
  };








  render() {
    // //   console.log(3333, this.props.flow);
    let { flow } = this.props;
    let { spareList,flowList, sureList, handledList,handledList2, handList, panel, isReset0, isReset1, isReset2, ind, showMask } = this.state;
    // 操作模块
    let handled = (item, list, type) => (
      <ul className={style.handled} style={{ display: item.isDown ? 'none' : 'block' }}>
        {list.map((it, ind) => (
          <li key={ind} className={'bianji'} onClick={e => this.handledOne(item, ind, type, e)}>
            {it}
          </li>
        ))}
      </ul>
    );
    // 未采用的流程
    let spare = (
      <div className={style.allSpare}>
        {spareList.map((item, index) => (
          <div
            className={(index+1)%4==0?style.spareUses:style.spareUse}
            key={item.modular_id}
            onClick={(e) => this.bianji(item, index, event)}
          >
            <img src={item.image} style={{minHeight:48,background:'#ccc',borderRadius:'50%'}} alt=""/>
            <p style={{ cursor: 'pointer' }}>{item.name}</p>
            <input
              className={style.xiugai}
              onChange={e => this.xiugaiflow(item, e)}
              style={{ display: index == ind && isReset0 ? 'block' : 'none' }}
              type="text"
            />
            <div className={style.bluet}>
              启用
            </div>
            <img
              className={style.hasDown}
              onClick={e => this.hasDown(spareList, index, e)}
              src={item.isDown ? down : updown}
              alt=""
            />
            {/* <Icon type="down" className={style.hasDown}
              onClick={e => this.hasDown(spareList, index, e)} />
            {handled(item, handledList, 'spare')} */}
          </div>
        ))}
      </div>
    );
    // 已采用的流程
    let sure = (
      <div className={style.allSpare}>
        <div className={style.createUse} style={{marginRight: "52px"}}  onClick={this.createUse}>
          <img src={createUses} alt=""/>
          <p>创建应用</p>
        </div>
        {sureList.map((item, index) => (
          <div className={style.spareUse} onClick={(e) => this.bianji(item, index, event)} key={item.modular_id}>
            <img src={item.image} alt=""/>
            <p style={{ cursor: 'pointer' }}>{item.name}</p>
            <input
              className={style.xiugai}
              onChange={e => this.xiugaiflow(item, e)}
              style={{ display: index == ind && isReset1 ? 'block' : 'none' }}
              type="text"
            />
            <div className={style.bluet}>
              停用
            </div>
            <img
              className={style.hasDown}
              onClick={e => this.hasDown(sureList, index, e)}
              src={item.isDown ? down : updown}
              alt=""
            />
            {handled(item, handList, 'sure')}
          </div>
        ))}
      </div>
    );
    // 默认流程
    let defaultFlow = (
      <div className={style.sureFlow}>
        {panel.length > 0 && panel.map((item, index) => (
          <div
            className={(index+1)%4==0?style.spareUses:style.spareUse}
            key={item.modular_id}
            onClick={(e) => this.bianji(item, index, event)}
          >
            <img src={item.image} alt=""/>
            <p style={{ cursor: 'pointer' }}>{item.name}</p>
            <input
              className={style.xiugai}
              onChange={e => this.xiugaiflow(item, e)}
              style={{ display: index == ind && isReset2 ? 'block' : 'none' }}
              type="text"
            />
            <div className={style.bluet}>
              启用
            </div>
            <img
              className={style.hasDown}
              onClick={e => this.hasDown(panel, index, e)}
              src={item.isDown ? down : updown}
              alt=""
            />
            {handled(item, handledList2, 'spare')}
          </div>
        ))}
      </div>
    );
    // 删除提示
    let maskTip = (
      <div className={style.maskTip}>
        <div className={style.tip}>
          <p className={style.tipCon}>确定要删除该模块吗</p>
          <div className={style.saveBtn}>
            <p className={style.sureSave} onClick={this.isGaveUp}>确定</p>
            <p className={style.cancalSave} onClick={this.tipHidden}>取消</p>
          </div>
        </div>
      </div>
    );


    return (
      <div>
        <div className={style.leftleft}>
          <div className={style.flows}>
            {/* {
              flowList.map((item, index) => (
                <div key={index} className={this.state.nowid-1 == index ? style.flowItems : style.flowItem}
                     onClick={() => this.choose(index)}>
                  <img src={this.state.nowid-1 == index ? item.imgSrcs : item.imgSrc} alt=""/>
                  <p>{item.con}</p>
                </div>
              ))
            }*/}
            {
              flowList.map((item, index) => (
                <span key={index} className={this.state.nowid-1 == index ? style.flowItems : style.flowItem}
                onClick={() => this.choose(index)}>{item.con}</span>
              ))
            }

          </div>
        </div>
        <div className={style.content}>
          <div className={style.flow} onClick={this.allClick}>
            {showMask ? maskTip : ''}
            <div className={style.flowInfo}>
              <div className={style.useFlow}>
                <p className={style.useTitle}>已采用的流程</p>
                {sure}
              </div>
              <div className={style.spareFlow}>
                <p className={style.useTitle}>未采用的流程</p>
                {spare}
              </div>
              <div className={style.useFlow}>
                <p className={style.useTitle}>智能流程</p>
                {defaultFlow}
              </div>

            </div>
          </div>


          {/*在这写一个判断是什么的弹窗*/}
          <Modal
            destroyOnClose
            title="新建规则"
            visible={this.state.modalVisible}
            onCancel={() => this.handleModalVisible()}
            footer={null}
          >
            <div className={style.tantantan}>
              <img src={shenpiimg} alt="" onClick={e=>this.gogogo(1)} />
              <img src={shujuimg} alt="" onClick={e=>this.gogogo(2)}/>
            </div>

          </Modal>

        </div>
      </div>

    );
  }
}

export default Flow;
