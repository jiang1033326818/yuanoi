import React from 'react';
import style from './Flow.less';

import renflow from '../../../images/flow/renflow.png';
import tiflow from '../../../images/flow/tiflow.png';
import elseflow from '../../../images/flow/elseflow.png';
import caiflow from '../../../images/flow/caiflow.png';
import renflows from '../../../images/flow/renflows.png';
import tiflows from '../../../images/flow/tiflows.png';
import elseflows from '../../../images/flow/elseflows.png';
import caiflows from '../../../images/flow/caiflows.png';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ flow, forms, menu, loading }) => ({
  flow,
  forms,
  menu,
  loading: loading.effects['flow/fetch'],
}))
class FlowLeft extends React.Component {
  state = {
    ind: 0,
    flowList: [
      {
        imgSrc: renflow,
        imgSrcs: renflows,
        con: '人事流程',
      },
      {
        imgSrc: tiflow,
        imgSrcs: tiflows,
        con: '行政流程',
      },
      {
        imgSrc: caiflow,
        imgSrcs: caiflows,
        con: '财务流程',
      },
      {
        imgSrc: elseflow,
        imgSrcs: elseflows,
        con: '其他流程',
      },
    ],
  };

  componentDidMount() {

  }


  choose = (ind) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'forms/gongju3',
      payload: {
        data: ind,
      },
    });

    console.log(ind);
    this.setState({
      ind,
    });

    this.getprolist()


  };






  render() {
    let { flowList, ind } = this.state;
    let {forms}=this.props
    let flows = (
      <div className={style.flows}>
        {
          flowList.map((item, index) => (
            <div key={index} className={forms.modular_id == index ? style.flowItems : style.flowItem}
                 onClick={() => this.choose(index)}>
              <img src={forms.modular_id == index ? item.imgSrcs : item.imgSrc} alt=""/>
              <p>{item.con}</p>
            </div>
          ))
        }
      </div>
    );
    return (
      <div className={style.flowLeft}>
        {flows}
      </div>
    );
  }
}

export default FlowLeft;
