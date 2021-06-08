<template>
 <div>欢迎来到登录页面</div>
 <welcome msg="custer" />
 <el-button @click="goHome">回首页</el-button>
</template>

// <script setup>
// import { useRouter } from 'vue-router'
// const router = useRouter()
// const goHome = () => {
//   router.push('/welcome')
// }
// </script>
<script>
import Welcome from './Welcome.vue'
export default {
  name: 'login',
  components: { Welcome },
  methods: {
    goHome() {
      this.$router.push('/welcome')
    }
  }
}
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
