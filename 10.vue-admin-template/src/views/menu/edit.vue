<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="类型: " prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio v-if="formData.parentId!==0" :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称: " prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识: " prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item v-if="formData.type!==3" label="请求地址: " prop="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item v-if="formData.type!==3" label="图标: " prop="icon">
        <el-input v-model="formData.icon" />
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
      default: () => {} // 接收的数据类型为对象的默认值
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
    submitForm() {},
    handleClose() {
      this.$refs['formData'].resetFields()
      this.remoteClose()
    }
  }
}
</script>

<style scoped>
</style>
