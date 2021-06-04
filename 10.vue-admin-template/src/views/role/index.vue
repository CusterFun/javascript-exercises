<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="角色名称: ">
        <el-input v-model.trim="query.name" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" @click="reloadData">重置</el-button>
        <el-button v-if="!roleIds" icon="el-icon-circle-plus-outline" type="primary" @click="openAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" prop="name" label="角色名称" />
      <el-table-column align="center" prop="remark" label="备注" />
      <!-- roleIds 如果是[]数组,则是用户管理组件传递过来的隐藏操作列表，如果是null显示操作列表 -->
      <el-table-column v-if="!roleIds" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlerPermission(scope.row.id)">分配权限</el-button>
          <el-button type="success" size="mini" @click="handlerEdit(scope.row.id)">编辑</el-button>
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

    <edit :title="edit.title" :visible="edit.visible" :form-data="edit.formData" :remote-close="remoteClose" />
    <permission title="分配权限" :visible="per.visible" :remote-close="remotePerClose" :role-id="per.roleId" />
  </div>
</template>

<script>
import api from '@/api/role'
import Edit from './edit'
import Permission from './permission'

export default {
  name: 'Role',
  components: { Edit, Permission },
  // 当用户管理模块，将当前这个组件文件作为子组件时，进行接收父组件传递过来的属性
  props: {
    roleIds: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 20,
        total: 0
      },
      query: {},
      edit: {
        title: '',
        visible: false,
        formData: {}
      },
      per: { visible: false, roleId: null }
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
    },
    async handlerEdit(id) {
      const { data } = await api.getById(id) // 查询角色详情
      this.edit.formData = data
      this.edit.title = '编辑'
      this.edit.visible = true
    },
    handlerDelete(id) {
      this.$confirm('确认删除该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除请求
        api.deleteById(id).then(response => {
          // 处理响应结果提示
          this.$message({
            type: response.code === 20000 ? 'success' : 'error',
            message: response.message
          })
        })
        this.fetchData() // 刷新列表
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
      this.page.current = 1
      this.fetchData()
    },
    // 重置条件查询
    reloadData() {
      this.query = {}
      this.fetchData()
    },
    // 打开窗口，新增角色
    openAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    },
    // 子组件会触发此事件方法来关闭窗口
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    },
    // 弹出分配权限窗口
    handlerPermission(id) {
      this.per.roleId = id
      this.per.visible = true
    },
    // 关闭分配权限弹窗
    remotePerClose() {
      // 将点击的那个角色id传递给子组件，进行查询当前角色已经拥有的菜单ids
      this.per.visible = false
      this.per.roleId = null
      this.fetchData()
    }
  }
}
</script>

<style scoped>
</style>
