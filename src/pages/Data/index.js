import React, { Component, PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  Menu,
  Form,
  Select,
  Radio,
  Modal,
  Input,
  Tooltip,
  Icon,
  Table,
  InputNumber,
  message,
} from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import Titles from '../../components/FormTitle/index';
import shujukuai from '../../../images/data/shujukuai.png';
import leidatu from '../../../images/data/leidatu.png';
import bingzhuangtu from '../../../images/data/bingzhuangtu.png';
import bingzhuangtu2 from '../../../images/data/bingzhuangtu2.png';
import tiaoxingtu from '../../../images/data/tiaoxingtu.png';
import tiaoxingtu2 from '../../../images/data/tiaoxingtu2.png';
import yibiaopan from '../../../images/data/yibiaopan.png';
import yuanhuantu from '../../../images/data/yuanhuantu.png';
import yuanhuantu2 from '../../../images/data/yuanhuantu2.png';
import zhexiantu from '../../../images/data/zhexiantu.png';
import zhuxingtu from '../../../images/data/zhuxingtu.png';
import zhuxingtu2 from '../../../images/data/zhuxingtu2.png';
import router from 'umi/router';
import success from '../../../images/flow/success.png';
import md5 from 'js-md5';


const FormItem = Form.Item;
const { Option } = Select;

var data = genData(50);

function genData(count) {
  var nameList = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危',
  ];
  var legendData = [];
  var seriesData = [];
  var selected = {};
  for (var i = 0; i < 5; i++) {
    name = Math.random() > 0.65
      ? makeWord(4, 1) + '·' + makeWord(3, 0)
      : makeWord(2, 1);
    legendData.push(name);
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000),
    });
    selected[name] = i < 6;
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected,
  };

  function makeWord(max, min) {
    var nameLen = Math.ceil(Math.random() * max + min);
    var name = [];
    for (var i = 0; i < nameLen; i++) {
      name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
    }
    return name.join('');
  }
}





