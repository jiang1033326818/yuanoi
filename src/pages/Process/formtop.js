import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input } from 'antd';
import styles from './index.less';


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



  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Register;
