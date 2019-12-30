import React from 'react';

import Computer from './Computer';
import Phone from './Phone';
import style from './Yulan.less';

import computer from '../../../images/flow/computer.png';
import phoneimg from '../../../images/flow/phone.png';
import computers from '../../../images/flow/computers.png';
import phones from '../../../images/flow/phones.png';
import closePre from '../../../images/flow/closePre.png';

class Yulan extends React.Component {
  state = {
    isshowCom: true,
  };
  componentWillReceiveProps(nextProps){
    console.log(22222,nextProps)
  }
  componentDidMount() {
    console.log(this.props);
  }
  // 显示pc端预览
  showCom = () => {
    this.setState({
      isshowCom: true,
    });
  };
  // 显示移动端预览
  showPho = () => {
    this.setState({
      isshowCom: false,
    });
  };
  // 关闭预览
  closePreview = () => {
    this.props.closeYulan();
  };
  render() {
    let { isshowCom } = this.state;
    return (
      <div className={style.previewMask}>
        <div className={style.preview}>
          <div className={style.previewNav}>
            <div className={isshowCom ? style.computerNav : style.phoneNav} onClick={this.showCom}>
              <img src={isshowCom ? computer : computers} alt="" />
            </div>
            <div className={isshowCom ? style.phoneNav : style.computerNav} onClick={this.showPho}>
              <img src={isshowCom ? phoneimg : phones} alt="" />
            </div>
            <img onClick={this.closePreview} className={style.closePre} src={closePre} alt="" />
          </div>
          <div className={style.previewCon}>
            <div className={isshowCom ? style.previewCom : style.previewPho}>
              <Computer {...this.props} />
            </div>
            <div className={isshowCom ? style.previewPho : style.previewCom}>
              <Phone {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Yulan;
