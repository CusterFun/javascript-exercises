<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="400px"
    :before-close="handleClose"
  >
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" label-position="right" style="width: 300px" status-icon>
      <el-form-item label="标签名称: " prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="分类名称: " prop="categoryId">
        <el-select v-model="formData.categoryId" clearable filterable>
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
import api from '@/api/label'

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
      rules: {
        name: [ // 校验标签名称
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        categoryId: [ // 分类
          { required: true, message: '请选择分类名称', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    // 提交表单数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitData() // 校验通过，提交表单数据
        } else {
          return false
        }
      })
    },
    // 关闭弹窗
    handleClose() {
      this.$refs['formData'].resetFields() // 表单清空
      this.remoteClose() // 调用父组件中的方法关闭窗口
    },
    // 调用接口提交数据
    async submitData() {
      const response = await api.add(this.formData)
      if (response.code === 20000) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.handleClose() // 关闭窗口
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
