const state = () => ({
  username: "未登录",
  phoneNumber: "",
  status: "", //STUDENT || ENTERPRISE
  password: "",
  isLogin: false,
  // avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  avatar: "",
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
    state.status = '';
  },
  setStatus(state, status) {
    state.status = status;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
