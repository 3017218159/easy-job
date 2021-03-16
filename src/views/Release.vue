<template>
  <el-form
    class="release-form"
    ref="form"
    :rules="rules"
    :model="form"
    label-width="100px"
  >
    <el-form-item label="公司" prop="company">
      <el-input v-model="form.company"></el-input>
    </el-form-item>
    <el-form-item label="职位" prop="position">
      <el-input v-model="form.position"></el-input>
    </el-form-item>
    <el-form-item label="职位描述" prop="discribe">
      <el-input type="textarea" v-model="form.discribe"></el-input>
    </el-form-item>
    <el-form-item label="职位要求" prop="requirement">
      <el-input type="textarea" v-model="form.requirement"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">发布</el-button>
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
      rules: {
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        position: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
        ],
        discribe: [
          { required: true, message: "请输入职位描述", trigger: "blur" },
        ],
        requirement: [
          { required: true, message: "请输入职位要求", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
