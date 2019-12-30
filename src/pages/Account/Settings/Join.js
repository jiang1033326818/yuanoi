import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './join.less';
import router from 'umi/router';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  handleSubmit = e => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        router.push({
          pathname: '/account/jointable',
        });
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
<div className={styles.content}>
  <div className={styles.jointop}>
    <Card bordered={false}>
       <h3>已经加入的企业</h3>
       <p>北京一元集成发展有限公司</p>
    </Card>
  </div>

  <div className={styles.joinbottom}>

    <Card bordered={false}>
      <h3>申请要加入的企业</h3>
      <Form onSubmit={this.handleSubmit}   style={{ marginTop: 8 }}>
        <FormItem {...formItemLayout} hasFeedback label="企业全称">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: "输入公司名称",
              },
            ],
          })(<Input placeholder='请输入企业全称' />)}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback label="真实姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: "输入您的真实姓名",
              },
            ],
          })(<Input placeholder='请输入真实姓名' />)}
        </FormItem>

        <FormItem {...formItemLayout} hasFeedback label="工号或识别号">
          {getFieldDecorator('number', {
            rules: [
              {
                required: false,
                message: "输入您的工号或识别号",
              },
            ],
          })(<Input placeholder='输入您的工号或识别号' />)}
        </FormItem>

        <FormItem {...formItemLayout} hasFeedback label="部门">
          {getFieldDecorator('department', {
            rules: [
              {
                required: true,
                message: "输入您的部门名称",
              },
            ],
          })(<Input placeholder='输入您的部门名称' />)}
        </FormItem>

        <FormItem {...formItemLayout} hasFeedback label="职位">
          {getFieldDecorator('position', {
            rules: [
              {
                required: true,
                message: "输入您的职位名称",
              },
            ],
          })(<Input placeholder='输入您的职位名称' />)}
        </FormItem>

        <FormItem {...formItemLayout} hasFeedback label="上级领导职位">
          {getFieldDecorator('topPosition', {
            rules: [
              {
                required: true,
                message: "输入您的上级领导职位名称",
              },
            ],
          })(<Input placeholder='输入您的上级领导职位名称' />)}
        </FormItem>

        <FormItem {...formItemLayout} hasFeedback label="联系电话">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: "手机号",
              },
              {
                pattern: /^\d{11}$/,
                message: "请输入正确的手机号",
              },
            ],
          })(<Input placeholder='输入您的手机号' />)}
        </FormItem>

        <FormItem {...submitFormLayout} style={{ marginTop: 32,textAlign:'center', }}>
          <Button type="primary" htmlType="submit" loading={submitting} style={{width:200}}>
           提交
          </Button>
        </FormItem>
      </Form>
    </Card>
  </div>

</div>


    );
  }
}

export default BasicForms;
