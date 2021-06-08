<template>
 <h1>欢迎来到主页面 {{ msg }}</h1>
 <!-- <el-button>去登陆</el-button> -->
 <router-link to="/login">去登陆</router-link>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
