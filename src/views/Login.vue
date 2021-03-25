<template>
  <div class="login">
    <img src="../assets/icon.png" />
    <div class="user-status" v-if="users && !users.status">
      <h3>请选择你的身份</h3>
      <el-row>
        <el-button type="primary" @click="setUserStatus('STUDENT')"
          >学生</el-button
        >
        <el-button type="warning" @click="setUserStatus('ENTERPRISE')"
          >企业</el-button
        >
      </el-row>
    </div>
    <el-tabs type="border-card" v-else>
      <!--登录 tab -->
      <el-tab-pane label="登录">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          v-if="loginForm.type === 'PASS'"
        >
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input
              v-model="loginForm.phoneNumber"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('loginForm')"
              >登录</el-button
            >
            <el-button @click="switchLoginType">{{
              loginForm.switchContent
            }}</el-button>
          </el-form-item>
        </el-form>
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          v-else
        >
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input
              v-model="loginForm.phoneNumber"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              type="code"
              v-model="loginForm.code"
              autocomplete="off"
              style="width: 160px"
            ></el-input>
            <el-button
              @click.prevent="getCode(loginForm.phoneNumber, 'loginForm')"
              style="width: 110px"
              >获取验证码</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="switchLoginType">{{
              loginForm.switchContent
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--注册 tab -->
      <el-tab-pane label="注册">
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="100px"
        >
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input
              v-model="registerForm.phoneNumber"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              type="code"
              v-model="registerForm.code"
              autocomplete="off"
              style="width: 160px"
            ></el-input>
            <el-button
              @click.prevent="getCode(registerForm.phoneNumber, 'registerForm')"
              style="width: 110px"
              >获取验证码</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import axios from 'axios';

export default {
  data() {
    const validatePhoneNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        //验证手机号格式
        const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        phoneNumber: "",
        password: "",
        code: "",
        type: "PASS",
        switchContent: "短信验证码登录",
      },
      registerForm: {
        phoneNumber: "",
        password: "",
        code: "",
      },
      rules: {
        phoneNumber: [{ validator: validatePhoneNumber, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          //在这里进行登录操作
          this.$store.dispatch("users/loginAsync", '13311111111');
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          //在这里进行注册操作
          console.log("register");
        } else {
          return false;
        }
      });
    },
    switchLoginType() {
      if (this.loginForm.type === "PASS") {
        this.loginForm.type = "CODE";
        this.loginForm.switchContent = "密码登录";
      } else {
        this.loginForm.type = "PASS";
        this.loginForm.switchContent = "短信验证码登录";
      }
    },
    setUserStatus(status) {
      this.$store.commit("users/setStatus", status);
    },
    getCode(phoneNumber, formName) {
      console.log(
        this.$refs[formName].validateField("phoneNumber"),
        phoneNumber,
        formName
      );
      this.$refs[formName].validateField("phoneNumber", (msg) => {
        // console.log(msg);
        if (!msg) {
          //在这里进行获取验证码操作
          console.log("getCode", phoneNumber);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100vh;
  position: relative;

  img {
    width: 300px;
    height: 100px;
  }
  .el-tabs {
    position: absolute;
    margin-top: 20px;
    width: 500px;
    left: 50%;
    margin-left: -250px;

    .el-form {
      margin-top: 20px;
    }
    .el-form-item {
      margin-right: 100px;
    }
  }
}
</style>
