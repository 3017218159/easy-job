import { Message } from "element-ui";

const url = "ws://localhost:8080/easy-job-back/websocket/";
const state = () => ({
  ws: null,
  msgList: [],
});

const mutations = {
  init(state, userId) {
    if ("WebSocket" in window) {
      state.ws = new WebSocket(url + userId);
      state.ws.onopen = () => {
        console.log("用户" + userId + "连接至websocket");
      };
      state.ws.onmessage = (res) => {
        // 处理收到的消息
        const data = JSON.parse(res.data);
        // console.log(data);
        state.msgList.push(data);
      };
      state.ws.onerror = (e) => {
        Message({
          message: "ws错误：" + e.message,
          type: "error",
          duration: 3000,
        });
      };
      state.ws.onclose = (e) => {
        console.log("用户" + userId + "断开websocket连接");
        console.log(e);
      };
    } else {
      Message.error("该浏览器不支持WebSocket，请使用Chrome浏览器");
    }
  },
  send(state, msg) {
    state.ws.send(msg);
  },
  close(state) {
    console.log("调用close");
    state.ws.close();
  },
  popMsgList(state, sessionId) {
    state.msgList = state.msgList.filter((e) => e.sessionId != sessionId);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
