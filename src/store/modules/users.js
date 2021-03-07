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
};
const mutations = {
  login(state) {
    state.isLogin = true;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
