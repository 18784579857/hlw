<template>
  <div class="current">
    <div class="header">
      <headerTwo @operation="operation" :headerList="headerList"></headerTwo>
    </div>
    <div class="content">
      <Record :recordItem="recordItem"></Record>
    </div>
  </div>
</template>
<script>
import headerTwo from 'base/headerTwo/headerTwo'
import Record from './recordItem'
import {allUrl} from '@/router/allUrl'
export default {
  components: {headerTwo, Record},
  data () {
    return {
      headerList: {
        titleText: '本期店铺分红',
        path: '',
        leftText: '返回',
        righText: '分红记录',
        money: '',
        moneyText: '分红总额'
      },
      recordItem: {}
    }
  },
  methods: {
    operation () {
      this.$router.push({
        path: '/recording'
      })
    },
    getData () {
      this.$get(allUrl.storeCurrent).then((res) => {
        if (res.success) {
          this.headerList.money = res.data.totalMoney.amount
          let arr = []
          res.data.dividends.forEach(element => {
            arr.push({
              storeName: element.storeName,
              sales: element.saleMoney.amount,
              fenhong: element.dividendMoney.amount
            })
          })
          this.recordItem = {
            time: this.dealWithTime(res.data.gmtStart),
            total: res.data.totalMoney.amount,
            list: arr
          }
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
  .current {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      flex: 1;
      overflow: auto;
      height: 100%;
    }
  }
</style>
