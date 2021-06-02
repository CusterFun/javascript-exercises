<template>
  <div class="app-container">
    <!-- stripe 带斑马纹 -->
    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="name" label="分类名称" />
      <el-table-column align="center" prop="sort" label="排序" />
      <el-table-column align="center" prop="remark" label="备注" />
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status ? '正常': '禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handlerEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handlerDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '@/api/category'
export default {
  name: 'Category',
  filters: {
    statusFilter(status) {
      // 0 禁用，1 正常
      const statusMap = { 0: 'danger', 1: 'success' }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [], // 列表数据
      page: {
        current: 1, // 当前页面
        size: 20, // 每页多少条数据
        total: 0 // 总记录数
      },
      query: {} // 查询条件
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(response => {
        console.log('response', response)
        this.list = response.data.records // 列表数据
        this.total = response.data.total // 获取总记录数据
      })
    },
    handlerEdit(id) {
      console.log('编辑', id)
    },
    handlerDelete(id) {
      console.log('删除', id)
    }
  }
}
</script>

<style scoped>
</style>
