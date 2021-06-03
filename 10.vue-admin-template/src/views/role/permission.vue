<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <!-- v-loading="loading" 值为 true 显示加载中 -->
    <el-form v-loading="loading" label-width="80px">
      <!-- :data 绑定渲染数据数组, show-checkbox 是否显示勾选框 node-key="id": 树节点的唯一标识属性名
        props 配置相应数据中对应展示的属性名
        children 是子菜单的属性名
        label 显示的菜单名的属性名
        default-expanded-keys 默认展开
        default-checked-keys 默认勾选
        accordion 手风琴模式，每次只展开一个，会将之前展开的隐藏
        -->
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="id"
        accordion
        :default-checked-keys="[5]"
        :props="{children: 'children', label: 'name'}"
      />
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('formData')">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import menuApi from '@/api/menu'

export default {
  components: {},
  props: {
    title: { // 弹窗的标题
      type: String,
      default: ''
    },
    visible: { // 弹出窗口，true 为弹出
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function, // 触发父组件方法,用于关闭窗口
      default: () => () => {} // 接收的数据类型为函数的默认值 () => [] 接收的数据类型为数组的默认值
    }
  },
  data() {
    return {
      menuList: [], // 存储所有菜单
      loading: false // 是否正在加载中
    }
  },
  watch: {
    visible(val) {
      if (val) {
        // visible = true 代表权限分配窗口打开，加载所有角色菜单
        this.getMenuList()
      }
    }
  },
  methods: {
    // 获取所有菜单列表
    getMenuList() {
      this.loading = true // 加载中
      menuApi.getList({}).then((response) => {
        console.log('response.data', response.data)
        this.menuList = response.data
      })
      this.loading = false // 加载完成
    },
    // 关闭窗口
    handleClose() {},
    // 提交表单
    submitForm() {}
  }
}
</script>

<style scoped>
</style>
