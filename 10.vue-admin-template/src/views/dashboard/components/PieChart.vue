<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div ref="main" :style="{width: width, height: height}" :class="className" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // 引入主题
import resize from './mixins/resize'

export default {
  mixins: [resize], // 自适应窗口大小改变图表
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
    legendData: { // 左侧组件接收的数据
      type: Array,
      default: () => ['javascript', 'python', 'golang', 'rust']
    },
    seriesData: { // 饼状图中接收的数据
      type: Array,
      default: () => [
        { value: 500, name: 'javascript' },
        { value: 100, name: 'python' },
        { value: 300, name: 'golang' },
        { value: 200, name: 'rust' }
      ]
    }
  },
  data() {
    return {
      chart: null // 接收 echarts 实例
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
        title: { // 标题
          text: '各个技术能力',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: { // 鼠标放上去的提示框格式
          trigger: 'item',
          backgroundColor: '#fff'
        },
        legend: { // 左上角
          orient: 'vertical', // 垂直排列
          left: 'left' // 位置
        },
        series: [ // 序列: 展示的具体数据
          {
            name: '统计内容',
            type: 'pie', // 饼状图
            radius: '55%', // 饼图的大小
            center: ['50%', '50%'], // 饼图位置[左,上]
            data: this.seriesData, // 饼图数据
            emphasis: {
              itemStyle: {
                shadowBlur: 10, // 图形阴影的模糊大小
                shadowOffsetX: 0, // 阴影水平方向偏移距离
                shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
