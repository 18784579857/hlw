<template>
  <div class="storeCost">
    <Header :headerList="headerList"></Header>
    <div class="costBody">
      <div class="title"><span>项目</span><span>金额</span></div>
      <div class="content">
        <div v-for="cost in costList" :key="cost.name"><span>{{cost.name}}</span><span>{{cost.val}}</span></div>
      </div>
      <div class="total"><span>合计:</span><span>{{total}}</span></div>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
export default {
  components: {Header},
  data () {
    return {
      headerList: {
        leftText: '返回',
        path: '',
        text: '',
        righText: ''
      },
      costList: [],
      total: ''
    }
  },
  methods: {
    getData () {
      this.$get(allUrl.storeCost + this.$route.query.id + '/' + this.$route.query.type).then((res) => {
        if (res.success) {
          let arr = []
          let count = 0
          res.data.forEach(element => {
            count += Number(element.income.amount)
            arr.push({
              name: element.name,
              val: element.income.amount
            })
          })
          this.total = Number(count.toFixed(2))
          this.costList = arr
        }
      })
    }
  },
  created () {
    this.headerList.text = this.$route.query.storeName
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .storeCost {
    .costBody {
      .title {
        font-size: 13px;
        color: #666;
        padding: 3vw 4vw;
        display: flex;
        justify-content: space-between;
      }
      .content {
        font-size: 14px;
        color: #222;
        background-color: #fff;
        > div {
          padding: 5vw 4vw;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #E6E6E6;
        }
      }
      .total {
        font-size: 15px;
        color: #222;
        font-weight: bold;
        background-color: #fff;
        padding: 5vw 4vw;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
