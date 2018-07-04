<template>
  <div class="water-level">
    <div class="chart-wrap" :style="{height: chartWrapHeight}">
      <div class="header"> 蕉西水闸物联水位站 </div>
      <div class="btn-group">
        <button class="button" @click="handleClick('water')">水位</button>
        <button class="button" @click="handleClick('rh')">雨量</button>
        <button class="button" @click="handleClick('ws')">风速</button>
        <button class="button" @click="handleClick('wd')">风向</button>
        <button class="button" @click="handleClick('sewer')">下水道水位</button>
      </div>
      <WaterChart :datas="currentChart" :style="{height: chartHeight}"></WaterChart>
    </div>
    <div class="table" :style="{'margin-top': marginTop}">
      <el-table :data="dataSet" :height="tableHeight">
        <el-table-column label="设备名称" prop="devName" align="center"></el-table-column>
        <el-table-column label="时间" prop="dataTime" width="180" align="center">
          <template slot-scope="scope">
            <div>{{$timeFormat(scope.row.dataTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="内水位" prop="innerLevel" align="center"></el-table-column>
        <el-table-column label="外水位" prop="outerLevel" align="center"></el-table-column>
        <el-table-column label="时雨量" prop="dtuRainHour" align="center"></el-table-column>
        <el-table-column label="风速" prop="dtuWindSpeed" align="center"></el-table-column>
        <el-table-column label="风向" prop="dtuWindDirection" align="center"></el-table-column>
        <el-table-column label="下水道" prop="sewerLevel" align="center"></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
const echarts = require('echarts')
import WaterChart from '../components/WaterChart'

const url =
  'http://172.16.1.119:30000/v1/hydrogy/query/record/?inner=FFFFFFFF01ABF04F&outer=FFFFFFFF01ABF04E&dtu=985DADFFFF7EF43B&sewer=FFFFFFFF01ABF04F'
export default {
  components: {
    WaterChart
  },
  data() {
    return {
      timeId: '',
      currentChart: {},
      dataSet: [],
      isInit: false
    }
  },
  computed: {
    tableHeight() {
      return window.innerHeight / 2
    },
    chartWrapHeight() {
      return window.innerHeight / 2 + 'px'
    },
    chartHeight() {
      return window.innerHeight / 2 - 94 + 'px'
    },
    marginTop() {
      return window.innerHeight / 2 + 5 + 'px'
    }
  },
  methods: {
    handleClick(code) {
      this.currentChart = this[code]
    },
    fetchData() {
      axios.get(url).then(res => {
        let result = res.data
        this.rh = {
          data: [result.chart_data_rh],
          unit: '单位 mm',
          name: ['雨量'],
          time: result.chart_time_rh
        } // 雨量
        this.sewer = {
          name: ['下水道水位'],
          unit: '单位 mm',
          data: [result.chart_data_sewer],
          time: result.chart_time_sewer
        } // 下水道
        this.water = {
          data: [result.chart_data_inner, result.chart_data_outer],
          unit: '单位 mm',
          name: ['内水位', '外水位'],
          time: result.chart_time_water // 水位
        }
        this.wd = {
          name: ['风向'],
          unit: '单位 度',
          data: [result.chart_data_wd], // 风向
          time: result.chart_time_wd
        }
        this.ws = {
          name: ['风速'],
          unit: '单位 m/s',
          data: [result.chart_data_ws],
          time: result.chart_time_ws
        }
        this.dataSet = result.table
        if (!this.isInit) {
          this.currentChart = this.water
          this.isInit = true
        }
      })
    },
    loopFetch() {
      this.fetchData()
      this.timeId = setTimeout(this.loopFetch, 300000)
    }
  },
  mounted() {
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
  background: white;
  z-index: 1000;
}
.header {
  font-size: 18px;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  height: 50px;
  background: rgb(244, 245, 246);
}

.btn-group {
  display: flex;
  align-items: center;
  padding: 3px 0;
}
.button {
  display: flex;
  overflow: hidden;

  margin: 1px;
  padding: 10px 12px;

  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;

  border: 0 none;
  border-radius: 4px;

  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;

  -webkit-appearance: none;
  -moz-appearance: none;
  /* appearance: none; */

  justify-content: center;
  align-items: center;
  flex: 0 0 80px;

  box-shadow: 2px 5px 10px #e4e4e4;
}
.button {
  color: #202129;
}
.button:focus {
  outline: 1px solid #5ebefc;
  outline-offset: -1px;
}
.button:active {
  transition: all 150ms linear;
  opacity: 0.75;
}
.button:hover {
  transition: all 150ms linear;

  opacity: 0.85;
}
.table {
  position: relative;
}
</style>
