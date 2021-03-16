<template>
  <el-avatar v-if="imgUrl" :src="imgUrl"></el-avatar>
  <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
</template>

<script>
export default {
  props: {
      imgUrl: String,
  }
};
</script>

