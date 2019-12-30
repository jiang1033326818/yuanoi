import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, message, Modal, Select, Row, Col, Popover, Checkbox, Progress } from 'antd';
import Menu from './menu';
import styles from './origin.less';
import img1 from '../../../images/data/bu1.png';
import img2 from '../../../images/data/bu2.png';
import img3 from '../../../images/data/bu3.png';
import img10 from '../../../images/data/bu10.png';
import img20 from '../../../images/data/bu20.png';
import img30 from '../../../images/data/bu30.png';


const Search = Input.Search;
@connect(({ datas, loading }) => ({
  datas,
  submitting: loading.effects['datas/setp'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
    data:{},
  };


  componentDidMount() {
    // 获取当前完成到第几步
    const {dispatch}=this.props
    dispatch({
      type: 'databs/stepa',
      payload: {

      },
      callback:(res)=>{
        console.log(res)
        this.setState({
          data:res.result
        })
      }
    });


  }




  componentDidUpdate() {}

  componentWillUnmount() {}

  gogogo = (e,a) => {
    console.log(e)

    if(e==1){
      if(this.state.data.organization===1){
        if(a.target.innerHTML==='权限部署'){
          router.push({
            pathname: '/admin/jurisdiction',
          });
        }else{
          router.push({
            pathname: '/admin/index',
          });
        }
        console.log()

      }else{

      }

    }else if(e==2){
      if(this.state.data.flow===1){
        router.push({
          pathname: '/flow/index',
        });
      }else{

      }
    }else if(e==3){

      if(this.state.data.functions===1){

       message.error("功能开发中")
      }else{

      }
    }


  };

  toliucheng=()=>{
    router.push({
      pathname:"/flow/index"
    })
  }


  render() {
    let {data}=this.state
    return (
      <div>
        <div className={styles.three}>

          <p className={styles.sanbu}>三步完成OI系统部署</p>

          <div className={styles.one} onClick={e=>this.gogogo(1,event)} >
            <img src={data.organization===1?img10:img1} alt=""/>
            <div className={styles.titles}>
                <h2>组织架构部署</h2>
                <h4>权限部署</h4>
            </div>
          </div>
          <div className={styles.one} onClick={e=>this.gogogo(2,event)}>
            <img src={data.flow===1?img20:img2} alt=""/>
            <div className={styles.titles}>
              <h2>流程/数据部署</h2>
            </div>
            <p>请至少添加7名员工，并完成权限部署，才可 解锁第二步</p>
          </div>
          <div className={styles.one} onClick={e=>this.gogogo(3,event)}>
            <img src={data.functions===1?img30:img3} alt=""/>
            <div className={styles.titles}>
              <h2>功能部署</h2>
            </div>
            <p>请至少启用2个流程，才可解锁第三步</p>
          </div>


        </div>


      </div>
    );
  }
}

export default Register;