@connect(({ databs,flow, loading }) => ({
  databs,
  flow,
  loading: loading.effects['databs/fetch'],
}))
@Form.create()
class Treemap extends Component {
  constructor() {
    super();
    this.state = {
      showtk: 'none',
      weidu: [
        {
          name: '年龄',
          value: '1',
        },
        {
          name: '公司信息',
          value: '2',
        },
        {
          name: '应收金额',
          value: '3',
        },
        {
          name: '工资',
          value: '4',
        },
      ],
      sjtype: [
        {
          img: shujukuai,
          title: '数据块',
        },
        {
          img: bingzhuangtu,
          title: '饼状图',
        },
        {
          img: yuanhuantu,
          title: '圆环图',
        },
        {
          img: zhuxingtu,
          title: '柱状图',
        },
        {
          img: tiaoxingtu,
          title: '条形图',
        },
        {
          img: zhexiantu,
          title: '折线图',
        },
        {
          img: yibiaopan,
          title: '仪表盘',
        },
        {
          img: leidatu,
          title: '雷达图',
        },
      ],
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      isfubu: false,
      data: [
        {
          content:[[]],
        }
      ],
      data2: [
        {
          content:[[]],
        }
      ],
      shujuyuan:[],
      weiwei:[],
      form_content_id:0,
      type:0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { chart } = this.props;
    this.getbegindata();
  }


  // 获取初始数据
  getbegindata = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'databs/fetch',
      payload: {
        form_id: localStorage.getItem('form_id'),
      },
      callback: res => {
        console.log(res);
        let myca=res.result
        for(let i in res.result){
          myca[i].btnnow=0
          myca[i].tuxingdata=[]
          myca[i].tuxingdata2={
            heng:[0],
            shu:[0],
          }

        }
        this.setState({
          data: myca,
        });
      },
    });


    // 然后获取一下新添加的数据
    dispatch({
      type: 'databs/tututu',
      payload: {
        form_id:localStorage.getItem("form_id")
      },
      callback: res2 => {
        console.log(res2)
        this.setState({
          data2:res2.result
        })
      },
    });

    // 顺便获取一下数据源
    dispatch({
      type: 'flow/fetch',
      payload: {
        limit: "10",
        modular_id: localStorage.getItem("modular_id"),
        page: "1",
        status: "1",
      },
      callback: res => {
        console.log(res);
        this.setState({
          shujuyuan:res.result,
          form_content_id:res.result[0].form_id
        })
        dispatch({
          type: 'databs/datayuan',
          payload: {
            form_id:res.result[0].form_id
          },
          callback: res2 => {
            console.log(res2);
            this.setState({
              weiwei:res2.result
            })
          },
        });

      },
    });
  };


  getOption = (type, title,data) => {
    return {
      title: {
        text: '',
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
        },
        show:false,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: title==="柱状图"? 'category':"value",
          data: data.heng,
          axisTick: {
            alignWithLabel: true,
          },
          show:false,
        },

      ],
      yAxis: [
        {
          type: title==="柱状图"?'value':"category",
          show:false,
        },
      ],
      series: [
        {
          type:type,
          barWidth: '60%',
          data: data.shu,
        },
      ],
    };
  };

  getOption2 = (type, title,data) => {
    return {
      title: {
        text: '',
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      // tooltip: {
      //   trigger: 'item',
      //   formatter: '{a} <br/>{b} : {c} ({d}%)',
      // },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  };

  getOption3 = (type, title) => {
    return {
      title: {
        text: title,
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      legend: {
        data: ['单选', '多选', '数字'],
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '姓名',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml',
          },
        },
        {
          type: 'value',
          name: '年龄',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C',
          },
        },
      ],
      series: [
        {
          name: '时间',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        },
        {
          name: '姓名',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: '年龄',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
        },
      ],
    };
  };

  getOption4 = (type, title) => {
    return {
      title: {
        text: title,
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
  };

  getOption5 = (type, title) => {
    return {
      title: {
        text: title,
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: '业务指标',
          type: type,
          detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '完成率' }],
        },
      ],
    };
  };

  getOption6 = (type, title,data) => {
    return {
      title: {
        text: '',
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: [],
        show:false,
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: data,
        },
      ],
    };
  };

  getOption7 = (type, title) => {
    return {
      title: {
        text: '',
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['2011年', '2012年'],
        show:false,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        show:false,
      },
      yAxis: {
        type: 'category',
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
        show:false,
      },
      series: [
        {
          name: '2011年',
          type: 'bar',
          data: [18203, 23489, 29034, 104970, 131744, 630230],
        },
      ],
    };
  };

  getOption8 = (type, title) => {
    return {
      title: {
        text: title,
      },
      color: ['#189df3', '#5bc289', '#f1b534', '#f38484', '#5968d7'],
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        indicator: [
          { name: '销售（sales）', max: 6500 },
          { name: '管理（Administration）', max: 16000 },
          { name: '信息技术（Information Techology）', max: 30000 },
          { name: '客服（Customer Support）', max: 38000 },
          { name: '研发（Development）', max: 52000 },
          { name: '市场（Marketing）', max: 25000 },
        ],
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配（Allocated Budget）',
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销（Actual Spending）',
          },
        ],
      }],
    };
  };


  allClick = (e) => {
    if (e.target.className === 'antd-pro-pages-data-index-xuanze2' || e.target.className === 'antd-pro-pages-data-index-xuanze20') {

    } else {
      this.setState({
        showtk: 'none',
      });
    }
  };

  showss = (e) => {
    this.setState({
      showtk: 'block',
    });
  };

  //弹开新建的各个弹窗
  plusplus = (e, a) => {
    if (a == 0) {
      this.setState({
        visible3: true,
        type:a,
      });
    } else if (a == 6) {
      this.setState({
        visible2: true,
        type:a,
      });
    } else {
      this.setState({
        visible1: true,
        type:a,
      });
    }
  };


  handleModalVisible1 = flag => {
    this.setState({
      visible1: false,
    });
  };

  queding1 = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log(typeof (values.weidu));
      if(typeof (values.weidu)!=="object"){
        values.weidu=[values.weidu]
        values.zhibiao=[values.zhibiao]
      }
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'databs/submit',
          payload: {
            form_id:localStorage.getItem("form_id"),
            form_content_id:values.data,
            source:values.data,
            pattern:this.state.type,
            name:values.name,
            dimension:values.weidu.join(","),
            indexs:values.zhibiao.join(','),
          },
          callback:(res)=>{
            if(res.code===0){
              message.success("添加成功")
              this.setState({
                visible1: false,
              });
              this.getbegindata()
            }else{
              message.error(res.msg)
            }

          }
        });

      }
    });
  };



  handleModalVisible2 = flag => {
    this.setState({
      visible2: false,
    });
  };

  queding2 = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log(typeof (values.weidu));
      if(typeof (values.weidu)!=="object"){
        values.weidu=[values.weidu]
        values.zhibiao=[values.zhibiao]
      }
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'databs/submit',
          payload: {
            form_id:localStorage.getItem("form_id"),
            form_content_id:values.data,
            source:values.data,
            pattern:this.state.type,
            name:values.name,
            dimension:values.weidu.join(","),
            indexs:values.zhibiao.join(','),
            mins:values.min,
            maxs:values.max,
          },
          callback:(res)=>{
            if(res.code===0){
              message.success("添加成功")
              this.setState({
                visible2: false,
              });
              this.getbegindata()
            }else{
              message.error(res.msg)
            }

          }
        });

      }
    });
  };


  handleModalVisible3 = flag => {
    this.setState({
      visible3: false,
    });
  };

  queding3 = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      console.log(typeof (values.weidu));
      if(typeof (values.weidu)!=="object"){
        values.weidu=[values.weidu]
        values.zhibiao=[values.zhibiao]
      }
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'databs/submit',
          payload: {
            form_id:localStorage.getItem("form_id"),
            form_content_id:values.data,
            source:values.data,
            pattern:this.state.type,
            name:values.name,
            dimension:values.weidu.join(","),
            indexs:values.zhibiao.join(','),
            mins:values.min,
            maxs:values.max,
          },
          callback:(res)=>{
            if(res.code===0){
              message.success("添加成功")
              this.setState({
                visible3: false,
              });
              this.getbegindata()
            }else{
              message.error(res.msg)
            }

          }
        });

      }
    });
  };

  fabu = () => {
    this.setState({
      isfubu: true,
    });
  };

  pubSuccess = () => {
    this.setState({
      isfubu: false,
    });
    router.push({
      pathname: '/flow/index',
    });
  };

  keepEdit = () => {
    this.setState({
      isfubu: false,
    });
  };


  tuxing=(e,a,b,c)=>{
    const { dispatch } = this.props;
    console.log(e)
    console.log(a)
    console.log(b)
    console.log(c)




    if(e.btnnow===c){
      console.log("????")
      let noth=this.state.data
      noth[a].btnnow=0
      this.setState({
        data:noth
      })
    }else{
      // 在这里把图形获取到

      dispatch({
        type: 'databs/tabletype',
        payload: {
          form_data_id: e.form_data_id,
          type:c,
        },
        callback: res => {
          let noth=this.state.data
          noth[a].btnnow=c
          noth[a].tuxingdata=res.result.graph
          noth[a].tuxingdata2=res.result.graph
          this.setState({
            data:noth
          })
        },
      });


    }

  }

  selsjy=(e)=>{
    console.log(e)
    const{dispatch}=this.props
    dispatch({
      type: 'databs/datayuan',
      payload: {
        form_id:e
      },
      callback: res => {
        console.log(res);
        this.setState({
          weiwei:res.result,
          form_content_id:e,
        })

      },
    });
  }



  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    let { isfubu, data,data2 } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    let publishMask = (
      <div className={styles.publishMask} ref='publishMask'>
        <div className={styles.pubSucc}>
          <div className={styles.pubTop}>
            <img src={success} alt=""/>
            <p>审批名称发布成功！</p>
          </div>
          <div className={styles.pubTip}>
            <p>员工可以通过以下方式提交审批单：</p>
            <p><span>①</span> 进入龙神OI系统管理员可进行编辑提交</p>
            <p><span>②</span> 打开手机龙神Ol系统进行扫码进行提交</p>
          </div>
          <div className={styles.handle}>
            <p className={styles.keepEdit} onClick={this.keepEdit}>继续编辑</p>
            <p className={styles.pubSuccess} onClick={this.pubSuccess}>完成</p>
          </div>
        </div>
      </div>
    );


    return (
      <div className={styles.mainbox} onClick={this.allClick}>
        <Titles iiiidata={4} fabu={this.fabu}/>
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption('bar','柱状图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption('line','折线图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption2('pie','饼图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption3('pie','双轴图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption4('pie','面积图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption5('gauge','仪表盘')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption6('pie','圆环图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption7('bar','条形图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <ReactEcharts*/}
        {/*    option={this.getOption8('radar','雷达图')}*/}
        {/*    style={{ height: '400px', width: '100%' }}*/}
        {/*    className="react_for_echarts"*/}
        {/*    loadingOption={this.props.loading}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className={styles.parent}>*/}
        {/*  <p className={styles.shujukuai}>数据块</p>*/}
        {/*  <div>*/}

        {/*  </div>*/}
        {/*</div>*/}


        <div className={styles.xuanze1}>
          <div className={styles.xuanze2} onClick={this.showss}>
            <b className={styles.xuanze20}>+</b>添加图表类型
          </div>

        </div>

        <div className={styles.xuanze3} style={{ display: this.state.showtk }}>
          {
            this.state.sjtype.map((value, key) => {
              return (
                <div className={styles.xzitem} onClick={e => this.plusplus(value, key)}>
                  <img src={value.img} alt=""/>
                  <span>{value.title}</span>

                </div>
              );
            })
          }
        </div>


        {/*正文的内容*/}
        <div className={styles.allitem}>
          <h2>默认数据</h2>
          {
            data.length > 0 && data.map((value, key) => {
              return (
                <div className={styles.tableitem}>
                  <p>{value.title}</p>
                  <div className={styles.tables}>
                    {
                      value.content.length>0&&value.content.map((value2,key2)=>{
                        if(key2===0){
                          return(
                            <tr className={styles.heng} style={{
                              borderTop:"1px solid #ccc",
                              background:"#189df3",
                              color:"#ffffff",
                              fontWeight:'bold'
                            }}>
                              {
                                value2.length>0&&value2.map((value3,key3)=>{
                                  return(
                                    <td className={styles.shu}>
                                      {typeof(value3)==="object"?value3.name.toString():value3.toString()}
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          )
                        }else{
                          return(
                            <tr className={styles.heng}>
                              {
                                value2.length>0&&value2.map((value3,key3)=>{
                                  return(
                                    <td className={styles.shu}>
                                      {value3.toString()}
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          )
                        }

                      })
                    }
                  </div>
                  <div onClick={(e) => this.tuxing(value, key, event, 1)}  className={value.btnnow===1?styles.btn0:styles.btn1}>
                    <img src={value.btnnow===1?bingzhuangtu:bingzhuangtu2}   alt=""/>  饼状</div>
                  <div onClick={(e) => this.tuxing(value, key, event, 2)}  className={value.btnnow===2?styles.btn0:styles.btn1} style={{marginLeft:"10px"}}>
                    <img src={value.btnnow===2?yuanhuantu:yuanhuantu2} alt=""/>  圆环</div>
                  <div onClick={(e) => this.tuxing(value, key, event, 3)} className={value.btnnow===3?styles.btn0:styles.btn1} style={{marginLeft:"10px"}}>
                    <img src={value.btnnow===3?zhuxingtu:zhuxingtu2} alt=""/>   柱状</div>
                  <div onClick={(e) => this.tuxing(value, key, event, 4)} className={value.btnnow===4?styles.btn0:styles.btn1} style={{marginLeft:"10px"}}>
                    <img src={value.btnnow===4?tiaoxingtu:tiaoxingtu2} alt=""/>   条形</div>


                  <div className={styles.mohu} style={{display:value.btnnow===0?"none":"block"}}>
                    {
                      value.btnnow===1?

                          <div className={styles.parent} style={{display:value.btnnow===1?"block":"none"}}>
                            <ReactEcharts
                              option={this.getOption2('pie','饼图',value.tuxingdata)}
                              style={{ height: '200px', width: '200px',display:value.btnnow===1?"block":"none" }}
                              className="react_for_echarts"
                              loadingOption={this.props.loading}
                            />
                        </div>:value.btnnow===2?
                          <div className={styles.parent} style={{display:value.btnnow===2?"block":"none"}}>
                            <ReactEcharts
                              option={this.getOption6('pie','圆环图',value.tuxingdata)}
                              style={{ height: '200px', width: '200px',display:value.btnnow===2?"block":"none" }}
                              className="react_for_echarts"
                              loadingOption={this.props.loading2}
                            />
                        </div>:value.btnnow===3?
                            <div className={styles.parent} style={{display:value.btnnow===3?"block":"none"}}>
                              <ReactEcharts
                                option={this.getOption('bar','柱状图',value.tuxingdata2)}
                                style={{ height: '200px', width: '200px',display:value.btnnow===3?"block":"none" }}
                                className="react_for_echarts"
                                loadingOption={this.props.loading3}
                              />
                          </div>:value.btnnow===4?
                            <div className={styles.parent} style={{display:value.btnnow===4?"block":"none"}}>
                              <ReactEcharts
                                option={this.getOption('bar','条形图',value.tuxingdata2)}
                                style={{ height: '200px', width: '200px',display:value.btnnow===4?"block":"none" }}
                                className="react_for_echarts"
                                loadingOption={this.props.loading4}
                              />
                          </div>:
                            <div></div>
                    }
                  </div>



                </div>
              );
            })
          }
        </div>


        <div className={styles.allitem} style={{paddingBottom:"50px"}} >
          <h2>已添加数据</h2>
          {
            data2.length > 0 && data2.map((value, key) => {
              return (
                <div className={styles.tableitem}>
                  <p>{value.name}</p>

                  {
                    value.pattern===1?
                      <div>
                        <ReactEcharts
                          option={this.getOption2('pie','饼图',value.content.graph)}
                          style={{ height: '250px', width: '300px' }}
                          className="react_for_echarts"
                          loadingOption={this.props.loading}
                        />
                      </div>:value.pattern===2?
                      <div>
                        <ReactEcharts
                          option={this.getOption6('pie','圆环图',value.content.graph)}
                          style={{ height: '250px', width: '300px' }}
                          className="react_for_echarts"
                          loadingOption={this.props.loading2}
                        />
                      </div>:value.pattern===3?
                        <div>
                          <ReactEcharts
                            option={this.getOption('bar','柱状图',value.content.graph)}
                            style={{ height: '250px', width: '300px' }}
                            className="react_for_echarts"
                            loadingOption={this.props.loading3}
                          />
                        </div>:value.pattern===4?
                          <div>
                            <ReactEcharts
                              option={this.getOption('bar','条形图',value.content.graph)}
                              style={{ height: '250px', width: '300px' }}
                              className="react_for_echarts"
                              loadingOption={this.props.loading4}
                            />

                          </div>:value.pattern===5?
                            <div>
                                <ReactEcharts
                                  option={this.getOption('line','折线图',value.content.graph)}
                                  style={{ height: '250px', width: '300px' }}
                                  className="react_for_echarts"
                                  loadingOption={this.props.loading}
                                />

                            </div>:value.pattern===6?
                              <div>
                                <div className={styles.shujukuai}>
                                  {value.content.length>0?value.content.graph.number:''}
                                </div>


                              </div>:value.pattern===7?
                                <div>
                                    <ReactEcharts
                                      option={this.getOption5('gauge','仪表盘',value.content.graph)}
                                      style={{ height: '250px', width: '300px' }}
                                      className="react_for_echarts"
                                      loadingOption={this.props.loading}
                                    />

                                </div>:value.pattern===8?
                                  <div>
                                      <ReactEcharts
                                        option={this.getOption8('radar','雷达图',value.content.graph)}
                                        style={{ height: '250px', width: '300px' }}
                                        className="react_for_echarts"
                                        loadingOption={this.props.loading}
                                      />
                                  </div>:
                                  <div></div>

                  }



                </div>
              );
            })
          }
        </div>


        {/*弹窗一*/}

        <Modal
          destroyOnClose
          title="图形名称"
          visible={this.state.visible1}
          onCancel={() => this.handleModalVisible1()}
          onOk={this.queding1}
        >
          <div className={styles.tantantan}>
            <Form onSubmit={this.queding1} {...formItemLayout} >
              <Form.Item label="图表名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      message: '请输入图表名称',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder='输入图表名称'/>,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                        数据源&nbsp;
                    <Tooltip title="请选择数据源">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('data', {
                  rules: [
                    {
                      message: '选择数据源',
                      required: true,
                    },
                  ],
                  initialValue: this.state.shujuyuan.length>0?this.state.shujuyuan[0].form_id:null,
                })(
                  <Select onSelect={this.selsjy} >
                    {
                      this.state.shujuyuan.length>0&&this.state.shujuyuan.map((value,key)=>{
                        return(
                          <Option value={value.form_id}>{value.name}</Option>
                          )
                      })
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                        维度(x)&nbsp;
                    <Tooltip title="维度指您的横向坐标数据">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('weidu', {
                  rules: [
                    {
                      message: '选择维度',
                      required: true,
                    },
                  ],
                  initialValue: this.state.weiwei.length>0?this.state.weiwei[0].id:null,
                })(
                  <Select
                    // style={{ width: 200, border: 'none' }}
                    onChange={this.changeweidu}
                    mode="multiple"
                    placeholder="选择维度"
                    maxTagCount={4}
                    notFoundContent={'请先选择数据源'}
                  >
                    {
                      this.state.weiwei.map(owner => (
                        <Option value={owner.id}>
                          {owner.name}
                        </Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                        指标(y)&nbsp;
                    <Tooltip title="指标指您的纵向坐标数据">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('zhibiao', {
                  rules: [
                    {
                      message: '选择指标',
                      required: true,
                    },
                  ],
                  initialValue: this.state.weiwei.length>0?this.state.weiwei[0].id:null,
                })(
                  <Select
                    // style={{ width: 200, border: 'none' }}
                    onChange={this.changeweidu}
                    mode="multiple"
                    placeholder="选择指标"
                    maxTagCount={4}
                    notFoundContent={'请先选择数据源'}
                  >
                    {
                      this.state.weiwei.map(owner => (
                        <Option value={owner.id}>
                          {owner.name}
                        </Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>


            </Form>
          </div>

        </Modal>


        {/*弹窗二*/}

        <Modal
          destroyOnClose
          title="仪表盘"
          visible={this.state.visible2}
          onCancel={() => this.handleModalVisible2()}
          onOk={this.queding2}
        >
          <div className={styles.tantantan}>
            <Form onSubmit={this.queding2} {...formItemLayout} >
              <Form.Item label="图表名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      message: '请输入图表名称',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder='输入图表名称'/>,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                        数据源&nbsp;
                    <Tooltip title="请选择数据源">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('data', {
                  rules: [
                    {
                      message: '选择数据源',
                      required: true,
                    },
                  ],
                  initialValue: this.state.shujuyuan.length>0?this.state.shujuyuan[0].form_id:null,
                })(
                  <Select onSelect={this.selsjy} >
                    {
                      this.state.shujuyuan.length>0&&this.state.shujuyuan.map((value,key)=>{
                        return(
                          <Option value={value.form_id}>{value.name}</Option>
                        )
                      })
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                        维度(x)&nbsp;
                    <Tooltip title="维度指您的横向坐标数据">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('weidu', {
                  rules: [
                    {
                      message: '选择维度',
                      required: true,
                    },
                  ],
                  initialValue: this.state.weiwei.length>0?this.state.weiwei[0].id:null,
                })(
                  <Select
                    // style={{ width: 200, border: 'none' }}
                    onChange={this.changeweidu}
                    mode="multiple"
                    placeholder="选择维度"
                    maxTagCount={4}
                    notFoundContent={'请先选择数据源'}
                  >
                    {
                      this.state.weiwei.map(owner => (
                        <Option value={owner.id}>
                          {owner.name}
                        </Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                        指标(y)&nbsp;
                    <Tooltip title="指标指您的纵向坐标数据">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('zhibiao', {
                  rules: [
                    {
                      message: '选择指标',
                      required: true,
                    },
                  ],
                  initialValue: this.state.weiwei.length>0?this.state.weiwei[0].id:null,
                })(
                  <Select
                    // style={{ width: 200, border: 'none' }}
                    onChange={this.changeweidu}
                    mode="multiple"
                    placeholder="选择指标"
                    maxTagCount={4}
                    notFoundContent={'请先选择数据源'}
                  >
                    {
                      this.state.weiwei.map(owner => (
                        <Option value={owner.id}>
                          {owner.name}
                        </Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="最大值">
                {getFieldDecorator('max', {
                  rules: [
                    {
                      message: '请输入最大值',
                      required: true,
                    },
                  ],
                })(
                  <InputNumber placeholder='输入最大值'/>,
                )}
              </Form.Item>
              <Form.Item label="最小值">
                {getFieldDecorator('min', {
                  rules: [
                    {
                      message: '请输入最小值',
                      required: true,
                    },
                  ],
                })(
                  <InputNumber placeholder='输入最小值'/>,
                )}
              </Form.Item>


            </Form>
          </div>

        </Modal>


        {/*弹窗三*/}

        <Modal
          destroyOnClose
          title="仪表盘"
          visible={this.state.visible3}
          onCancel={() => this.handleModalVisible3()}
          onOk={this.queding3}
        >
          <div className={styles.tantantan}>
            <Form onSubmit={this.queding3} {...formItemLayout} >
              <Form.Item label="图表名称">
                {getFieldDecorator('name', {
                  rules: [
                    {
                      message: '请输入图表名称',
                      required: true,
                    },
                  ],
                })(
                  <Input placeholder='输入图表名称'/>,
                )}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                        数据源&nbsp;
                    <Tooltip title="请选择数据源">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('data', {
                  rules: [
                    {
                      message: '选择数据源',
                      required: true,
                    },
                  ],
                  initialValue: this.state.shujuyuan.length>0?this.state.shujuyuan[0].form_id:null,
                })(
                  <Select onSelect={this.selsjy} >
                    {
                      this.state.shujuyuan.length>0&&this.state.shujuyuan.map((value,key)=>{
                        return(
                          <Option value={value.form_id}>{value.name}</Option>
                        )
                      })
                    }
                  </Select>,
                )}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                        指标(y)&nbsp;
                    <Tooltip title="指标指您的纵向坐标数据">
                       <Icon type="question-circle-o" style={{ color: '#189df3' }}/>
                    </Tooltip>
                  </span>
                }>
                {getFieldDecorator('zhibiao', {
                  rules: [
                    {
                      message: '选择指标',
                      required: true,
                    },
                  ],
                  initialValue: this.state.weiwei.length>0?this.state.weiwei[0].id:null,
                })(
                  <Select
                    // style={{ width: 200, border: 'none' }}
                    onChange={this.changeweidu}
                    mode="multiple"
                    placeholder="选择指标"
                    maxTagCount={4}
                    notFoundContent={'请先选择数据源'}
                  >
                    {
                      this.state.weiwei.map(owner => (
                        <Option value={owner.id}>
                          {owner.name}
                        </Option>
                      ))
                    }
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label="最大值">
                {getFieldDecorator('max', {
                  rules: [
                    {
                      message: '请输入最大值',
                      required: true,
                    },
                  ],
                })(
                  <InputNumber placeholder='输入最大值'/>,
                )}
              </Form.Item>
              <Form.Item label="最小值">
                {getFieldDecorator('min', {
                  rules: [
                    {
                      message: '请输入最小值',
                      required: true,
                    },
                  ],
                })(
                  <InputNumber placeholder='输入最小值'/>,
                )}
              </Form.Item>


            </Form>
          </div>

        </Modal>


        {isfubu ? publishMask : ''}

      </div>
    );
  }
}

export default Treemap;
