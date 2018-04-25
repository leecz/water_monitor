<template>
  <div class="water-level">
    <header>水位监测实时数据</header>
    <div v-for="data in datas" :key="data.id" class="row-item">
      <div class="devId">
        <div>设备号: {{data.devEui}}</div>
      </div>
      <div class="info">
        <div>水位: <span>{{data.level}}</span>mm</div>
        <div>温度: <span>{{data.temperature}}</span>&#8451;</div>
      </div>
      <div>{{ $timeFormat(data.dataTime)}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      datas: [],
      timeId: ''
    }
  },
  methods: {
    fetchData() {
      axios.get('http://api.bp.zlopo.com:20000/boss-microbus-service/v1/WaterLevel/queryWaterLevel').then(res => {
        if (res.data.code === 200) {
          this.datas = res.data.result.datas
        }
      })
    },
    loopFetch(){
      this.fetchData()
      this.timeId = setTimeout(this.loopFetch, 5000) 
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
header {
  font-size: 1.4em;
  text-align: center;
  padding: 15px;
}
.water-level {
  padding: 5px;
}
.row-item {
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border: 1px solid #f8f7f7;
}
.info {
  height: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info span {
  font-size: 1.1em;
}
.devId {
  font-size: 0.8em;
  color: #666666;
}
.row-foot{
  font-size: 0.8em;
}
</style>
