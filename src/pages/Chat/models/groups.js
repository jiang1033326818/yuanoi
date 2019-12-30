import { getGroupList,getGroups,getGroupInfos,inGroups,resetGroupNames } from '@/services/api';

export default {
  namespace: 'groups',

  state: {
    grouplist:[],
    newGroup:{group:''},
    groupUser:[],
    isGroupShow:false,
    isadd:false,
    reName:'',
    spin:true,
  },

  effects: {
    *fetch({payload,callback},{call,put}) {
        const res = yield call(getGroupList,payload);
        // console.log(res,'getGroupList');
        yield put({
            type:"save",
            payload: res.result
        })
        if (callback) callback(res);
    },
    *add({payload,callback},{call,put}) {
        const res = yield call(getGroups,payload);
        // console.log(res,'getGroups');
        yield put({
            type:"save1",
            payload: res.result
        })
        if (callback) callback(res);
    },
    *groupInfo({payload,callback},{call,put}) {
        const res = yield call(getGroupInfos,payload);
        // console.log(payload,'groupInfo')
        yield put({
            type:"save2",
            payload: payload
        })
        if (callback) callback(res);
    },
    *addUser({payload,callback},{call,put}) {
        const res = yield call(inGroups,payload);
        // console.log(res,'inGroups');
        yield put({
            type:"save3",
            payload: res.result
        })
        if (callback) callback(res);
    },
    *show({payload,callback},{call,put}) {
        // console.log(payload,'show');
        yield put({
            type:"save4",
            payload: payload
        })
        if (callback) callback(res);
    },
    *reset({payload,callback},{call,put}) {
        const res = yield call(resetGroupNames,payload);
        // console.log(res,payload,'resetGroupNames');
        yield put({
            type:"save5",
            payload: payload
        })
        if (callback) callback(res);
    },
    *adds({payload,callback},{call,put}) {
        // console.log(payload,'adds');
        yield put({
            type:"save6",
            payload: payload
        })
        if (callback) callback(res);
    },

    *last2({payload,callback},{call,put}) {
      // console.log(payload,'lastmsg----')
      yield put({
        type:"save7",
        payload: payload
      })
      if (callback) callback(res);
    },
  },

  reducers: {
    save(state, action) {
        return {
            ...state,
            grouplist:action.payload
        };
    },
    save1(state, action) {
        return {
            ...state,
            newGroup:action.payload
        };
    },
    save2(state, action) {
        return {
            ...state,
            groupUser:action.payload
        };
    },
    save4(state, action) {
        return {
            ...state,
            isGroupShow:action.payload
        };
    },
    save5(state, action) {
        return {
            ...state,
            reName:action.payload
        };
    },
    save6(state, action) {
        return {
            ...state,
            isadd:action.payload
        };
    },
    save7(state, action) {
      return {
        ...state,
        spin:action.payload
      };
    },
  },
};
