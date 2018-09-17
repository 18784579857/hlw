<template>
  <div class="dayMsg">
    <div class="date">
      <span>{{date}}</span>
    </div>
    <div class="msg">
      <div v-for="msg in msg.mode" :key="msg.id">
        <System v-if="msg.type==='XT'" :system="msg"></System>
        <System v-else-if="msg.type==='ZS'" :system="msg"></System>
        <System v-else-if="msg.type==='TS'" :system="msg"></System>
        <Refund v-else-if="msg.type==='TK'" :refund="msg"></Refund>
        <Expressage v-else-if="msg.type==='FH'" :expressage="msg"></Expressage>
        <Expressage v-else-if="msg.type==='SH'" :expressage="msg"></Expressage>
      </div>
    </div>
  </div>
</template>
<script>
import System from './system'
import Refund from './refund'
import Expressage from './expressage'
export default {
  props: ['msg'],
  components: {System, Refund, Expressage},
  data () {
    return {
      date: ''
    }
  },
  created () {
    let curDate = this.$props.msg.mode[0].gmtCreate
    // var time1 = new Date(curDate).getTime()
    let time2 = curDate.substr(0, 10)
    // let utc = new Date().getDate() - new Date(time1).getDate()
    let today = getDateStr(0)
    let yesterday = getDateStr(-1)
    switch (time2) {
      case today:
        this.date = '今天'
        break
      case yesterday:
        this.date = '昨天'
        break
      // case 2:case 3:case 4:case 5:case 6:
      //   this.date = this.getDay(this.$props.msg.date)
      //   break
      default:
        this.date = time2
        break
    }
    function getDateStr (AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      let month = m < 10 ? '0' + m : m
      let day = d < 10 ? '0' + d : d
      return y + '-' + month + '-' + day
    }
  },
  methods: {
    // 获取时间的信息
    GetDateStr (AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount)
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1
      var d = dd.getDate()
      return y + '-' + m + '-' + d
    },
    getDate (date) {
      return new Date(date).getFullYear() + '/' + (new Date(date).getMonth() + 1) + '/' + new Date().getDate()
    },
    getDay (date) {
      let day = ''
      switch (new Date(date).getDay()) {
        case 0:
          day = '星期天'
          break
        case 1:
          day = '星期一'
          break
        case 2:
          day = '星期二'
          break
        case 3:
          day = '星期三'
          break
        case 4:
          day = '星期四'
          break
        case 5:
          day = '星期五'
          break
        case 6:
          day = '星期六'
          break
      }
      return day
    }
  }
}
</script>
<style lang="less" scoped>
  .dayMsg {
    .date {
      color: #fff;
      font-size: 12px;
      padding: 10px 0;
      text-align: center;
      span {
        padding: 4px 10px;
        background-color: #ddd;
        border-radius: 5px;
      }
    }
    .msg {
      > div {
        + div {
          margin-top: 10px;
        }
      }
    }
  }
</style>
