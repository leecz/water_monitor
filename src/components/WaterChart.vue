<template>
  <div id="chart" v-on-echart-resize></div>
</template>

<script>
const echarts = require('echarts')

export default {
  props: {
    datas: {
      type: Object,
      default: {}
    }
  },
  computed: {
    chartHeight() {
      return window.innerHeight / 2 - 50 + 'px'
    }
  },
  watch: {
    datas: {
      deep: true,
      handler() {
        this.setChartOpt()
      }
    }
  },
  methods: {
    setChartOpt() {
      // datas: {
      //   xData: [] // 时间轴
      //   yName: 'xxx' //米
      //    name: '水位',
      // }
      let series = this.datas.data.map((el, i) => {
        return {
          name: this.datas.name[i],
          data: el,
          type: 'line',
          smooth: true,
          hoverAnimation: false,
          itemStyle: {
            normal: { areaStyle: { type: 'default' } },
            emphasis: {
              opacity: 0.3
            }
          }
        }
      })
      this.chart.setOption(
        {
          tooltip: {
            trigger: 'axis'
          },
          grid: [
            {
              top: 40,
              left: 40,
              right: '3%',
              bottom: 40
            }
          ],
          xAxis: {
            type: 'category',
            position: 'bottom',
            data: this.datas.time.map(time => this.$timeFormat(time)),
            axisLine: {
              onZero: false
            },
            axisLabel: {
              margin: 15,
              textStyle: {
                fontSize: 12
              }
            }
          },
          yAxis: {
            type: 'value',
            name: this.datas.unit,
            scale: true,
            axisLabel: {
              textStyle: {
                fontSize: 12
              }
            }
          },
          dataZoom: [
            {
              type: 'inside',
              show: false,
              realtime: true,
              start: 0,
              end: 100,
              filterMode: 'none'
            }
          ],
          color: ['#5EBEFC', '#3dd28d', '#416dea'],
          series: [...series]
        },
        true
      )
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('chart'))
  }
}
</script>

<style scoped>
#chart {
  width: 100%;
  background: white;
  border-bottom: 1px solid rgb(244, 245, 246);
}
</style>
