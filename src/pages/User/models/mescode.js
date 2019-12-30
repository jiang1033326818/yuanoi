import { fakeCode } from '@/services/api';

export default {
  namespace: 'messagecode',

  state: {
    status: {
      message:"无效的电话号码",
      status:"400"
    },
  },

  effects: {
    *send({ payload }, { call, put }) {
      const response = yield call(fakeCode, payload);
      yield put({
        type: 'registerHandle2',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle2(state, { payload }) {
      return {
        ...state,
        status: payload,
      };
    },
  },
};
