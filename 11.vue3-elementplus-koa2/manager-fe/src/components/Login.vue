<template>
 <div>欢迎来到登录页面</div>
 <el-button @click="goHome">回首页</el-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/welcome')
}
</script>
// <script>
// export default {
//   name: 'login',
//   methods: {
//     goHome() {
//       this.$router.push('/welcome')
//     }
//   }
// }
// </script>
<style scoped>
a {
  color: #42b983;
}
</style>
