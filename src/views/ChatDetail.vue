<template>
  <div class="chat-detail">
    <el-page-header @back="goBack" :content="`与 ${toName} 的聊天`">
    </el-page-header>
    <div class="chat-main">
      <ul class="session-list">
        <li v-for="(item, index) in sessionList" :key="index">
          <session-item
            :fromAvatar="fromAvatar"
            :toAvatar="toAvatar"
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
import SessionItem from "../components/SessionItem.vue";

export default {
  components: {
    SessionItem,
  },
  mounted() {
    console.log(this.$route.query);
    this.toName = this.$route.query.toName;
    this.toName = "王五";
  },
  data() {
    return {
      toName: "this.$route.query.toName",
      fromAvatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      toAvatar: "https://img0.baidu.com/it/u=229157680,1590894473&fm=26&fmt=auto&gp=0.jpg",
      inputText: "",
      sessionList: [
        {
          isMine: true,
          content: ["您好，我是田金大学软件工程专业的蔡苟，想向您了解一下这个职位"],
        },
        {
          isMine: false,
          content: ["OK，我们是企鹅科技有限公司的游戏部门，正在急招游戏开发工程师"],
        },
        {
          isMine: false,
          content: ["我看到您这边的信息比较适合我们的岗位，方便发一份简历过来吗"],
        },
        {
          isMine: true,
          content: ["好的，谢谢您"],
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
      if (this.inputText === "") {
        return;
      }
      this.sessionList.push({
        isMine: true,
        content: this.inputText.split('\n'),
      });
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
