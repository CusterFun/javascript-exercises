<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div id="main" ref="main" style="width: 600px; height: 400px;" class="dashboard-container" />
</template>

<script>
import api from '@/api/test'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      name: {}
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.showMain()
  },
  methods: {
    fetchData() {
      api.test().then((response) => {
        console.log('response: ')
        this.name = response
      })
    },
    showMain() {
      // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(document.getElementById('main'))
      // var myChart = echarts.init(this.$refs['main'])
      var myChart = echarts.init(this.$refs.main)

      // 绘制图表
      myChart.setOption({ // 使用指定的配置项和数据显示图表
        title: { // 标题
          text: 'ECharts 入门示例'
        },
        tooltip: {
          // 提示内容
          // show: false // 是否显示提示框
        },
        legend: { // 图例组件，点击后会显示或隐藏柱状
          data: ['销量']
        },
        xAxis: { // x 轴配置
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{ // 序列
          name: '销量', // 用于提示框中显示的内容
          type: 'bar', // 指定使用哪个类型图表
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
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
