<template>
  <div class="goods_list">
    <div class="headers">
      <Header :headerList="headerList"
              @goBacknew="goBacknew"></Header>
      <Brand @brandHandlerTouchend="brandHandlerTouchend"></Brand>
      <Arrangement @goodsSort="goodsSort"></Arrangement>
      <!-- <mt-header class="header"
                 :title="headerList.text">
        <mt-button v-show="headerList.leftText"
                   slot="left"
                   icon="back"
                   @click="goBack">
          {{headerList.leftText}}
        </mt-button>
      </mt-header>
      <Brand @brandHandlerTouchend="brandHandlerTouchend"></Brand>
      <Arrangement @goodsSort="goodsSort"></Arrangement> -->
    </div>
    <div class="listContent">
      <div class="list"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <GoodsItem v-for="good in goods"
                   :key="good.id"
                   :goodsInfor="good"></GoodsItem>
      </div>
      <div class="loading"
           v-if="loading">
        <i class="el-icon-loading"></i>加载中...</div>
      <div class="loading"
           v-else>没有更多</div>
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
import Brand from './brand'
import Arrangement from './arrangement'
import GoodsItem from './goodsItem'
import { Toast, Indicator } from 'mint-ui'
import { allUrl } from '@/router/allUrl'
export default {
  components: { Header, Brand, Arrangement, GoodsItem },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '品牌馆',
        righText: '',
        type: 'goodList'
      },
      goods: [],
      loading: false,
      load_more: false,
      param: {
        sortWay: '',
        bussinessId: '',
        type: '',
        riseDown: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    brandHandlerTouchend (bussinessId) {
      this.goods = []
      this.param.bussinessId = bussinessId
      this.getGoods(this.param)
    },
    goBacknew () {
      this.$store.state.flag = ''
      this.$router.go(-1)
    },
    goodsSort (btnList, selectedBtn) {
      if (selectedBtn === 'popularity') {
        this.param.sortWay = 'H'
        for (const item of btnList) {
          if (item.type === selectedBtn) {
            this.param.riseDown = item.up_down !== 'down' ? 'R' : 'D'
          }
        }
      } else if (selectedBtn === 'price') {
        this.param.sortWay = 'P'
        for (const item of btnList) {
          if (item.type === selectedBtn) {
            this.param.riseDown = item.up_down !== 'down' ? 'R' : 'D'
          }
        }
      }
      this.goods = []
      this.getGoods(this.param)
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
    },
    getGoods (data) {
      this.$post(allUrl.goodsList, data).then((res) => {
        if (res.success) {
          this.loading = false
          if (res.data.pages >= this.param.pageNum) {
            this.load_more = true
            let obj = {}
            for (let item of res.data.list) {
              const imageUrl = this.changeImgUrl(item.indexImg, '_150x150')
              obj = {
                id: item.id,
                imgUrl: imageUrl,
                title: item.name,
                subtitle: item.subTitle,
                spec: item.spec,
                price: item.agentPrice.amount,
                // sale: item.saleNum || '0'
                sale: item.inventory || '0'
              }
              this.goods.push(obj)
            }
          }
          if (res.data.pages <= this.param.pageNum) {
            this.load_more = false
            this.loading = false
          }
        }
      })
    },
    loadMore () {
      if (this.load_more) {
        this.loading = true
        this.param.pageNum += this.param.pageNum
        this.getGoods(this.param)
      }
    }
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
          count = count + (element.count * element.infor.price)
          count = Number(parseFloat(count).toFixed(2))
        }
      }
      return count
    }
  },
  created () {
    if (this.$route.query.parentId) {
      this.param = {
        sortWay: 'H',
        bussinessId: this.$route.query.id,
        type: this.$route.query.type,
        riseDown: 'D',
        pageNum: 1,
        pageSize: 10
      }
      this.getGoods(this.param)
    } else {
      this.param = {
        sortWay: 'H',
        bussinessId: '',
        type: this.$route.query.type,
        riseDown: 'D',
        pageNum: 1,
        pageSize: 10
      }
    }
    if (this.$store.state.flag === '') {
      this.$store.commit('clearGoods')
    }
  }
}
</script>
<style lang="less" scoped>
  .goods_list {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .listContent {
      overflow: auto;
      flex:1;
      .list {
        margin-top: 10px;
      }
      .loading {
        text-align: center;
        margin-bottom: 5px;
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
<style lang="less">
  .goods_list {
    .el-badge__content.is-fixed {
      top: 0 !important;
      right: 10px !important;
    }
  }
  .header{
    background:white;
    color: #222222;
  }
</style>
<style>
  .header .mint-header-title{
    font-size: 16px !important;
  }
</style>
