<template>
  <div>
    登录
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('users/loginAsync');
    },
  },
};
</script>

<style></style>
