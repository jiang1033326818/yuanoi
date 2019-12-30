import { getUser,getNow,searchUser,huibaoxianZuzhi } from '@/services/api';

export default {
  namespace: 'userlist',

  state: {
    userlist:[],
    nowUser:[],
    souList:[],
    data5: {
      result:[]
    },
  },

  effects: {
    *fetch({payload,callback},{call,put}) {
        const res = yield call(getUser,payload);
        console.log(res,'----');
        if(!payload){
          yield put({
            type:"save",
            payload: res.result
          })
        }
        if (callback) callback(res);
    },
    *searchSome({payload,callback},{call,put}) {
        const res = yield call(searchUser,payload);
        // console.log(res,'----');
        yield put({
            type:"sou",
            payload: res.result
        })
        if (callback) callback(res);
    },
    *fetchnow({payload,callback},{call,put}) {
        const res = yield call(getNow,payload);
        // console.log(res,'++++');
        yield put({
            type:"savenow",
            payload: res.result
        })
        if (callback) callback(res);
    },

    //获取汇报线
    *huibaoxian({ payload, callback }, { call, put }) {
      const response = yield call(huibaoxianZuzhi, payload);
      yield put({
        type: 'save5',
        payload: response,
      });
      if (callback) callback();
    },

  },

  reducers: {
    save(state, action) {
        return {
            ...state,
            userlist:action.payload
        };
    },
    sou(state, action) {
        return {
            ...state,
            souList:action.payload
        };
    },
    savenow(state, action) {
        return {
            ...state,
            nowUser:action.payload
        };
    },
    save5(state, action) {
      return {
        ...state,
        data5: action.payload,
      };
    },
  },
};
