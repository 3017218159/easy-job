<template>
  <div>
    <h1>this is 招聘广场</h1>
    <el-button @click="toChat">
      chat
    </el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toChat() {
      this.$router.push("/chat");
    },
  },
};
</script>

<style></style>
