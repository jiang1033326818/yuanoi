import React from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

import style from './Approval.less';
import ApprovalLeft from './ApprovalLeft';
import Titles from '../../components/FormTitle/index';
import Register from '../Admin/orgtest';
import Orgtest from '../Admin/orgtest2';
import { message } from 'antd';
import btnright from '../../../images/admin/btnright.png';
import btnleft from '../../../images/admin/btnleft.png';
import addlevel from '../../../images/flow/addlevel.png';
import addlevels from '../../../images/flow/addlevels.png';
import delevel from '../../../images/flow/delevel.png';
import downlevel from '../../../images/flow/downlevel.png';
import over from '../../../images/flow/over.png';
import nextlevel from '../../../images/flow/nextlevel.png';
import closePre from '../../../images/flow/closePre.png';
import sousuo from '../../../images/flow/sousuo.png';
import sousuo2 from '../../../images/flow/sousuo2.png';
import delLeader from '../../../images/flow/delLeader.png';
import yeslevel from '../../../images/flow/yeslevel.png';
import nolevel from '../../../images/flow/nolevel.png';
import styles from '../Admin/origin.less';
import cha from '../../../images/flow/cha.png';
import tishi1 from '../../../images/flow/tishi1.png';
import tishi2 from '../../../images/flow/tishi2.png';
import green from '../../../images/flow/green.png';
import blue from '../../../images/flow/blue.png';
import yellow from '../../../images/flow/yellow.png';

let time = [];
const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

@connect(({ userlist, zuzhi, flow, forms, loading }) => ({
  userlist,
  zuzhi,
  flow,
  forms,
  loading: loading.effects['userlist/fetch'],
}))
class Approval extends React.Component {
  state = {
    data: data,
    data2: data,
    levelList: [],
    isshowCom: true,
    nicedddd: 2,
    chooseList: [],
    leaderList: [],
    ind: null,
    params: {},
    isTipShow: false,
    btn: btnleft,
    rigdis: 'none',
    huibao: '0',
    chartwidth: '100%',
    tishi: 'none',
    tishitop: 'block',
  };


