<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="70%"
    :before-close="handleClose"
  >
    审核文章 {{ id }} <br> {{ isAudit }}
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    id: { // 文章id
      type: Number,
      default: -1
    },
    isAudit: { // 是否是审核页面
      type: Boolean,
      default: true
    },
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
    }
  },
  methods: {
    handleClose() { // 关闭窗口
      this.remoteClose() // 触发父组件关闭窗口
    }
  }
}
</script>

<style scoped>
</style>
