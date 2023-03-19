import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      // versionChangeNum: 0, //版本变化的依据
      userInfo: {}, //登录后的用户信息
      token: '', //token凭证
      // propertyJson: {}, // {name: label} 用来汇总所有的字段编码和字段描述的
    };
  },

  mutations: {
    // versionChange(state) {
    //   state.versionChangeNum++;
    // },
    userInfo(state, obj) {
      state.userInfo = obj;
    },
    token(state, value) {
      state.token = value;
    },
  },
  actions: {
    // increment(context) {
    //   context.commit('increment');
    // },
    userInfoActions(store, obj) {
      store.commit('userInfo', obj);
    },
    tokenActions(store, value) {
      store.commit('token', value);
    },
  },
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['userInfo', 'token'], // 只持久化这几个state
    }),
  ],
});

export default store;
