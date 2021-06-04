<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="用户名: " prop="username">
        <el-input v-model="formData.username" maxlength="50" />
      </el-form-item>
      <el-form-item label="昵称: " prop="nickName">
        <el-input v-model="formData.nickName" maxlength="50" />
      </el-form-item>
      <el-form-item label="手机号: " prop="mobile">
        <el-input v-model="formData.mobile" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱: " prop="email">
        <el-input v-model="formData.email" maxlength="30" />
      </el-form-item>
      <el-form-item label="账号过期: " prop="isAccountNonExpired">
        <el-radio-group v-model="formData.isAccountNonExpired">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>0已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="帐户锁定: " prop="isAccountNonLocked">
        <el-radio-group v-model="formData.isAccountNonLocked">
          <el-radio :label="1" border>未锁定</el-radio>
          <el-radio :label="0" border>0已锁定</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码过期: " prop="isCredentialsNonExpired">
        <el-radio-group v-model="formData.isCredentialsNonExpired">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>0已过期</el-radio>
        </el-radio-group>
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
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过提交表单数据
          // this.submitData()
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    handleClose() {
      this.$refs['formData'].resetFields() // 清空表单
      // 注意不可以通过 this.dialogVisible = false 来关闭，因为他是父组件的属性
      this.remoteClose()
    }
  }
}
</script>

<style scoped>
</style>
