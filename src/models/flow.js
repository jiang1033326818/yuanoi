import {
  getPanel,
  getDefault,
  getModular,
  addModular,
  delModular,
  copyModular,
  modularlist,
} from '@/services/api';

export default {
  namespace: 'flow',

  state: {
    panel: [],
    useList: [],
    noUseList: [],
    modelIdInit:''
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const res = yield call(getModular, payload);
      if (payload.status == 0) {
        yield put({
          type: 'noUse',
          payload: res.result,
        });
      } else {
        yield put({
          type: 'used',
          payload: res.result,
        });
      }
      if (callback) callback(res);
    },

    *fetchpro({ payload, callback }, { call, put }) {
      const res = yield call(modularlist, payload);
      console.log(res,'查询列表')
      yield put({
        type: 'adds',
        payload: res.result.modular_id,
      });
      if (callback) callback(res);
    },
    *add({ payload, callback }, { call, put }) {
      const res = yield call(addModular, payload);
      console.log(res,'add')
      yield put({
        type: 'adds',
        payload: res.result.modular_id,
      });
      if (callback) callback(res);
    },
    *del({ payload, callback }, { call, put }) {
      const res = yield call(delModular, payload);
      console.log(res,'del')
      yield put({
        type: 'dels',
        payload: res.result,
      });
      if (callback) callback(res);
    },
    *default({ payload, callback }, { call, put }) {
      const res = yield call(getDefault, payload);
      yield put({
        type: 'save',
        payload: res,
      });
      if (callback) callback(res);
    },
    *copy({ payload, callback }, { call, put }) {
      const res = yield call(copyModular, payload);
      console.log(res, payload, 'copy');
      yield put({
        type: 'clone',
        payload: res.result,
      });
      if (callback) callback(res);
    },
  },

  reducers: {
    adds(state, action) {
      return {
        ...state,
        modelIdInit: action.payload,
      };
    },
    used(state, action) {
      return {
        ...state,
        useList: action.payload,
      };
    },
    noUse(state, action) {
      return {
        ...state,
        noUseList: action.payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        panel: action.payload,
      };
    },
  },
};
