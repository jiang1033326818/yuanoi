import React, { Component, PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
// import data from '../Editor/GGEditor/Mind/text2.json';
import { Row, Col, Button, Dropdown, Menu, Form, Select, Radio } from 'antd';
import data2 from '../Editor/GGEditor/mock/worldCup2018';
import styles from '../Editor/GGEditor/Flow/index.less';
import { connect } from 'dva';

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Treemap extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        data: [],
      },
      nowstate: 0,
      basedata: data2.roots,
      primary0: '',
      primary1: 'primary',
      primary2: 'primary',
      cengji: 2,
      btntype: 'bumen',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { chart } = this.props;
    dispatch({
      type: 'chart/fetch',
    });

    this.setState({
      data: chart.bumen,
    });
  }

  componentDidUpdate() {}

  changedata1 = () => {
    const { dispatch } = this.props;
    const { chart } = this.props;

    dispatch({
      type: 'chart/fetch',
    });
    this.setState({
      data: chart.bumen,
      primary0: '',
      primary1: 'primary',
      primary2: 'primary',
      btntype: 'bumen',
    });
  };

  changedata2 = () => {
    const { dispatch } = this.props;
    const { chart } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
    this.setState({
      data: chart.zhiwei,
      primary0: 'primary',
      primary1: '',
      primary2: 'primary',
      btntype: 'zhiwei',
    });
  };

  changedata3 = () => {
    const { dispatch } = this.props;
    const { chart } = this.props;
    dispatch({
      type: 'chart/fetch',
    });
    this.setState({
      data: chart.renyuan,
      primary0: 'primary',
      primary1: 'primary',
      primary2: '',
      btntype: 'renyuan',
    });
  };
  handleSizeChange = e => {
    this.setState({
      cengji: e.target.value,
    });
  };

  getOption = (data0, cengji, num) => {
    return {
      title: {
        text: '',
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '人数: {c}',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: false,
      series: [
        {
          name: '树图',
          type: 'tree',
          orient: 'vertical', // vertical horizontal
          rootLocation: { x: '50%', y: '15%' }, // 根节点位置  {x: 'center',y: 10}
          nodePadding: 20,
          layerPadding: 40,
          initialTreeDepth: cengji,
          symbol: 'rectangle',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside',
              },
              borderWidth: 2,
              borderColor: '#189df3',
              color: '#ffffff',
              textColor: '#189df3',
            },
          },
          lineStyle: {
            color: '#c3c3c3',
            width: 0.5,
            type: 'solid', // 'curve'|'broken'|'solid'|'dotted'|'dashed'
            curveness: 0.8,
          },
          symbolSize: [90, 30],
          data:
            num === 'bumen'
              ? this.props.chart.bumen.data
              : num === 'zhiwei'
              ? this.props.chart.zhiwei.data
              : this.props.chart.renyuan.data,
          // data: this.props.chart.bumen.data,
        },
      ],
    };
  };

  render() {
    return (
      <div className="examples">
        {/*<div className={styles.topbtn}>*/}
        {/*  <Button type={this.state.primary0} className={styles.updata2} onClick={this.changedata1}>*/}
        {/*    部门板*/}
        {/*  </Button>*/}
        {/*  <Button type={this.state.primary1} className={styles.updata2} onClick={this.changedata2}>*/}
        {/*    职位版*/}
        {/*  </Button>*/}
        {/*  <Button type={this.state.primary2} className={styles.updata2} onClick={this.changedata3}>*/}
        {/*    人员版*/}
        {/*  </Button>*/}
        {/*  <div className={styles.livel}>选择层级:</div>*/}
        {/*  <Radio.Group value={this.state.cengji.toString()} onChange={this.handleSizeChange}>*/}
        {/*    <Radio.Button value="1">2</Radio.Button>*/}
        {/*    <Radio.Button value="2">3</Radio.Button>*/}
        {/*    <Radio.Button value="3">4</Radio.Button>*/}
        {/*    <Radio.Button value="4">5</Radio.Button>*/}
        {/*  </Radio.Group>*/}

        {/*</div>*/}
        <div className="parent">
          <ReactEcharts
            option={this.getOption(this.state.datas, this.state.cengji, this.state.btntype)}
            style={{ height: '700px', width: '100%' }}
            className="react_for_echarts"
          />
        </div>
      </div>
    );
  }
}
export default Treemap;
