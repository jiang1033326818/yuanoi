import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Checkbox, Progress } from 'antd';
import Menu from './menu';
import styles from './index.less';
import imageone from '../../../images/admin/blue1.png';
import imagetwo from '../../../images/admin/gray2.png';
import imagethree from '../../../images/admin/gray3.png';

const Search = Input.Search;

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
  };

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  totwo = () => {
    this.setState({
      count: 1,
    });
  };
  toone = () => {
    this.setState({
      count: 0,
    });
  };
  tothree = () => {
    this.setState({
      count: 2,
    });
  };
  tofour = () => {
      this.setState({
        count: 3,
      });
  };
  tohuibaoxian = () => {
    router.push({
      pathname: '/admin/line',
    });
  }

  render() {
    return (
      <div>
        <div className={styles.top}>
          <div className={styles.leftheader}>
            {' '}
            <b>| 管理层面板</b>{' '}
          </div>
          <Menu/>
        </div>

        <div className={styles.content2}>
          <div className={styles.topcon}>
            <img src={imageone} alt=""/>
            <img src={imagetwo} alt=""/>
            <img src={imagethree} alt=""/>
            <div className={styles.sayone}>确认组织架构</div>
            <div className={styles.saytwo}>生成汇报线</div>
            <div className={styles.saythree}>流程部署</div>
          </div>
        </div>

        <div className={styles.bottomwhite}>
          {
            this.state.count === 0 ?
              <div className={styles.divone}>
                <p className={styles.divonep1}>尊敬的{'马跃'} ：</p>

                <p className={styles.divonep2}>为了方便软件使用，我们提出了“三步完成部署”的部署思路，仅需三步，即可完成软件部署，并顺畅使用！</p>

                <p className={styles.divonep3}>——龙神OI系统 </p>

                <Button className={styles.divonebutton} onClick={this.totwo} type='primary'> 确认</Button>
              </div>



              :this.state.count===1?
              <div className={styles.divthree}>
                <div className={styles.bluebox}>
                  <div className={styles.bluetop}>
                    低于50人,推荐使用
                  </div>
                  <div className={styles.bluebottom}>
                    <div className={styles.fast} onClick={this.tothree}>极速导入</div>
                  </div>
                </div>
                <div className={styles.yellowbox}>
                  <div className={styles.yellowtop}>
                    低于50人,推荐使用
                  </div>
                  <div className={styles.yellowbottom}>
                    <div className={styles.yellowfast} onClick={this.tofour}>批量导入</div>
                  </div>
                </div>
              </div>


              :this.state.count===2?
                <div className={styles.divtwo}>
                  <div className={styles.upanddown}>
                    <div className={styles.bigbutton} style={{ lineHeight: '60px' }} onClick={this.downIt}>下载花名册模板</div>
                    <div className={styles.bigbutton} style={{ lineHeight: '25px', paddingTop: '5px' }}
                         onClick={this.downallIt}>下载总分公司花名册模板
                    </div>
                    <div className={styles.bigbutton} style={{ lineHeight: '60px' }} onClick={this.uploadIt}>上传花名册</div>
                  </div>

                  <div className={styles.twobtn}>
                    <Button className={styles.twobtn1} onClick={this.totwo}>返回</Button>
                    <Button type='primary' className={styles.twobtn2} onClick={this.tohuibaoxian}>下一步</Button>
                  </div>
                  <Link to={'/'}>
                    <p className={styles.link}>查看导入后实示效果图</p>
                  </Link>
                </div>
                :
                <div className={styles.divfour}>
                  <Input className={styles.inputs} style={{marginTop:"70px"}} />
                  <br/>
                  <Button type='primary' size="large" className={styles.top30} onClick={this.overIt}> 确定</Button>
                  <br/>
                  <Search
                    placeholder="请填写公司全称,以生成员工注册超链接"
                    enterButton="复制"
                    size="large"
                    className={styles.inputs}
                    onSearch={this.copyIt}
                  />
                  <br/>
                  <Button type='primary' size="large" className={styles.top30} onClick={this.tohuibaoxian}> 下一步</Button>
                  <Link to={"/"}>
                    <p style={{marginTop:"50px" }}>查看导入后实示效果图</p>
                  </Link>
                </div>
          }


        </div>
      </div>
    );
  }
}

export default Register;
