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
  Spin,
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
import ORG from './orgtest'
import ORG2 from './orgtest2'
import $ from 'jquery';



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

const EditableContext = React.createContext();

// @Form.create()
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }

    return <Input />;
  };

  renderCell = form => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      getFieldDecorator,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {form.getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: false,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
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
      data:data,
      data2: data,
      editingKey: '',
      count: 2,
      btn: btnright,
      rigdis: 'block',
      leftw: 24,
      rightw: 14,
      huibao: '0',
      jiagou: '0',
      newitem:'',
      chartwidth: '70%',
      fangda0: 'block',
      bigbig: quanpingbig,
      loading:false,
      isadd:false,
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        editable: true,
        width: 150,
        fixed: 'left',
      },
      {
        title: '所在部门',
        dataIndex: 'dept',
        editable: true,
        width: 150,
      },
      {
        title: '上级领导姓名',
        dataIndex: 'leader',
        editable: true,
      },
      {
        title: '岗位名称',
        dataIndex: 'pos',
        editable: true,
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 120,
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    href="javascript:;"
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record)}>
                修改
              </a>
              <Divider type="vertical" />
              <a disabled={editingKey !== ''} onClick={() => this.delite(record)}>
                删除
              </a>
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'zuzhi/fetch',
    });
    setTimeout(() => {
      const { zuzhi } = this.props;
      console.log(8888,zuzhi)
      this.setState({
        data:zuzhi.data.result,
        data2:[zuzhi.data.result[zuzhi.data.result.length-1]]
      })
    },1000)

  }

  componentDidUpdate() {
    const { zuzhi } = this.props;
    if(zuzhi.data.code!==0){
      message.error(zuzhi.data.msg)
    }

  }

  makeTree2=()=>{
    const options2 = {
      'data': this.state.datascource2[0], // 数据源
      'nodeTitle': 'name',
      'nodeContent': 'title',
      'collapsed': true,
      //"toggleSiblingsResp": true, // 允许用户收缩展开兄弟节点
      'visibleLevel': 10, // 默认展开两级
      pan: true,
      zoominLimit: '14',
      zoomoutLimit: '0.5',
      'draggable': true,
      'createNode': this.addClick2, // 当渲染节点时添加点击事件
      //nodeTemplate: this.changeclick
    };
    $(this.orgTree2).orgchart(options2);
    $('.orgchart').removeClass('noncollapsable');
  }




  changeclick=(e,c)=>{
    this.setState({
      loading:true
    })
    let a =e.target.innerHTML.lastIndexOf(">")
    let b =e.target.innerHTML.substring(a+1,e.target.innerHTML.length)
    if(e.target.className==="title"){
      time = [];
      let q = findAllself(this.state.datascource, b);
      //// console.log("-1",q)
      let time2=q[0]
      //// console.log("0",time2)
      time.push(time2)
      let temp = findParentNodes(this.state.datascource, time[0].name, time[0].leader);
      // console.log(1,temp)
      this.runrun(this.state.datascource, temp);
      time.sort(this.cmp);
      //// console.log(2,time)
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
      //// console.log(3,midObj)
      this.setState({
        datascource2: midObj[0],
        loading:false,
      });
      this.makeTree2()
    }
    if(e.target.className==="content"){
      time = [];
      let q = findcontent(this.state.datascource, b);
      //// console.log("-1",q)
      let time2=q[0]
      //// console.log("0",time2)
      time.push(time2)
      let temp = findParentNodes(this.state.datascource, time[0].name, time[0].leader);
      //// console.log(1,temp)
      this.runrun(this.state.datascource, temp);
      time.sort(this.cmp);
      //// console.log(2,time)
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
      //// console.log(3,midObj)
      this.setState({
        datascource2: midObj[0],
      });
    }
  }

  changecharts = e => {
    time = [];
    let temp = findParentNodes(this.state.data2, e.datas.name, e.datas.leader);
    let q = {
      id: e.datas.id,
      parentId: e.datas.parentId,
      name: e.datas.name,
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
    if(this.state.isadd){
      // console.log(555,this.state.data)
      let a=this.state.datas
      a.splice(this.state.datas.length-1,1)
      // console.log(666,a)
      this.setState({
        data:a,
        isadd:false
      })
    }
  };

  save(form, key) {
    this.setState({
      loading:true
    })
    setTimeout(() => {
      this.setState({
        loading:false
      })
    },500)
    const { dispatch } = this.props;
    if(this.state.isadd){
      console.log("来这里表示添加")
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.datas];
        const index = newData.findIndex(item => key === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(row)
        dispatch({
          type: 'zuzhi/add',
          payload:{
            ...row,
            boss:row.leader===''?1:0
          }
        });
        setTimeout(() => {
          dispatch({
            type: 'zuzhi/fetch',
            payload:{
            }
          });
        },300)

        setTimeout(() => {
          const { zuzhi } = this.props;
          // console.log(zuzhi)
          this.setState({
            data:zuzhi.data.result,
            data2:[zuzhi.data.result[zuzhi.data.result.length-1]]
          })
        },700)


        this.setState({ data: newData, editingKey: '' });

      });
      this.setState({
        isadd:false,
      })
    }else{
      console.log("来这里表示修改")
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.datas];
        const index = newData.findIndex(item => key === item.id);

        // newData.push(row);
        console.log("看看参数是什么",newData)
        console.log("看看参数是什么2",row)
        dispatch({
          type: 'zuzhi/update',
          payload:{
            ...row,
            boss:row.leader===''?1:0,
            id:this.state.editingKey
          }
        });

        setTimeout(() => {
          dispatch({
            type: 'zuzhi/fetch',
            payload:{
              num:200,
              page:1,
            },
          });
        },300)
        setTimeout(() => {
          const { zuzhi } = this.props;
          // console.log(zuzhi)
          this.setState({
            data:zuzhi.data.result,
            data2:[zuzhi.data.result[zuzhi.data.result.length-1]]
          })
        },700)
        this.setState({ data: newData, editingKey: '' });

      });
    }

  }

  edit(key) {
    console.log(key)
    this.setState({ editingKey: key.id });
  }

  delite(key) {
    this.setState({
      loading:true
    })
    setTimeout(() => {
      this.setState({
        loading:false
      })
    },500)
    const { dispatch } = this.props;
    let a=[]
    a[0]=key.id.toString()
    dispatch({
      type: 'zuzhi/remove',
      payload:{
        id:a
      }
    });
    setTimeout(() => {
      dispatch({
        type: 'zuzhi/fetch',
        payload:{
          num:200,
          page:1,
        },
      });
    },300)
    setTimeout(() => {
      const { zuzhi } = this.props;
      // console.log(zuzhi)
      this.setState({
        data:zuzhi.data.result,
        data2:[zuzhi.data.result[zuzhi.data.result.length-1]]
      })
    },700)
  }



  handleAdd = () => {
    const { dispatch } = this.props;
    this.setState({
      loading:true
    })
    // setTimeout(() => {
    //   this.setState({
    //     loading:false
    //   })
    // },500)
    // setTimeout(() => {
    //   dispatch({
    //     type: 'zuzhi/fetch',
    //     payload:{
    //     }
    //   });
    // },300)
    //
    // setTimeout(() => {
    //   const { zuzhi } = this.props;
    //   // console.log(zuzhi)
    //   this.setState({
    //     data:zuzhi.data.result,
    //     // data:[],
    //   })
    // },700)




    const { data } = this.state;
    const count=Math.floor(Math.random()*(9999-1111))+1111
    const newData = {
      id: count,
      name: `输入姓名`,
      dept: "输入部门",
      leader: `输入上级领导姓名`,
      pos: `输入岗位名称`,
      phone: `输入手机号码`,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
      newitem:newData,
      editingKey: count,
      isadd:true
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
      // console.log(this.state.fangda0);
      this.setState({
        fangda0: 'block',
        jiagou: '0',
        leftw: 24,
        rightw: 14,
      });
    }
  };

  backindex = () => {
    router.push({
      pathname: '/admin/indexall',
    });
  };

  gogogo = () => {
    router.push({
      pathname: '/admin/index',
    });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    let onEvents = {
      click: this.changecharts,
      legendselectchanged: this.onChartLegendselectchanged,
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    const MyNodeComponent = ({ node }) => {
      return (
        <div className="initechNode" onClick={() => alert('Hi my real name is: ' + node.actor)}>
          {node.name}
        </div>
      );
    };
    return (
      <div>
        <div className={styles.content}>
          <div style={{ display: 'flex' }}>
            <Button type="primary" style={{ display: this.state.fangda0 }} onClick={this.backindex}>
              组织架构图
            </Button>
            <Button
              type="primary"
              style={{ display: this.state.fangda0, right: '1%', position: 'absolute' }}
              onClick={this.gogogo}
            >
              新增修改
            </Button>
          </div>

          <Row className={styles.contenner}>
            <Col span={this.state.leftw} style={{ display: this.state.fangda0 }}>
              <Button
                type="dashed"
                style={{ width: '100%', marginBottom: 8 }}
                icon="plus"
                onClick={this.handleAdd}
              >
                添加
              </Button>
              <EditableContext.Provider value={this.props.form}>
                <Table
                  components={components}
                  bordered
                  dataSource={this.state.datas}
                  columns={columns}
                  rowClassName="editable-row"
                  scroll={{ x: 1300 }}
                  rowKey={'id'}
                  childrenColumnName={"aaa"}
                  pagination={{
                    onChange: this.cancel,
                  }}
                />
              </EditableContext.Provider>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default Register;
