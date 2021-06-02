<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="分类名称: ">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item label="状态: ">
        <el-select v-model="query.status" clearable filterable style="width:85px">
          <el-option v-for="item in statusOptions" :key="item.code" :label="item.name" :value="item.code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reloadData">重置</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd">新增</el-button>
      </el-form-item>
    </el-form>
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
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <edit :title="edit.title" :visible="edit.visible" :form-data="edit.formData" :remote-close="remoteClose" />
  </div>
</template>

<script>
import api from '@/api/category'
import Edit from './edit'

const statusOptions = [
  { code: 0, name: '禁用' },
  { code: 1, name: '正常' }
]

export default {
  name: 'Category',
  filters: {
    statusFilter(status) {
      // 0 禁用，1 正常
      const statusMap = { 0: 'danger', 1: 'success' }
      return statusMap[status]
    }
  },
  components: { Edit },
  data() {
    return {
      list: [], // 列表数据
      page: {
        current: 1, // 当前页面
        size: 20, // 每页多少条数据
        total: 0 // 总记录数
      },
      query: {}, // 查询条件
      statusOptions, // 状态下拉框数组
      edit: {
        title: '新增',
        visible: false,
        formData: {

        }
      }
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
        this.page.total = response.data.total // 获取总记录数据
      })
    },
    handlerEdit(id) {
      // 通过 id 查询详情
      api.get(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data // 将查询的详情传递
          this.edit.title = '编辑'
          this.edit.visible = true
        }
      })
    },
    handlerDelete(id) {
      console.log('删除', id)
    },
    // val 是切换之后每页显示多少条数据
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    // 当页码改变后触发此方法，val 是当前点击或输入的页码
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 条件查询
    queryData() {
      // 将页码变为1，第1页
      this.page.current = 1
      this.fetchData()
    },
    // 重置查询
    reloadData() {
      this.query = {}
      this.fetchData()
    },
    // 子组件会触发此事件方法来关闭窗口
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    },
    // 打开新增窗口
    openAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    }
  }
}
</script>

<style scoped>
</style>
