import axios from "axios";

const state = () => ({
  id: 0,
  username: "未登录",
  email: "",
  status: "", //STUDENT || ENTERPRISE
  password: "",
  isLogin: false,
  avatar: "",
});
const actions = {
  loginAsync({ commit }, data) {
    // console.log(data);
    //发出异步请求
    axios.get('/Users/getUsers', {
      params: {
        email: data.email,
        status: data.status
      }
    }).then((res) => {
      // console.log('getUsers', res);
      let data;
      if (typeof res.data === 'string') {
        data = JSON.parse(res.data);
      } else {
        data = res.data;
      }
      if (data.status && data.status === 'error') {
        this.$message.error(data.message);
      } else if (data.status && data.status === 'success') {
        const users = data.message;
        commit("setUsers", users);
      }
    })
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
    state.id = 0;
    state.username = "未登录";
    state.password = "";
    state.email = "";
    state.status = "";
    state.avatar = "";
  },
  setStatus(state, status) {
    state.status = status;
  },
  setUsers(state, users) {
    state.id = users.id;
    state.username = users.username;
    state.password = users.password;
    state.email = users.email;
    state.status = users.status;
    state.avatar = users.avatar;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
