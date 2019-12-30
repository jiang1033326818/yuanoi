import React from 'react';
import { connect } from 'dva';

import style from './index.less';

@connect(({ flow, forms, menu, loading }) => ({
    flow,
    forms,
    menu,
    loading: loading.effects['flow/fetch'],
}))

class FlowNav extends React.Component{
    state={
        list:[
            '人事流程','行政流程','财务流程','其他流程'
        ],
        nowid:1
    }
    choose = ind =>{
        console.log(ind)
        this.setState({
            nowid:ind
        })
        switch (ind*1){
            case 0:

                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }
    choose = (ind) => {
        const { dispatch } = this.props;
        console.log(ind);
        this.setState({
          nowid:ind+1,
        });
        localStorage.setItem("nowid",ind+1)
        dispatch({
          type: 'flow/fetch',
          payload: {
            status: '0',
            page: '1',
            limit: '10',
            modular_id: ind+1,
          },
          callback: res2 => {
            //   console.log(res2,5555)
            let { spareList } = this.state;
            spareList = res2.result ? res2.result : [];
            //   console.log(res2, '1111111111111');
            this.setState({
              spareList,
            });
            this.spareInit(spareList);
            this.setState({
              isReset0: false,
            });
          },
        });
        dispatch({
          type: 'flow/fetch',
          payload: {
            status: '1',
            page: '1',
            limit: '10',
            modular_id: ind+1,
          },
          callback: res3 => {
            let { sureList } = this.state;
            sureList = res3.result ? res3.result : [];
            //   console.log(res3, '2222222222222');
            this.setState({
              sureList,
            });
            this.spareInit(sureList);
            this.setState({
              isReset1: false,
            });
          },
        });
    
    
        //获取龙神oi智能流程
        dispatch({
          type: 'flow/default',
          payload: {
            modular_id: ind+1,
          },
          callback: res4 => {
            console.log(res4);
            this.setState({
              panel: res4.result,
            });
            this.spareInit(this.state.panel);
          },
        });
    
    
    
    };
    render(){
        let {list,nowid} = this.state;
        return (
            <div className={style.nav}>
                {
                    list.map((item,index)=>(
                        <span onClick={()=>this.choose(index)} key={index} className={(nowid-1)==index?style.nowspan:''}>{item}</span>
                    ))
                }
            </div>
        )
    }
}

export default FlowNav