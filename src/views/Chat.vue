<template>
  <div>
    <el-table
      :data="chatList"
      :show-header="false"
      @row-click="toChatDetail"
      style="width: 100%"
    >
      <el-table-column prop="avatar" width="60">
        <template slot-scope="scope">
          <Avatar :imgUrl="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" width="100"> </el-table-column>
      <el-table-column prop="content"> </el-table-column>
      <el-table-column prop="time" fixed="right" width="200" align="right">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Avatar from "../components/Avatar.vue";

export default {
  components: { Avatar },
  data() {
    return {
      chatList: [],
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  mounted() {
    if (this.users.id !== 0) {
      this.getChatList();
    } else {
      let interval = setInterval(() => {
        if (this.users.id !== 0) {
          this.getChatList();
          clearInterval(interval);
        }
      }, 1000);
    }
  },
  methods: {
    formatTime(time) {
      const d = new Date(time);
      const today = new Date();
      if (today.getFullYear() === d.getFullYear()) {
        if (
          today.getMonth() === d.getMonth() &&
          today.getDate() === d.getDate()
        ) {
          return d.getHours() + ":" + d.getMinutes();
        } else if (
          today.getMonth() === d.getMonth() &&
          d.getDate() + 1 === today.getDate()
        ) {
          return "昨天 " + d.getHours() + ":" + d.getMinutes();
        } else {
          return (
            d.getMonth() +
            1 +
            "-" +
            d.getDate() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes()
          );
        }
      } else {
        return (
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes()
        );
      }
    },
    toChatDetail(row) {
      // console.log(row);
      this.$router.push({
        name: "ChatDetail",
        params: {
          sessionId: row.sessionId,
          userId: row.userId,
          avatar: row.avatar,
          name: row.name,
        },
      });
    },
    getChatList() {
      axios
        .get("/Chat/getChatList", {
          params: {
            id: this.users.id,
            status: this.users.status,
          },
        })
        .then((res) => {
          console.log(res);
          const list = res.data.message;
          this.chatList = [];
          list.forEach((e) => {
            this.chatList.push({
              sessionId: e.sessionId,
              userId: e.userId,
              name: e.name,
              avatar: e.avatar,
              content: e.message === "null" ? "" : e.message,
              time: e.datetime === "null" ? "" : this.formatTime(e.datetime),
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

<style></style>
