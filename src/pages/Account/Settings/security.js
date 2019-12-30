import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  Modal,
  DatePicker,
  Select,
  Button,
  Card,
  List,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './join.less';
import router from 'umi/router';

const FormItem = Form.Item;
const operationTabList = [
  {
    key: 'tab1',
    tab: '账号与安全',
  },
];

const operationTabList2 = [
  {
    key: 'tab1',
    tab: '登录设备管理',
  },
];

const operationTabListitem = [
  {
    name: '手机号',
    item: '13333333333',
    key: 'phoneccc',
  },
  {
    name: '密码',
    item: '*********',
    key: 'passwordccc',
  },
];

const operationTabListitem2 = [
  {
    name: '000-PC电脑',
    ke: 'clearpc',
  },
  {
    name: 'huaweiOS',
    ke: 'clearphone',
  },
];

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    visible: false,
    visible2: false,
    count: 0,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

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

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    // Modal.info({
    //   title: formatMessage({ id: 'app.login.verification-code-warning' }),
    // });
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
      }
      this.setState({
        visible: false,
      });
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

  changeit = e => {
    console.log(e);
    console.log(e._targetInst.pendingProps);
    if (e._targetInst.pendingProps.id === 'phoneccc') {
      this.showModal();
    } else {
      this.showModal2();
    }
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { count } = this.state;

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
      <div className={styles.contentsec}>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          activeTabKey="tab1"
          onTabChange={this.onOperationTabChange}
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={operationTabListitem}
            renderItem={item => (
              <List.Item
                actions={[
                  <a id={item.key} onClick={this.changeit}>
                    修改
                  </a>,
                ]}
              >
                <div style={{ width: '50%', textAlign: 'left' }}>{item.name}</div>
                <div style={{ width: '50%', textAlign: 'left' }}>{item.item}</div>
              </List.Item>
            )}
          />
        </Card>

        <Card
          className={styles.tabsCard2}
          bordered={false}
          tabList={operationTabList2}
          activeTabKey="tab1"
          onTabChange={this.onOperationTabChange}
          style={{
            marginTop: 50,
          }}
        >
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={operationTabListitem2}
            renderItem={item => (
              <List.Item
                actions={[
                  <a id={item.key} onClick={this.change}>
                    清除
                  </a>,
                ]}
              >
                <div style={{ width: '100%', textAlign: 'left' }}>{item.name}</div>
              </List.Item>
            )}
          />

          <Modal
            title="修改手机号"
            visible={this.state.visible}
            // onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose
          >
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="手机号">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '手机号',
                    },
                    {
                      pattern: /^\d{11}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                })(<Input placeholder="输入您的手机号" />)}
              </FormItem>

              <FormItem {...formItemLayout} label="验证码">
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'validation.verification-code.required' }),
                        },
                      ],
                    })(<Input placeholder="短信验证码" />)}
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      disabled={count}
                      className={styles.getCaptcha}
                      onClick={this.onGetCaptcha}
                    >
                      {count
                        ? `${count} s`
                        : formatMessage({ id: 'app.register.get-verification-code' })}
                    </Button>
                  </Col>
                </Row>
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

          <Modal
            title="修改手机号"
            visible={this.state.visible2}
            // onOk={this.handleOk}
            onCancel={this.handleCancel2}
            footer={null}
            destroyOnClose
          >
            <Form onSubmit={this.handleSubmit2} style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="原始密码">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '输入正确的原始密码',
                      min: 8,
                    },
                  ],
                })(<Input type="password" placeholder="输入您的当前密码" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="新密码">
                {getFieldDecorator('password2', {
                  rules: [
                    {
                      required: true,
                      message: '新密码不得少于8位',
                      min: 8,
                    },
                  ],
                })(<Input type="password" placeholder="输入您的新密码" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="确认密码">
                {getFieldDecorator('password3', {
                  rules: [
                    {
                      required: true,
                      message: '两次输入不一致',
                      min: 8,
                    },
                  ],
                })(<Input type="password" placeholder="输入您的确认密码" />)}
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
        </Card>
      </div>
    );
  }
}

export default BasicForms;
