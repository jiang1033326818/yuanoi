import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Tabs, Checkbox, message } from 'antd';
import styles from './Register.less';
import percodeimg2 from '../../../images/percode.png';
import api from '@/utils/request';
import { log } from 'lodash-decorators/utils';
import md5 from 'js-md5';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const { TabPane } = Tabs;


@connect(({ register, messagecode, loading }) => ({
  register,
  messagecode,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
    sendphone: '',
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('phone');
    if (register.status.code === 0) {
      router.push({
        pathname: '/admin/seccuss',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { dispatch } = this.props;
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);

    console.log('??/');
    dispatch({
      type: 'messagecode/send',
      payload: {
        phone: this.state.sendphone,
        behavior: 'register',
      },
    });
    setTimeout(() => {
      const { messagecode } = this.props;
      console.log(messagecode);
      if (messagecode.status.code === 0) {
        message.success('短信发送成功');
      } else {
        message.error(messagecode.status.msg);
      }
    }, 500);


  };

  upDateCode = () => {
    const url = api.baseUrl + '/v1/captcha';
    // const url = window.location.origin+"/api/kaptcha/render";
    var img = document.getElementById('code');
    img.src = url;
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log(values);
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
            type: 'pc',
            record: 0,
            passwd: md5(values.passwd),
          },
        });


        setTimeout(() => {
          const { register } = this.props;
          console.log(register);
          if (register.status.code === 0) {
            message.success('注册成功');
          } else {
            message.error(register.status.msg);
          }
        }, 500);
      }
    });
  };

  handleSubmit2 = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log(values);
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
            type: 'pc',
            record: 1,
            passwd: md5(values.passwd),
          },
        });


        setTimeout(() => {
          const { register } = this.props;
          console.log(register);
          if (register.status.code === 0) {
            message.success('注册成功');
          } else {
            message.error(register.status.msg);
          }
        }, 500);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  callback = (e) => {
    console.log(e);
  };

  savephone = (e) => {
    this.setState({
      sendphone: e.target.value,
    });
  };

  savecode = (e) => {
    this.setState({
      sendcode: e.target.value,
    });
  };

  fuwu=()=>{
    router.push({
      pathname: '/ceo/fuwu',
    });
  }

  yinsi=()=>{
    router.push({
      pathname: '/ceo/yinsi',
    });
  }

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;

    return (
      <div className={styles.box}>
        <div className={styles.main}>
          <Tabs defaultActiveKey="1" tabBarStyle={{
            textAlign: 'center',
          }} onChange={this.callback}>
            <TabPane tab="加入企业" key="1">
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('username', {
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
                  })(
                    <Input size="large" onChange={this.savephone} placeholder='输入您的手机号'/>,
                  )}
                </FormItem>


                <FormItem>
                  <Row gutter={8}>
                    <Col span={16}>
                      {getFieldDecorator('smscode', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'validation.verification-code.required' }),
                          },
                        ],
                      })(
                        <Input
                          size="large"
                          placeholder="短信验证码"
                          onChange={this.savecode}
                        />,
                      )}
                    </Col>
                    <Col span={8}>
                      <Button
                        size="large"
                        type='primary'
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
                <FormItem>
                  {getFieldDecorator('passwd', {
                    rules: [
                      {
                        required: true,
                        message: '请输入至少八位的密码',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder="请输入密码"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('company', {
                    rules: [
                      {
                        required: true,
                        message: '请输入企业全称',
                        min: 2,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入企业全称"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('truename', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的姓名',
                        min: 2,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入您的姓名"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('pos', {
                    rules: [
                      {
                        required: true,
                        message: '请输入岗位名称',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入岗位名称"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('dept', {
                    rules: [
                      {
                        required: false,
                        message: '请输入所在部门',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入所在部门"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('leader', {
                    rules: [
                      {
                        required: false,
                        message: '请输入直属上级姓名',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入直属上级姓名,如果您是公司最高领导人,可以不填"
                    />,
                  )}
                </FormItem>



                <FormItem>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: true,
                        message: '请同意龙神使用协议',
                      },
                    ],
                  })(
                    <Checkbox>
                      我同意龙神 <span style={{color:'#189df3'}} onClick={this.fuwu}>《服务协议》</span>和<span onClick={this.yinsi} style={{color:'#189df3'}}>《隐私协议》</span>
                    </Checkbox>,
                  )}
                </FormItem>


                <FormItem>
                  <Button
                    size="large"
                    loading={submitting}
                    className={styles.submit}
                    type="primary"
                    htmlType="submit"
                  >
                    <FormattedMessage id="app.register.register"/>
                  </Button>
                  {/*<Link className={styles.login} to="/User/Login">*/}
                  {/*  <FormattedMessage id="app.register.sign-in" />*/}
                  {/*</Link>*/}
                </FormItem>
              </Form>
            </TabPane>


            <TabPane tab="创建企业" key="2">
              <Form onSubmit={this.handleSubmit2}>
                <FormItem>
                  {getFieldDecorator('username', {
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
                  })(
                    <Input size="large" onChange={this.savephone} placeholder='输入您的手机号'/>,
                  )}
                </FormItem>


                <FormItem>
                  <Row gutter={8}>
                    <Col span={16}>
                      {getFieldDecorator('smscode', {
                        rules: [
                          {
                            required: true,
                            message: formatMessage({ id: 'validation.verification-code.required' }),
                          },
                        ],
                      })(
                        <Input
                          size="large"
                          placeholder="短信验证码"
                          onChange={this.savecode}
                        />,
                      )}
                    </Col>
                    <Col span={8}>
                      <Button
                        size="large"
                        type='primary'
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
                <FormItem>
                  {getFieldDecorator('passwd', {
                    rules: [
                      {
                        required: true,
                        message: '请输入至少八位的密码',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      type="password"
                      placeholder="请输入密码"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('company', {
                    rules: [
                      {
                        required: true,
                        message: '请输入企业全称',
                        min: 2,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入企业全称"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('truename', {
                    rules: [
                      {
                        required: true,
                        message: '请输入您的姓名',
                        min: 2,
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入您的姓名"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('pos', {
                    rules: [
                      {
                        required: true,
                        message: '请输入岗位名称',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入岗位名称"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('dept', {
                    rules: [
                      {
                        required: false,
                        message: '请输入所在部门',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入所在部门"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('leader', {
                    rules: [
                      {
                        required: false,
                        message: '请输入直属上级姓名',
                      },
                    ],
                  })(
                    <Input
                      size="large"
                      placeholder="请输入直属上级姓名,如果您是公司最高领导人,可以不填"
                    />,
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: true,
                        message: '请同意龙神使用协议',
                      },
                    ],
                  })(
                    <Checkbox>
                      我同意龙神 <span style={{color:'#189df3'}} onClick={this.fuwu}>《服务协议》</span>和<span onClick={this.yinsi} style={{color:'#189df3'}}>《隐私协议》</span>
                    </Checkbox>,
                  )}
                </FormItem>


                <FormItem>
                  <Button
                    size="large"
                    loading={submitting}
                    className={styles.submit}
                    type="primary"
                    htmlType="submit"
                  >
                    <FormattedMessage id="app.register.register"/>
                  </Button>
                  {/*<Link className={styles.login} to="/User/Login">*/}
                  {/*  <FormattedMessage id="app.register.sign-in" />*/}
                  {/*</Link>*/}
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>

    );
  }
}

export default Register;
