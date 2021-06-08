<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div class="dashboard-container">
    <div>
      菜单权限：{{ $store.getters.menuList }} <br>
      按钮权限：{{ $store.getters.menuList }}</div>

    <!-- 面板统计组件 -->
    <panel-group :user-total="userTotal" :article-total="articleTotal" :question-total="questionTotal" />

    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <pie-chart v-if="flag" :legend-data="categoryTotal.nameList" :series-data="categoryTotal.nameAndValueList" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <!-- 注意：echarts 在初始化实例时就要拿到数据，有数据就会展示出来 -->
          <bar-chart v-if="flag" :x-axis-data="monthArticleTotal.yearMonthList" :series-data="monthArticleTotal.aritcleTotalList" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import PanelGroup from './components/PanelGroup'
import api from '@/api/home'

export default {
  name: 'Dashboard',
  components: { PieChart, BarChart, PanelGroup },
  data() {
    return {
      userTotal: 0, // 总用户
      articleTotal: 0, // 总文章
      questionTotal: 0, // 总提问
      categoryTotal: {}, // 每个分类下的文章数
      monthArticleTotal: {}, // 查询近6个月发布的文章数
      flag: false // 是否显示图表组件
    }
  },
  mounted() {
    // 查询面板中相关的总记录数
    this.getTotal()
    // 统计各技术频道文章数和近6个月发布文章数
    this.getArticleTotal()
  },
  methods: {
    async getTotal() {
      // 查询总用户，data 取别名 userTotal
      const { data: userTotal } = await api.getUserTotal()
      this.userTotal = userTotal
      // 查询总文章，data 取别名 userTotal
      const { data: articleTotal } = await api.getArticleTotal()
      this.articleTotal = articleTotal
      // 查询总提问，data 取别名 userTotal
      const { data: questionTotal } = await api.getQuestionTotal()
      this.questionTotal = questionTotal
    },
    async getArticleTotal() {
      // 统计各技术频道文章数
      const { data: categoryTotal } = await api.getCategoryTotal()
      this.categoryTotal = categoryTotal
      // 近6个月发布文章数
      const { data: monthArticleTotal } = await api.getMonthArticleTotal()
      this.monthArticleTotal = monthArticleTotal

      // 先查询到数据后，再加载图表组件
      this.flag = true
    }
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
