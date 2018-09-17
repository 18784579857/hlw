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
      <div class="price_sale">
        <span class="sale_title">代理价：</span>
        <span>￥</span>
        <span class="price">{{goodsInfor.price}}</span>
      </div>
      <div class="market_sale">
        <span class="sale_title">市场价：</span>
        <span>￥</span>
        <span class="price">{{goodsInfor.salePrice}}</span>
      </div>
      <div class="btn">
        <img v-if="buyCount <= 0"
             src="@/assets/goodsList/ic_reduce_un.png"
             alt="">
        <img v-else
             @touchend="subtract"
             src="@/assets/goodsList/ic_reduce.png"
             alt="">
        <span>{{buyCount}}</span>
        <img @touchend="add(goodsInfor.sale)"
             src="@/assets/goodsList/ic_add.png"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  props: ['goodsInfor'],
  data () {
    return {
      buyCount: 0
    }
  },
  methods: {
    subtract () {
      this.buyCount = this.buyCount - 1
      // console.log(this.$props.goodsInfor)
      this.$store.commit('subtractGoods', this.$props.goodsInfor)
    },
    add (num) {
      if (this.buyCount < num) {
        this.buyCount = this.buyCount + 1
        this.$store.commit('addGoods', this.$props.goodsInfor)
        // console.log(this.$store.state.goodsSelectedCount)
      } else {
        Toast({
          message: '库存不足！',
          duration: 3000
        })
      }
    },
    imgClick (goodsInfor) {
      // this.$parent.param.flag = 'goDetail'
      this.$store.state.flag = 'goDetail'
      // console.log(this.$parent.param.flag)
      this.$router.push({
        name: 'GoodDetail',
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
        margin-bottom: 8px;
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
