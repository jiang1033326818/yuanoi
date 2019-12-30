import { getMen, } from '@/services/api';

export default {
    namespace: 'capitals',

    state: {
        menList:[],
    },

    effects: {
        *fetch({payload,callback},{call,put}) {
            const res = yield call(getMen,payload);
            yield put({
                type:"save",
                payload: payload
            })
            if (callback) callback(res);
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                menList:action.payload
            };
        }
    },
};
