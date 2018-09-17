<template>
  <div class="goodDetail">
    <div class="headers">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="allSty">
      <div class="firstDiv">
        <img class="imgsDetail"
             :src="dataList.imgUrl"
             alt="" />
        <div class="goodTitle"
             style="padding:0px 10px;">
          <p class="marketSty"
             style="">
            <span style="font-size:.9rem;font-weight: normal;">市场价：￥</span>{{dataList.salePrice}}</p>
          <p class="priceSty"
             style="">
            <span style="font-size:.9rem;font-weight: normal;">代理价：￥</span>{{dataList.price}}</p>
          <h4>{{dataList.title}}</h4>
          <p class="specSty">
            <span style="flex:1">规格：{{dataList.spec}}g</span>
            <span>库存：{{dataList.sale}}</span>
          </p>
        </div>
      </div>
      <div class="imgDetail">
        <p class="navDetail"
           style="font-size: .8rem;">
          <img src="@/assets/ic_tuwen.png"
               style="width: 18px;vertical-align: middle;margin-right: 8px;"
               alt="" />图文详情
        </p>
        <div style="margin:0px 10px;background:#fff"
             v-html="dataList.detail"></div>
      </div>
    </div>
    <div class="bottomBtn">
      <div class="count_price">
        <el-badge :value="shopCartCount"
                  :max="99"
                  :hidden="true"
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
import { allUrl } from '@/router/allUrl'
import { Toast, Indicator } from 'mint-ui'
export default {
  components: { Header },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '商品详情',
        righText: ''
      },
      content: '',
      dataList: {
        imgUrl: '',
        title: '',
        detail: '',
        price: '',
        sale: '',
        spec: '',
        id: ''
      },
      buyCount: 0
    }
  },
  methods: {
    getData () {
      this.$get(allUrl.getGoodDetail + this.dataList.id).then((res) => {
        if (res.success) {
          this.dataList.imgUrl = res.data.indexImg
          this.dataList.title = res.data.name
          if (res.data.detail === '' || res.data.detail === undefined || res.data.detail === null) {
            this.dataList.detail = ''
          } else {
            this.dataList.detail = res.data.detail.detail
          }
          this.dataList.price = res.data.agentPrice.amount
          this.dataList.sale = res.data.inventory
          this.dataList.spec = res.data.spec
          this.dataList.salePrice = res.data.salePrice.amount
        }
      })
    },
    settlement () {
      let data = {
        shopingCarList: []
      }
      let goodsSelectedCount = this.$store.state.goodsSelectedCount
      let state = 0
      for (let i = 0; i < goodsSelectedCount.length; i++) {
        if (goodsSelectedCount[i].infor.id === this.dataList.id) {
          state = 0
          this.buyCount = goodsSelectedCount[i].count
          if (parseInt(this.buyCount) < parseInt(this.dataList.sale)) {
            this.buyCount++
            goodsSelectedCount[i].count = this.buyCount
          } else {
            Toast({
              message: '库存不足！',
              duration: 3000
            })
          }
        } else {
          state = 1
        }
      }
      // console.log(state)
      if (state === 1) {
        this.buyCount = this.buyCount + 1
        this.$store.commit('addGoods', this.dataList)
      }
      for (let item of this.$store.state.goodsSelectedCount) {
        let obj = {}
        if (item.count > 0) {
          obj = {
            goodsId: item.infor.id,
            buyAmount: item.count
          }
        }
        data.shopingCarList.push(obj)
      }
      if (!data.shopingCarList.length) {
        let arr = {}
        arr = {
          goodsId: this.dataList.id,
          buyAmount: 1
        }
        data.shopingCarList.push(arr)
      }
      Indicator.open('加载中...')

      this.$post(allUrl.addShopCart, data).then((res) => {
        if (res.success) {
          this.$store.state.flag = ''
          Indicator.close()
          Toast({
            message: '添加成功',
            position: 'center',
            duration: 2000
          })
          this.$router.push({
            path: '/home/shoppingcart'
          })
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
  mounted: function () {
    this.dataList.id = this.$route.query.goodId
    this.getData()
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
  },
  beforeDestroy: function () {
  }
}
</script>

<style lang="less">
.goodDetail{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .headers{
    height:40px;
  }
  .allSty{
    overflow: auto;
    flex:1;
    .firstDiv{
      background: #fff;
      img{width: 100%;}
      .imgsDetail{
        width:100%;
      }
      .goodTitle{
        padding:0px 10px;
        padding-bottom: 5px !important;
        .marketSty{
          color:#F4554D;
          font-size:1.3rem;
          margin:10px 0px;
          font-weight: bold;
        }
        .priceSty{
          color:#F4554D;
          font-size:1rem;
          margin:10px 0px;
          margin-bottom: 15px;
          font-weight: bold;
        }
        h4{
          color:#222222;
          font-size:1rem;
          margin:0px;
        }
        .specSty{
          display: flex;
          margin: 10px 0px 5px 0px;
          color: #999999;
          font-size: .8rem;
        }
        .flag{
          margin:5px 0px;
          color:#999999;
          font-size:.8rem;
        }
      }
    }
    .imgDetail{
      background: #fff;
      margin-bottom: 70px;
      overflow: hidden;
      margin-top: 10px;
      img{width: 100%;}
      .navDetail{
        text-align: center;
        border-bottom: 1px solid #eee;
        background: #fff;
        margin: 0px;
        padding: 10px;
      }
    }
  }
  .header[data-v-65542877]{
    position: fixed;
    width: 100%
  }
  .bottomBtn {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ddd;
      height: 14.4vw;
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
<style>
.ql-align-center{
  text-align: center;
}
.ql-align-right{
  text-align: right;
}
</style>
