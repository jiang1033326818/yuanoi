import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Checkbox, Progress } from 'antd';
import Menu from './menu';
import styles from './origin.less';
import imageone from '../../../images/admin/download.png';
import imagetwo from '../../../images/admin/upload.png';
import imagethree from '../../../images/admin/book.png';
import moban from '../../../images/file/花名册模板.xls'

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

  componentDidUpdate() {}

  componentWillUnmount() {}

  toindex = () => {
    router.push({
      pathname: '/admin/index',
    });
  };

  toemploy = () => {
    router.push({
      pathname: '/admin/employ',
    });
  };

  toexcel = () => {
    router.push({
      pathname: '/admin/excel',
    });
  };

  downloadmb=()=>{
    window.location.href=moban;
  }

  render() {
    return (
      <div>
        <div className={styles.excel}>

            <div className={styles.boxbox2} onClick={this.downloadmb}>
              <img src={imageone} alt=""/>
              <p>下载花名册模板</p>
            </div>


          <div className={styles.boxbox3}>
            <img src={imagetwo} alt=""/>
            <p>上传花名册</p>
          </div>
        </div>


      </div>
    );
  }
}

export default Register;
