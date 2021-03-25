import axios from "axios";

const state = () => ({
  id: 0,
  username: "未登录",
  phoneNumber: "",
  status: "", //STUDENT || ENTERPRISE
  password: "",
  isLogin: false,
  // avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  avatar: "",
});
const actions = {
  loginAsync({ commit }, phoneNumber) {
    console.log(phoneNumber);
    //发出异步请求
    axios.get('http://localhost:8080/easy-job-back/Users/getUsers', {
      params: {
        phoneNumber,
      }
    }).then((res) => {
      console.log(res);
      let data;
      if (typeof res.data === 'string') {
        data = JSON.parse(res.data);
      } else {
        data = res.data;
      }
      if (data.status && data.status === 'error') {
        throw new Error(data.message);
      }
      commit("setUsers", data);
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
