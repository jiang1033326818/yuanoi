import { getIcon } from '@/services/api';

export default {
  namespace: 'icon',

  state: {
    iconList:[]
  },

  effects: {
    *fetch({payload,callback},{call,put}) {
        const res = yield call(getIcon,payload);
        console.log(res,payload,'----');
        yield put({
          type:"save",
          payload: res.result
        })
        if(callback) callback(res);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        iconList:action.payload,
      };
    }
  },
};
