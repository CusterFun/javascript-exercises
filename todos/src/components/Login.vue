<template>
  <div class="box-card">
    <el-row>
      <el-col>
        <el-card shadow="always">
          <el-form label-position="left" label-width="80px" :model="user">
            <el-form-item label="手机号">
              <el-input v-model="user.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="primary" @click="singin">登录</el-button>
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
      user: {
        phoneNumber: "",
        password: "",
      },
    };
  },

  components: {},

  methods: {
    async singin() {
      const res = await this.$auths.signInWithPhoneCodeOrPassword(this.user);
      console.log(res);
      if (res) {
        console.log("登录成功");
        this.$router.push({ path: "/" });
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