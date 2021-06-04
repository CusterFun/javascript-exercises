<template>
  <div ref="main" :class="className" :style="{width:width, height:height}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // 引入主题

export default {
  components: {},
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    xAxisData: { // x轴显示的数据
      type: Array,
      default: () => ['javascript', 'python', 'golang', 'rust']
    },
    seriesData: { // 饼状图中接收的数据
      type: Array,
      default: () => [500, 100, 300, 200]
    }
  },
  data() {
    return {
      chart: null // 引入 echarts 实例
    }
  },
  mounted() {
    // 当加载dom后,会调用 this.initChart() 来进行初始化 echarts 实例
    this.$nextTick(() => {
      this.initChart()
    })
  },
  // 当组件销毁之前会调用此钩子
  beforeDestroy() {
    if (!this.chart) {
      return // echart 实例为空直接返回
    }
    this.chart.dispose() // 注销
    this.chart = null // 置为null
  },
  methods: {
    // 关于图表的初始化
    initChart() {
      // 基于准备好的dom, 初始化 echarts 实例, 第二个参数可以指定引用的主题
      this.chart = echarts.init(this.$refs.main, 'macarons')

      // 图表配置项
      this.chart.setOption({
        title: {
          text: '近6个月的技术能力',
          left: 'center'
        },
        tooltip: { // 鼠标放上去的提示框格式
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#fff'
        },
        grid: { // 柱状图整体位置
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [ // x 轴
          {
            type: 'category',
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '能力值',
            type: 'bar', // 柱状图
            barWidth: '60%', // 柱状图柱条的宽度，不设时自适应。
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
