import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import InfoList from "../views/InfoList.vue";
import Chat from "../views/Chat.vue";
import ChatDetail from "../views/ChatDetail.vue";
import Person from "../views/Person.vue";
import Release from "../views/Release.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "InfoList",
    component: InfoList,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
  {
    path: "/chat/detail",
    name: "ChatDetail",
    component: ChatDetail,
  },
  {
    path: "/person",
    name: "Person",
    component: Person,
  },
  {
    path: "/release",
    name: "Release",
    component: Release,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
