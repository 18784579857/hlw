<template>
  <div class="todaySales">
    <headerTwo :headerList="headerList"></headerTwo>
    <div class="content">
      <div class="item" v-for="sale in sales" :key="sale.name">
        <Item :item="sale"></Item>
      </div>
    </div>
  </div>
</template>
<script>
import headerTwo from 'base/headerTwo/headerTwo'
import Item from './item'
import {allUrl} from '@/router/allUrl'
export default {
  components: {headerTwo, Item},
  data () {
    return {
      headerList: {
        titleText: '本月团队销售',
        path: '',
        leftText: '返回',
        money: '',
        moneyText: '销售总额'
      },
      sales: [],
      total: '',
      page: 1
    }
  },
  methods: {
    getData () {
      this.$get(allUrl.teamSales + '2/' + this.page + '/10000').then((res) => {
        if (res.success) {
          // debugger
          this.headerList.money = res.data.totalMoney.amount
          this.total = res.data.totalMoney.amount
          let arr = []
          for (let element of res.data.team) {
            arr.push({
              name: element.username,
              money: element.money.amount
            })
          }
          this.sales = arr
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .todaySales {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      flex: 1;
      .item {
        background-color: #fff;
      }
    }
  }
</style>
