<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="标签名称: ">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item label="分类名称: ">
        <el-select v-model="query.categoryId" clearable filterable>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reloadData">重置</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="name" label="标签名称" />
      <el-table-column align="center" prop="categoryName" label="分类名称" />
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
    <!-- 新增或编辑组件 -->
    <edit :title="edit.title" :visible="edit.visible" :form-data="edit.formData" :remote-close="remoteClose" :category-list="categoryList" />
  </div>
</template>

<script>
import api from '@/api/label'
import categoryApi from '@/api/category'
import Edit from './edit'

export default {
  name: 'Label',
  components: { Edit },
  data() {
    return {
      list: [], // 列表数据
      page: { // 分页对象
        current: 1,
        size: 20,
        total: 0
      },
      query: {}, // 条件查询
      categoryList: [], // 正常状态的分类列表数据
      edit: { // 子组件引用属性对象
        title: '',
        visible: false,
        formData: {}
      }
    }
  },
  created() {
    this.fetchData()
    // 获取正常状态的分类列表数据
    this.getCategoryList()
  },
  methods: {
    fetchData() {
      api.getList(this.query, this.page.current, this.page.size).then(response => {
        this.list = response.data.records
        this.page.total = response.data.total
      })
    },
    handlerEdit(id) {
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.visible = true // 弹出窗口
          this.edit.title = '编辑'
        }
      })
    },
    handlerDelete(id) {
      console.log('删除', id)
    },
    // 每页显示多少条数据改变后触发
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    // 改变当前页面时触发
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 获取正常状态的分类列表数据
    getCategoryList() {
      categoryApi.getNormalList().then(response => {
        if (response.code === 20000) {
          this.categoryList = response.data
        }
      })
    },
    // 条件查询
    queryData() {
      // 将页码变成第一页
      this.page.current = 1
      this.fetchData()
    },
    // 重置条件查询
    reloadData() {
      this.query = {}
      this.fetchData()
    },
    // 打开新增窗口
    openAdd() {
      this.getCategoryList() // 获取最新的分类列表
      this.edit.visible = true
      this.edit.title = '新增'
    },
    // 关闭弹窗
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    }
  }
}
</script>

<style scoped>
</style>
