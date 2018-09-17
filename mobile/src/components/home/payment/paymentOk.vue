<template>
  <div class="paymentOk-view">
    <div class="paymentOk-top">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="paymentOk-content">
      <div class="logo">
        <img :src="ic_success" width="25%" alt="">
        <p>订单支付成功！</p>
      </div>
      <div class="textMsg">
        <div class="left"></div>
        <div>
          <p>
            <img :src="ic_payment" alt="">
            支付方式：<span>{{orderMsg.payType}}</span>
          </p>
          <p>
            <img :src="ic_amount" alt="">
            支付方式：<span class="money">{{orderMsg.payMoney}}</span>
          </p>
        </div>
        <div class="right"></div>
      </div>
      <div class="paymentOk-btns">
        <div @click="lookOrder">查看订单列表</div>
        <div @click="backHome" class="backHome">返回首页</div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { Indicator } from 'mint-ui'
export default {
  name: '',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        text: '支付方式'
      },
      ic_success: require('@/assets/image/payment/ic_success.png'),
      ic_payment: require('@/assets/image/payment/ic_payment.png'),
      ic_amount: require('@/assets/image/payment/ic_amount.png'),
      orderMsg: {
        payType: '',
        payMoney: '0'
      },
      orderId: ''
    }
  },
  methods: {
    lookOrder () {
      this.$router.push({
        name: 'ShoppingOrder'
      })
    },
    backHome () {
      this.$router.push({
        name: 'My'
      })
    },
    upDate () {
      let orderId = this.orderId
      Indicator.open('订单信息查询...')
      let self = this
      setTimeout(function () {
        self.$get(allUrl.getOrder + '/' + orderId).then(res => {
          if (res.success) {
            self.orderMsg = {
              payType: res.data.payType,
              payMoney: res.data.totalMoney.amount
            }
          } else {
            self.$toast({
              message: res.msg,
              iconClass: 'el-icon-error'
            })
          }
          Indicator.close()
        })
      }, 2000)
    }
  },
  mounted () {
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId
      this.upDate()
    }
  }
}
</script>
<style lang="less" scoped>
  .paymentOk-view{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .paymentOk-top{
      border-bottom: 1px solid #F5F5F5;
    }
    .paymentOk-content{
      flex: 1;
      background-color: white;
      .logo{
        text-align: center;
        margin-top: 10vh;
        p{
          margin-top: 4vh;
          font-size: 7vw;
        }
      }
      .textMsg{
         display: flex;
        .left, .right{
          flex: 1
        }
        p{
          color: #919191;
          img{
            vertical-align: middle;
            width: 20px;
            margin-top: -4px;
            margin-right: 10px;
          }
          span{
            color: #222222;
          }
          .money{
            color: #F5544D;
          }
          .money::before{
            content: "￥"
          }
        }
      }
      .paymentOk-btns{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        div{
          border: 1px solid #919191;
          color: #222222;
          width: 130px;
          text-align: center;
          line-height: 40px;
          border-radius: 20px;
        }
        .backHome{
          margin-left: 7vw;
        }
      }
    }
  }
</style>
