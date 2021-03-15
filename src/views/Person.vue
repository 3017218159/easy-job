<template>
  <el-form
    class="person-form"
    ref="form"
    :model="studentForm"
    label-width="100px"
    v-if="users.status === 'STUDENT'"
  >
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="studentForm.avatar"
          :src="studentForm.avatar"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="studentForm.name" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select
        v-model="studentForm.sex"
        placeholder="请选择性别"
        style="width: 100%;"
        :disabled="isEdit"
      >
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="studentForm.birth"
        style="width: 100%;"
        :disabled="isEdit"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="学校">
      <el-input v-model="studentForm.school" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model="studentForm.major" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="职业技能">
      <el-input
        type="textarea"
        v-model="studentForm.skill"
        :disabled="isEdit"
      ></el-input>
    </el-form-item>
    <el-form-item label="实习/项目经历">
      <el-input
        type="textarea"
        v-model="studentForm.experience"
        :disabled="isEdit"
      ></el-input>
    </el-form-item>
    <el-form-item label="期望职位">
      <el-input v-model="studentForm.position" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
    </el-form-item>
  </el-form>
  <el-form
    class="person-form"
    ref="form"
    :model="enterpriseForm"
    label-width="100px"
    v-else
  >
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="enterpriseForm.avatar"
          :src="enterpriseForm.avatar"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="enterpriseForm.name" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select
        v-model="enterpriseForm.sex"
        placeholder="请选择性别"
        style="width: 100%;"
        :disabled="isEdit"
      >
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker
        type="date"
        placeholder="选择日期"
        v-model="enterpriseForm.birth"
        style="width: 100%;"
        :disabled="isEdit"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="公司">
      <el-input v-model="enterpriseForm.company" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="enterpriseForm.position" :disabled="isEdit"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ btnText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isEdit: true,
      btnText: "编辑",
      studentForm: {
        avatar: "",
        name: "",
        sex: "",
        birth: "",
        school: "",
        major: "",
        skill: "",
        experience: "",
        position: "",
      },
      enterpriseForm: {
        avatar: "",
        name: "",
        sex: "",
        birth: "",
        company: "",
        position: "",
      },
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  beforeMount() {
    // console.log(this.users);
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.users);
      if (this.isEdit) {
        this.isEdit = false;
        this.btnText = "提交";
      } else {
        if (this.users.status === "STUDENT") {
          this.$alert(
            "提交后你的信息将会被展示给企业招聘者，完善的信息有利于提高就业机会",
            "提示",
            {
              confirmButtonText: "确定",
            }
          );
        }
        this.isEdit = true;
        this.btnText = "编辑";
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      //   const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      //   if (!isJPG) {
      //     this.$message.error("上传头像图片只能是 JPG 格式!");
      //   }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>

<style lang="scss">
.person-form {
  width: 60%;
  margin-left: 20%;
  max-width: 500px;

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
}
</style>
