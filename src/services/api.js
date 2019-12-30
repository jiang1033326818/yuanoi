import { stringify } from 'qs';
import request0 from '@/utils/request';

const request =request0.request
const baseUrl =request0.baseUrl




// 权限
// 面板列表
export async function getPanels(params) {
  return request(baseUrl+'v1/panel/list', {
    method: 'POST',
    data: { ...params },
  });
}
// 面板添加人员
export async function addPanUser(params) {
  return request(baseUrl+'v1/panel/adduser', {
    method: 'POST',
    data: { ...params },
  });
}
// 部门列表
export async function getDept(params) {
  return request(baseUrl+'v1/panel/dept/list', {
    method: 'POST',
    data: { ...params },
  });
}
// 面板添加部门
export async function addDept(params) {
  return request(baseUrl+'v1/panel/adddept', {
    method: 'POST',
    data: { ...params },
  });
}


// 数据部分
// 获取当前用户处在第几步
export async function getcommenData(params) {
  return request(baseUrl+'v1/step', {
    method: 'POST',
    data: { ...params },
  });
}



// 获取个人资料
export async function getProf(params) {
  return request(baseUrl+'v1/fms/profile', {
    method: 'POST',
    data: { ...params },
  });
}


//获取初始表格数据
export async function tabledata(params) {
  return request(baseUrl+'v1/flow/data/list', {
    method: 'POST',
    data: { ...params },
  });
}




//获取初始表格数据
export async function tabletypes(params) {
  return request(baseUrl+'v1/flow/data/graph', {
    method: 'POST',
    data: { ...params },
  });
}



// 数据源
export async function shujuyuan(params) {
  return request(baseUrl+'v1/flow/form/input', {
    method: 'POST',
    data: { ...params },
  });
}


// 查看审批
// export async function getAppro(params) {
//   return request(baseUrl+'v1/flow/approval/get', {
//     method: 'POST',
//     data: { ...params },
//   });
// }

// 查看表单
export async function getForm(params) {
  return request(baseUrl+'v1/flow/form/get', {
    method: 'POST',
    data: { ...params },
  });
}


//修改流程表单配置
export async function changesettingForm(params) {
  return request(baseUrl+'v1/flow/form/setconfig', {
    method: 'POST',
    data: { ...params },
  });
}

//请假表单查询
export async function qingjiaForm(params) {
  return request(baseUrl+'v1/flow/form/type', {
    method: 'POST',
    data: { ...params },
  });
}


//发起的表单列表
export async function getallModular(params) {
  return request(baseUrl+'v1/examine/modular', {
    method: 'POST',
    data: { ...params },
  });
}


//进行的表单列表
export async function getjinxingModular(params) {
  return request(baseUrl+'v1/examine/ongoing/list', {
    method: 'POST',
    data: { ...params },
  });
}

//查询表单内容
export async function examineForm(params) {
  return request(baseUrl+'v1/examine/form', {
    method: 'POST',
    data: { ...params },
  });
}

//启用和禁用
export async function startForm(params) {
  return request(baseUrl+'v1/flow/open', {
    method: 'POST',
    data: { ...params },
  });
}






// 查看表单模块
export async function getFormModu(params) {
  return request(baseUrl+'v1/flow/modular/get', {
    method: 'POST',
    data: { ...params },
  });
}

// 图标
export async function getIcon(params) {
  return request(baseUrl+'v1/flow/icon', {
    method: 'POST',
    data: { ...params },
  });
}

// 复制模板
export async function copyModular(params) {
  return request(baseUrl+'v1/flow/modular/clone', {
    method: 'POST',
    data: { ...params },
  });
}

// 删除模板
export async function delModular(params) {
  return request(baseUrl+'v1/flow/form/del', {
    method: 'POST',
    data: { ...params },
  });
}

// 结合
export async function jieheForms(params) {
  return request(baseUrl+'v1/examine/user', {
    method: 'POST',
    data: { ...params },
  });
}

//获取流程列表
export async function modularlist(params) {
  return request(baseUrl+'v1/flow/modular/list', {
    method: 'POST',
    data: { ...params },
  });
}


// 添加/修改模板
export async function addModular(params) {
  return request(baseUrl+'v1/flow/modular/set', {
    method: 'POST',
    data: { ...params },
  });
}




// 流程模板列表
export async function getModular(params) {
  return request(baseUrl+'v1/flow/form/list', {
    method: 'POST',
    data: { ...params },
  });
}

// 流程数据设置
export async function databsset(params) {
  return request(baseUrl+'v1/flow/data/set', {
    method: 'POST',
    data: { ...params },
  });
}


//新加的图形列表
export async function datatututu(params) {
  return request(baseUrl+'v1/flow/data/list/graph', {
    method: 'POST',
    data: { ...params },
  });
}




// 获取系统流程
export async function getDefault(params) {
  console.log(88888,params)
  return request(baseUrl+'v1/form/server/list', {
    method: 'POST',
    data: { ...params },
  });
}

// 获取流程面板列表
export async function getPanel() {
  return request(baseUrl+'v1/flow/panel/list', {
    method: 'POST',
  });
}

// 修改群名称
export async function resetGroupName(group_id, name) {
  return request(baseUrl+'v1/im/group/update', {
    method: 'POST',
    data: { group_id, name },
  });
}
// 修改群名称
export async function resetGroupNames(params) {
  return request(baseUrl+'v1/im/group/update', {
    method: 'POST',
    data: { ...params },
  });
}

// 获取群列表
export async function getGroupList() {
  return request(baseUrl+'v1/im/group/lists');
}

