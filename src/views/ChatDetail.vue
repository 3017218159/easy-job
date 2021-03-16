<template>
  <div class="chat-detail">
    <el-page-header @back="goBack" :content="`与 ${toName} 的聊天`">
    </el-page-header>
    <div class="chat-main">
      <ul class="session-list">
        <li>aaa</li>
      </ul>
    </div>
    <div class="chat-input">
      <div class="input-card">
        <div class="menu">
          <div class="menu-list"></div>
          <el-button class="send-button" type="primary" @click="onSend"
            >发送</el-button
          >
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
export default {
  data() {
    return {
      toName: this.$route.query.toName,
      fromAvatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      toAvatar: "",
      inputText: "",
      sessionList: [
        {
          isMine: true,
          content: "hello",
        },
        {
          isMine: false,
          content: "hello",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/chat");
    },
    onSend() {
      console.log("send");
      this.inputText = "";
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
