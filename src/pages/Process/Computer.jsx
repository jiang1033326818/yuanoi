import React from 'react';
import {
  Form,
  Input,
  Tag,
  Card,
  Tabs,
  Checkbox,
  Button,
  Select,
  multiple,
  DatePicker,
  InputNumber,
  Radio,
  Divider,
  Upload,
  TimePicker,
  Switch,
  Cascader,
  Icon,
} from 'antd';

import style from './Yulan.less';

import addpri from '../../../images/flow/addpri.jpg';

const Search = Input.Search;
const { TabPane } = Tabs;
const { TextArea } = Input;

class Computer extends React.Component {
  componentWillReceiveProps(nextProps){
    console.log(22222,nextProps)
  }

  componentDidMount(){
    console.log(3323333,this.props)
  }

  render() {
    let {data} = this.props;
    console.log(444444444,this.props,data)
    return (
      <div className={style.computer}>
        <div>
          {
            data.length>0?
            data.map((value,key)=>{

              if(value.label==="Input"){
                return (
                  <div className={style.wai}
                  >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Input className={style.width40} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false} />

                  </div>
                );
              }

              if (value.label === 'Checkbox') {
                return (
                  <div className={style.wai} >

                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Checkbox placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>选项1</Checkbox>
                    <Checkbox placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>选项2</Checkbox>
                    <Checkbox placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>选项3</Checkbox>

                  </div>
                );
              }
              if (value.label === 'Button') {
                return (
                  <div className={style.wai} >

                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Button type="primary" placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>{'按钮'}</Button>

                  </div>
                );
              }
              if (value.label === 'Select') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Select className={style.width40} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>
                      <Option value="1">选项1</Option>
                      <Option value="2">选项2</Option>
                      <Option value="3">选项3</Option>
                    </Select>

                  </div>
                );
              }
              if (value.label === 'multiple') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Select className={style.width40} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>
                      <Option value="1">选项1</Option>
                      <Option value="2">选项2</Option>
                      <Option value="3">选项3</Option>
                    </Select>

                  </div>
                );
              }

              if (value.label === 'DatePicker') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <DatePicker placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false} />

                  </div>
                );
              }

              if (value.label === 'InputNumber') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <InputNumber min={1} max={10} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false} />

                  </div>
                );
              }
              if (value.label === 'Radio') {
                return (
                  <div className={style.wai} >

                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Radio.Group placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>
                      <Radio value={1}>选项1</Radio>
                      <br />
                      <Radio value={2}>选项2</Radio>
                      <br />
                      <Radio value={3}>选项3</Radio>
                    </Radio.Group>

                  </div>
                );
              }
              if (value.label === 'Divider') {
                return (
                  <div className={style.wai} >

                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Divider placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false} />

                  </div>
                );
              }
              if (value.label === 'TextArea') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <TextArea rows={4} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false} />

                  </div>
                );
              }
              if (value.label === 'Upload') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Button disabled={value.disabled===1?true:false}>
                      <Icon type="upload" /> {value.placeholder==='点击上传'?'':value.placeholder}
                    </Button>

                  </div>
                );
              }
              if (value.label === 'TimePicker') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <TimePicker className={style.width40} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}/>
                    {/* <TimePicker className={style.width40} disabled={value.disabled===1?true:false}/> */}

                  </div>
                );
              }
              if (value.label === 'Tag') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Tag disabled={value.disabled===1?true:false} color="magenta">{value.placeholder==='1'?'magenta':value.placeholder}</Tag>

                  </div>
                );
              }

              if (value.label === 'Switch') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Switch defaultChecked placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false} />

                  </div>
                );
              }
              if (value.label === 'Cascader') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Select className={style.width40} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>
                      <Option value="1">选项1</Option>
                    </Select>
                    <Select className={style.width40} placeholder={value.placeholder==='1'?'':value.placeholder} disabled={value.disabled===1?true:false}>
                      <Option value="1">选项1</Option>
                    </Select>

                  </div>
                );
              }
              if (value.label === 'Location') {
                return (
                  <div className={style.wai} >
                    <h2>{value.datas===''?value.name:value.datas}{value.required===1?(<span style={{color:'red'}}> *</span>):''}</h2>
                    <Button disabled={value.disabled===1?true:false} >
                      <Icon type="location" /> {value.placeholder==='1'?"点击获取位置信息":value.placeholder}
                    </Button>

                  </div>
                );
              }
            }
          ) : (
            <div className={style.centera}>尚未添加字段</div>
          )}
        </div>
      </div>
    );
  }
}

export default Computer;
