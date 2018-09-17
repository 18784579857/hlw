<template>
  <div class="payment">
    <div class="paymentHeader">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="order_details">
      <p>物流信息请联系店长：<span>{{orderDetail.storeManager}}</span></p>
    </div>
    <div class="paymentContent">
      <div class="address">
        <div class="address_l">
          <p class="p_name">
            收货人：{{orderDetail.receUserName}}
            <span class="s_phone">{{orderDetail.receUserMobile}}</span>
          </p>
          <div class="d_address">
            <div class="d_img">
              <img :src="ic_location" width="9" alt="">
            </div>
            <div class="d_text">
              收货地址：{{orderDetail.receAddress}}
            </div>
          </div>
          <p>
          </p>
        </div>
      </div>
      <ul class="g_ul" v-for="(it,index1) in orderDetail.cangkuOrder" :key="index1">
        <li class="g_li" style="border-bottom:solid 1px rgb(236,236,236)">订单{{index1+1}}:&nbsp;&nbsp;{{it.depotName}}</li>
        <li>
          <div class="goods">
            <ul>
              <li v-for="(item,index) in it.goodsList" :key="index" style="margin-left:15px">
                <img :src="item.goodsImg" width="65" height="65" alt="">
              </li>
            </ul>
            <div @click="goGoodsDetails(it.goodsList)" class="goodsNum">
              共{{it.countNum}}件
              <img :src="ic_right" width="7" alt="">
            </div>
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            商品总价
          </div>
          <div class="d_value">
            ￥{{it.goodsMoney}}
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            运费
          </div>
          <div class="d_value">
            ￥{{it.postFee}}
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            订单总价
          </div>
          <div class="d_value">
            ￥{{it.totalMoney}}
          </div>
        </li>
        <div class="allmoney">
        订单实付款：￥{{it.totalMoney}}
      </div>
      </ul>
      <ul class="allTime">
        <li v-for="(item,index) in orderDetail.allTime" :key="index" v-show="item.time">
          <div class="time_name">
            {{item.name}}
          </div>
          <div class="time_value">
            {{item.time}}
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
  name: 'audit',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '订单详情'
      },
      orderId: undefined,
      ic_done: require('@/assets/image/order/ic_done.png'),
      ic_right: require('@/assets/image/personal/ic_right.png'),
      ic_location: require('@/assets/image/payment/ic_location.png'),
      ic_cancel: require('@/assets/image/order/ic_cancel.png'),
      ic_confirm: require('@/assets/image/order/ic_confirm.png'),
      ic_close: require('@/assets/image/order/ic_close.png'),
      ic_point1: require('@/assets/image/order/ic_point1.png'),
      ic_point2: require('@/assets/image/order/ic_point2.png'),
      orderDetail: {}
    }
  },
  methods: {
    goGoodsDetails (goodsdata) { // 进入商品详情页面
      let shopingCarList = []
      goodsdata.forEach(e => {
        shopingCarList.push({
          goodsId: e.goodsId,
          buyAmount: e.buyAmount
        })
      })
      this.$router.push({
        name: 'ToGoodDetails',
        query: {
          goods: JSON.stringify(shopingCarList)
        }
      })
    },
    update (orderId) {
      const self = this
      self.$get(allUrl.autoOrderDetails + '/' + this.orderId).then(res => {
        if (res.success) {
          const data = res.data
          self.orderDetail = {
            allTime: [{
              name: '下单时间:',
              time: data[0].gmtCreate
            }, {
              name: '支付时间:',
              time: data[0].gmtPay
            }],
            storeManager: data[0].storeManager,
            receUserName: data[0].receUserName,
            receUserMobile: data[0].receUserMobile,
            receAddress: data[0].receAddress
          }
          self.orderDetail.cangkuOrder = []
          data.forEach((item) => {
            self.orderDetail.cangkuOrder.push(
              {
                depotName: item.depotName,
                goodsMoney: item.goodsMoney.amount,
                postFee: item.postFee.amount,
                totalMoney: item.totalMoney.amount,
                goodsList: item.goods,
                countNum: item.goods.length
              }
            )
          })
        } else {

        }
      })
    }
  },

  mounted () {
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId
    } else {
      this.orderId = 'PA2018072619185857575'
    }
    this.update()
  }
}
</script>
<style lang="less" scoped>
  .payment{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .paymentHeader{
      border-bottom: 1px solid #F5F5F5;
    }
    .order_details{
      // height: 71px;
      background: linear-gradient(to bottom right, #FF7A40 , #F3524E);
      text-align: center;
      color: white;
      .order_state{
        font-size: 17px;
        padding-top: 15px;
        img{
          vertical-align: middle;
          margin-top: -3px;
        }
      }
      p{
        padding: 10px 0 10px 0;
        margin: 0;
        font-size: 12px;
      }
    }
    .paymentContent{
      flex: 1;
      overflow: auto;
      ul{
        padding: 0;
        margin: 0;
        list-style: none;
        background-color: white;
      }
      .g_ul{
        margin-top: 10px;
        // padding-left: 15px;
        li{
          padding: 15px 0 15px 0;
        }
        .g_li{
          display: flex;
          font-size: 15px;
          padding: 5px 15px 5px 0;
          margin-left: 15px;
          color: #222222;
          .d_name{
            padding-right: 15px;
          }
          .d_value{
            flex: 1;
            text-align: right;
          }
        }
      }
      .orderDetai-btns{
          margin-top: 10px;
          background: #fff;
        // margin-top: 10px;
        // padding: 10px 10px 15px 0px;
        // background: #fff;
        text-align: right;
        button{
          margin: 10px 10px 15px 5px;
        }
      }
      .address{
        background-color: white;
        display: flex;
        .address_l{
          flex: 1;
          padding-left: 15px;
          .p_name{
            font-size: 16px;
            color: #222222;
            padding: 20px 0 10px 19px;
            font-weight: 600;
            margin: 0;
            .s_phone{
              margin-left: 15px;
            }
          }
          .d_address{
            display: flex;
            .d_img{
              margin-right: 10px;
              margin-top: -1px;
            }
            .d_text{
              font-size: 14px;
              color: #222222;
            }
          }
        }
        .address_r{
          width: 27px;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
      }
      .goods{
        display: flex;
        ul{
          flex: 1;
          display: -webkit-box;
          overflow: auto;
          width: 100%;
          li{
            padding: 0 10px 0 0;
            border: 0;
          }
        }
        .goodsNum{
          display: flex;
          align-items: center;
          padding-right: 15px;
          padding-left: 15px;
          font-size: 14px;
          color: #222222;
          img{
            margin-left: 6px;
          }
        }
      }
    }
    .allmoney{
      font-size: 16px;
      text-align: right;
      font-weight: 600;
      background-color: white;
      padding: 15px;
      border-top: 1px solid #DDDDDD;
      .allmoney{
        font-weight: normal;
        font-size: 14px;
      }
    }
    .allTime{
      margin-top: 10px !important;
      padding: 15px !important;
      li{
        display: flex;
        font-size: 13px;
        color: #666666;
        padding: 3px 0 3px 0;
        .time_name{
          flex: 1
        }
      }
    }
    .layer{
    width: 90%;
    margin: auto;
    .layerTop{
      display: flex;
      img{
        vertical-align: middle;
      }
      .headerText{
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #222222;
        font-weight: 600;
      }
    }
    p{
      font-size: 13px;
      color: #999999;
    }
    textarea{
      width: 100%;
      height: 76px;
      outline: none;
      border-radius: 6px;
      background-color: #F8F8F8;
      resize:none;
    }
  }
  .thjdlayer{
    .thjdlayer_top{
      text-align: center;
      font-size: 15px;
      color: white;
      padding: 12px 0 12px 0;
      background-color: #F4554D;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
    .thjdlayer_middle{
      background-color: white;
      padding: 20px;
      ul{
        padding: 0;
        margin: 0;
        li:last-child{
          border-left: 1px solid white;
        }
        li{
          border-left: 1px solid #DDDDDD;
          padding-left: 20px;
          position: relative;
          list-style: none;
          padding-bottom: 15px;
          .ic_point{
            position: absolute;
            left: -8.5px;
            top: -4px;
            .ic_point1{
              width: 16px;
              height: 16px;
              border-radius: 8px;
              background: white;
              img{
                vertical-align: middle;
                text-align: center;
                margin-top: -3px;
              }
            }
          }
          p{
            padding: 0;
            margin: 0;
            font-size: 14px;
          }
          .p_time{
            font-size: 12px;
            margin-top: 5px;
          }
          .p_remark{
            color: #989898;
            margin-top: 5px;
          }
        }
      }
      .step_title{
        font-size: 14px;
      }
      .step_description{
        font-size: 12px;
        p{
          padding: 0;
          margin: 0;
        }
      }
    }
    .thjdlayer_bottom{
      background-color: #F8F8F8;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      padding: 15px 20px 20px 20px;
      color: #666666;
      p{
        padding: 0;
        margin: 0;
        font-size: 13px;
      }
      .p_text{
        color: #222222;
      }
      .p_content{
        margin-top: 8px;
        .s_phone{
          margin-left: 10px;
        }
        .s_code{
          margin-left: 10px;
        }
      }
      .p_address{
        margin-top: 8px;
      }
    }
    .close{
      text-align: center;
      img{
        vertical-align: middle;
        padding: 20px;
      }
    }
  }
  }
  .needMoney{
    // padding: 0px;
    margin:0px;
    font-size: 15px;
    padding: 5px 0 5px 0;
    color: #222222;
    font-weight: normal;
  }
</style>
