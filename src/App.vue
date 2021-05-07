<template>
  <div id="app">
    <div v-if="!users.isLogin">
      <Login />
    </div>
    <div v-else>
      <Home />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Login from './views/Login.vue';
import Home from './views/Home.vue';

export default {
  components: { 
    Login,
    Home,
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  beforeDestroy () {
    console.log('byebye');
    this.$store.dispatch("users/logoutAsync");
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
