import React from 'react';
import style from './index.less';

import InnerNav from '../Admin/menu';
import Nav from './FlowNav';
import Flow from './Flow';
import FlowLeft from './FlowLeft';

class Index extends React.Component {
    componentDidMount(){

    }
    render(){
        return (
            <div className={style.maxFlow}>
                <Flow />
                {/* <div className={style.innerTop}>
                    <Nav />
                </div> */}
                {/* <div className={style.allflow}>
                    <div className={style.left}><FlowLeft /></div>
                    <div className={style.right}><Flow /></div>
                </div> */}
            </div>
        )
    }
}

export default Index;
