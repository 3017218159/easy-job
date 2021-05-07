import axios from "axios";

const state = () => ({
  id: 0,
  username: "蔡苟",
  phoneNumber: "",
  status: "", //STUDENT || ENTERPRISE
  password: "",
  isLogin: false,
  // isLogin: true,
  avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  // avatar: "",
});
const actions = {
  loginAsync({ commit }, data) {
    console.log(data);
    //发出异步请求
    axios.get('/Users/getUsers', {
      params: {
        email: data.email,
        status: data.status
      }
    }).then((res) => {
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
    state.status = '';
  },
  setStatus(state, status) {
    state.status = status;
  },
  setUsers(state, users) {
    state.id = users.id;
    state.username = users.username;
    state.password = users.password;
    state.phoneNumber = users.phoneNumber;
    state.status = users.status;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
