<template>
  <el-form class="release-form" ref="form" :model="form" label-width="100px">
    <el-form-item label="公司">
      <el-input v-model="form.company"></el-input>
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="form.position"></el-input>
    </el-form-item>
    <el-form-item label="职位描述">
      <el-input type="textarea" v-model="form.discribe"></el-input>
    </el-form-item>
    <el-form-item label="职位要求">
      <el-input type="textarea" v-model="form.requirement"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        company: "",
        position: "",
        discribe: "",
        requirement: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang="scss">
.release-form {
  width: 60%;
  margin-left: 20%;
  max-width: 500px;
}
</style>
