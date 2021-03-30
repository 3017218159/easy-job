import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import './style/element-variables.scss'

Vue.config.productionTip = false;

Vue.use(ElementUI);

axios.defaults.baseURL = 'http://localhost:8080/easy-job-back';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
