import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Checkbox, Progress } from 'antd';
import Menu from './menu';
import styles from './index.less';
import imageone from '../../../images/admin/onetwothree.png';
import imagetwo from '../../../images/admin/onetwothreefour.png';

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

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div className={styles.top}>
          <div className={styles.leftheader}>
            {' '}
            <b>| 管理层面板</b>{' '}
          </div>
          <Menu />
        </div>

        <div className={styles.content}>
          <p>
            {' '}
            <b>手动导入</b> {'<20人,推荐使用'}{' '}
          </p>
          <div className={styles.boxone}>
            <h3>实施流程</h3>

            <div className={styles.threeimg}>
              <img src={imageone} className={styles.imageone} alt="" />
              <div className={styles.one}>手动添加信息</div>
              <div className={styles.two}>激活员工</div>
              <div className={styles.three}>部署完成</div>
            </div>

            <Button type="primary" size="large" className={styles.top30} onClick={this.toone}>
              {' '}
              进入主页面
            </Button>
            <Link to={'/'}>
              <p>查看导入后实示效果图</p>
            </Link>
          </div>

          <p>
            {' '}
            <b>极速导入</b> {'<50人,推荐使用'}{' '}
          </p>
          <div className={styles.boxone}>
            <h3>实施流程</h3>

            <div className={styles.threeimg}>
              <img src={imagetwo} className={styles.imagetwo} alt="" />
              <div className={styles.five}>邀请员工注册</div>
              <div className={styles.six}>通过员工申请</div>
              <div className={styles.seven}>刷新组织架构</div>
              <div className={styles.eight}>部署完成</div>
            </div>

            <h3 className={styles.top30}>请填写公司全称</h3>
            <Input className={styles.inputs} />
            <br />
            <Button type="primary" size="large" className={styles.top30} onClick={this.overIt}>
              {' '}
              确定
            </Button>
            <br />
            <Search
              placeholder="请填写公司全称,以生成员工注册超链接"
              enterButton="复制"
              size="large"
              className={styles.inputs}
              onSearch={this.copyIt}
            />
            <br />
            <Button type="primary" size="large" className={styles.top30} onClick={this.totwo}>
              {' '}
              完成
            </Button>
            <Link to={'/'}>
              <p>查看导入后实示效果图</p>
            </Link>
          </div>

          <p>
            {' '}
            <b>批量导入</b> {'>50人,推荐使用'}{' '}
          </p>
          <div className={styles.boxone}>
            <h3>实施流程</h3>

            <div className={styles.threeimg}>
              <img src={imagetwo} className={styles.imagetwo} alt="" />
              <div className={styles.five}>下载花名册</div>
              <div className={styles.six}>上传花名册</div>
              <div className={styles.seven}>激活员工</div>
              <div className={styles.eight}>部署完成</div>
            </div>

            <div className={styles.upanddown}>
              <div
                className={styles.bigbutton}
                style={{ lineHeight: '60px' }}
                onClick={this.downIt}
              >
                下载花名册模板
              </div>
              <div
                className={styles.bigbutton}
                style={{ lineHeight: '25px', paddingTop: '5px' }}
                onClick={this.downallIt}
              >
                下载总分公司花名册模板
              </div>
              <div
                className={styles.bigbutton}
                style={{ lineHeight: '60px' }}
                onClick={this.uploadIt}
              >
                上传花名册
              </div>
            </div>
            <Link to={'/'}>
              <p>查看导入后实示效果图</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
