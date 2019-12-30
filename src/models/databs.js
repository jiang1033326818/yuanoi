import {
  getcommenData,
  tabledata,
  tabletypes,
  shujuyuan,
  databsset,
  datatututu,
} from '@/services/api';

export default {
  namespace: 'databs',

  state: {
    data:[],

  },

  effects: {
    * stepa({ payload, callback }, { call, put }) {
      const response = yield call(getcommenData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    * fetch({ payload, callback }, { call, put }) {
      const response = yield call(tabledata, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    * tabletype({ payload, callback }, { call, put }) {
      const response = yield call(tabletypes, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    * datayuan({ payload, callback }, { call, put }) {
      const response = yield call(shujuyuan, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    * submit({ payload, callback }, { call, put }) {
      const response = yield call(databsset, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    * tututu({ payload, callback }, { call, put }) {
      const response = yield call(datatututu, payload);
      yield put({
        type: 'save',
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
