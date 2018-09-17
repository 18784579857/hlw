<template>
  <div class="order">
    <Header :headerList="headerList"></Header>
    <div class="order_body">
      <div>
        <Left @handleClickLeft="handleClickLeft"></Left>
        <!-- <Right @handleClickRight="handleClickRight"></Right> -->
        <Right :leftSelected="leftSelected"></Right>
      </div>
    </div>
    <div class="bottomBtn">
      <div class="count_price">
        <el-badge :value="shopCartCount"
                  :max="99"
                  class="item">
          <img src="@/assets/goodsList/ic_shopping-cart.png"
               alt="购物车">
        </el-badge>
        <span class="text">总价:</span>
        <span>￥</span>
        <span class="price">{{shopCartTotalPrice}}</span>
      </div>
      <div class="settlementBtn"
           @click="settlement">
        <span>加入购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'base/header/header'
import Left from './leftBtn/leftBtn'
import Right from './rightList/rightList'
import { Toast, Indicator } from 'mint-ui'
import { allUrl } from '@/router/allUrl'
export default {
  name: 'order',
  components: { Header, Left, Right },
  data () {
    return {
      headerList: {
        leftText: '',
        path: '',
        text: '下单',
        righText: ''
      },
      leftSelected: {}
    }
  },
  methods: {
    handleClickLeft (leftBtn) {
      this.leftSelected = leftBtn
      // console.log(leftBtn)
    },
    handleClickRight () {
      console.log('1')
    },
    settlement () {
      let data = {
        shopingCarList: []
      }
      for (let item of this.$store.state.goodsSelectedCount) {
        let obj = {}
        if (item.count > 0) {
          obj = {
            goodsId: item.infor.id,
            buyAmount: item.count
          }
          data.shopingCarList.push(obj)
        }
      }
      if (!data.shopingCarList.length) {
        Toast({
          message: '请选择商品',
          position: 'center',
          duration: 2000
        })
        return
      }
      Indicator.open('加载中...')
      this.$post(allUrl.addShopCart, data).then((res) => {
        if (res.success) {
          this.$store.commit('clearGoods')
          Indicator.close()
          Toast({
            message: '添加成功',
            position: 'center',
            duration: 2000
          })
          this.$router.push({
            path: '/home/shoppingcart'
          })
          this.$store.state.flag = ''
        } else {
          Indicator.close()
          Toast({
            message: '添加失败，稍后再试',
            position: 'center',
            duration: 2000
          })
        }
      })
    }
  },
  mounted () {
    // var x = $(document).scrollLeft()
    // var y = $(document).scrollTop()
  },
  computed: {
    shopCartCount: function () {
      let arr = []
      for (let element of this.$store.state.goodsSelectedCount) {
        if (element.count > 0) {
          arr.push(element)
        }
      }
      return arr.length
    },
    shopCartTotalPrice: function () {
      let count = 0
      for (let element of this.$store.state.goodsSelectedCount) {
        if (element.count > 0) {
          // count = count + (element.count * element.infor.price)
          count = count + (element.count * element.infor.salePrice)
          count = Number(parseFloat(count).toFixed(2))
        }
      }
      return count
    }
  }
}
</script>
<style lang="less" scoped>
  .order {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .order_body {
      height: calc(100% - 41px);
      flex: 1;
      overflow: auto;
      border-top: 1px solid #ECECEC;
      > div {
        display: flex;
        height: 100%;
      }
    }
    .bottomBtn {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ddd;
      .count_price {
        padding-left: 5vw;
        img {
          width: 13.33vw;
          height: 13.33vw;
          position: relative;
          bottom: 5px;
        }
        span {
          font-size: 13px;
          color: #F4554D;
          font-weight: bold;
        }
        .text {
          font-size: 15px;
          color: #222;
          margin-left: 10px;
          font-weight: normal;
        }
        .price {
          font-size: 6vw;
          font-weight: bold;
        }
      }
      .settlementBtn {
        width: 30.67vw;
        height: 14.4vw;
        text-align: center;
        line-height: 14.4vw;
        background-color: #F4554D;
        font-size: 17px;
        color: #fff;
      }
    }
  }
</style>
