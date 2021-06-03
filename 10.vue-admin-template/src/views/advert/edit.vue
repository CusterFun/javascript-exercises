<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" :before-close="handleClose">
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="广告图片: " prop="imageUrl">
        <!-- class: 样式 action: 上传图片提交的地址 show-file-list: 单张图片 -->
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="uploadCoverImg"
        >
          <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="广告标题: " prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="广告链接: " prop="advertUrl">
        <el-input v-model="formData.advertUrl" />
      </el-form-item>
      <el-form-item label="跳转方式: " prop="advertTarget">
        <el-select v-model="formData.advertTarget" clearable style="width: 185px">
          <el-option label="新窗口打开" value="_blank" />
          <el-option label="当前窗口打开" value="_self" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态: " prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告位置: " prop="position">
        <el-input-number v-model="formData.position" :min="1" :max="10000" style="width: 300px" />
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
import commonApi from '@/api/common'
import api from '@/api/advert'

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
    oldImageUrl: { // 编辑时，查询出来的那张图片地址
      type: String,
      default: ''
    },
    remoteClose: {
      type: Function, // 触发父组件方法,用于关闭窗口
      default: () => () => {} // 接收的数据类型为函数的默认值 () => [] 接收的数据类型为数组的默认值
    }
  },
  data() {
    return {
      rules: {
        imageUrl: [
          { required: true, message: '请上传广告图片', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入广告标题', trigger: 'blur' }
        ],
        advertUrl: [
          { required: true, message: '请输入广告链接', trigger: 'blur' }
        ],
        advertTarget: [
          { required: true, message: '请选择打开方式', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请输入广告位置', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ]
      }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验通过提交表单数据
          this.submitData()
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    async submitData() {
      let response = null
      if (this.formData.id) {
        response = await api.update(this.formData) // 更新数据
      } else {
        response = await api.add(this.formData) // 新增数据
      }
      if (response.code === 20000) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        // 关闭窗口
        this.handleClose()
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },
    // 上传图片，file 上传的图片对象
    uploadCoverImg(file) {
      console.log('上传图片对象: ', file)
      const data = new FormData()
      data.append('file', file.file)
      commonApi.uploadImage(data).then((response) => {
        this.deleteImg() // 将之前的图片删除
        this.formData.imageUrl = response.data // 回显图片
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: `上传失败,${error.message}`
        })
      })
    },
    // 删除图片
    deleteImg() {
      // 如果之前有图片，则删除之前的图片
      if (this.formData.imageUrl && this.formData.image !== this.oldImageUrl) {
        // 发送请求删除图片
        commonApi.deleteImage(this.formData.imageUrl)
      }
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
