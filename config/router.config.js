export default [
  // flow
  {
    path: '/flow',
    component: '../layouts/FlowLayout',
    routes: [
      { path: '/flow/index', component: './Flow/index' },
    ],
  },
  // chat
  {
    path: '/chat',
    component: '../layouts/AdminLayout',
    routes: [
      { path: '/chat/chat', name: '聊天', component: './Chat/index' },
      // { path: '/chat/chat', component: './Chat/news/news' },
      // { path: '/chat/works', component: './Chat/works/works' },
    ],
  },

  //流程部署相关页面
  {
    path: '/process',
    component: '../layouts/LiuchengLayout',
    routes: [
      { path: '/process', redirect: '/process/form' },
      { path: '/process/form', name: '表单', component: './Process/Form' },
      { path: '/process/approval', name: '审批流', component: './Flow/approval' },
      { path: '/process/setup', name: '设置', component: './Flow/setup' },

      //在这里写数据部署的部分
      { path: '/process/setting', name: '数据设置', component: './Data/index' },

      {
        path: '/process/forgot',
        name: '忘记密码',
        component: './Admin/Forgot',
      },
      {
        component: '404',
      },



    ],
  },




  //首页欢迎页
  {
    path: '/index',
    component: '../layouts/IndexLayout',
    routes: [
      { path: '/index', redirect: '/index' },
      { path: '/index', name: '首页', component: './Index/index' },
      // {
      //   path: '/user/register-result',
      //   name: 'register.result',
      //   component: './User/RegisterResult',
      // },
      {
        component: '404',
      },
    ],
  },






  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      // {
      //   path: '/user/register-result',
      //   name: 'register.result',
      //   component: './User/RegisterResult',
      // },
      {
        component: '404',
      },
    ],
  },

  //admin
  {
    path: '/admin',
    component: '../layouts/AdminLayout',
    routes: [
      {
        path: '/admin/seccuss',
        name: '注册成功',
        component: './Admin/Seccuss',
      },
      {
        path: '/admin/orgtest',
        name: '测试',
        component: './Admin/orgtest',
      },
      {
        path: '/admin/send',
        name: '邀请员工填写',
        component: './Admin/send',
      },
      {
        path: '/admin/invitation',
        name: '邀请加入',
        component: './User/invitation',
      },
      {
        path: '/admin/forgot-seccuss',
        name: '找回成功',
        component: './Admin/Seccuss2',
      },
      {
        path: '/admin/index',
        name: '管理员首页',
        component: './Admin/index',
      },
      {
        path: '/admin/roster',
        name: '花名册',
        component: './Admin/roster',
      },
      {
        path: '/admin/newtest',
        name: '花名册',
        component: './Admin/newtest',
      },
      {
        path: '/admin/employees',
        name: '员工填写',
        component: './Admin/employees',
      },
      {
        path: '/admin/indexall',
        name: '组织架构部署',
        component: './Admin/indexall',
      },
      {
        path: '/admin/index2',
        name: '管理员首页',
        component: './Admin/index2',
      },
      {
        path: '/admin/origin',
        name: '选择部署方式',
        component: './Admin/origin',
      },
      {
        path: '/admin/originnext',
        name: '部署成功',
        component: './Admin/originnext',
      },
      {
        path: '/admin/excel',
        name: '部署成功',
        component: './Admin/excel',
      },
      {
        path: '/admin/three',
        name: '三步完成部署',
        component: './Admin/three',
      },
      {
        path: '/admin/Jurisdiction',
        name: '权限部署',
        component: './Admin/jurisdiction',
      },
      {
        component: '404',
      },
    ],
  },

  //ceo
  {
    path: '/ceo',
    component: '../layouts/CeoLayout',
    routes: [
      { path: '/ceo/register', name: '用户注册', component: './User/Register' },
      {
        path: '/ceo/index',
        name: '组织架构图',
        component: './CEO/index',
      },
      { path: '/ceo/fuwu', name: '服务协议', component: './User/fuwu' },
      { path: '/ceo/yinsi', name: '隐私协议', component: './User/yinsi' },
      {
        path: '/ceo/invitation',
        name: '邀请加入',
        component: './User/invitation',
      },
      {
        path: '/ceo/people',
        name: '组织花名册',
        component: './CEO/people',
      },
      {
        path: '/ceo/line',
        name: '汇报线',
        component: './CEO/line',
      },
      {
        path: '/ceo/project',
        name: '重大任务',
        component: './CEO/project',
      },
      {
        component: '404',
      },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
