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
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginForm.email"
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
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginForm.email"
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
              @click.prevent="getCode(loginForm.email, 'loginForm')"
              style="width: 110px"
              :disabled="loginForm.disabled"
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
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="registerForm.username"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerForm.email"
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
              @click.prevent="getCode(registerForm.email, 'registerForm')"
              style="width: 110px"
              :disabled="registerForm.disabled"
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
import axios from "axios";

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        //验证邮箱格式
        const myreg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if (!myreg.test(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码不得少于6个字符"));
        } else {
          callback();
        }
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "",
        password: "",
        code: "",
        type: "PASS",
        switchContent: "邮箱验证码登录",
        disabled: false,
      },
      registerForm: {
        email: "",
        password: "",
        code: "",
        username: "",
        disabled: false,
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
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
          axios
            .get("/Users/login", {
              params: {
                email: this.loginForm.email,
                password: this.loginForm.password,
                type: this.loginForm.type,
                status: this.$store.state.users.status,
                code: this.loginForm.code,
              },
            })
            .then((res) => {
              const data = res.data;
              if (data.status && data.status === "error") {
                this.$message.error(data.message);
              } else if (data.status && data.status === "success") {
                this.$store.dispatch("users/loginAsync", {email: this.loginForm.email, status:this.$store.state.users.status});
              }
            })
            .catch(() => {
              this.$message.error("请求失败，请检查网络");
            });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          //在这里进行注册操作
          axios
            .get("/Users/register", {
              params: {
                email: this.registerForm.email,
                password: this.registerForm.password,
                username: this.registerForm.username,
                status: this.$store.state.users.status,
                code: this.registerForm.code,
              },
            })
            .then((res) => {
              const data = res.data;
              if (data.status && data.status === "error") {
                this.$message.error(data.message);
              } else if (data.status && data.status === "success") {
                this.$message({
                  message: data.message,
                  type: "success",
                });
                // this.$store.dispatch("users/loginAsync", this.loginForm.email);
              }
            })
            .catch(() => {
              this.$message.error("请求失败，请检查网络");
            });
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
    getCode(email, formName) {
      if (formName === "registerForm") {
        this.$refs[formName].validateField("username");
        this.$refs[formName].validateField("password");
      }
      this.$refs[formName].validateField("email", (msg) => {
        if (!msg) {
          //在这里进行获取验证码操作
          console.log("getCode", email);
          axios
            .get("/Users/getCode", {
              params: {
                email,
                status: this.$store.state.users.status,
                action: formName.split("Form")[0],
              },
            })
            .then((res) => {
              const data = res.data;
              if (data.status && data.status === "error") {
                this.$message.error(data.message);
              }
            })
            .catch(() => {
              this.$message.error("请求失败，请检查网络");
            });
          this[formName].disabled = true;
          const that = this;
          setTimeout(() => {
            that[formName].disabled = false;
          }, 60000);
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
