import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Modal, Icon, message } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import sha1 from './sha1'
import md5 from 'js-md5'
import percodeimg from '../../../images/percode.png';


const { Tab, UserName, Password, Mobile, Captcha, Submit, Percode } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  componentWillUnmount() {
    // location.reload()
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);

          Modal.info({
            title: formatMessage({ id: 'app.login.verification-code-warning' }),
          });
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      console.log(111,md5(values.password+parseInt(new Date().getTime()/1000)))
      dispatch({
        type: 'login/login',
        payload: {
          type:"pc",
          username:values.userName,
          ts: parseInt(new Date().getTime()/1000),
          passwd:sha1(md5(values.password)+parseInt(new Date().getTime()/1000))
        },
      });
      dispatch({
        type: 'menu/checkmianban',
        payload: {
          index: 0,
        },
      });

      setTimeout(() => {
        const { login } = this.props;
        console.log(login)
        if(login.status.code){
          if (login.status.code === 0) {
            localStorage.setItem("zhanghao",values.userName)
            localStorage.setItem("mima",values.password)
            message.success('登录成功');
          }
          else {
            message.error(login.status.msg);
          }
        }

      },500)


    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              defaultValue={localStorage.getItem("zhanghao")}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              defaultValue={localStorage.getItem("mima")}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />

            {/*<Percode*/}
            {/*  className={styles.percode}*/}
            {/*  name="percode"*/}
            {/*  placeholder={`${formatMessage({ id: 'app.login.percode' })}`}*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: false,*/}
            {/*      message: '请输入验证码',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*/>*/}
          </Tab>
          {/*<img src={percodeimg} className={styles.leftimg} alt="" />*/}

          {/*<Tab key="mobile"  disabled  tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>*/}
          {/*  {login.status === 'error' &&*/}
          {/*    login.type === 'mobile' &&*/}
          {/*    !submitting &&*/}
          {/*    this.renderMessage(*/}
          {/*      formatMessage({ id: 'app.login.message-invalid-verification-code' })*/}
          {/*    )}*/}
          {/*  <Mobile*/}
          {/*    name="mobile"*/}
          {/*    placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}*/}
          {/*    rules={[*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*        message: formatMessage({ id: 'validation.phone-number.required' }),*/}
          {/*      },*/}
          {/*      {*/}
          {/*        pattern: /^1\d{10}$/,*/}
          {/*        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*  <Captcha*/}
          {/*    name="captcha"*/}
          {/*    placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}*/}
          {/*    countDown={120}*/}
          {/*    onGetCaptcha={this.onGetCaptcha}*/}
          {/*    getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}*/}
          {/*    getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}*/}
          {/*    rules={[*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*        message: formatMessage({ id: 'validation.verification-code.required' }),*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  />*/}
          {/*</Tab>*/}

          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>

            <Link to="/process/forgot" style={{ float: 'right' }}>
              <FormattedMessage id="app.login.forgot-password" />
            </Link>
          </div>
          {/*<div className={styles.other}>*/}
          {/*  <FormattedMessage id="app.login.sign-in-with" />*/}
          {/*  <Icon type="alipay-circle" className={styles.icon} theme="outlined" />*/}
          {/*  <Icon type="taobao-circle" className={styles.icon} theme="outlined" />*/}
          {/*  <Icon type="weibo-circle" className={styles.icon} theme="outlined" />*/}
          {/*  <Link className={styles.register} to="/user/register">*/}
          {/*    <FormattedMessage id="app.login.signup" />*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </Login>
      </div>
    );
  }
}

export default LoginPage;
