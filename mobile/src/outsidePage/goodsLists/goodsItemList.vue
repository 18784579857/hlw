<template>
  <div class="goodsItem">
    <div class="goodsImg">
      <img :src="goodsInfor.imgUrl"
           alt="商品图片"
           @click="imgClick(goodsInfor)">
    </div>
    <div class="msg">
      <div class="title"
           @click="imgClick(goodsInfor)">
        <span>{{goodsInfor.title}}</span>
      </div>
      <div class="subTitle">
        <span>{{goodsInfor.subtitle}}</span>
      </div>
      <div class="spec">
        <span style="flex:1">{{goodsInfor.spec}}g</span>
        <span class="sale">库存 {{goodsInfor.sale}}</span>
      </div>
      <div class="market_sale">
        <span class="sale_title">价格：</span>
        <span>￥</span>
        <span class="price">{{goodsInfor.salePrice}}</span>
      </div>
      <div class="btn">
        <img v-if="buyCount <= 0"
             src="@/assets/goodsList/ic_reduce_un.png"
             alt="">
        <img v-else
             @touchend="subtract(goodsInfor)"
             src="@/assets/goodsList/ic_reduce.png"
             alt="">
        <span>{{buyCount}}</span>
        <img @touchend="add(goodsInfor)"
             src="@/assets/goodsList/ic_add.png"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { allUrl } from '@/router/allUrl'
export default {
  props: ['goodsInfor'],
  // props: {
  //   goodsInfor: {
  //     default: null
  //   },
  //   buyCount: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data () {
    return {
      buyCount: 0,
      count: 0
    }
  },
  methods: {
    subtract (goodsInfor) {
      const self = this
      // self.buyCount = self.buyCount - 1
      // console.log(self.$props.goodsInfor)
      self.handleCount('subtractGoods', self, goodsInfor)
      // self.$store.commit('subtractGoods', self.$props.goodsInfor)
    },
    add (goodsInfor) {
      const self = this
      self.handleCount('addGoods', self, goodsInfor)
      // if (self.buyCount < goodsInfor.sale) {
      //   self.buyCount = self.buyCount + 1
      //   self.handleCount('addGoods', self, goodsInfor)

      //   // console.log(this.$store.state.goodsSelectedCount)
      // } else {
      //   Toast({
      //     message: '库存不足！',
      //     duration: 3000
      //   })
      // }
    },
    handleCount (option, self, goodsInfor) {
      self.count = self.buyCount
      if (option === 'addGoods') {
        self.count++
      } else {
        if (self.count > 0) {
          self.count--
        }
      }
      self.$get(allUrl.handleGoods + '/' + goodsInfor.id + '/' + self.count).then(res => {
        if (res.success) {
          if (option === 'addGoods') {
            if (self.buyCount < goodsInfor.sale) {
              self.buyCount = self.count
            } else {
              Toast({
                message: '库存不足！',
                duration: 3000
              })
            }
          } else {
            self.buyCount = self.buyCount - 1
          }
          self.$store.commit(option, self.$props.goodsInfor)
        } else {
          Toast({
            message: res.msg,
            duration: 3000
          })
        }
      })
    },
    imgClick (goodsInfor) {
      // this.$parent.param.flag = 'goDetail'
      this.$store.state.flag = 'goDetail'
      // console.log(this.$parent.param.flag)
      this.$router.push({
        path: '/outside/orderDetails',
        query: {
          goodId: goodsInfor.id
        }
      })
    }
  },
  mounted () {
    this.$store.state.goodsSelectedCount.forEach(e => {
      if (e.infor.id === this.$props.goodsInfor.id) {
        this.buyCount = e.count
      }
    })
  }
}
</script>
<style lang="less" scoped>
  .goodsItem {
    background-color: #fff;
    display: flex;
    margin-bottom: 5px;
    padding: 0px 5px;
    border-bottom: 1px solid #E8E8E8;
    .goodsImg {
      width: 24vw;
      height: 24vw;
      align-self: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .msg {
      align-self: center;
      flex: 1;
      padding: 3vw 2vw 3vw 3vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 15px;
        color: #222;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .subTitle {
        font-size: 13px;
        padding-top: 4px;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
      .spec {
        font-size: 12px;
        color: #999;
        padding-top: 6px;
        display: flex;
        line-height: 16px;
      }
      .btn {
        display: flex;
        justify-content: flex-end;
        margin-right: 5px;
        img {
          width: 23px;
          height: 23px;
        }
        span {
          margin: 0 4vw;
          display: inline-block;
          line-height: 23px;
        }
      }
      .price_sale {
        margin: 6px 0px;
        font-size: 12px;
        color: #F4554D;
        font-weight: bold;
        .price {
          font-size: 14px;
        }
        .sale_title{
          font-weight: normal;
        }
        .sale {
          margin-left: 4vw;
          font-weight: normal;
          font-size: 13px;
          color: #999;
        }
      }
      .market_sale {
        margin: 7px 0px;
        font-size: 12px;
        color: #F4554D;
        font-weight: bold;
        .sale_title{
          font-weight: normal;
        }
        .price {
          font-size: 18px;
        }
      }
    }
  }
</style>
