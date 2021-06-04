<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="380px"
    :before-close="handleClose"
  >
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" label-position="right" style="width: 300px" status-icon>
      <el-form-item label="新密码: " prop="newPassword">
        <el-input v-model="formData.newPassword" type="password" maxlength="30" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码: " prop="repPassword">
        <el-input v-model="formData.repPassword" type="password" maxlength="30" placeholder="请输入确认密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('formData')">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import * as api from '@/api/user'

export default {
  components: {},
  props: {
    userId: { // 用户 id
      type: Number,
      default: null
    },
    visible: { // 弹出窗口，true 为弹出
      type: Boolean,
      default: false
    },
    title: { // 弹窗的标题
      type: String,
      default: ''
    },
    remoteClose: {
      type: Function, // 触发父组件方法,用于关闭窗口
      default: () => () => {} // 接收的数据类型为函数的默认值
    }
  },
  data() {
    // 自定义校验器，校验两次输入的密码是否相同
    var validateRepPassword = (rule, value, callback) => {
      if (value !== this.formData.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {}, // 提交的表单数据
      rules: {
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        repPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validateRepPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过提交表单数据
          // 要将userId提交给后台
          this.formData.userId = this.userId
          api.updatePassword(this.formData).then((response) => {
            if (response.code === 20000) {
              this.$message({ message: '修改密码成功', type: 'success' })
              this.handleClose()
            } else {
              this.$message({ message: '修改密码失败', type: 'error' })
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    handleClose() {
      this.$refs.formData.resetFields()
      this.remoteClose()
    }
  }
}
</script>

<style scoped>
</style>
