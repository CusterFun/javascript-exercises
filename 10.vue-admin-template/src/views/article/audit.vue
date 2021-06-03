<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="70%"
    :before-close="handleClose"
  >
    <el-form ref="formData" :model="formData" label-width="100px" label-position="right">
      <el-form-item label="标题: ">
        <el-input v-model="formData.title" readonly />
      </el-form-item>
      <el-form-item label="标签: ">
        <el-cascader v-model="formData.labelIds" disabled :options="labelOptions" :props="{ multiple: true, emitPath: false, children: 'labelList', value: 'id', label: 'name' }" clearable style="display:block" />
      </el-form-item>
      <el-form-item label="封面: "><img :src="formData.imageUrl" style="width: 178px; height:178px; display:block"></el-form-item>
      <el-form-item label="是否公开: ">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="0">不公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formData.summary" type="textarea" readonly />
      </el-form-item>
      <el-form-item label="内容" />
      <el-form-item v-if="isAudit" align="center">
        <el-button type="primary" @click="auditSuccess">审核通过</el-button>
        <el-button type="danger" @click="auditFailure">审核不通过</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import api from '@/api/article'
import categoryApi from '@/api/category'

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
      formData: {}, // 查询到的文章详情
      labelOptions: [] // 渲染分类标签级联下拉框
    }
  },
  watch: { // 监听
    visible(val) { // 监听 visible 的变化,将改变之后的值作为参数传入
      if (val) { // val 为 true,打开窗口
        this.getLabelOptions() // 获取所有分类和标签
        this.getArticleById() // 获取文章详情
      }
    }
  },
  methods: {
    handleClose() { // 关闭窗口
      this.remoteClose() // 触发父组件关闭窗口
    },
    auditSuccess() { // 审核通过触发的方法
      console.log('审核通过触发的方法')
    },
    auditFailure() { // 审核不通过触发的方法
      console.log('审核不通过触发的方法')
    },
    async getArticleById() { // 查询文章详情
      const { data } = await api.getById(this.id)
      this.formData = data
    },
    async getLabelOptions() {
      const { data } = await categoryApi.getCategoryAndLabel()
      this.labelOptions = data
    }
  }
}
</script>

<style scoped>
</style>
