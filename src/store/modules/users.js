const state = () => ({
  username: "未登录",
  id: "",
  type: "",
  password: "",
  isLogin: false,
});
const actions = {
  loginAsync({ commit }) {
    //发出异步请求

    commit("login");
  },
  logoutAsync({ commit }) {
    //发出异步请求

    commit("logout");
  }
};
const mutations = {
  login(state) {
    state.isLogin = true;
  },
  logout(state) {
    state.isLogin = false;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
