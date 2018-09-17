<template>
  <div class="monthSales">
    <headerTwo :headerList="headerList"></headerTwo>
    <div class="content">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="item" v-for="order in orders" :key="order.id">
          <OrderItem :orderInfor="order"></OrderItem>
        </div>
      </div>
      <div class="nomore">没有更多...</div>
    </div>
  </div>
</template>
<script>
import headerTwo from 'base/headerTwo/headerTwo'
import OrderItem from './orderItem'
import {allUrl} from '@/router/allUrl'
export default {
  components: {headerTwo, OrderItem},
  data () {
    return {
      headerList: {
        titleText: '本月个人销售',
        path: '',
        leftText: '返回',
        money: '',
        moneyText: '销售总额'
      },
      orders: [],
      pages: 1
    }
  },
  methods: {
    getData () {
      this.$get(allUrl.personalSales + '2/' + this.pages + '/10000').then((res) => {
        if (res.success) {
          this.headerList.money = res.data.totalMoney.amount
          if (this.pages <= res.data.page.pages) {
            for (let element of res.data.page.list) {
              this.orders.push({
                id: element.id,
                num: element.orderNo,
                time: element.gmtCreateStr,
                money: element.goodsTotalMoney.amount,
                orderTMM: element.singleEarn.amount
              })
            }
          }
        }
      })
    },
    loadMore () {
      if (this.orders.length) {
        this.pages += 1
        this.getData()
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .monthSales {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      flex: 1;
      overflow: auto;
      background-color: #fff;
      .item {
        border-bottom: 1px solid #e6e6e6;
      }
      .nomore {
        text-align: center;
        font-size: 14px;
        color: #666;
        margin: 15px 0;
      }
    }
  }
</style>
