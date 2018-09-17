<template>
  <div class="recording">
    <div class="header">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="content">
      <div v-for="record in recordData" :key="record.id">
        <Record :recordItem="record"></Record>
      </div>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import Record from './recordItem'
import {allUrl} from '@/router/allUrl'
export default {
  components: {Header, Record},
  data () {
    return {
      headerList: {
        leftText: '返回',
        path: '',
        text: '分红记录',
        righText: ''
      },
      recordData: []
    }
  },
  methods: {
    getData () {
      this.$get(allUrl.fenHongRecord).then((res) => {
        if (res.success) {
          let list = []
          res.data.forEach((element, index) => {
            let arr = []
            element.dividends.forEach(el => {
              arr.push({
                storeName: el.storeName,
                sales: el.saleMoney.amount,
                fenhong: el.dividendMoney.amount
              })
            })
            list.push({
              id: index,
              time: this.dealWithTime(element.gmtStart),
              total: element.totalMoney.amount,
              list: arr
            })
          })
          this.recordData = list
        }
      })
    },
    dealWithTime (time) {
      return new Date(time).getFullYear() + '-' + (new Date(time).getMonth() + 1) + '-' + new Date(time).getDate() + ' ' + new Date(time).getHours() + ':' + new Date(time).getMinutes()
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .recording {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      border-top: 1px solid #e6e6e6;
      flex: 1;
      overflow: auto;
      padding-bottom: 6.67vw;
    }
  }
</style>
