<template>
  <div class="app-container">
    <!-- row-key="id" 指定唯一标识的属性名，其中数据要包含 children 才会被渲染为树状 -->
    <el-table
      row-key="id"
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="name" label="名称" />
      <el-table-column align="center" prop="url" label="请求地址" />
      <el-table-column align="center" prop="code" label="权限标识" />
      <el-table-column align="center" prop="type" label="类型">
        <template slot-scope="scope">
          <!-- 1目录，2菜单，3按钮 -->
          <span v-if="scope.row.type === 1">目录</span>
          <span v-if="scope.row.type === 2">菜单</span>
          <span v-if="scope.row.type === 3">按钮</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序" />
      <el-table-column align="center" label="操作" width="260px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlerAdd(scope.row.id)">新增</el-button>
          <el-button type="info" size="mini" @click="handlerEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handlerDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
