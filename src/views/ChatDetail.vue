<template>
  <div class="chat-detail">
    <el-page-header @back="goBack" :content="`与 ${$route.params.name} 的聊天`">
    </el-page-header>
    <div class="chat-main">
      <ul class="session-list">
        <li v-for="(item, index) in sessionList" :key="index">
          <session-item
            :fromAvatar="users.avatar"
            :toAvatar="$route.params.avatar"
            :isMine="item.isMine"
            :content="item.content"
          />
        </li>
      </ul>
    </div>
    <div class="chat-input">
      <div class="input-card">
        <div class="menu">
          <div class="menu-list"></div>
          <el-button class="send-button" type="primary" @click="onSend">
            发送
          </el-button>
        </div>
        <div class="input">
          <el-input
            type="textarea"
            placeholder="请输入聊天内容"
            v-model="inputText"
            resize="none"
            style="height: 100%"
          >
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import SessionItem from "../components/SessionItem.vue";

export default {
  components: {
    SessionItem,
  },
  mounted() {
    // console.log(this.$route.params);
    if (Object.getOwnPropertyNames(this.$route.params).length == 0) {
      this.$router.push({ name: "Chat" });
    } else {
      this.sessionId = this.$route.params.sessionId;
      this.getHistory();
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
      websocket: (state) => state.websocket,
    }),
    msgList() {
      return this.websocket.msgList;
    },
  },
  watch: {
    msgList() {
      // console.log(this.websocket.msgList);
      const list = this.websocket.msgList.filter(
        (e) => e.sessionId == this.sessionId
      );
      list.forEach((e) => {
        this.sessionList.push({
          isMine: e.fromId == this.users.id,
          content: e.message.split("\n"),
        });
      });
      if (list.length !== 0) {
        this.$store.commit("websocket/popMsgList", this.sessionId);
      }
    },
  },
  data() {
    return {
      sessionId: "",
      inputText: "",
      sessionList: [],
    };
  },
  methods: {
    formatTime(time) {
      let d = new Date(time);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) +
        " " +
        (d.getHours() > 9 ? d.getHours() : "0" + d.getHours()) +
        ":" +
        (d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()) +
        ":" +
        (d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds())
      );
    },
    goBack() {
      this.$router.push("/chat");
    },
    onSend() {
      if (this.inputText === "") {
        return;
      }
      const message = this.inputText.split("\n").join("\\\\n");
      const fromId = this.users.id;
      const toId = this.$route.params.userId;
      const datetime = this.formatTime(new Date());
      const msg =
        '{"sessionId":"' +
        this.sessionId +
        '", "fromId":"' +
        fromId +
        '", "toId":"' +
        toId +
        '", "message":"' +
        message +
        '", "datetime":"' +
        datetime +
        '"}';
      this.$store.commit("websocket/send", msg);
      this.sendMessage(msg);
      this.inputText = "";
    },
    sendMessage(msg) {
      const param = JSON.parse(msg);
      // console.log(param);
      axios
        .get("/Chat/sendMessage", {
          params: param,
        })
        .then(() => {
          // console.log(res);
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络");
        });
    },
    getHistory() {
      axios
        .get("/Chat/getHistory", {
          params: {
            sessionId: this.$route.params.sessionId,
            user1Id: this.users.id,
            user2Id: this.$route.params.userId,
          },
        })
        .then((res) => {
          // console.log(res);
          const list = res.data.message.history;
          this.sessionId = res.data.message.sessionId;
          this.sessionList = [];
          list.forEach((e) => {
            this.sessionList.push({
              isMine: Boolean(parseInt(e.isMine)),
              content: e.content.split("\n"),
            });
          });
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络");
        });
    },
  },
};
</script>

<style lang="scss">
.chat-detail {
  position: relative;
  height: 100%;

  .el-page-header {
    position: fixed;
    top: 80px;
    background-color: white;
  }
  .chat-main {
    position: absolute;
    width: 100%;
    height: 60%;
    overflow-y: scroll;
    top: 10%;

    .session-list {
      overflow: hidden;

      li {
        list-style-type: none;
        margin-top: 10px;

        .session-item {
          display: flex;
          justify-content: flex-start;

          .chat-pop {
            margin-left: 10px;
            max-width: 60%;
            background-color: white;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;

            p {
              word-break: break-all;
              text-align: left;
              margin: 5px 15px;
            }
          }
        }
        .session-item.mine {
          display: flex;
          justify-content: flex-end;

          .chat-pop {
            margin-right: 10px;
            max-width: 60%;
            background-color: #aaa1ce;
            border: 1px solid #aaa1ce;
            border-radius: 10px;
            display: flex;
            align-items: center;

            p {
              word-break: break-all;
              text-align: left;
              margin: 5px 15px;
            }
          }
          .el-avatar {
            margin-right: 10px;
          }
        }
      }
      li:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .chat-main::-webkit-scrollbar {
    width: 6px;
  }
  .chat-main::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  .chat-main::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  .chat-input {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;

    .input-card {
      margin: 5px;
      height: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      .menu {
        width: 100%;
        height: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .send-button {
          height: 80%;
          max-height: 40px;
        }
        .menu-list {
          height: 80%;
          max-height: 50px;
        }
      }
      .input {
        height: 70%;

        .el-input {
          height: 100%;
        }
        textarea {
          height: 100%;
        }
      }
    }
  }
}
</style>
