/**
 * 重新封装一个请求文档
 * 姜海鹏 20019.9.4
 */
import  $ from  'jquery'
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import { sha256 } from 'js-sha256';

const baseUrl = 'https://api.yuanoi.com/';
// const baseUrl = 'http://localhost:8000/';
// const baseUrl = window.location.origin


function randomWord(randomFlag, min, max) {
  let str = '',
    range = min,
    arr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

let datas = [];
datas['code'] = localStorage.getItem('code');
datas['rand'] = randomWord(true, 2, 20);
datas['sid'] = localStorage.getItem('sid');
datas['time'] = parseInt(new Date().getTime() / 1000);
datas['token'] = localStorage.getItem('access_token');
datas.sort();

console.log(datas);
let hai =
  'code' +
  '=' +
  datas['code'] +
  'rand' +
  '=' +
  datas['rand'] +
  'sid' +
  '=' +
  datas['sid'] +
  'time' +
  '=' +
  datas['time'] +
  'token' +
  '=' +
  datas['token'];
let jiang = sha256.hmac('OI_WEB', hai);

var hash = sha256.hmac.create('key');
hash.update('Message to hash');
let nice = hash.hex();

// console.log(nice2)
// console.log(shuaihsuai)
let baseHeader =
  'oi-auth-v1' +
  '/' +
  datas['code'] +
  '/' +
  'web' +
  '/' +
  datas['rand'] +
  '/' +
  datas['sid'] +
  '/' +
  jiang;

Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};
var time2 = new Date().Format('yyyy-MM-dd HH:mm:ss');

// let utc=time2.toUTCString()
//
// console.log(utc)
/**
 * 配置request请求时的默认参数
 */
function ajax_method(url,data,method,success) {
  // 异步对象
  var ajax = new XMLHttpRequest() || new ActivexObject("Microsoft,XMLHTTP");
  // get 跟post  需要分别写不同的代码
  if (method=='get') {
    // get请求
    if (data) {
      // 如果有值
      url+='?';
      url+=data;
    }else{

    }
    // 设置 方法 以及 url
    ajax.open(method,url);

    // send即可
    ajax.send();
  }else{
    // post请求
    // post请求 url 是不需要改变
    ajax.open(method,url);
    // 需要设置请求报文
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.setRequestHeader('x-oi-date', new Date(time2).toISOString());
    ajax.setRequestHeader('authorization', baseHeader);
    // 判断data send发送数据
    if (data) {
      // 如果有值 从send发送
      ajax.send(data);
    }else{
      // 木有值 直接发送即可
      ajax.send();
    }
  }

  // 注册事件
  ajax.onreadystatechange = function () {
    // 在事件中 获取数据 并修改界面显示
    if (ajax.readyState==4&&ajax.status==200) {
      // console.log(ajax.responseText);

      // 将 数据 让 外面可以使用
      // return ajax.responseText;

      // 当 onreadystatechange 调用时 说明 数据回来了
      // ajax.responseText;

      // 如果说 外面可以传入一个 function 作为参数 success
      success(ajax.responseText);
    }
  }

}





// export default request;
export default { ajax_method, baseUrl };
