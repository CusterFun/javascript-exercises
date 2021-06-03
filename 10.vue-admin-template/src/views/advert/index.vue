<template>
  <div>
    advert 广告管理 {{ page.total }} <br> {{ list }}
  </div>
</template>

<script>
import api from '@/api/advert'

export default {
  name: 'Advert', // 路由配置 meta.name  与 视图组件中的 name 值一致, 不然缓存可能会失效。(切记 name 命名时候尽量保证唯一性 切记不要和某些组件的命名重复了,不然会递归引用最后内存溢出等问题
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      query: {} // 查询条件
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await api.getList(this.query, this.page.current, this.page.size)
      this.page.total = data.total
      this.list = data.records
    }
  }
}
</script>

<style scoped>
</style>
