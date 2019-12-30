import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Tabs, Table, Divider, DatePicker, Checkbox, Progress, Badge, Modal, Card } from 'antd';
import Menu from './menu';
import styles from './index.less';
import Organization from '../Editor/GGEditor/Mind/index';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Search = Input.Search;
const FormItem = Form.Item;
const { TabPane } = Tabs;
const operations = <Button>Extra Action</Button>;
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
const status2 = ['姜海鹏', '吴志豪', '宋艳艳', '海瑟'];
const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    width:"25%",
  },
  {
    title: '计划和执行进度条',
    dataIndex: 'age',
    key: 'age',
    render: (text, record) => (
      <div>
        <span>计划:</span>
        <Progress percent={record.age} strokeColor={"#52C41A"}  status="active"/>
        <br/>
        <span>执行:</span><Progress percent={record.age2} strokeColor={"#f5222d"} status="active"/>
      </div>
    ),
  },
  {
    title: '负责人',
    dataIndex: 'status',
    key: 'address',
    // filters: [
    //   {
    //     text: status2[0],
    //     value: 0,
    //   },
    //   {
    //     text: status2[1],
    //     value: 1,
    //   },
    //   {
    //     text: status2[2],
    //     value: 2,
    //   },
    //   {
    //     text: status2[3],
    //     value: 3,
    //   },
    // ],
    render(val) {
      return <span>{status2[val]}</span>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: '详情',
    dataIndex: 'address',
    key: 'address2',
    render: (text, record) => (
      <span style={{color:"#189df3", cursor: "pointer"}}>
        详情
      </span>
    ),
  },
  {
    title: '备忘信息',
    dataIndex: 'address',
    key: 'address3',
  },
  {
    title: '',
    key: 'address4',
        render: ( record) => (
            <span >
                <span  style={{color: "#189df3", cursor: "pointer"}}>{"添加"}</span>
                <Divider type="vertical"/>
                <span  style={{color: "#189df3", cursor: "pointer"}}>{"编辑"}</span>
               <Divider type="vertical"/>
                <span  style={{color: "#189df3", cursor: "pointer"}}>{"删除"}</span>
            </span>
        ),
  },
];

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    age2: 45,
    status:1,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        age2: 100,
        status:2,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        age2: 15,
        status:3,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            age2: 39,
            status:0,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        age2: 49,
        status:1,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            age2: 0,
            status:2,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                age2: 12,
                status:0,
                address: 'London No. 3 Lake Park',
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                age2: 56,
                status:1,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    age2: 95,
    status:2,
    address: 'Sidney No. 1 Lake Park',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};


@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
@Form.create()
class Register extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: '模块一', content: '', key: '1' },
      { title: '模块二', content: '', key: '2' },
      {
        title: '模块三',
        content: '',
        key: '3',
        closable: false,
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
      visible2: false,
    };
  }


  componentDidUpdate() {
  }


  addproject=()=>{

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: '', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {

  };

  onChangetime=(e)=>{
    console.log(e)
  }

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };

  handleSubmit2 = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
      }
      this.setState({
        visible2: false,
      });
    });
  };



  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 16 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <div>
        <div className={styles.top}>
          <div className={styles.leftheader}>
            {' '}
            <b>| CEO面板</b>{' '}
          </div>
          <Menu/>
        </div>

        <div className={styles.project}>
          <div>
            <Tabs
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {this.state.panes.map(pane => (
                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                  {pane.content}
                </TabPane>
              ))}
            </Tabs>


            <Table
              columns={columns}
              className={styles.tables}
              dataSource={data}
              // showHeader={false}
            />
            <Button type='primary' className={styles.tableclass} onClick={this.showModal2}>添加事项</Button>

            <Button type='primary' className={styles.tableclass2} onClick={this.addproject}>转换为导图</Button>
            <Button type='primary' className={styles.tableclass3} onClick={this.addproject}>查看时间仓</Button>
          </div>
        </div>



        <Modal
          title="添加事项"
          visible={this.state.visible2}
          // onOk={this.handleOk}
          onCancel={this.handleCancel2}
          footer={null}
          destroyOnClose
        >
          <Form onSubmit={this.handleSubmit2} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="事项名称">
              {getFieldDecorator('proname', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="输入您的事项名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="负责人">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="输入您的负责人姓名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="项目时间">
              {getFieldDecorator('time', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(  <RangePicker onChange={this.onChangetime} />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitting}
                style={{ width: 200 }}
              >
                提交
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Register;
