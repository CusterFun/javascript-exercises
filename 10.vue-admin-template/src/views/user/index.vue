<template>
  <div>
    用户管理 {{ page.total }} <br>
    {{ list }}
  </div>
</template>

<script>
import * as api from '@/api/user'

export default {
  name: 'User',
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      query: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await api.getList(this.query, this.page.current, this.page.size)
      this.list = data.records
      this.page.total = data.total
    }
  }
}
</script>

<style scoped>
</style>
