import {
  queryForms,
  removeForms,
  addForms,
  updateForms,
  savesettingForms,
  saveformForms,
  saverovalForms,
  getFormModu,
  getForm,
  // getAppro,
  fetchtiaojianForms,
  fetchshenpiForms,
  savetiaojianForms,
  removeshenpiForms,
  getallModular,
  getjinxingModular,
  examineForm,
  startForm,
  changesettingForm,
  qingjiaForm,
  changgeguidingForms,
  ruleformForms,
  jieheForms,
  addformForms,
  chexiaoForms,
  guochengForms,
  tijiaoForms,
  lishiForms,
  saveformForms2,
  savedelForms,
} from '@/services/api';

export default {
  namespace: 'forms',

  state: {
    data: {
      code: 0,
      result: [],
    },
    formsave: [],
    rovalsave: [],
    yulan: false,
    baocunform: [],
    foMoId: {},
    formId: {},
    approCon: {},
    ifsave: true,
    shenpi: [
      { name: '申请人', type: 0, user_id: 0 },
      { name: '直属上级', type: 0, user_id: 0 },
      { name: '最终审批人', type: 0, user_id: 0 },
    ],
    rule_id: 0,
    modular_id: 1,

  },

  effects: {
    * fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryForms, payload);
      console.log('查询表单', payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    * add({ payload, callback }, { call, put }) {
      const response = yield call(addForms, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback(response);
    },
    * remove({ payload, callback }, { call, put }) {
      const response = yield call(removeForms, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback(response);
    },
    * update({ payload, callback }, { call, put }) {
      const response = yield call(updateForms, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback(response);
    },
    // 查看审批
    // * getApproCon({ payload, callback }, { call, put }) {
    //   const response = yield call(getAppro, payload);
    //   yield put({
    //     type: 'appro',
    //     payload: response,
    //   });
    //   if (callback) callback(response);
    // },
    // 查看表单
    * getformId({ payload, callback }, { call, put }) {
      const response = yield call(getForm, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    //修改设置
    * setsettting({ payload, callback }, { call, put }) {
      const response = yield call(changesettingForm, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    //工具
    * gongju({ payload, callback }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'shenpi',
        payload: payload,
      });
      if (callback) callback(response);
    },

    //工具2
    * gongju2({ payload, callback }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'rule_id',
        payload: payload,
      });
      if (callback) callback(response);
    },

    //工具3
    * gongju3({ payload, callback }, { call, put }) {
      console.log(payload);
      yield put({
        type: 'modular_id',
        payload: payload,
      });
      if (callback) callback(response);
    },






    //结合
    * jiehe({ payload, callback }, { call, put }) {
      console.log('gfgfg');
      const response = yield call(jieheForms, payload);
      yield put({
        type: 'dont',
        payload: response,
      });
      if (callback) callback(response);
    },

    //修改请假条件
    * settiaojian({ payload, callback }, { call, put }) {
      const response = yield call(changgeguidingForms, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },


    //审批加急-审批撤回
    * chexiao({ payload, callback }, { call, put }) {
      const response = yield call(chexiaoForms, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    //审批过程
    * guocheng({ payload, callback }, { call, put }) {
      const response = yield call(guochengForms, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    //审批结果
    * tijiao({ payload, callback }, { call, put }) {
      const response = yield call(tijiaoForms, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    //历史记录
    * lishi({ payload, callback }, { call, put }) {
      const response = yield call(lishiForms, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 启用和禁用
    * startform({ payload, callback }, { call, put }) {
      const response = yield call(startForm, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },

    // 请假表单
    * qingjiaform({ payload, callback }, { call, put }) {
      const response = yield call(qingjiaForm, payload);
      yield put({
        type: 'qingjia',
        payload: response,
      });
      if (callback) callback(response);
    },

    //查询表格内容
    * examine({ payload, callback }, { call, put }) {
      const response = yield call(examineForm, payload);
      yield put({
        type: 'forms',
        payload: response,
      });
      if (callback) callback(response);
    },


    // 查看表单模块id
    * getfoMoId({ payload, callback }, { call, put }) {
      const response = yield call(getFormModu, payload);
      yield put({
        type: 'foMo',
        payload: response,
      });
      if (callback) callback(response);
    },

    //表单保存
    * saveform({ payload, callback }, { call, put }) {
      const response = yield call(saveformForms, payload);
      yield put({
        type: 'saveforms',
        payload: response,
      });
      if (callback) callback(response);
    },

    //表单保存
    * saveform2({ payload, callback }, { call, put }) {
      const response = yield call(saveformForms2, payload);
      yield put({
        type: 'saveforms',
        payload: response,
      });
      if (callback) callback(response);
    },


    // 表单删除
    * delform2({ payload, callback }, { call, put }) {
      const response = yield call(savedelForms, payload);
      yield put({
        type: 'deldelforms',
        payload: response,
      });
      if (callback) callback(response);
    },



    //获取审批id
    * fetchshenpi({ payload, callback }, { call, put }) {
      const response = yield call(fetchshenpiForms, payload);
      yield put({
        type: 'shenpi',
        payload: response,
      });
      if (callback) callback(response);
    },


    //审批条件设置
    * fetchtiaojian({ payload, callback }, { call, put }) {
      const response = yield call(fetchtiaojianForms, payload);
      yield put({
        type: 'fetchtiao',
        payload: response,
      });
      if (callback) callback(response);
    },

    //保存审批条件
    * savetiaojian({ payload, callback }, { call, put }) {
      const response = yield call(savetiaojianForms, payload);
      yield put({
        type: 'fetchtiaojians',
        payload: response,
      });
      if (callback) callback(response);
    },

    //规则表单列表
    * ruleform({ payload, callback }, { call, put }) {
      const response = yield call(ruleformForms, payload);
      yield put({
        type: 'fetchtiaojians',
        payload: response,
      });
      if (callback) callback(response);
    },

    //发起的表单列表
    * getfaqi({ payload, callback }, { call, put }) {
      const response = yield call(getallModular, payload);
      yield put({
        type: 'fetchno',
        payload: response,
      });
      if (callback) callback(response);
    },

    * getjinxing({ payload, callback }, { call, put }) {
      const response = yield call(getjinxingModular, payload);
      yield put({
        type: 'fetchno',
        payload: response,
      });
      if (callback) callback(response);
    },

    //删除审批条件
    * removetiaojian({ payload, callback }, { call, put }) {
      const response = yield call(removeshenpiForms, payload);
      yield put({
        type: 'fetchtiaojians',
        payload: response,
      });
      if (callback) callback(response);
    },


    //审批保存
    * saveroval({ payload, callback }, { call, put }) {
      const response = yield call(saverovalForms, payload);
      yield put({
        type: 'saverovals',
        payload: response,
      });
      if (callback) callback(response);
    },

    //设置保存
    * savesetting({ payload, callback }, { call, put }) {
      const response = yield call(savesettingForms, payload);
      yield put({
        type: 'savesettings',
        payload: response,
      });
      if (callback) callback(response);
    },

    //确定是否需要弹出提示
    * onifsave({ payload, callback }, { call, put }) {
      const response = yield call(savesettingForms, payload);
      yield put({
        type: 'ifsaves',
        payload: payload,
      });
      if (callback) callback(response);
    },

    //填好表格后提交
    * faqiform({ payload, callback }, { call, put }) {
      const response = yield call(addformForms, payload);
      yield put({
        type: 'no',
        payload: payload,
      });
      if (callback) callback(response);
    },




    //预览显示
    * yulankey({ payload, callback }, { call, put }) {
      const response = yield call(savesettingForms, payload);
      yield put({
        type: 'yulan',
        payload: payload,
      });
      if (callback) callback(response);
    },
    //表单设置好后存到redux
    * readysave({ payload, callback }, { call, put }) {
      const response = yield call(savesettingForms, payload);
      yield put({
        type: 'baocunform',
        payload: payload,
      });
      if (callback) callback(response);
    },

  },

  reducers: {
    appro(state, action) {
      return {
        ...state,
        approCon: action.payload,
      };
    },
    forms(state, action) {
      return {
        ...state,
        formId: action.payload,
      };
    },
    foMo(state, action) {
      return {
        ...state,
        foMoId: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveforms(state, action) {
      return {
        ...state,
        formsave: action.payload,
      };
    },
    saverovals(state, action) {
      return {
        ...state,
        rovalsave: action.payload,
      };
    },

    savesettings(state, action) {
      return {
        ...state,
        settingsave: action.payload,
      };
    },

    yulan(state, action) {
      return {
        ...state,
        yulan: action.payload.yulankey,
      };
    },
    baocunform(state, action) {
      return {
        ...state,
        baocunform: action.payload.datas,
      };
    },

    ifsaves(state, action) {
      return {
        ...state,
        ifsave: action.payload.ifsave,
      };
    },
    shenpi(state, action) {
      return {
        ...state,
        shenpi: action.payload.datas.content,
      };
    },
    fetchtiao(state, action) {
      return {
        ...state,
        shenpi: action.payload.result[0].content,
      };
    },

    rule_id(state, action) {
      return {
        ...state,
        rule_id: action.payload.data,
      };
    },
    modular_id(state, action) {
      return {
        ...state,
        modular_id: action.payload.datas,
      };
    },

  },
};
