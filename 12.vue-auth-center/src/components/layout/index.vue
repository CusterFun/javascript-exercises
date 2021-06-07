<template>
  <div>
    <app-header />
    <div class="mxg-main">
      <!-- 主区域组件渲染 -->
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import AppFooter from '@/components/layout/AppFooter'
export default {
  components: { AppHeader, AppFooter }
}
</script>

<style >
.mxg-main {
  min-height: 700px;
  width: 100%;
}
</style>
