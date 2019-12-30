import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Checkbox, Progress } from 'antd';
import Menu from './menu';
import styles from './origin.less';
import imageone from '../../../images/admin/head.png';
import imagetwo from '../../../images/admin/heads.png';
import imagethree from '../../../images/admin/book.png';

const Search = Input.Search;
@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
  };

  componentDidMount() {

  }



  toindex = () => {
    router.push({
      pathname: '/admin/index',
    });
  };

  toemploy = () => {
    router.push({
      pathname: '/admin/send',
    });
  };

  toexcel = () => {
    router.push({
      pathname: '/admin/excel',
    });
  };

  render() {
    return (
      <div>
        <div className={styles.three2}>
          <h2>请选择组织架构部署方式</h2>
          <div className={styles.maxbox}>
            <div className={styles.boxbox} onClick={this.toindex}>
              <img src={imageone} alt="" />
              <Button style={{border:'1px solid #189DF3',color:'#189DF3'}} type="default">自己填写</Button>
            </div>
            <div className={styles.boxbox} onClick={this.toemploy}>
              <img src={imagetwo} alt="" />
              <Button style={{border:'1px solid #189DF3',color:'#189DF3'}} type="default">让员工填写</Button>
            </div>
            <div className={styles.boxbox} onClick={this.toexcel}>
              <img src={imagethree} alt="" />
              <Button style={{border:'1px solid #189DF3',color:'#189DF3'}} type="default">花名册导入</Button>
            </div>
          </div>
        </div>
        <div className={styles.clear} />

        <Button
          type="primary"
          onClick={this.toindex}
          style={{ display: this.state.chakan, margin: '50px  auto' }}
        >
          查看组织架构
        </Button>
      </div>
    );
  }
}

export default Register;
