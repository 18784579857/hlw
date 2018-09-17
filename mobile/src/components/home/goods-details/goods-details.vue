<template>
  <div class="goods-details">
    <div class="details-header">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="details-content">
      <ul>
        <li v-for="(item,index) in goodsList"
            :key="index">
          <div class="goodsImg">
            <img :src="item.img"
                 alt=""
                 width="66"
                 height="66">
          </div>
          <div class="goodsText">
            <p class="p_name">
              {{item.name}}
            </p>
            <p class="p_describe">
              {{item.describe}}g
            </p>
            <div class="d_div">
              <span>
              <p class="s_icon">代理价:￥{{item.agentPrice}}</p>
              <p style="font-size:16px"><span style="font-size:12px">市场价：￥</span> {{item.money}}</p>
              </span>
             <span style="margin-right:auto">
               <span class="s_numText">数量：</span>
              {{'X' + item.num}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
export default {
  name: 'goods-details',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '商品详情'
      },
      goodsList: []
    }
  },
  methods: {
    update (params) {
      this.$post(allUrl.goodsDetails, {
        shopingCarList: params
      }).then(res => {
        if (res.success) {
          let list = res.data
          list.forEach(e => {
            this.goodsList.push({
              img: this.changeImgUrl(e.indexImg, '_150x150'),
              name: e.name,
              describe: e.spec,
              money: e.retailPrice.amount,
              agentPrice: e.salePrice.amount,
              num: e.buyAmount
            })
          })
        }
      })
    }
  },
  mounted () {
    if (JSON.parse(this.$route.query.goods)) {
      console.log(JSON.parse(this.$route.query.goods))
      this.update(JSON.parse(this.$route.query.goods))
    }
  }
}
</script>
<style lang="less" scoped>
  .goods-details{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .headers{
      height:40px;
    }
    .details-header{
      border-bottom: 1px solid #F5F5F5;
    }
    .details-content{
      flex: 1;
      overflow: auto;
      ul{
        padding: 0;
        margin: 0;
        list-style: none;
        li{
          background-color: white;
          margin-top: 10px;
          padding: 20px 15px 20px 15px;
          display: flex;
          .goodsImg{
            padding-right: 10px;
            display: flex;
            align-items: center;
          }
          .goodsText{
            flex: 1;
            position: relative;
            p{
              margin: 0;
              padding: 0;
            }
            .p_name{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              color: #222222;
              font-size: 15px;
            }
            .p_describe{
              color: #999999;
              font-size: 13px;
            }
            .d_div{
              // position: absolute;
              right: 0;
              bottom: 0;
              font-size: 14px;
              display: flex;
              width:100%;
              color: #F4554D;
              .s_icon{
                font-size: 10px;
              }
              .s_numText{
                color: #666666;
                margin-left: 5px;
              }
              span{
                // margin-right: -5px;
                margin-right:auto;
              }
            }
          }
        }
      }
    }
  }
</style>
