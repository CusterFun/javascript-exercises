<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div class="dashboard-container">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <el-card>
          <pie-chart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PieChart from './components/PieChart'

export default {
  name: 'Dashboard',
  components: { PieChart },
  data() {
    return {}
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
