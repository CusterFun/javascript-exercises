<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="用户名: ">
        <el-input v-model.trim="query.username" />
      </el-form-item>
      <el-form-item label="手机号: ">
        <el-input v-model.trim="query.mobile" />
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
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="nickName" label="昵称" />
      <el-table-column align="center" prop="mobile" label="手机号" />
      <el-table-column align="center" prop="email" label="邮箱" />
      <el-table-column align="center" prop="isAccountNonExpired" label="帐户过期">
        <!-- // 帐户是否过期(1 未过期，0已过期) -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonExpired===0" type="danger">过期</el-tag>
          <el-tag v-if="scope.row.isAccountNonExpired===1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isAccountNonLocked" label="帐户锁定">
        <!-- // 帐户是否被锁定(1 未过期，0已过期) -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonLocked===0" type="danger">锁定</el-tag>
          <el-tag v-if="scope.row.isAccountNonLocked===1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isCredentialsNonExpired" label="密码过期">
        <!-- // 密码是否过期(1 未过期，0已过期) -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isCredentialsNonExpired===0" type="danger">过期</el-tag>
          <el-tag v-if="scope.row.isCredentialsNonExpired===1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isEnabled" label="是否可用">
        <!-- // 帐户是否可用(1 可用，0 删除用户) -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled===0" type="danger">删除</el-tag>
          <el-tag v-if="scope.row.isEnabled===1" type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="340">
        <template v-if="scope.row.isEnabled===1" slot-scope="scope">
          <el-button type="success" size="mini" @click="handlerEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handlerDelete(scope.row.id)">删除</el-button>
          <el-button type="primary" size="mini" @click="handlerRole(scope.row.id)">设置角色</el-button>
          <el-button type="info" size="mini" @click="handlerPwd(scope.row.id)">密码修改</el-button>
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
  </div>
</template>

<script>
import * as api from '@/api/user'
import Edit from './edit'

export default {
  name: 'User',
  components: { Edit },
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
      }
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
      this.edit.title = '新增 - 默认密码与用户名一致'
    },
    // 编辑用户
    handlerEdit(id) {
      api.getById(id).then(response => {
        if (response.code === 20000) {
          this.edit.formData = response.data
          this.edit.title = '编辑'
          this.edit.visible = true
        }
      })
    },
    // 删除用户
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
    // 设置角色
    handlerRole(id) {},
    // 密码修改
    handlerPwd(id) {}
  }
}
</script>

<style scoped>
</style>
