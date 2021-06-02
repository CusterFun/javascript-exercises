<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right" style="width: 300px" status-icon>
      <el-form-item label="标签名称: ">
        <el-input />
      </el-form-item>
      <el-form-item label="分类名称: ">
        <el-select clearable filterable>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('formData')">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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
    formData: { // 提交表单数据
      type: Object,
      default: () => {} // 接收的数据类型为对象的默认值
    },
    categoryList: {
      type: Array,
      default: () => []
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
    // 提交表单数据
    submitForm(formName) {},
    handleClose() {}
  }
}
</script>

<style scoped>
</style>
