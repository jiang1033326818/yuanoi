import React from 'react';
import { Row, Col, Button, Dropdown, Menu } from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { MindContextMenu } from '../components/EditorContextMenu';
import { MindToolbar } from '../components/EditorToolbar';
import { MindDetailPanel } from '../components/EditorDetailPanel';
import data2 from '../mock/worldCup2018.json';
import styles from '../Flow/index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import G6 from '@antv/g6';
import Charts from './chart';
import Charts2 from './chart2';
import datanew from './test3.json';
import { connect } from 'dva';

GGEditor.setTrackable(false);


@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class MindPage extends React.Component {
  constructor() {
    super();
    this.state = {
      nowstate: 1,
      basedata: data2.roots,
      primary0: '',
      primary1: 'primary',
      primary2: 'primary',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
    });
    const { chart } = this.props;
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
    cancelAnimationFrame(this.reqRef);
  }

  savedatanow = () => {
    // this.befordata(data.roots.label)
    // console.log(data.roots.label);
    this.setState({
      nowstate: 0,
    });
  };

  loglog = e => {
    console.log(e);
  };

  befordata = e => {
    console.log(e.command);
    if (e.command.page) {
      this.setState({
        basedata: e.command.page._cfg.datas.roots,
      });
    } else if (e.command.snapShot) {
      this.setState({
        basedata: e.command.snapShot.roots,
      });
    }
  };

  updatachart = e => {
    this.setState({
      nowstate: 1,
    });
  };

  afterdata = e => {
    console.log(e.command);
    if (e.command.page) {
      this.setState({
        basedata: e.command.page._cfg.datas.roots,
      });
    } else {
    }
  };

  render() {


    if (this.state.nowstate === 0) {
      return (
        <div>
          {/*<div className={styles.topbtn}>*/}
          {/*  <Button type={this.state.primary0} className={styles.updata2} onClick={this.changedata1}>部门板</Button>*/}
          {/*  <Button type={this.state.primary1} className={styles.updata2} onClick={this.changedata2}>职位版</Button>*/}
          {/*  <Button type={this.state.primary2} className={styles.updata2} onClick={this.changedata3}>人员版</Button>*/}
          {/*  <Dropdown overlay={menu} className={styles.updata2} placement="bottomLeft">*/}
          {/*    <Button>显示层级</Button>*/}
          {/*  </Dropdown>*/}
          {/*</div>*/}

          <Charts2/>

          <Button type="primary" className={styles.updata} onClick={this.updatachart}>
            修改
          </Button>
          <Button type="primary" className={styles.add} onClick={this.addchart}>
            导入
          </Button>
        </div>
      );
    } else {
      return (
        <div
          title={<FormattedMessage id="app.editor.mind.title"/>}
          content={<FormattedMessage id="app.editor.mind.description"/>}
        >
          <GGEditor
            className={styles.editor}
            onAfterCommandExecute={this.afterdata}
            onBeforeCommandExecute={this.befordata}
            onClick={this.loglog}
            Graph={{
              diretion: 'TB',
              Layout: {
                diretion: 'TB',
              },
              layout: {
                diretion: 'TB',
              },
              TreeGraph:{
              diretion: 'TB',
              Layout: {
              diretion: 'TB',
            },
              layout: {
              diretion: 'TB',
            },
            }
            }}
            TreeGraph={{
              diretion: 'TB',
              Layout: {
                diretion: 'TB',
              },
              layout: {
                diretion: 'TB',
              },
            }}
            Layout={{
              diretion: 'TB',
            }}
          >
            <Row type="flex" className={styles.editorHd}>
              <Col span={24}>
                <MindToolbar/>
              </Col>
            </Row>
            <Row type="flex" className={styles.editorBd}>
              <Col span={20} className={styles.editorContent}>
                <Mind
                  data={data2}
                  className={styles.mind}
                  layout={{
                    direction: 'TB',
                  }}
                />
              </Col>
              <Col span={4} className={styles.editorSidebar}>
                <MindDetailPanel/>
                <EditorMinimap/>
              </Col>
            </Row>
            <MindContextMenu/>
          </GGEditor>

          <Button type="primary" className={styles.save} onClick={this.savedatanow}>
            保存修改
          </Button>
        </div>
      );
    }
  }
}

export default MindPage;
