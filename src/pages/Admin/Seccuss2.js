import React from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale/index';
import { Button } from 'antd/lib/index';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from '../User/RegisterResult.less';
import router from 'umi/router';

const actions = (
  <div className={styles.actions} onMouseOver={comecome()}>
    {/*<a href="">*/}
    {/*  <Button size="large" type="primary">*/}
    {/*    <FormattedMessage id="app.register-result.view-mailbox" />*/}
    {/*  </Button>*/}
    {/*</a>*/}
    <Link to="/user/login">
      <Button size="large" type="primary">
        去登陆
      </Button>
    </Link>
  </div>
);

function comecome(){
  setTimeout(()=>{
    router.push({
      pathname: '/user/login',
    });
  },3000)
}



const RegisterResult = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        恭喜您的账户{location.state ? location.state.account : '13546895214'}  修改密码成功
      </div>
    }
    description="系统将自动跳转到: 登录"
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
