<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="文章标题: ">
        <el-input v-model.trim="query.title" />
      </el-form-item>
      <el-form-item label="状态: ">
        <el-select v-model="query.status" clearable filterable style="width: 120px">
          <el-option v-for="item in statusOptions" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reloadData">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="title" label="文章标题" />
      <el-table-column align="center" prop="viewCount" label="浏览数" />
      <el-table-column align="center" prop="thumhup" label="点赞数" />
      <el-table-column align="center" prop="ispublic" label="是否公开">
        <template slot-scope="scope">  <!-- // 0: 不公开 1：公开 -->
          <el-tag v-if="scope.row.ispublic===0" type="danger">不公开</el-tag>
          <el-tag v-if="scope.row.ispublic===1" type="warning">公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="scope"> <!-- // // 0: 已删除, 1:未审核，2:已审核,3: 审核未通过 -->
          <el-tag v-if="scope.row.status===0" type="danger">已删除</el-tag>
          <el-tag v-if="scope.row.status===1">未审核</el-tag>
          <el-tag v-if="scope.row.status===2" type="success">已审核</el-tag>
          <el-tag v-if="scope.row.status===3" type="warning">审核未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateDate" label="最后更新时间" min-width="90px">
        <template slot-scope="scope">
          {{ getFormate(scope.row.updateDate) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="handlerEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handlerDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import api from '@/api/article'
import { format } from '@/utils/date' // 格式化日期

const statusOptions = [
  { code: 1, name: '未审核' },
  { code: 2, name: '已审核' },
  { code: 3, name: '审核未通过' },
  { code: 0, name: '已删除' }
]

export default {
  name: 'Article',
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      query: {}, // 查询条件
      statusOptions // 状态下拉框数组
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() { // 解构赋值
      const { data } = await api.getList(this.query, this.page.current, this.page.size)
      this.list = data.records
      this.page.total = data.total
    },
    handlerEdit(id) {
      console.log('编辑', id)
    },
    handlerDelete(id) {
      console.log('删除', id)
    },
    // 组件模板中调用此方法格式化日期
    getFormate(date) {
      return format(date)
    },
    // 当每页显示多少条数据改变后触发
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    // 切换页码时触发
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 条件查询
    queryData() {
      this.page.current = 1
      this.fetchData()
    },
    reloadData() {
      this.query = {}
      this.fetchData()
    }
  }
}
</script>

<style scoped>
</style>
