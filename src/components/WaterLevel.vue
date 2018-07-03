<template>
  <div class="water-table">
    <div v-for="data in datas"
      :key="data.id"
      class="row-item">
      <div class="left">
        <div class="left-row"><img src="~@/assets/icon-local.png"
            class="icon"
            alt="">
            <span>{{ location }}</span></div>
        <div class="left-row"><img src="~@/assets/icon-time.png"
            class="icon"
            alt=""><span>{{ $timeFormat(data.dataTime)}}</span></div>
      </div>
      <div class="info">
        <div class="info-left">{{data.levelStr}}</div>
        <div class="info-right">
          <div>水位</div>
          <div>米</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      datas: [],
      timeId: '',
      location: '蕉东监测站'
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
.row-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: white;
  border-bottom: 1px solid #f8f7f7;
}
.left {
  font-size: 14px;
  color: #2e2e2e;
}
.left-row {
  display: flex;
  align-items: center;
  height: 20px;
  margin-top: 2px;
  vertical-align: middle;
}
.icon {
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
  margin-right: 5px;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #36a9e5;
}
.info-left {
  font-size: 32px;
  font-weight: 600;
  margin-right: 4px;
}
.info-right {
  font-size: 12px;
}
.row-foot {
  font-size: 0.8em;
}
/* @media screen and (min-width: 960px) {
  .row-item {
    justify-content: space-around;
  }
} */
</style>
