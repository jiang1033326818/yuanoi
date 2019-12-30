import { getToken,searchUser } from '@/services/api';

export default {
  namespace: 'chatabout',

  state: {
    nowToken:'',
    nowChoose:{},
    chatList:[],
    lastList:[],
    searchList:[],
    spin:true
  },

  effects: {
    *fetch({payload,callback},{call,put}) {
        const res = yield call(searchUser,payload);
        //   console.log(res,'searchList');
        yield put({
            type:"save0",
            payload: res.result
        })
        if (callback) callback(res);
    },
    *getToken({payload,callback},{call,put}) {
        const res = yield call(getToken,payload);
        // console.log(res,'getToken');
        yield put({
            type:"save",
            payload: res.result.token?res.result.token:''
        })
        if (callback) callback(res);
    },
    *choose({payload,callback},{call,put}) {
        // const res = yield call(getToken,payload);
        // console.log(res,'getChoose');
        yield put({
            type:"save1",
            payload: payload
        })
        if (callback) callback(res);
    },
    *chats({payload,callback},{call,put}) {
        // console.log(payload,'payload')
        yield put({
            type:"save2",
            payload: payload
        })
        if (callback) callback(res);
    },
    *last({payload,callback},{call,put}) {
        // console.log(payload,'lastmsg----')
        yield put({
            type:"save3",
            payload: payload
        })
        if (callback) callback(res);
    },

  },

  reducers: {
    save0(state, action) {
        return {
            ...state,
            searchList:action.payload
        };
    },
    save(state, action) {
        return {
            ...state,
            nowToken:action.payload
        };
    },
    save1(state, action) {
        return {
            ...state,
            nowChoose:action.payload
        };
    },
    save2(state, action) {
        return {
            ...state,
            chatList:action.payload
        };
    },
    save3(state, action) {
        return {
            ...state,
            lastList:action.payload
        };
    },

  },
};
