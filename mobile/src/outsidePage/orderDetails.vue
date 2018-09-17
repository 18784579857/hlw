<template>
  <div class="outOrderDetails">
    <div class="outOrderDetails-header">
       <Header :headerList="headerList"></Header>
    </div>
    <div class="outOrderDetails-content">
      <div class="content-top">
        <img :src='goodInfor.topImg' class="topImg">
        <div class="goodInfor">
          <p class="top-price color-red">市场价：￥<span>{{goodInfor.price}}</span></p>
          <!-- <p class="top-particulars color-red">代理价：￥{{goodInfor.particulars}}</p> -->
          <h4 class="top-title color-black">{{goodInfor.title}}</h4>
          <div class="top-specification color-gray">
            <span class="specification">规格：{{goodInfor.spec}}</span>
            <span class="repertory pull-right">库存：{{goodInfor.inventory}}</span>
            <!-- <span class="expressage">快递：{{goodInfor.expressage}}</span> -->
          </div>
        </div>

      </div>
      <div class="imgDetails">
        <p class="imgDetails-title">
          <img src='@/assets/ic_tuwen.png' style="width: 18px;vertical-align: text-top;margin-right: 8px;"/>
          图文详情
        </p>
         <div class="pictrueWords" style="margin:0px 10px;background:#fff;"
             v-html="goodInfor.detail"></div>
      </div>
    </div>
    <!-- <div class="outOrderDetails-footer">
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
    </div> -->
  </div>
</template>
<script>
import Header from '@/base/header/header'
import { allUrl } from '@/router/allUrl'
export default {
  name: 'news',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '商品详情',
        righText: ''
      },
      goodInfor: {
        topImg: '',
        price: '',
        title: '',
        spec: '',
        inventory: '',
        detail: '',
        id: ''
      },
      buyCount: 0

    }
  },
  methods: {
    getData () {
      this.$get(allUrl.sharePageDetail + '/' + this.goodInfor.id).then((res) => {
        if (res.success) {
          this.goodInfor.topImg = res.data.indexImg
          this.goodInfor.title = res.data.name
          if (res.data.detail === '' || res.data.detail === undefined || res.data.detail === null) {
            this.goodInfor.detail = ''
          } else {
            this.goodInfor.detail = res.data.detail.detail
          }
          // this.goodInfor.particulars = res.data.agentPrice.amount
          this.goodInfor.spec = res.data.spec
          this.goodInfor.inventory = res.data.inventory
          this.goodInfor.price = res.data.salePrice.amount
        }
      })
    }
  },
  mounted: function () {
    this.goodInfor.id = this.$route.query.goodId
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.color-red{
  color: #F4554D;
}
.color-black{
  color: #222222;
}
.color-gray{
   color: #999999;
  font-size: .8rem;
}
.outOrderDetails{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .outOrderDetails-header{
    height:40px;
  }
  .outOrderDetails-content{
    overflow: auto;
    flex:1;
    .content-top{
      background: #fff;
      padding-bottom: 10px;
    }
    img{
      width: 100%;
    }
    .goodInfor{
      padding:0px 10px;
    }
    .top-price{
      font-size:.9rem;
      font-weight: normal;
      span{
        font-size:1.3rem;
        font-weight: bold;
      }
    }
    .top-particulars{
      font-size:.9rem;
      font-weight: normal;
    }
    .top-title{
      color: #222222;
      font-size: 1rem;
      margin: 0px;
    }
    .top-specification{
      display: flex;
      margin-top: 12px;
      span{
        display: inline-block;
        flex: 1;
      }
      .pull-right{
        text-align: right;
      }
    }
    .imgDetails{
      background: #fff;
      margin-bottom: 10px;
      overflow: hidden;
      margin-top: 10px;
      .imgDetails-title{
        font-size: .8rem;
        text-align: center
      }
    }
  }
  .outOrderDetails-footer{
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
<style lang='less'>
.pictrueWords{
  img{
    width:100%;
  }
}
</style>
