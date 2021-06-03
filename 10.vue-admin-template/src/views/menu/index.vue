<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="菜单名称: ">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="fetchData">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reloadData">重置</el-button>
        <el-button icon="el-icon-circle-plus-outline" type="primary" @click="handlerAdd(0)">新增</el-button>
      </el-form-item>
    </el-form>

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

    <!-- 新增或者编辑组件 -->
    <edit :title="edit.title" :visible="edit.visible" :form-data="edit.formData" :remote-close="remoteClose" />
  </div>
</template>

<script>
import api from '@/api/menu'
import Edit from './edit'

export default {
  name: 'Menu',
  components: { Edit },
  data() {
    return {
      list: [], // 列表数据
      query: {}, // 查询条件
      edit: {
        title: '',
        visible: false,
        formData: {}
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await api.getList(this.query)
      this.list = data
    },
    // 编辑菜单
    handlerEdit(id) {
      api.getById(id).then((response) => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.title = '编辑'
          this.edit.visible = true
        }
      })
    },
    // 删除菜单
    handlerDelete(id) {},
    // 重置条件查询
    reloadData() {
      this.query = {}
      this.fetchData()
    },
    // 新增菜单,id 作为菜单的 parentId
    handlerAdd(id) {
      // id = 0 是在条件查询的地方点击的，是新增一级菜单，否则新增的是某菜单下的子菜单
      this.edit.formData.parentId = id
      this.edit.title = '新增'
      this.edit.visible = true
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
