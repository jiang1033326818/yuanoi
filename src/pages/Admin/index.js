import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Table,
  Popconfirm,
  InputNumber,
  Divider,
  message,
  Spin, Modal, Tooltip, Icon, Select,
} from 'antd';
import Chart1 from './charts';
import styles from './origin.less';
import { findDOMNode } from 'react-dom';
import ReactEcharts from 'echarts-for-react';
import btnleft from '../../../images/admin/btnleft.png';
import btnright from '../../../images/admin/btnright.png';
import quanpingbig from '../../../images/admin/full.png';
import findParentNodes from './testfunction';
import findAllself from './findallself';
import findcontent from './findcontent';
import OrgChart from 'react-orgchart';
import './orgchart.less';
import InnerNav from '../Admin/menu';
import ORG from './orgtest';
import ORG2 from './orgtest2';
import $ from 'jquery';
import style from '../Flow/index.less';

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



@connect(({ zuzhi, loading }) => ({
  zuzhi,
  loading: loading.effects['zuzhi/fetch'],
}))
@Form.create()
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      data2: data,
      editingKey: '',
      count: 2,
      btn: btnright,
      rigdis: 'block',
      leftw: 14,
      rightw: 10,
      huibao: '0',
      jiagou: '0',
      newitem: '',
      chartwidth: '70%',
      fangda0: 'block',
      bigbig: quanpingbig,
      loading: false,
      isadd: false,
      visible1: false,
      visible2: false,
      editsid:null,
      zaizhi: 0,
      edits: {
        boss: '',
        dept: "",
        leader: "",
        name: "",
        phone: "",
        pos: "",
      },
      columns : [
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: '所在部门',
          dataIndex: 'dept',
        },
        {
          title: '上级领导姓名',
          dataIndex: 'leader',
        },
        {
          title: '岗位名称',
          dataIndex: 'pos',
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            return   (
              <span>
              <a onClick={() => this.edit(record)}>
                修改
              </a>
              <Divider  type="vertical" />
              <a  onClick={() => this.delite(record)}>
                删除
              </a>
            </span>
              )
          },
        },
      ],
    };

  }

  componentDidMount() {
    const { dispatch } = this.props;

    console.log(window.location.origin);

    dispatch({
      type: 'zuzhi/fetch',
      payload: {
        num: 200,
        page: 1,
      },
      callback: res => {
        console.log(res);
        this.setState({
          data: res.result,
          data2: [res.result[res.result.length - 1]],
        });
      },
    });
  }

  componentDidUpdate() {
    const { zuzhi } = this.props;
    console.log(33333, zuzhi);
    if (zuzhi.data.code !== 0) {
      message.error(zuzhi.data.msg);
    }
  }

  makeTree2 = () => {
    const options2 = {
      data: this.state.datascource2[0], // 数据源
      nodeTitle: 'name',
      nodeContent: 'title',
      collapsed: true,
      //"toggleSiblingsResp": true, // 允许用户收缩展开兄弟节点
      visibleLevel: 10, // 默认展开两级
      pan: true,
      zoominLimit: '14',
      zoomoutLimit: '0.5',
      draggable: true,
      createNode: this.addClick2, // 当渲染节点时添加点击事件
      //nodeTemplate: this.changeclick
    };
    $(this.orgTree2).orgchart(options2);
    $('.orgchart').removeClass('noncollapsable');
  };

  changecharts = e => {
    time = [];
    let temp = findParentNodes(this.state.data2, e.data.name, e.data.leader);
    let q = {
      id: e.data.id,
      parentId: e.data.parentId,
      name: e.data.name,
    };
    time.push(q);

    this.runrun(this.state.data2, temp);
    // console.log(time);
    time.sort(this.cmp);

    var midObj = {};
    for (var i = time.length - 1; i >= 0; i--) {
      var nowPid = time[i].parentId;
      var nowId = time[i].id;
      // 建立当前节点的父节点的children 数组
      if (midObj[nowPid]) {
        midObj[nowPid].push(time[i]);
      } else {
        midObj[nowPid] = [];
        midObj[nowPid].push(time[i]);
      }
      // 将children 放入合适的位置
      if (midObj[nowId]) {
        time[i].children = midObj[nowId];
        delete midObj[nowId];
      }
    }
    this.setState({
      data4: midObj[0],
    });
  };

  runrun = (a, b) => {
    if (b[0]) {
      if (b[0].parentId === 0) {
        let w = {
          id: b[0].id,
          parentId: b[0].parentId,
          name: b[0].name,
        };
        time.push(w);
        return time;
      } else {
        let w = {
          id: b[0].id,
          parentId: b[0].parentId,
          name: b[0].name,
        };
        time.push(w);
        let c = findParentNodes(a, b[0].name, b[0].leader);
        this.runrun(a, c);
      }
    }
  };

  cmp = (a, b) => {
    return a.parentId - b.parentId;
  };

  isEditing = record => record.id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
    if (this.state.isadd) {
      // console.log(555,this.state.data)
      let a = this.state.data;
      a.splice(this.state.data.length - 1, 1);
      // console.log(666,a)
      this.setState({
        data: a,
        isadd: false,
      });
    }
  };

  save(form, key) {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
    const { dispatch } = this.props;
    if (this.state.isadd) {
      console.log('来这里表示添加');
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(row);
        dispatch({
          type: 'zuzhi/add',
          payload: {
            ...row,
            boss: row.leader === '' ? 1 : 0,
          },
        });
        setTimeout(() => {
          dispatch({
            type: 'zuzhi/fetch',
            payload: {
              num: 200,
              page: 1,
            },
          });
        }, 300);

        setTimeout(() => {
          const { zuzhi } = this.props;
          // console.log(zuzhi)
          this.setState({
            data: zuzhi.data.result,
            data2: [zuzhi.data.result[zuzhi.data.result.length - 1]],
          });
        }, 700);

        this.setState({ data: newData, editingKey: '' });
      });
      this.setState({
        isadd: false,
      });
    } else {
      console.log('来这里表示修改');
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.id);

        // newData.push(row);
        console.log('看看参数是什么', newData);
        console.log('看看参数是什么2', row);
        dispatch({
          type: 'zuzhi/update',
          payload: {
            ...row,
            boss: row.leader === '' ? 1 : 0,
            id: this.state.editingKey,
          },
        });

        setTimeout(() => {
          dispatch({
            type: 'zuzhi/fetch',
            payload: {
              num: 200,
              page: 1,
            },
          });
        }, 300);
        setTimeout(() => {
          const { zuzhi } = this.props;
          // console.log(zuzhi)
          this.setState({
            data: zuzhi.data.result,
            data2: [zuzhi.data.result[zuzhi.data.result.length - 1]],
          });
        }, 700);
        this.setState({ data: newData, editingKey: '' });
      });
    }
  }


  queding1 = (e) => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: this.state.editsid!==null? 'zuzhi/update':"zuzhi/add",
          payload: {
            ...values,
            id:this.state.editsid
          },
          callback: res => {
            if (res.code === 0) {
              dispatch({
                type: 'zuzhi/fetch',
                payload: {
                  num: 200,
                  page: 1,
                },
                callback: res2 => {
                  const { zuzhi } = this.props;
                  this.setState({
                    data: res2.result,
                    data2: [res2.result[res2.result.length - 1]],
                    visible1: false,
                  });
                },
              });
            } else {
              message.error(res.msg);
            }

          },
        });
      }
    });
  };

  edit=(key)=> {
    console.log(key);
    this.setState({
      edits:key,
      visible1:true,
      editsid:key.id,
    })
  }

  delite(key) {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
    const { dispatch } = this.props;
    let a;
    a = key.id.toString();
    dispatch({
      type: 'zuzhi/remove',
      payload: {
        id: a,
      },
    });
    setTimeout(() => {
      dispatch({
        type: 'zuzhi/fetch',
        payload: {
          num: 200,
          page: 1,
        },
      });
    }, 300);
    setTimeout(() => {
      const { zuzhi } = this.props;
      // console.log(zuzhi)
      this.setState({
        data: zuzhi.data.result,
        data2: [zuzhi.data.result[zuzhi.data.result.length - 1]],
      });
    }, 700);
  }


  handleModalVisible1 = () => {
    this.setState({
      visible1: false,
    });
  };

  handleAdd = () => {
    this.setState({
      visible1: true,
      editsid:null,
      edits: {
        boss: '',
        dept: "",
        leader: "",
        name: "",
        phone: "",
        pos: "",
      },
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
        chartwidth: '70%',
      });
    }
  };

  changequanping = () => {
    if (this.state.jiagou === '0') {
      // console.log(this.state.fangda0);
      this.setState({
        jiagou: '1',
        fangda0: 'none',
        leftw: 0,
        rightw: 24,
      });
    } else {
      this.setState({
        fangda0: 'block',
        jiagou: '0',
        leftw: 14,
        rightw: 10,
      });
    }
  };

  backindex = () => {
    router.push({
      pathname: '/admin/origin',
    });
  };

  gogogo = () => {
    router.push({
      pathname: '/admin/originnext',
    });
  };

  zaizhi=(e)=>{
    const {dispatch}=this.props
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
    this.setState({
      zaizhi:e
    })

    dispatch({
      type: 'zuzhi/fetch',
      payload: {
        num: 200,
        page: 1,
        exist:e,
      },
      callback: res2 => {
        const { zuzhi } = this.props;
        this.setState({
          data: res2.result,
          data2: [res2.result[res2.result.length - 1]],
          visible1: false,
        });
      },
    });

  }

  render() {
    console.log(this.state.data,44444444444444)
    const{data} =this.state
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div>
        <div className={styles.content}>
          <div style={{ display: 'flex' }}>
            <Button type="primary" style={{ display: this.state.fangda0 }} onClick={this.backindex}>
              返回
            </Button>
            <Button
              type="primary"
              style={{ display: this.state.fangda0, right: '1%', position: 'absolute' }}
              onClick={this.gogogo}
            >
              完成
            </Button>
          </div>

          <Row className={styles.contenner}>
            <Col span={this.state.leftw} style={{ display: this.state.fangda0 }}>


              <div className={styles.zaili}>
                <div  onClick={e=>this.zaizhi(0)}  className={this.state.zaizhi === 0 ? styles.zaizhi : styles.lizhi}>
                  在职
                </div>
                <div onClick={e=>this.zaizhi(1)}  className={this.state.zaizhi === 1 ? styles.zaizhi : styles.lizhi}>
                  离职
                </div>

                <div onClick={this.handleAdd} className={styles.addadd}>
                  添加
                </div>
              </div>

                <Table
                  bordered
                  dataSource={data}
                  columns={this.state.columns}
                  // rowKey={'id'}
                  pagination={{
                    onChange: this.cancel,
                  }}
                />
            </Col>
            <Col
              span={this.state.rightw}
              style={{ borderRight: '1px solid #ddd', position: 'relative', minHeight: '800px' }}
            >
              <div
                className="parent"
                style={{
                  width: this.state.chartwidth,
                  float: 'left',
                  minHeight: '800px',
                  position: 'relative',
                  margin: '0  auto',
                  textAlgin: 'center',
                }}
              >
                <div
                  onClick={this.changequanping}
                  style={{
                    position: 'absolute',
                    right: '24px',
                    top: '24px',
                    cursor: 'pointer',
                    zIndex: '1500000',
                  }}
                >
                  <img src={this.state.bigbig} style={{ width: '30px', height: '30px' }} alt=""/>
                </div>

                <img
                  src={this.state.btn}
                  style={{ position: 'absolute', right: '0', top: '300px', zIndex: '1500000' }}
                  className={styles.btnmenu}
                  onClick={this.changelr}
                  alt=""
                />

                <div>
                  {this.state.loading ? (
                    <Spin tip="正在加载" className={styles.centerjiazai}/>
                  ) : (
                    <ORG orgdata={this.state.data} orgdata2={this.state.data2}/>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: '30%',
                  float: 'left',
                  position: 'relative',
                  borderLeft: '1px solid #ddd',
                  minHeight: '800px',
                  display: this.state.rigdis,
                  padding: '24px',
                }}
              >
                <h3>汇报线</h3>
                <div>
                  {this.state.loading ? (
                    <Spin tip="正在加载" className={styles.centerjiazai}/>
                  ) : (
                    <ORG2 orgdata2={this.state.data2}/>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>






        <Modal
          destroyOnClose
          title="添加人员"
          visible={this.state.visible1}
          onCancel={() => this.handleModalVisible1()}
          onOk={this.queding1}
          zIndex={5000000}
        >
          <div className={styles.tantantan}>
            <Form onSubmit={this.queding1} {...formItemLayout} >
              <Form.Item label="姓名">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      message: '请输入姓名',
                      required: true,
                    },
                  ],
                  initialValue:this.state.edits.name,
                })(
                  <Input placeholder='输入姓名'/>,
                )}
              </Form.Item>
              <Form.Item label="手机号">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      message: '请输入手机号',
                      required: true,
                    },
                    {
                      pattern: /^\d{11}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                  initialValue:this.state.edits.phone,
                })(
                  <Input placeholder='输入手机号'/>,
                )}
              </Form.Item>
              <Form.Item label="部门">
                {getFieldDecorator('dept', {
                  rules: [
                    {
                      message: '请输入部门',
                      required: false,
                    },
                  ],
                  initialValue:this.state.edits.dept,
                })(
                  <Input placeholder='输入部门'/>,
                )}
              </Form.Item>
              <Form.Item label="上级领导姓名">
                {getFieldDecorator('leader', {
                  rules: [
                    {
                      message: '请输入上级领导姓名',
                      required: true,
                    },
                  ],
                  initialValue:this.state.edits.leader,
                })(
                  <Input placeholder='输入上级领导姓名'/>,
                )}
              </Form.Item>
              <Form.Item label="岗位名称">
                {getFieldDecorator('pos', {
                  rules: [
                    {
                      message: '请输入岗位名称',
                      required: true,
                    },
                  ],
                  initialValue:this.state.edits.pos,
                })(
                  <Input placeholder='输入岗位名称'/>,
                )}
              </Form.Item>
              <Form.Item label="密码">
                {getFieldDecorator('passed', {
                  rules: [
                    {
                      message: '请输入密码',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder='输入密码' type={'password'}/>,
                )}
              </Form.Item>

            </Form>
          </div>

        </Modal>
      </div>
    );
  }
}

export default Register;
