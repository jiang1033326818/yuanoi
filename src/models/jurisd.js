import { getPanels,addPanUser,getDept,addDept } from '@/services/api';
  
  export default {
    namespace: 'jurisd',
  
    state: {
      panel: [],
    },
  
    effects: {
      *fetch({ payload, callback }, { call, put }) {
        const res = yield call(getPanels, payload);
        yield put({
            type: 'save',
            payload: res.result,
        });
        if (callback) callback(res);
      },
      *addp({ payload, callback }, { call, put }) {
        const res = yield call(addPanUser, payload);
        yield put({
            type: 'save1',
            payload: res.result,
        });
        if (callback) callback(res);
      },
      *fetchd({ payload, callback }, { call, put }) {
        const res = yield call(getDept, payload);
        yield put({
            type: 'save1',
            payload: res.result,
        });
        if (callback) callback(res);
      },
      *addd({ payload, callback }, { call, put }) {
        const res = yield call(addDept, payload);
        yield put({
            type: 'save1',
            payload: res.result,
        });
        if (callback) callback(res);
      },
      
    },
  
    reducers: {
        save(state, action) {
            return {
                ...state,
                panel: action.payload,
            };
        },
    },
  };
  