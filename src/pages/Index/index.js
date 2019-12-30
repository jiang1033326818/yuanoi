import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input } from 'antd';
import styles from './index.less';
import Organization from '../Editor/GGEditor/Mind/index';

const Search = Input.Search;
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
  state = {
    count: 0,
  };

  componentDidUpdate() {}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
       首页???????
      </div>
    );
  }
}

export default Register;
