<template>
  <div class="yearSales">
    <headerTwo :headerList="headerList"></headerTwo>
    <div class="content">
      <div class="item" v-for="sale in sales" :key="sale.time">
        <span class="money">销售金额：{{sale.money}}</span>
        <!-- <span class="time">{{sale.time}}</span> -->
      </div>
      <ul class="monthList-gourp">
        <li v-for="(item,i) in monthList" :key="i" class="monthList-item">
          <span class="data">{{item.date.split('-')[0]+'年'+item.date.split('-')[1]+'月'}}</span>
           <span class="totalMoney">津贴合计：{{item.salary===null?'0.00':item.salary.amount}}</span>
        </li>
      </ul>
      <!-- <div class="total">
        <span>合计:</span>
        <span>{{total}}</span>
      </div> -->
    </div>
  </div>
</template>
<script>
import headerTwo from 'base/headerTwo/headerTwo'
import {allUrl} from '@/router/allUrl'
export default {
  components: {headerTwo},
  data () {
    return {
      headerList: {
        titleText: '本年个人津贴',
        path: '',
        leftText: '返回',
        money: '',
        moneyText: '津贴总计'
      },
      monthList: [],
      total: ''
    }
  },
  methods: {
    getData () {
      const self = this
      this.$get(allUrl.yearPersonalSales).then((res) => {
        if (res.success) {
          self.headerList.money = res.data.totalMoney === null ? '0.00' : res.data.totalMoney.amount
          self.monthList = res.data.page
          // this.total = res.data.totalMoney.amount
          // let arr = []
          // for (let element of res.data.page) {
          //   arr.push({
          //     time: element.months,
          //     money: element.count.amount
          //   })
          // }
          // this.sales = arr
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
  .yearSales {
    height: 100%;
    .content {
      height:  calc(100% - 180px);
      background-color: #fff;
      ul{
        list-style: none;
        margin: 10px 0px 0px 0px;
        padding: 0px;
        li{
          padding: 3vh 4vw;
          display: -webkit-box;
          display: -ms-flexbox;
          display:flex;
          border-bottom: 1px solid #f6f6f6;
          span{
            display: inline-block;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
          }
          .totalMoney{
            -webkit-box-flex: 2;
            -ms-flex: 2;
            flex:2;
            text-align: right;
          }
          .totalMoney::after{
            content:'元'
          }
        }
      }
      // .item {
      //   padding: 4.5vw;
      //   border-bottom: 1px solid #e6e6e6;
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   .money {
      //     font-size: 4vw;
      //     color: #222;
      //   }
      //   .time {
      //     font-size: 12px;
      //     color: #999;
      //   }
      // }
      // .total {
      //   padding: 4.5vw;
      //   font-size: 4.27vw;
      //   font-weight: bold;
      //   color: #222;
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      // }
    }
  }
</style>