  savesavesave = () => {
    const { dispatch } = this.props;
    let { params } = this.state;
    let a = JSON.stringify(params.data);
    let c = localStorage.getItem('modular_id');
    let d = localStorage.getItem('form_id');
    let e = localStorage.getItem('approval_id');
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        approval_id: e,
        form_id: localStorage.getItem('form_id'),
        content: params.content,
        // name:params.name,
      },
      callback: (res) => {
        console.log(res, 2);
        if (res.code === 0) {
        } else {
          message.error(res.msg);
        }
        this.setState({
          isSave2: true,
        });
      },
    });
  };


  componentDidMount() {
    window.addEventListener('keydown', this.enterDown);
    // 获取用户列表
    this.getAllUser();
    // 获取当前用户
    this.getNowUser();
    let { params } = this.state;
    let { forms, dispatch } = this.props;
    let a = JSON.parse(localStorage.getItem('isCreate'));
    if (!a) {
      let approval_id = localStorage.getItem('approval_id');
      params.approval_id = approval_id;
      dispatch({
        type: 'forms/getApproCon',
        payload: {
          approval_id,
        },
        callback: res => {
          console.log(res, 'approval_id');
          this.setState({
            levelList: res.result.content ? res.result.content : [],
          });
        },
      });
    }
    this.setState({
      params,
    });

    if (localStorage.getItem('tishi') === 'none') {
      this.setState({
        tishitop: 'none',
      });
    }

  }

  // 处理用户列表
  userInit = () => {
    let { userlist } = this.props;
    let { leaderList, levelList } = this.state;
    leaderList = userlist.userlist;
    leaderList.length > 0 && leaderList.map(item => {
      item.isChoose = false;
      item.type = 1;
      return item;
    });
    this.setState({
      leaderList,
      levelList,
    });
  };

  //
  // componentDidUpdate() {
  //   this.getNowUser()
  // }


  // 获取当前用户
  getNowUser = () => {
    const { dispatch } = this.props;
    console.log(this.props);
    let create = localStorage.getItem('isCreate');
    let form_id = localStorage.getItem('form_id');
    dispatch({
      type: 'forms/fetchtiaojian',
      payload: {
        form_id: form_id === 'null' ? null : form_id,
      },
      callback: res => {
        localStorage.setItem('approval_id', res.result.approval_id);
        this.setState({
          levelList: res.result[0].content,
        });
        dispatch({
          type: 'forms/gongju',
          payload: {
            data: res.result[0],
          },
        });
        dispatch({
          type: 'forms/gongju2',
          payload: {
            data: res.result[0].examine_rule_id,
          },
        });
      },
    });
  };
  // 审批方式
  ways = (report, report_value) => {
    let { params } = this.state;
    params.report = report;
    report_value ? params.report_value = report_value : '';
    this.setState({
      params,
    });
  };
  // 获取用户列表
  getAllUser = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'zuzhi/fetch',
      payload:{
        num:200,
        page:1,
      },
      callback: (res) => {
        // console.log(res,555)
        let a = res.result;
        for (let i in a) {
          a[i].type = 1;
        }
        console.log(87, a);
        this.setState({
          data: a,
          data2: [a[a.length - 1]],
        });
      },
    });
  };
  // 点击确定添加审批人
  sureAdd = () => {
    let { levelList, leaderList, ind, params, chooseList } = this.state;
    const { dispatch } = this.props;
    let q = this.props.forms.shenpi;
    let addlist = leaderList.filter(item => item.isChoose);
    q.splice(ind + 1, 0, ...addlist);
    console.log(q, 1);
    // console.log(leaderList,2)
    // console.log(ind,3)
    // console.log(params,4)
    dispatch({
      type: 'forms/gongju',
      payload: {
        data: {
          content: q,
        },
      },
    });

    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        content: JSON.stringify(q),
        rule_id: this.props.forms.rule_id,
        form_id: localStorage.getItem('form_id'),
      },
      callback: res2 => {
        console.log(this.props.forms);
        dispatch({
          type: 'forms/fetchtiaojian',
          payload: {
            form_id: localStorage.getItem('form_id'),
          },
          callback: res => {
            this.setState({
              levelList: res.result[0].content,
            });
          },
        });
      },
    });


    // let addlist = leaderList.filter(item => item.isChoose);
    // levelList.splice(ind + 1, 0, ...addlist);
    // params.content = levelList.map(item=>item.no);
    // // console.log(params,levelList)
    // this.setState({
    //   levelList,
    //   params
    // });
    this.closeChoose();
  };
  // 添加审批人
  addlevels = ind => {
    // 处理用户列表
    this.userInit();
    this.beginChoose();
    this.setState({
      ind,
    });
  };
  // 删除审批人
  denowlevel = ind => {
    const {dispatch} =this.props
    let { levelList } = this.state;
    console.log(ind, levelList);

    levelList.splice(ind, 1);

    this.setState({
      levelList,
    });
    dispatch({
      type: 'forms/savetiaojian',
      payload: {
        content: JSON.stringify(levelList),
        rule_id: this.props.forms.rule_id,
        form_id: localStorage.getItem('form_id'),
      },
      callback: res2 => {
        console.log(this.props.forms);
        dispatch({
          type: 'forms/fetchtiaojian',
          payload: {
            form_id: localStorage.getItem('form_id'),
          },
          callback: res => {
            this.setState({
              levelList: res.result[0].content,
            });
          },
        });
      },
    });



    this.savesavesave();
  };
  // 选择审批人
  chooseLeader = item => {
    // let { leaderList, levelList, chooseList } = this.state;
    // leaderList[ind].isChoose = !leaderList[ind].isChoose;
    // chooseList.push(leaderList[ind]);
    // chooseList = chooseList.filter(item=>item.isChoose);
    // this.setState({
    //   leaderList,
    //   chooseList,
    // });
    let { chooseList, leaderList } = this.state;
    leaderList.length > 0 && leaderList.map(it => {
      if (item.no == it.no) {
        it.isChoose = !it.isChoose;
        it.type = 1;
      }
      return it;
    });
    let hasUser = chooseList.find(it => item.no == it.no);
    console.log(hasUser, item, chooseList);
    if (hasUser) {
      chooseList.length > 0 && chooseList.map(it => {
        if (it.no == item.no) {
          it.isChoose = false;
          it.type = 1;
          console.log(it.isChoose);
        }
        return it;
      });
    } else {
      chooseList.push(item);
    }
    // hasUser?chooseList:chooseList.push(item);
    chooseList = chooseList.filter(item => item.isChoose);
    console.log(leaderList, item, chooseList, 'qqqqqq');
    this.setState({
      chooseList,
      leaderList,
    });
  };
  // 取消此审批人
  cancalLeader = (item, ind) => {

    let { chooseList, leaderList } = this.state;
    leaderList.length > 0 && leaderList.map(it => {
      if (item.no == it.no) {
        it.isChoose = false;
        it.type = 1;
      }
      return it;
    });
    chooseList.splice(ind, 1);
    // console.log(chooseList,'----------')
    this.setState({
      chooseList,
      leaderList,
    });
  };
  // 打开选择审批
  beginChoose = () => {
    this.getUsers('');
    this.refs.leaderMask.style.display = 'block';
  };
  // 关闭选择审批
  closeChoose = () => {
    this.refs.leaderMask.style.display = 'none';
    this.setState({
      chooseList: [],
    });
  };
  // 获取用户
  getUsers = val => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userlist/fetch',
      payload: {
        name: val,
      },
      callback: res => {
        // console.log(res,'------++=+=');
        let leaderList = res.result ? res.result : [];
        let { chooseList } = this.state;
        leaderList = leaderList.map(it => {
          it.isChoose = false;
          chooseList.map(i => {
            // console.log(i,'chooseList')
            if (i.no == it.no) {
              it.isChoose = true;
              it.type = 1;
            }
          });
          return it;
        });
        this.setState({
          leaderList,
        });
      },
    });
  };
  // 搜索
  souLeader = e => {
    let val = e.target.value.trim();
    this.getUsers(val);
  };
  // 按 enter 时 触发失焦事件
  enterDown = (e) => {
    if (e.keyCode == 13) {
      this.refs.sousuo ? this.refs.sousuo.blur() : '';
    }
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
      pathname: '/process/setup',
    });
  };

  changelr = () => {
    if (this.state.huibao === '0') {
      this.setState({
        btn: btnleft,
        rigdis: 'none',
        huibao: '1',
        chartwidth: '100%',
      });
    } else {
      this.setState({
        btn: btnright,
        rigdis: 'block',
        huibao: '0',
        chartwidth: '50%',
      });
    }
  };

  guanbi = () => {
    this.setState({
      tishitop: 'none',
    });
    localStorage.setItem('tishi', 'none');
  };

  fangda = () => {
    this.setState({
      tishi: 'tishi1',
    });
  };

  fangda2 = () => {
    this.setState({
      tishi: 'tishi2',
    });
  };

  chacha = () => {
    this.setState({
      tishi: 'none',
    });
  };


  render() {
    let { levelList, isshowCom, leaderList, chooseList, params, isTipShow } = this.state;
    let { forms,rule_id } = this.props;
    let { userlist } = this.props;
    // if (levelList.length == 0) {
    //   levelList.push(...userlist.nowUser);
    // }
    console.log(forms)

    // console.log(this.props,levelList, '11112');
    // 所有审批人
    let allLeaders = (
      <div className={style.allLeader}>
        {leaderList.length > 0 && leaderList.map((item, index) => (
          <div className={style.leaderItem} key={item.no} onClick={() => this.chooseLeader(item)}>
            <img className={style.chooseThis} src={item.isChoose ? yeslevel : nolevel} alt=""/>
            <div className={style.userItem}>
              <img className={style.userImg} src={item.avatar} alt=""/>
              <div className={style.userInfo}>
                <p className={style.userName}>{item.truename}</p>
                <p className={style.userDept}>
                  {item.dept}-{item.pos}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    // 选择的审批人
    let choose = (
      <div className={style.chooseLeaer}>
        {chooseList.map((item, index) => (
          <div key={item.no}>
            <div className={style.leaderItem}>
              <div className={style.userItem}>
                <img className={style.userImg} src={item.avatar} alt=""/>
                <div className={style.userInfo}>
                  <p className={style.userName}>{item.truename}</p>
                  <p className={style.userDept}>
                    {item.dept}-{item.pos}
                  </p>
                </div>
              </div>
              <img
                className={style.chooseThis}
                src={delLeader}
                onClick={() => this.cancalLeader(item, index)}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    );
    // 添加审批人
    let addLeader = (
      <div className={style.leaderMask} ref="leaderMask">
        <div className={style.addLeader}>
          <div className={style.addTitle}>
            <p>选择审批人</p>
            <img onClick={this.closeChoose} src={closePre} alt=""/>
          </div>
          <div className={style.leadSou}>
            <input ref='sousuo' onBlur={this.souLeader} type="text" placeholder="搜索"/>
            <img src={sousuo} alt=""/>
          </div>
          <div className={style.allChoose}>
            <div className={style.leaders}>
              {/* 审批人选择列表 */}
              {allLeaders}
              {/* 选择的审批人 */}
              {choose}
            </div>
          </div>
          <div className={style.choosebtn}>
            <p className={style.trueBtn} onClick={this.sureAdd}>
              确定
            </p>
            <p className={style.noBtn} onClick={this.closeChoose}>
              取消
            </p>
          </div>
        </div>
      </div>
    );
    // 审批流
    let level = (
      <div className={style.appleft}>
        <p className={style.sheji}>添加跨部门横向审批人</p>
        <div className={style.flowOver2}>
          <img src={over} alt=""/>
          <span>流程开始</span>
        </div>
        <div className={style.isaddlevel}>
          <img src={nextlevel} alt=""/>
        </div>

        {forms.shenpi.length > 0 && forms.shenpi.map((item, index) => (
          <div className={style.level} key={item.no}>
            <p className={style.levelName}>
              {item.name === undefined ? item.nickname : item.name}
              {/*{item.truename}*/}
              {item.type == 0 ? (
               <div></div>
              ) : (
                <img
                  className={style.delevel}
                  onClick={() => this.denowlevel(index)}
                  src={delevel}
                  alt=""
                />
              )}
            </p>
            <div className={style.isaddlevel}>
              {
                index === forms.shenpi.length-1 ?
                  <img src={nextlevel} alt=""/>
                   :index === forms.shenpi.length-2?
                  <div>
                    <div className={style.diandiandian}>···</div>
                    <img src={nextlevel} alt=""/>
                    <img
                      className={style.addlevel}
                      src={addlevel}
                      onClick={() => this.addlevels(index)}
                      alt="添加"
                    />
                  </div>:
                 <div>
                  <img src={nextlevel} alt=""/>
                <img
                className={style.addlevel}
                src={addlevel}
                onClick={() => this.addlevels(index)}
                alt="添加"
                />
                </div>

              }

            </div>
          </div>
        ))}
        <div className={style.flowOver}>
          <img src={over} alt=""/>
          <span>流程结束</span>
        </div>
      </div>
    );
    // 组织架构 和 汇报线
    let handle = (
      <div className={style.handle}>
        <div className={style.else}>
          <div className={style.build} style={{ width: this.state.chartwidth }}>
            <p className={style.sheji2}>组织架构图</p>
            <Register orgdata={this.state.data} orgdata2={this.state.data2} rule_id={this.props.forms.rule_id}/>
            <img
              src={this.state.btn}
              style={{ position: 'absolute', right: '0', top: '300px', zIndex: '1500000', cursor: 'pointer' }}
              onClick={this.changelr}
              alt=""
            />
          </div>
          <div className={style.report} style={{ display: this.state.rigdis }}>
            <p className={style.sheji2}>汇报线预览</p>
            <Orgtest orgdata2={this.state.data2}/>
          </div>
        </div>
      </div>
    );
    // 提示是否保存
    let isSave = (
      <div className={style.saveMask}>
        <div className={style.isSave}>
          <p className={style.tipCon}>是否保存当前页面</p>
          <div className={style.saveBtn}>
            <p className={style.sureSave} onClick={this.tipHidden}>前往保存</p>
            <p className={style.cancalSave} onClick={this.isGaveUp}>放弃</p>
          </div>
        </div>
      </div>
    );
    return (
      <div className={style.allllll}>
        <Titles iiiidata={this.state.nicedddd} params={params}    tipShow={this.tipShow}/>


        <div className={style.xinshou} style={{ display: this.state.tishitop }}>
          <div className={style.zhiyin}>新手指引</div>
          <img src={cha} alt="" className={style.cha0} onClick={this.guanbi}/>
          <div className={style.three}>
            <div className={style.one0}>
              <p>智能设置上级审批人</p>
              <img src={blue} onClick={this.fangda} alt=""/>
              <div className={style.fangda} onClick={this.fangda}>
                <img src={sousuo2} alt=""/>
                点击放大
              </div>
            </div>

            <div className={style.one0}>
              <p>添加跨部门审批人</p>
              <img src={yellow} onClick={this.fangda2} alt=""/>
              <div className={style.fangda} onClick={this.fangda2}>
                <img src={sousuo2} alt=""/>
                点击放大
              </div>
            </div>

            <div className={style.one0}>
              <p className={style.teshu}>点击组织架构图中的任一成员,可以查看其具体的审批流</p>
              <img src={green} alt=""/>
            </div>

          </div>
        </div>


        <div className={style.zhezhao}
             style={{ display: this.state.tishi === 'tishi1' ? 'block' : this.state.tishi === 'tishi2' ? 'block' : 'none' }}>
        </div>
        <div className={style.tishi1} style={{ display: this.state.tishi === 'tishi1' ? 'block' : 'none' }}>
          <p>智能设置上级审批人</p>
          <img src={tishi1} alt=""/>
          <img src={cha} className={style.chacha} onClick={this.chacha} alt=""/>
        </div>
        <div className={style.tishi1} style={{ display: this.state.tishi === 'tishi2' ? 'block' : 'none' }}>
          <p>添加跨部门审批人</p>
          <img src={tishi2} alt=""/>
          <img src={cha} className={style.chacha} onClick={this.chacha} alt=""/>
        </div>


        <div className={style.allflow}>
          <div className={style.left}>
            <ApprovalLeft leng={levelList} ways={this.ways}/>
          </div>
          <div className={style.right}>
            <div className={style.approval}>
              {level}
              {handle}
            </div>
          </div>
        </div>
        {/* 添加审批人 */}
        {addLeader}
        {/* 提示 */}
        {isTipShow ? isSave : ''}
      </div>
    );
  }
}

export default Approval;
