<template>
  <div>
    菜单管理 {{ list }}
  </div>
</template>

<script>
import api from '@/api/menu'

export default {
  name: 'Menu',
  data() {
    return {
      list: [], // 列表数据
      query: {} // 查询条件
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await api.getList(this.query)
      this.list = data
    }
  }
}
</script>

<style scoped>
</style>
