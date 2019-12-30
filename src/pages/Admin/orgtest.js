import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Checkbox, Progress, message } from 'antd';
import Menu from './menu';
import styles from './origin.less';
import imageone from '../../../images/admin/head.png';
import imagetwo from '../../../images/admin/heads.png';
import imagethree from '../../../images/admin/book.png';
import $ from 'jquery';
import 'orgchart';
import 'orgchart/dist/css/jquery.orgchart.css';
import findParentNodes from './testfunction';
import findAllself from './findallself';
import findcontent from './findcontent';
import { log } from 'lodash-decorators/utils';

const Search = Input.Search;

let time;
let time2;

@connect(({ userlist, forms }) => ({
  userlist,
  forms,
  // loading: loading.effects['zuzhi/fetch'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
    datascource: '',
    count: 0,
  };

  componentDidMount() {

    setTimeout(() => {
      if (this.state.count === 0) {
        let i = this.state.count + 1;
        console.log('aaaaaaaaaaaaaaaaaaaaa', this.props);
        time = this.changecharts(this.props.orgdata);
        this.setState({
          datascource: this.props.orgdata,
        });
        time2 = this.props.orgdata2;

        console.log('heiheihei', time);
        this.setState({
          count: i,
        });

          console.log(this.props);
          this.makeTree1(time[0]);



      } else {

      }
    },500)
  }





  makeTree1 = datas => {
    const options = {
      data: datas, // 数据源
      nodeTitle: 'name',
      nodeContent: 'pos',
      collapsed: true,
      //"toggleSiblingsResp": true, // 允许用户收缩展开兄弟节点
      visibleLevel: 10, // 默认展开两级
      pan: true,
      zoominLimit: '14',
      zoomoutLimit: '0.5',
      draggable: true,
      createNode: this.addClick, // 当渲染节点时添加点击事件
      //nodeTemplate: this.changeclick
    };
    $(this.orgTree).orgchart(options);
    $('.orgchart').removeClass('noncollapsable');
  };


  componentWillUnmount() {
  }

  addClick = ($node, data) => {
  };

  changeclick = (e, c) => {
    const { dispatch } = this.props;

    let a = e.target.innerHTML.lastIndexOf('>');
    let b = e.target.innerHTML.substring(a + 1, e.target.innerHTML.length);
    if (e.target.className === 'title') {
      time = [];
      let q = findAllself(this.state.datascource, b);

      console.log(e, 77777);
      console.log(q, 66666);
      dispatch({
        type: 'userlist/huibaoxian',
        payload: {
          member_id: q[0].id,
        },
        callback: res => {
          console.log(9999, res);
        },
      });
      // dispatch({
      //   type: 'forms/jiehe',
      //   payload:{
      //     user_id:q[0].id,
      //     rule_id:this.props.forms.rule_id
      //   },
      //   callback: res => {
      //     dispatch({
      //       type: 'forms/gongju',
      //       payload: {
      //         data:{
      //           content:res.result
      //         }
      //       },
      //     });
      //   },
      // });
    }
    if (e.target.className === 'content') {
      time = [];
      let q = findcontent(this.state.datascource, b);
      dispatch({
        type: 'userlist/huibaoxian',
        payload: {
          member_id: q[0].id,
        },
        callback: res => {
          console.log(9999, res);
        },
      });

      // dispatch({
      //   type: 'forms/jiehe',
      //   payload:{
      //     user_id:q[0].id,
      //     rule_id:this.props.forms.rule_id
      //   },
      //   callback: res => {
      //     dispatch({
      //       type: 'forms/gongju',
      //       payload: {
      //         data:{
      //           content:res.result
      //         }
      //       },
      //     });
      //   },
      // });

    }
  };

  toTree = data => {
    //没有父节点的数据
    let parents = data.filter(value => value.leader == '_' || value.leader == null);

    //有父节点的数据
    let children = data.filter(value => value.leader !== 'undefined' && value.leader != null);

    //定义转换方法的具体实现
    let translator = (parents, children) => {
      //遍历父节点数据
      parents.forEach(parent => {
        //遍历子节点数据
        children.forEach((current, index) => {
          //此时找到父节点对应的一个子节点
          if (current.leader === parent.name) {
            //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
            let temp = JSON.parse(JSON.stringify(children));
            //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
            temp.splice(index, 1);
            //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
            translator([current], temp);
            //把找到子节点放入父节点的children属性中
            typeof parent.children !== 'undefined'
              ? parent.children.push(current)
              : (parent.children = [current]);
          }
        });
      });
    };

    //调用转换方法
    translator(parents, children);

    //返回最终的结果
    return parents;
  };

  changecharts = e => {
    let a = this.toTree(e);
    return a;
  };

  dbclick = e => {
    // console.log(e.target)
  };

  runrun = (a, b) => {
    if (b[0]) {
      if (b[0].leader === '_') {
        let w = {
          id: b[0].id,
          title: b[0].title,
          name: b[0].name,
          leader: b[0].leader,
          dept: b[0].dept,
          phone: b[0].phone,
          pos: b[0].pos,
          relationship: b[0].relationship,
        };
        time.push(w);
        return time;
      } else {
        let w = {
          id: b[0].id,
          title: b[0].title,
          name: b[0].name,
          leader: b[0].leader,
          dept: b[0].dept,
          phone: b[0].phone,
          pos: b[0].pos,
          relationship: b[0].relationship,
        };
        time.push(w);
        let c = findParentNodes(a, b[0].name, b[0].leader);
        this.runrun(a, c);
      }
    }
  };

  cmp = (a, b) => {
    return a.id - b.id;
  };

  render() {

    return (
      <div  style={{margin: '0 auto'}}>
        <div
          ref={ref => (this.orgTree = ref)}
          onClick={this.changeclick}
          onDoubleClick={this.dbclick}
          style={{margin: '0 auto'}}
        />
      </div>
    );
  }
}

export default Register;
