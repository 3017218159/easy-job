<template>
  <div>
    <h1>this is chat</h1>
    <el-button @click="toInfo">
      info
    </el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toInfo() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
