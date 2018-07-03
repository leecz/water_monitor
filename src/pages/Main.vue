<template>
  <div class="water-level">
    <div class="chart-wrap" 
      :style="{height: chartWrapHeight}">
      <div class="header"> 蕉东水闸物联水位站 </div>
      <div id="chart"
        :style="{height: chartHeight}"
        v-on-echart-resize></div>
    </div>

    <WaterLevel :style="{'margin-top': marginTop}"></WaterLevel>
  </div>
</template>

<script>
import axios from 'axios'
import WaterLevel from '@/components/WaterLevel'
const echarts = require('echarts')

export default {
  components: {
    WaterLevel
  },
  data() {
    return {
      result: {},
      timeId: '',
      chart: {}
    }
  },
  computed: {
    chartWrapHeight() {
      return (window.innerHeight / 2) + 'px'
    },
    chartHeight() {
      return (window.innerHeight / 2 - 50) + 'px'
    },
    marginTop() {
      return (window.innerHeight / 2 + 5) + 'px'
    }
  },
  methods: {
    fetchData() {
      axios.get('http://api.bp.zlopo.com:20000/boss-microbus-service/v1/WaterLevel/queryWaterLevelByTime').then(res => {
        if (res.data.code === 200) {
          this.result = res.data.result
          // this.result.time.length = 300
          // this.result.wl.length = 300
          this.setChartOpt()
        }
      })
    },
    loopFetch() {
      this.fetchData()
      this.timeId = setTimeout(this.loopFetch, 300000)
    },
    setChartOpt() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
        },
        grid: [
          {
            top: 40,
            left: 40,
            right: '3%',
            bottom: 40,
          }
        ],
        xAxis: {
          type: 'category',
          position: 'bottom',
          data: this.result.time,
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
          name: '单位 米',
          scale: true,
          axisLabel: {
            textStyle: {
              fontSize: 12
            }
          }
          // max: 'dataMax',
          // boundaryGap: [0.2, 0.2]
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
        color: ["#5EBEFC"],
        series: [{
          name: '水位',
          data: this.result.wl,
          type: 'line',
          smooth: true,
          hoverAnimation: false,
          areaStyle: {
            normal: {
              origin: 'start',
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //   offset: 0,
              //   color: 'rgba(216, 244, 247,1)'
              // }, {
              //   offset: 1,
              //   color: 'rgba(216, 244, 247,1)'
              // }], false)
            }
          },
        }]
      })
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('chart'))
    this.loopFetch()
  },
  beforeDestroy() {
    clearTimeout(this.timeId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.water-level {
  background: rgb(244, 245, 246);
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid rgb(244, 245, 246);
}
.chart-wrap {
  width: 100%;
  max-width: 800px;
  position: fixed;
  top: 0;
}
.header {
  font-size: 18px;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  height: 50px;
  background: rgb(244, 245, 246);
}
#chart {
  width: 100%;
  background: white;
  border-bottom: 1px solid rgb(244, 245, 246);
}
.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.top-btn {
  margin: 0 5px 5px;
  border-radius: 3px;
  background: white;
  padding: 6px;
  font-size: 14px;
}
</style>
