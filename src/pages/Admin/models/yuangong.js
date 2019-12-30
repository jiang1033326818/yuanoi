import { queryyuangong, removeyuangong, addyuangong, updateyuangong } from '@/services/api';

export default {
  namespace: 'yuangong',

  state: {
    data: {
      code:0,
      result:[]
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryyuangong, payload);
      console.log("测试来没来",payload)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addyuangong, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeyuangong, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateyuangong, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
      if (callback) callback();
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
