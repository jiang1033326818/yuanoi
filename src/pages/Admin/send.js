import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, message, Checkbox, Progress } from 'antd';
import styles from './send.less';
import copy from 'copy-to-clipboard';


const Search = Input.Search;
const { TextArea } = Input;

@connect(({ user, loading }) => ({
  user,
  submitting: loading.effects['user/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
    message:"复制这段话发送到工作群中。请各位伙伴在企业专链位伙伴www.yuanji.urojfsf.com进行注册。",
  };

  componentDidMount() {
    const {dispatch} =this.props
    dispatch({
      type: 'user/fetchCurrent',
    });
    const {user} =this.props


  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  copy=()=>{
    copy(this.state.message)
    message.success("复制成功")
  }

  set=(e)=>{
    this.setState({
      message:e.target.value
    })
  }

  lastbutton=()=>{
    router.push({
      pathname: '/admin/employees',
    });
  }


  render() {
    const {user}=this.props
    console.log(user)
    return (
      <div>
        <div className={styles.send}>
          <div className={styles.sendtop}>
              邀请成员
          </div>
          <div className={styles.sendbottom}>

            <Row className={styles.bottomone}>
              <Col span={20}>
                <TextArea defaultValue={this.state.message} onChange={this.set}  rows={3} />
              </Col>
              <Col span={4}>
                <div className={styles.copy} onClick={this.copy}>复制</div>
              </Col>


            </Row>
              <Button type='primary' className={styles.lastbutton} onClick={this.lastbutton} >完成</Button>

          </div>

        </div>


      </div>
    );
  }
}

export default Register;
