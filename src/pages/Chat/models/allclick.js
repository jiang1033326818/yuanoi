import { getToken } from '@/services/api';

export default {
  namespace: 'allclick',

  state: {
    showEmoji:false,
    showHistory:false,
    showMore:false
  },

  effects: {
    *emoji({payload,callback},{call,put}) {
        // console.log(payload,'emoji');
        yield put({
            type:"save",
            payload: payload
        })
        if (callback) callback(res);
    },
    *history({payload,callback},{call,put}) {
        // console.log(payload,'showHistory');
        yield put({
            type:"save1",
            payload: payload
        })
        if (callback) callback(res);
    },
    *more({payload,callback},{call,put}) {
        // console.log(payload,'more')
        yield put({
            type:"save2",
            payload: payload
        })
        if (callback) callback(res);
    },
  },

  reducers: {
    save(state, action) {
        return {
            ...state,
            showEmoji:action.payload
        };
    },
    save1(state, action) {
        return {
            ...state,
            showHistory:action.payload
        };
    },
    save2(state, action) {
        return {
            ...state,
            showMore:action.payload
        };
    },
  },
};
