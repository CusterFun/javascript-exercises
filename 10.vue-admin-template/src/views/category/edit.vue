<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="分类名称: " prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="状态: " prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序: " prop="sort">
        <el-input-number v-model="formData.sort" :min="1" :max="10000" style="width: 300px" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea" />
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
      default: () => {}
    },
    remoteClose: Function // 触发父组件方法,用于关闭窗口
  },
  data() {
    return {

    }
  },
  methods: {
    // 关闭窗口
    handleClose() {
      this.$refs['formData'].resetFields() // 清空表单
      // 注意不可以通过 this.dialogVisible = false 来关闭，因为他是父组件的属性
      this.remoteClose()
    },
    // 提交表单
    submitForm(formName) {}
  }
}
</script>

<style scoped>
</style>
