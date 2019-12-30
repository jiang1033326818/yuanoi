import { fakeRegister } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: {
      message:"无效的电话号码",
      status:"4000003"
    },
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      console.log(333,payload)
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();

      return {
        ...state,
        status: payload,
      };
    },
  },
};
