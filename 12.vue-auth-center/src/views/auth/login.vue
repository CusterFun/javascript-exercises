<template>
  <div class="login_page">
    <div class="login_box">
      <div class="center_box">
        <!-- 登录&注册-->
        <div :class="{login_form: true, rotate: tab == 2}">
          <div :class="{tabs: true, r180: reverse == 2}">
            <div class="fl tab" @click="changetab(1)">
              <span :class="{on: tab == 1}">登录</span>
            </div>
            <div class="fl tab" @click="changetab(2)">
              <span :class="{on: tab == 2}">注册</span>
            </div>
          </div>

          <!-- 登录 -->
          <div v-if="reverse == 1" class="form_body">
            <!-- submit.prevent 阻止默认表单事件提交，采用loginSubmit -->
            <form @submit.prevent="loginSubmit">
              <input v-model="loginData.username" type="text" placeholder="请输入用户名" autocomplete="off">
              <input v-model="loginData.password" type="password" placeholder="请输入密码" autocomplete="off">
              <div class="error_msg">{{ loginMessage }}</div>
              <input v-if="subState" type="submit" disabled="disabled" value="登录中···" class="btn">
              <input v-else value="登录" type="submit" class="btn" @submit="loginSubmit">
            </form>
          </div>

          <!-- 注册 -->
          <div v-if="reverse == 2" class="form_body r180">
            <form @submit.prevent="regSubmit">
              <input v-model="registerData.username" type="text" placeholder="请输入用户名" autocomplete="on">
              <input v-model="registerData.password" type="password" placeholder="6-30位密码，可用数字/字母/符号组合" autocomplete="on">
              <input v-model="registerData.repPassword" type="password" placeholder="确认密码">
              <div class="error_msg">{{ regMessage }}</div>
              <div class="agree">
                <input id="tonyi" v-model="registerData.check" type="checkbox">
                <label for="tonyi">我已经阅读并同意</label><a href="jvascript:;" @click="xieyi = true">《用户协议》</a>
              </div>
              <input v-if="subState" type="submit" disabled="disabled" value="提交中···" class="btn">
              <input v-else value="注册" type="submit" class="btn">
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户协议 -->
    <div v-if="xieyi" class="xieyi" @click.self="xieyi = false">
      <div class="xieyi_content">
        <div class="xieyi_title">请认真阅读用户协议</div>
        <div v-if="xieyiContent" class="xieyi_body" v-html="xieyiContent" />
        <input type="button" class="xieyi_btn" value="确定" @click="xieyi = false">
      </div>
    </div>
  </div>
</template>
<script >
import { isvalidUsername } from '@/utils/validate'

import { getXieyi, getUserByUsername, register } from '@/api/auth'

export default {

  data() {
    return {
      tab: 1, // 高亮当前标签名
      reverse: 1, // 旋转 1 登录，2 注册
      loginMessage: '', // 登录错误提示信息
      regMessage: '', // 注册错误提示信息
      subState: false, // 提交状态
      xieyi: false, // 显示隐藏协议内容
      xieyiContent: null, // 协议内容
      redirectURL: '//www.mengxuegu.com', // 登录成功后重定向地址
      loginData: { // 登录表单数据
        username: '',
        password: ''
      },
      registerData: { // 注册表单数据
        username: '',
        password: '',
        repPassword: '',
        check: false
      }
    }
  },

  async created() {
    if (this.$route.query.redirectURL) {
      this.redirectURL = this.$route.query.redirectURL
    }
    // 获取协议内容
    this.xieyiContent = await getXieyi()
  },

  methods: {

    // 切换标签
    changetab(int) {
      this.tab = int
      // let _that = this
      setTimeout(() => {
        this.reverse = int
      }, 200)
    },

    // 提交登录
    loginSubmit() {
      // 如果在登录中，不允许登录
      if (this.subState) {
        return false
      }
      if (!isvalidUsername(this.loginData.username)) {
        this.loginMessage = '请输入正确用户名'
        return false
      }

      if (this.loginData.password.length < 6) {
        this.loginMessage = '请输入正确的用户名或密码'
        return false
      }

      this.subState = true // 登录中

      this.$store.dispatch('UserLogin', this.loginData).then((response) => {
        const { code, message } = response

        if (code === 20000) {
          // 跳转回来源页面
          window.location.href = this.redirectURL
        } else {
          this.loginMessage = message
        }
        this.subState = false // 提交完
      }).catch(error => {
        this.subState = false // 提交完
        this.loginMessage = '系统繁忙，请稍后重试'
        console.log('系统繁忙，请稍后重试', error)
      })
    },

    // 提交注册
    async regSubmit() {
      // 如果在登录中，不允许登录
      if (this.subState) {
        return false
      }

      if (!isvalidUsername(this.registerData.username)) {
        this.regMessage = '请输入4-30位用户名, 中文、数字、字母和下划线'
        return false
      }

      const { code, message, data } = await getUserByUsername(this.registerData.username)
      // 不为20000则后台校验用户名不合法
      if (code !== 20000) {
        this.regMessage = message
        return false
      }

      if (data) { // true 已被注册，false 未注册
        this.regMessage = '用户名已被注册，请重新输入用户名'
        return false
      }

      if (this.registerData.password.length < 6 || this.registerData.password.length > 30) {
        this.regMessage = '请输入6-30位密码,区分大小写且不可有空格'
        return false
      }

      if (this.registerData.password !== this.registerData.repPassword) {
        this.regMessage = '两次输入密码不一致'
        return false
      }

      if (!this.registerData.check) {
        this.regMessage = '请阅读并同意用户协议'
        return false
      }

      this.subState = true // 提交中

      // 提交注册数据
      register(this.registerData).then(response => {
        this.subState = false
        const { code, message } = response
        if (code === 20000) {
          // 注册成功，切换登录页
          this.changetab(1)
        } else {
          this.regMessage = message
        }
      }).catch(error => {
        this.subState = false
        this.regMessage = '系统繁忙，请稍后重试'
        console.log('系统繁忙，请稍后重试', error)
      })
    }
  }
}
</script>
<style scoped>
@import '../../assets/style/login.css';
</style>

