import { queryZuzhi, removeZuzhi, addZuzhi, updateZuzhi } from '@/services/api';

export default {
  namespace: 'zuzhi',

  state: {
    data: {
      code: 0,
      result: [],
    },

  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryZuzhi, payload);
      console.log('测试来没来', payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addZuzhi, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeZuzhi, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateZuzhi, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback(response);
    },


  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
