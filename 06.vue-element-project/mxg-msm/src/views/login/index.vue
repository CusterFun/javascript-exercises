<template>
  <div class="login-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 前端验证通过，把表单数据提交给后台
          login(this.form.username, this.form.password).then((response) => {
            const resp = response.data;
            console.log(resp, resp.flag, resp.data.token);
            if (resp.flag) {
              // 验证成功，通过 token 去获取用户信息
              getUserInfo(resp.data.token).then((response) => {
                const respUser = response.data;
                if (respUser.flag) {
                  // 获取到用户的数据
                  console.log("userInfo: ", respUser.data);
                  // 1. 保存 token，用户信息
                  localStorage.setItem(
                    "msm-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("msm-token", resp.data.token);
                  // 前往首页
                  this.$router.push("/");
                } else {
                  this.$message({
                    message: respUser.message,
                    type: "warning",
                  });
                }
              });
            } else {
              // 未通过，弹出警告
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login-form {
  width: 350px;
  /* 上下间距 160px，左右自动居中 */
  margin: 260px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/login.jpg);
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>
