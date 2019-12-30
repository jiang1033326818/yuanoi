export default {
  'GET /api/menuone':  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/dashboard/analysis',
        name: '工作动态',
        component: './Dashboard/Analysis',
      },
      {
        path: '/dashboard/monitor',
        name: '工作情况',
        component: './Dashboard/Monitor',
      },
      {
        path: '/dashboard/workplace',
        name: '工作效率',
        component: './Dashboard/Workplace',
      },
    ],
  },

  'GET /api/menutwo':  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/form/step-form',
        redirect: '/form/step-form/info',
        name:"软件任务"
      },
      {
        path: '/form/step-form/info',
        name: '财务任务',
        component: './Forms/StepForm/Step1',
      },
      {
        path: '/form/step-form/confirm',
        name: '人员任务',
        component: './Forms/StepForm/Step2',
      },
      {
        path: '/form/step-form/result',
        name: '一般任务',
        component: './Forms/StepForm/Step3',
      },
    ],
  },


  'GET /api/menuthree':  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/editor/flow',
        name: '流程图',
        component: './Editor/GGEditor/Flow',
      },
      {
        path: '/editor/mind',
        name: '组织架构图',
        component: './Editor/GGEditor/Mind',
      },
      {
        path: '/editor/koni',
        name: '组织拓扑图',
        component: './Editor/GGEditor/Koni',
      },
    ],
  },


};
