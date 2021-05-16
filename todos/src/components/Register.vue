<template>
  <div class="box-card">
    <el-row>
      <el-col>
        <el-card shadow="always">
          <el-form label-position="left" label-width="80px" :model="user">
            <el-form-item label="手机号">
              <el-input v-model="user.phone">
                <template slot="append">
                  <el-button size="mini" @click="sendCode">{{
                    sendMsg
                  }}</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="user.code"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendMsg: "发送验证码",
      user: {
        phone: "",
        code: "",
        pwd: "",
      },
    };
  },

  components: {},

  methods: {
    async sendCode() {
      const res = await this.$auths.sendPhoneCode(this.user.phone);
      console.log(res);
      if (res) {
        this.sendMsg = "有效期5分钟";
      }
    },
    async register() {
      const res = await this.$auths.signUpWithPhoneCode(
        this.user.phone,
        this.user.code,
        this.user.pwd
      );
      if (res) {
        console.log("注册成功");
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped>
.box-card {
  margin: 0 auto;
  widows: 580px;
  margin-bottom: 20px;
}
</style>