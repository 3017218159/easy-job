<template>
  <el-container>
    <el-aside width="200px">
      <el-menu class="nav">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
      <div class="title">
        <img src="../assets/icon.png" />
      </div>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>
          <div class="username">王小虎</div>
          <el-dropdown @command="handleCommand">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
export default {
  methods: {
    handleCommand(command) {
      if(command === 'logout'){
        this.$store.dispatch("users/logoutAsync");
      }
    }
  }
};
</script>

<style lang="scss">
.el-container {
  height: 100vh;

  .el-header {
    background-color: rgb(170, 161, 206);

    span {
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

      .el-submenu:nth-child(1) {
        margin-top: 60px;
      }
    }
  }
  .el-aside::-webkit-scrollbar {
    display: none;
  }
}
</style>