// 获取群信息
export async function getGroupInfo(group_id) {
  return request(baseUrl+'v1/im/group/members', {
    method: 'POST',
    data: { group_id },
  });
}
// 获取群信息
export async function getGroupInfos(params) {
  return request(baseUrl+'v1/im/group/members', {
    method: 'POST',
    data: { ...params },
  });
}

// 退出群
export async function outGroup(group_id) {
  return request(baseUrl+'v1/im/group/quit', {
    method: 'POST',
    data: { group_id },
  });
}

// 解散群
export async function noGroup(group_id) {
  return request(baseUrl+'v1/im/group/dismiss', {
    method: 'POST',
    data: { group_id },
  });
}

// 群添加好友
export async function inGroup(group_id, members) {
  return request(baseUrl+'v1/im/group/join', {
    method: 'POST',
    data: { group_id, members },
  });
}
// 群添加好友
export async function inGroups(params) {
  return request(baseUrl+'v1/im/group/join', {
    method: 'POST',
    data: { ...params },
  });
}


// 保存审批条件
export async function savetiaojianForms(params) {
  return request(baseUrl+'v1/flow/examine/setrule', {
    method: 'POST',
    data: { ...params },
  });
}



//规则表单列表
export async function ruleformForms(params) {
  return request(baseUrl+'v1/flow/form/ruleform', {
    method: 'POST',
    data: { ...params },
  });
}


// 删除审批
export async function removeshenpiForms(params) {
  return request(baseUrl+'v1/flow/examine/delrule', {
    method: 'POST',
    data: { ...params },
  });
}


// 创建群组
export async function getGroup(groupName, members) {
  return request(baseUrl+'v1/im/group/create', {
    method: 'POST',
    data: {
      type: 'work',
      name: groupName,
      members: members,
    },
  });
}
// 创建群组
export async function getGroups(params) {
  return request(baseUrl+'v1/im/group/create', {
    method: 'POST',
    data: { ...params },
  });
}

// 搜索
export async function searchUser(params) {
  return request(baseUrl+'v1/im/user/search', {
    method: 'POST',
    data: { ...params },
  });
}

// 获取好友列表
export async function getUser(params) {
  // console.log(params,'getUser')
  return request(baseUrl+'v1/im/user/buddy', {
    method: 'POST',
    data: { ...params },
  });
}

// 获取个人信息
export async function getNow() {
  return request(baseUrl+'v1/user/profile', {
    method: 'POST',
  });
}

// 获取token
export async function getToken() {
  return request(baseUrl+'v1/im/user/token', {
    method: 'POST',
  });
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryZuzhi(params) {
  return request(baseUrl+'v1/member/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeZuzhi(params) {
  return request(baseUrl+'v1/member/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//获取汇报线
export async function huibaoxianZuzhi(params) {
  return request(baseUrl+'v1/member/level', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addZuzhi(params) {
  return request(baseUrl+'v1/member/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateZuzhi(params = {}) {
  return request(baseUrl+'v1/member/edit', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

// 表单,审批,设置三个保存

//表单保存
export async function saveformForms(params) {
  return request(baseUrl+'v1/flow/form/content', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//修改后的表单保存
//表单保存
export async function saveformForms2(params) {
  return request(baseUrl+'v1/flow/form/content/set', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 删除表单某一条
export async function savedelForms(params) {
  return request(baseUrl+'v1/flow/form/content/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}




//审批保存
// export async function saverovalForms(params) {
//   return request(baseUrl+'v1/flow/approval/set', {
//     method: 'POST',
//     data: {
//       ...params,
//     },
//   });
// }

//设置保存
export async function savesettingForms(params) {
  return request(baseUrl+'v1/flow/form/set', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//提交内容
export async function addformForms(params) {
  return request(baseUrl+'v1/examine/add', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//查询审批条件
export async function fetchtiaojianForms(params) {
  return request(baseUrl+'v1/flow/examine/rule', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


//撤销和加急
export async function chexiaoForms(params) {
  return request(baseUrl+'v1/examine/urgent', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


//流程审批过程
export async function guochengForms(params) {
  return request(baseUrl+'v1/examine/ongoing/info', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//流程审批提交
export async function tijiaoForms(params) {
  return request(baseUrl+'v1/examine/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


// 历史记录
export async function lishiForms(params) {
  return request(baseUrl+'v1/examine/ongoing/before', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}




//表单的增删改查
export async function queryForms(params) {
  return request(baseUrl+'v1/flow/form/stock', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//修改请假条件
export async function changgeguidingForms(params) {
  return request(baseUrl+'v1/flow/form/type/set', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}




export async function removeForms(params) {
  return request(baseUrl+'v1/member/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addForms(params) {
  return request(baseUrl+'v1/member/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateForms(params = {}) {
  return request(baseUrl+'v1/member/edit', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

//员工填写的内容

export async function queryyuangong(params) {
  return request(baseUrl+'v1/apply/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeyuangong(params) {
  return request(baseUrl+'v1/apply/del', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function addyuangong(params) {
  return request(baseUrl+'v1/apply/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateyuangong(params = {}) {
  return request(baseUrl+'v1/apply/edit', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    // data: eval(params),
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}






export async function fakeAccountLogin(params) {
  // console.log(baseUrl);
  return request(baseUrl+'v1/portal/login', {
    method: 'POST',
    data: params,
  });
}

// 注册
export async function fakeRegister(params) {
  console.log('来没来这里');
  return request(baseUrl+'v1/portal/register', {
    method: 'POST',
    data: eval(params),
  });
}

// 发送验证码
export async function fakeCode(params) {
  return request(baseUrl+'v1/sms', {
    method: 'POST',
    data: eval(params),
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
