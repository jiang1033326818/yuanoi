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

const Search = Input.Search;

let time2;
@connect(({ userlist, loading }) => ({
  userlist,
  // loading: loading.effects['zuzhi/fetch'],
}))
@Form.create()
class Register extends Component {
  state = {
    chakan: 'block',
  };

  componentWillReceiveProps(nextProps) {

    setTimeout(() => {
      console.log('bbbbbbbbbb', nextProps);

      time2 = this.changecharts(this.props.userlist.data5.result);

      console.log(9994, time2);

      $("#nice").html('')
      this.makeTree1(time2[0]);
    }, 500);

  }

  componentDidMount() {

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



  componentWillUnmount() {}

  addClick = ($node, data) => {
    console.log(4444, data);
  };

  changeclick = (e, c) => {
    if (e.target.className === 'title') {
      console.log('跟title对比');
    }
    let a = e.target.innerHTML.lastIndexOf('>');
    let b = e.target.innerHTML.substring(a + 1, e.target.innerHTML.length);
    console.log(b);
    console.log(e.target.className);
    if (e.target.className === 'title') {
      time2 = [];
      let q = findAllself(this.state.datascource, b);
      let time22 = q[0];
      time2.push(time22);
      let temp = findParentNodes(this.state.datascource, time2[0].name, time2[0].leader);
      this.runrun(this.state.datascource, temp);
      time2.sort(this.cmp);
      var midObj = {};
      for (var i = time2.length - 1; i >= 0; i--) {
        var nowPid = time2[i].parentId;
        var nowId = time2[i].id;
        // 建立当前节点的父节点的children 数组
        if (midObj[nowPid]) {
          midObj[nowPid].push(time2[i]);
        } else {
          midObj[nowPid] = [];
          midObj[nowPid].push(time2[i]);
        }
        // 将children 放入合适的位置
        if (midObj[nowId]) {
          time2[i].children = midObj[nowId];
          delete midObj[nowId];
        }
      }
      //// console.log(3,midObj)
      this.setState({
        datascource2: midObj[0],
        loading: false,
      });
      this.makeTree2();
    }
    if (e.target.className === 'content') {
      time2 = [];
      let q = findcontent(this.state.datascource, b);
      //// console.log("-1",q)
      let time22 = q[0];
      //// console.log("0",time22)
      time2.push(time22);
      let temp = findParentNodes(this.state.datascource, time2[0].name, time2[0].leader);
      //// console.log(1,temp)
      this.runrun(this.state.datascource, temp);
      time2.sort(this.cmp);
      //// console.log(2,time2)
      var midObj = {};
      for (var i = time2.length - 1; i >= 0; i--) {
        var nowPid = time2[i].parentId;
        var nowId = time2[i].id;
        // 建立当前节点的父节点的children 数组
        if (midObj[nowPid]) {
          midObj[nowPid].push(time2[i]);
        } else {
          midObj[nowPid] = [];
          midObj[nowPid].push(time2[i]);
        }
        // 将children 放入合适的位置
        if (midObj[nowId]) {
          time2[i].children = midObj[nowId];
          delete midObj[nowId];
        }
      }
      //// console.log(3,midObj)
      this.setState({
        datascource2: midObj[0],
      });
    }
  };

  toTree = data => {
    let result = [];
    if (!Array.isArray(data)) {
      return result;
    }
    data.forEach(item => {
      delete item.children;
    });
    let map = {};
    data.forEach(item => {
      map[item.name] = item;
    });
    data.forEach(item => {
      let parent = map[item.leader];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    });
    console.log(222222, result);
    return result;
  };

  changecharts = e => {
    let a = this.toTree(e);
    return a;
  };

  runrun = (a, b) => {
    if (b[0]) {
      if (b[0].parentId === 0) {
        let w = {
          id: b[0].id,
          parentId: b[0].parentId,
          name: b[0].name,
        };
        time2.push(w);
        return time2;
      } else {
        let w = {
          id: b[0].id,
          parentId: b[0].parentId,
          name: b[0].name,
        };
        time2.push(w);
        let c = findParentNodes(a, b[0].name, b[0].leader);
        this.runrun(a, c);
      }
    }
  };

  cmp = (a, b) => {
    return a.id - b.id;
  };
  render() {
    console.log(this.props)
    return (
      <div>
        <div
          id={'nice'}
          ref={ref => (this.orgTree = ref)}
          // onClick={this.changeclick}
        />
      </div>
    );
  }
}

export default Register;
