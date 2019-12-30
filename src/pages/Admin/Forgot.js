import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover,Checkbox, Progress } from 'antd';
import styles from './forgot.less';
import percodeimg2 from '../../../images/percode.png';

const FormItem = Form.Item;


const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
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
  };

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('phone');
    // if (register.status === 'ok') {
    //   router.push({
    //     pathname: '/admin/seccuss',
    //     state: {
    //       account,
    //     },
    //   });
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
      console.log(values)

      if (!err) {
        const { prefix } = this.state;
        router.push({
          pathname: '/admin/forgot-seccuss',
        });
        dispatch({
          type: 'register/submit',
          payload: {
            ...values,
            prefix,
          },
        });
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

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          使用手机找回密码
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: "手机号",
                },
                {
                  pattern: /^\d{11}$/,
                  message: "请输入正确的手机号",
                },
              ],
            })(
              <Input size="large" placeholder='输入您的手机号' />
            )}
          </FormItem>

          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('imgcaptcha', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.verification-code.required' }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="图形验证码"
                  />
                )}
              </Col>

              <img className={styles.percodes}  src={percodeimg2} alt="" />

            </Row>
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
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
                  />
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
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: "请输入至少八位的密码",
                  min: 8
                },
                // {
                //   validator: this.checkConfirm,
                // },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder="请输入密码"
              />
            )}
          </FormItem>

          {/*<FormItem>*/}
          {/*  {getFieldDecorator('agreement', {*/}
          {/*    valuePropName: 'checked',*/}
          {/*    rules: [*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*        message:"请同意龙神使用协议",*/}
          {/*      },*/}
          {/*      // {*/}
          {/*      //   validator: this.checkConfirm,*/}
          {/*      // },*/}
          {/*    ],*/}
          {/*  })(*/}
          {/*    <Checkbox>*/}
          {/*      我同意 <a href="">神龙oi使用协议</a>*/}
          {/*    </Checkbox>,*/}
          {/*  )}*/}
          {/*</FormItem>*/}


          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
           提交
            </Button>
            {/*<Link className={styles.login} to="/User/Login">*/}
            {/*  <FormattedMessage id="app.register.sign-in" />*/}
            {/*</Link>*/}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Register;
