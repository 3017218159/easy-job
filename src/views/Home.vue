<template>
  <el-container class="home-container">
    <el-aside width="200px">
      <el-menu
        class="nav"
        :router="true"
        default-active="/"
        v-if="users.status === 'STUDENT'"
      >
        <el-menu-item index="/">
          <i class="el-icon-news"></i>
          <span slot="title">招聘广场</span>
        </el-menu-item>
        <el-menu-item index="/chat">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">聊天列表</span>
        </el-menu-item>
        <el-menu-item index="/person">
          <i class="el-icon-user"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="/release">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">电子简历</span>
        </el-menu-item>
      </el-menu>
      <el-menu class="nav" :router="true" :default-active="$route.path" v-else>
        <el-menu-item index="/">
          <i class="el-icon-news"></i>
          <span slot="title">招聘广场</span>
        </el-menu-item>
        <el-menu-item index="/release">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">发布信息</span>
        </el-menu-item>
        <el-menu-item index="/chat">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">聊天列表</span>
        </el-menu-item>
        <el-menu-item index="/person">
          <i class="el-icon-user"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
      </el-menu>
      <div class="title">
        <img src="../assets/icon.png" />
      </div>
    </el-aside>

    <el-container>
      <el-header class="home-header" style="text-align: right; font-size: 12px">
        <span class="avatar-group">
          <div class="username">{{ users.username }}</div>
          <el-dropdown @command="handleCommand">
            <Avatar :imgUrl="users.avatar" />
            <!-- <el-avatar v-if="users.avatar" :src="users.avatar"></el-avatar>
            <el-avatar v-else icon="el-icon-user-solid"></el-avatar> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Avatar from '../components/Avatar.vue';

export default {
  components: { Avatar },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("users/logoutAsync");
        this.$store.commit("websocket/close");
      }
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
};
</script>

<style lang="scss">
.home-container {
  height: 100vh;

  .home-header {
    background-color: rgb(170, 161, 206);

    .avatar-group {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .username {
        display: inline-block;
      }
      .el-avatar {
        height: 40px;
        width: 40px;
        margin-left: 10px;
      }
    }
  }
  .el-aside {
    height: 100vh;

    .title {
      top: 0;
      width: 200px;
      height: 60px;
      background-color: rgb(170, 161, 206);
      position: fixed;

      img {
        height: 50px;
        width: 180px;
        margin-top: 5px;
        margin-left: 20px;
      }
    }
    .nav {
      min-height: 100vh;

      .el-menu-item:nth-child(1) {
        margin-top: 60px;
      }
    }
  }
  .el-aside::-webkit-scrollbar {
    display: none;
  }
}
</style>
