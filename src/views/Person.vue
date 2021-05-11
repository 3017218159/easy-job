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
        action="http://localhost:8080/easy-job-back/Person/updateAvatar"
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
    <!-- <el-form-item label="职业技能">
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
    </el-form-item> -->
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
        action="http://localhost:8080/easy-job-back/Person/updateAvatar"
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
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isEdit: true,
      btnText: "编辑",
      imageUrl: "",
      studentForm: {
        avatar: "",
        name: "",
        sex: "",
        birth: "",
        school: "",
        major: "",
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
  mounted() {
    // console.log(this.$store.state.users);
    if (this.users.id !== 0) {
      this.getPersonInfo();
    } else {
      let interval = setInterval(() => {
        if (this.users.id !== 0) {
          this.getPersonInfo();
          clearInterval(interval);
        }
      }, 1000);
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  methods: {
    formatTime(time) {
      let d = new Date(time);
      return (
        d.getFullYear() +
        "-" +
        ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : ("0" + (d.getMonth() + 1))) +
        "-" +
        (d.getDate() > 9 ? d.getDate() : ("0" + d.getDate())) +
        " " +
        (d.getHours() > 9 ? d.getHours() : ("0" + d.getHours())) +
        ":" +
        (d.getMinutes() > 9 ? d.getMinutes() : ("0" + d.getMinutes())) +
        ":" +
        (d.getSeconds() > 9 ? d.getSeconds() : ("0" + d.getSeconds()))
      );
    },
    onSubmit() {
      if (this.isEdit) {
        this.isEdit = false;
        this.btnText = "提交";
      } else {
        this.$confirm("确定提交修改？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            // console.log('ok');
            if (this.users.status === "STUDENT") {
              this.updatePersonInfo(this.studentForm, "STUDENT");
            } else if (this.users.status === "ENTERPRISE") {
              this.updatePersonInfo(this.enterpriseForm, "ENTERPRISE");
            }
          })
          .catch(() => {
            // console.log('no');
            this.getPersonInfo();
          });
        this.isEdit = true;
        this.btnText = "编辑";
      }
    },
    getPersonInfo() {
      axios
        .get("/Person/getUserInfo", {
          params: {
            userId: this.users.id,
            status: this.users.status,
          },
        })
        .then((res) => {
          // console.log(res);
          this.studentForm = res.data.message;
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络");
        });
    },
    updatePersonInfo(info, status) {
      axios
        .get("/Person/updateUserInfo", {
          params: Object.assign({}, info, {
            status,
            birth: this.formatTime(info.birth),
          }),
        })
        .then((res) => {
          console.log(res);
          this.getPersonInfo();
        })
        .catch(() => {
          this.$message.error("请求失败，请检查网络");
        });
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
      console.log("file", file);
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
