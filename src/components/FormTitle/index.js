import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, message } from 'antd';
import styles from './index.less';
import left from '../../../images/flow/lefts.png';


const Search = Input.Search;

@connect(({ forms, loading }) => ({
  forms,
  submitting: loading.effects['forms/fetch'],
}))
@Form.create()
class Register extends Component {
  state = {
    data: 1,
    isSave1: false,
    isSave2: false,
    type: '0',
  };


  componentWillUnmount() {
    let { forms } = this.props;
    console.log(999, forms.ifsave);

    if (forms.ifsave === false) {
      // alert("尚未保存")
    }

  }


  componentDidMount() {
    const { iiiidata, iiiitype } = this.props;
    console.log(this.props);
    this.setState({
      data: iiiidata,
      type: localStorage.getItem('form_type'),
    });
  }


  changekey1 = (e) => {
    this.setState({
      data: 1,
    });
    router.push({
      pathname: '/process/form',
    });
  };

  changekey2 = (e) => {
    this.setState({
      data: 2,
    });
    router.push({
      pathname: '/process/approval',
    });
  };

  changekey3 = (e) => {
    this.setState({
      data: 3,
    });
    router.push({
      pathname: '/process/setup',
    });
  };

  changekey4 = (e) => {
    this.setState({
      data: 4,
    });
    router.push({
      pathname: '/process/setting',
    });
  };

  back = () => {
    router.push({
      pathname: '/flow/index',
    });
  };

  yulan = () => {
    const { dispatch, forms } = this.props;
    if (this.state.data === 1) {
      dispatch({
        type: 'forms/yulankey',
        payload: {
          yulankey: true,
        },
      });
    } else {

    }

  };


  next = () => {
    const { data, isSave1, isSave2 } = this.state;
    let { params, dispatch, tipShow } = this.props;
    if (data === 1) {
      if(this.state.type=='0'){
        router.push({
          pathname: '/process/approval',
        });
      }else {
        router.push({
          pathname: '/process/setup',
        });
      }
    }
    if (data === 2) {
      router.push({
        pathname: '/process/setup',
      });
      // }
    }
    if (data === 3) {
        router.push({
          pathname: '/process/setting',
        });
    }
    if (data === 4) {
      console.log('结束');
      this.props.fabu();
      dispatch({
        type: 'forms/startform',
        payload: {
          form_id: localStorage.getItem('form_id'),
          // panel_id: '3',
          status: '1',
        },
        callback: res => {
          if (res.code === 0) {
          } else {
            if (res.msg === '参数缺失') {
              message.error('请编辑后启用');
            } else {
              message.error(res.msg);
            }
          }
          this.getprolist();
        },
      });
    }

  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.topnav}>

        <div className={styles.leftnav} onClick={this.back}>
          <img src={left} alt=""/>
        </div>

        {
          this.state.type == 0 ?
            <div className={styles.zhongjian}>
              <div onClick={this.changekey1} ref={1} className={data === 1 ? styles.conbox2 : styles.conbox}>
                <p>1</p>
                <span>表单设计</span>
              </div>
              <div onClick={this.changekey2} ref={2} className={data === 2 ? styles.conbox2 : styles.conbox}>
                <p>2</p>
                <span>审批流</span>
              </div>
              <div onClick={this.changekey3} ref={3} className={data === 3 ? styles.conbox2 : styles.conbox}>
                <p>3</p>
                <span>设置</span>
              </div>
              <div onClick={this.changekey4} ref={4} className={data === 4 ? styles.conbox2 : styles.conbox}>
                <p>4</p>
                <span>数据设置</span>
              </div>
            </div> :
            <div className={styles.zhongjian}>
              <div onClick={this.changekey1} ref={1} className={data === 1 ? styles.conbox2 : styles.conbox}>
                <p>1</p>
                <span>表单设计</span>
              </div>
              <div onClick={this.changekey3} ref={2} className={data === 3 ? styles.conbox2 : styles.conbox}>
                <p>2</p>
                <span>设置</span>
              </div>
              <div onClick={this.changekey4} ref={3} className={data === 4 ? styles.conbox2 : styles.conbox}>
                <p>3</p>
                <span>数据设置</span>
              </div>
            </div>
        }


        <div className={styles.rightnav}>
          <div className={styles.rightbtn} onClick={this.yulan}>
            预览
          </div>
          {/*<div className={styles.rightbtn} onClick={this.save}>*/}
          {/*  保存*/}
          {/*</div>*/}


              <div className={styles.rightbtn} onClick={this.next}>
                {data === 4 ? '发布' : '下一步'}
              </div>


        </div>
      </div>
    );
  }
}

export default Register;
