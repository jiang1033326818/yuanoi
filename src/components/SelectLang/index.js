import React, { PureComponent } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi-plugin-react/locale';
import { Menu, Icon, Form, message } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';

@connect(({ menu, loading }) => ({
  menu,
  loading: loading.models.menu,
}))
@Form.create()
export default class SelectLang extends PureComponent {
  state = {
    localmianban: 0,
    languageLabels:[
      'CEO面板',
      '管理层面板',
      '人事面板',
      '财务面板',
      '工作面板',
      '系统后台'
    ]
  };

  componentDidMount() {
    const { dispatch } = this.props;
  }

  componentDidUpdate() {
    const { className, menu } = this.props;
    console.log(menu.panel)
    this.setState({
      localmianban: typeof(menu.panel)!=="number"?0:menu.panel
    })
  }

  changeLang = key => {
    const { menu } = this.props;
    const { dispatch } = this.props;
    console.log(9898,key)
    dispatch({
      type: 'menu/checkmianban',
      payload: {
        index: key.item.props.index,
      },
    });

    this.setState({
      localmianban: key.item.props.index,
    });
    switch(key.item.props.index){
      case 0: // CEO面板
          router.push({
            pathname: '/admin/index',
          });
        break;
      case 1: // 管理层面板
          // router.push({
          //   pathname: '/chat/chat',
          // });
        break;
      case 2: // 人事面板
          router.push({
            pathname: '/flow/index',
          });
        break;
      case 3: // 财务面板
          // router.push({
          //   pathname: '/chat/chat',
          // });
        break;
      case 4: // 工作面板
          router.push({
            pathname: '/chat/chat',
          });
        break;
    }
    // if (key.item.props.index === 0) {
    //   router.push({
    //     pathname: '/admin/index',
    //   });
    // } else if (key.item.props.index === 1) {
    //   router.push({
    //     pathname: '/chat/chat',
    //   });
    // }

    // setLocale(key);
  };

  render() {
    const { className, menu } = this.props;
    const { languageLabels } = this.state;

    const selectedLang = getLocale();
    const locales = ['zhCN', 'guanliyuan','renshi','caiwu','yuangong','houtai'];

    const localstring = {
      // zhCN: '系统后台',
      // yuangong: '工作面板',
      zhCN: 'CEO面板',
      guanliyuan: '管理层面板',
      renshi:'人事面板',
      caiwu:'财务面板',
      yuangong:'工作面板'
    };

    const langMenu = (
      <Menu
        className={styles.menu}
        selectedKeys={locales[this.state.localmianban]}
        onClick={this.changeLang}
      >
        {locales.map((value, key) => (
          <Menu.Item key={value}>{languageLabels[key]}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)} style={{ color: '#fff' }}>
          {languageLabels[this.state.localmianban]}
        </span>
      </HeaderDropdown>
    );
  }
}
