<template>
  <div class="payment-type">
    <div class="type-header">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list"
            :key="index">
          <div class="d_lfet">
            <img :src="item.img"
                 width="31"
                 alt="">
          </div>
          <div class="d_content">
            <p class="p_name">{{item.name}}</p>
            <!-- <div v-if="item.type === 'yl'">
              <p class="p_bankName">{{item.bankName}}</p>
              <p class="p_describe">{{item.describe}}</p>
            </div> -->
          </div>
          <div class="d_right"
               @click="selected(index)">
            <img :src="item.selected ? ic_choice : ic_unchoice"
                 width="17"
                 alt="">
          </div>
        </li>
      </ul>
      <div @click="paymentClick"
           class="btn">
        {{payment.name}}￥{{payment.money}}元
      </div>
      <img ref="aaa"
           src=""
           alt="">
    </div>
    <mt-popup style="width:70%;border-radius: 6px;"
      :closeOnClickModal='false'
              v-model="popupVisible">
      <div class="layer">
        <div class="layerTop">
          请确认支付是否已经完成
        </div>
        <!-- <div class="layerBottom" @click="againPay">
          支付遇到问题？请 <span style="color:rgb(244,85,77)">重新支付</span>
        </div> -->
        <div class="layerMiddle"
             @click="payOk">
          确定
        </div>
      </div>
    </mt-popup>
    <!-- <mt-popup
      style="width:100%;height:100%;"
      v-model="ylLayer">
      <div class="yl-view">
        <div class="yl-top">
          <div class="yl-left">
            〈 返回
          </div>
          <div class="yl-title">
            银联支付
          </div>
          <div class="yl-right"></div>
        </div>
        <div class="yl-iframe">
          <iframe :src="iframeUrl" frameborder="0"></iframe>
        </div>
      </div>
    </mt-popup> -->
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { Indicator } from 'mint-ui'
export default {
  name: 'payment-type',
  components: {
    'Header': Header
  },
  data () {
    return {
      code: '',
      headerList: {
        leftText: '返回',
        text: '支付方式',
        path: '/shoppingorder'
      },
      // ylLayer: false,
      // iframeUrl: '',
      wxUrl: '',
      popupVisible: false,
      ic_choice: require('@/assets/image/shopping/ic_choice.png'),
      ic_unchoice: require('@/assets/image/shopping/ic_unchoice.png'),
      list: [{
        type: 'zfb',
        img: require('@/assets/image/payment/ic_alipay.png'),
        name: '支付宝支付',
        selected: false
      }, {
        type: 'wx',
        img: require('@/assets/image/payment/ic_wechat.png'),
        name: '微信支付',
        selected: false
      }
        // , {
        //   type: 'yl',
        //   img: require('@/assets/image/payment/ic_unionpay.png'),
        //   name: '银行卡支付',
        //   selected: false,
        //   describe: '满21立减20（每天0点限量抢）',
        //   bankName: '浦发银行信用卡'
        // }
      ],
      payment: {
        name: '',
        money: '0.00',
        orderId: '',
        paymentType: ''
      },
      userAgent: ''
    }
  },
  methods: {
    selected (index) {
      this.list.forEach((e, i) => {
        if (i !== index) {
          e.selected = false
        }
      })
      this.list[index].selected = true
      this.payment.name = this.list[index].name
      this.payment.paymentType = this.list[index].type
    },
    paymentClick () {
      if (this.payment.name === '') {
        this.$toast({
          message: '请选择支付方式！',
          iconClass: 'el-icon-error'
        })
      } else {
        let type = this.payment.paymentType
        Indicator.open('支付跳转中...')
        var params = new FormData()
        switch (type) {
          case 'zfb':
            params.append('orderNo', this.payment.orderId)
            this.$ajax.post(allUrl.alipay, params).then(res => {
              Indicator.close()
              if (res.success) {
                const div = document.createElement('div')
                div.innerHTML = res.data
                document.body.appendChild(div)
                document.forms.punchout_form.submit()
              } else {
                this.$toast({
                  message: res.msg,
                  iconClass: 'el-icon-error'
                })
              }
            })
            break
          case 'wx':
            if (this.userAgent === 'wx') {
              this.weixinPay()
            } else {
              params.append('orderNo', this.payment.orderId)
              this.$ajax.post(allUrl.wxpay, params).then(res => {
                Indicator.close()
                if (res.success) {
                  this.wxUrl = res.data
                  // this.popupVisible = true
                  window.location.href = this.wxUrl
                } else {
                  this.$toast({
                    message: res.msg,
                    iconClass: 'el-icon-error'
                  })
                }
              })
            }
            break
          case 'yl':
            // this.ylLayer = true
            // this.iframeUrl = '/#/yl?orderNo=' + this.payment.orderId
            // window.open('/#/yl?orderNo=' + this.payment.orderId)
            params.append('orderNo', this.payment.orderId)
            this.$ajax.post(allUrl.unionpay, params).then(res => {
              Indicator.close()
              if (res.success) {
                const div = document.createElement('div')
                div.innerHTML = res.data
                document.body.appendChild(div)
                document.forms.pay_form.submit()
              } else {
                this.$toast({
                  message: res.msg,
                  iconClass: 'el-icon-error'
                })
              }
            })
            break
          default:
            break
        }
      }
    },
    updateOrder () {
      const orderNo = this.payment.orderId
      this.$get(allUrl.getOrder + '/' + orderNo).then(res => {
        if (res.success) {
          this.payment.money = res.data.totalMoney.amount
        }
      })
    },
    payOk () {
      this.popupVisible = false
      Indicator.open('支付查询中...')
      let self = this
      setTimeout(function () {
        const orderNo = self.payment.orderId
        self.$get(allUrl.getOrder + '/' + orderNo).then(res => {
          Indicator.close()
          if (res.success) {
            if (res.data.orderStatusCode !== 'A1') {
              if (res.data.orderStatusCode === 'A2') {
                self.$router.push({
                  path: '/paymentok',
                  query: {
                    orderId: orderNo
                  }
                })
              } else {
                self.$toast({
                  message: '支付成功！',
                  iconClass: 'el-icon-success'
                })
                self.$router.push({
                  name: 'ShoppingOrder'
                })
              }
            } else {
              self.$toast({
                message: '支付失败，请重新支付！',
                iconClass: 'el-icon-error'
              })
            }
          } else {
            self.$toast({
              message: res.msg,
              iconClass: 'el-icon-error'
            })
          }
        })
      }, 3000)
    },
    againPay () {
      let self = this
      // window.location.href = this.wxUrl
      this.popupVisible = false
      const orderNo = self.payment.orderId
      self.$get(allUrl.getOrder + '/' + orderNo).then(res => {
        if (res.success) {
          if (res.data.orderStatusCode !== 'A1') {
            if (res.data.orderStatusCode === 'A2') {
              self.$router.push({
                path: '/paymentok',
                query: {
                  orderId: orderNo
                }
              })
            } else {
              self.$toast({
                message: '支付成功！',
                iconClass: 'el-icon-success'
              })
              self.$router.push({
                name: 'ShoppingOrder'
              })
            }
          } else {
            self.$router.replace({
              path: '/paymenttype',
              query: {
                orderId: orderNo
              }
            })
          }
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    getUserAgent () {
      var userAgent = navigator.userAgent.toLowerCase()
      if (userAgent.match(/MicroMessenger/i) == 'micromessenger') {
        return 'wx'
      } else if (userAgent.match(/Alipay/i) == 'alipay') {
        return 'zfb'
      } else {
        return 'qt'
      }
    },
    onBridgeReady (allData) {
      let self = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': allData.appId,
          'timeStamp': allData.timeStamp,
          'nonceStr': allData.nonceStr,
          'package': allData.package,
          'signType': allData.signType,
          'paySign': allData.paySign
        },
        function (res) {
          /* eslint eqeqeq: 0 */
          self.popupVisible = true
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            // self.$router.push({
            //   name: 'ShoppingOrder'
            // })
          } else {
            // alert('sb')
          }
        }
      )
    },
    weixinPay () {
      let self = this
      var params = new FormData()
      params.append('orderNo', self.payment.orderId)
      // params.append('code', self.code)
      this.$ajax.post(allUrl.wxpayApp, params).then(res => {
        Indicator.close()
        if (res.success) {
          var allData = res.data
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', self.onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady)
            }
          } else {
            self.onBridgeReady(allData)
          }
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    getWxUrl () {
      let self = this
      this.$get(allUrl.getWxUrl + '?orderNo=' + self.payment.orderId).then(res => {
        if (res.success) {
          window.location.href = res.data
        }
      })
    },
    getUrlParam (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  },
  mounted () {
    if (this.$route.query.orderId) {
      this.payment.orderId = this.$route.query.orderId
      if (this.$route.query.type) {
        this.popupVisible = true
      } else {
        this.popupVisible = false
      }
      this.updateOrder()
    }
    // else {
    //   this.payment.orderId = this.getUrlParam('state')
    //   this.code = this.getUrlParam('code')
    //   if (this.$route.query.type) {
    //     this.popupVisible = true
    //   } else {
    //     this.popupVisible = false
    //   }
    //   this.updateOrder()
    // }
    this.userAgent = this.getUserAgent()
    if (this.userAgent === 'wx') {
      this.list = [{
        type: 'wx',
        img: require('@/assets/image/payment/ic_wechat.png'),
        name: '微信支付',
        selected: false
      }]
      // if (!this.getUrlParam('code')) {
      // this.getWxUrl()
      // }
    } else if (this.userAgent === 'zfb') {
      this.list = [{
        type: 'zfb',
        img: require('@/assets/image/payment/ic_alipay.png'),
        name: '支付宝支付',
        selected: false
      }]
    }
  }
}
</script>
<style lang="less" scoped>
  .payment-type{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    font-family: "PingFang SC";
    .type-header{
      border-bottom: 1px solid #F5F5F5;
    }
    .content{
      flex: 1;
      .btn{
        width: 90%;
        margin: auto;
        background-color: #F4554D;
        color: white;
        padding: 10px 0 10px 0;
        border-radius: 6px;
        margin-top: 25px;
        text-align: center;
        font-size: 5vw;
      }
      ul{
        padding: 0;
        margin: 0;
        background-color: white;
        margin-top: 15px;
        li{
          padding: 12px 0 12px 25px;
          border-bottom: 1px solid #ECECEC;
          display: flex;
          .d_left{
            vertical-align: middle;
          }
          .d_content{
            flex: 1;
            padding: 0 15px 0 15px;
            .p_name{
              line-height: 31px;
            }
            .p_bankName{
              font-size: 12px;
              color: #F4554D;
            }
            .p_describe{
              font-size: 12px;
              color: #999999;
            }
          }
          .d_right{
            display: flex;
            align-items: center;
            padding: 0 15px 0 15px;
          }
          p{
            padding: 0;
            margin: 0;
            font-size: 16px;
            color: #222222;
          }
        }
      }
    }
  }
  .layer{
    font-size: 12px;
    text-align: center;
    .layerTop{
      padding: 15px 0 15px 0;
      font-size: 17px;
      color: #222222;
    }
    .layerMiddle{
      padding: 15px 0 15px 0;
      border-top: 1px solid #e6e6e6;
      border-top: 1px solid #e6e6e6;
      color: #01b04b;
      font-size: 20px;
    }
    .layerBottom{
      padding: 10px 0 10px 0;
      color: #222222;
      font-size: 17px;
      margin-bottom: 23px;
    }
  }

  // .yl-view{
  //   width: 100%;
  //   display: flex;
  //   flex-direction:column;
  //   justify-content: space-between;
  //   height: 100%;
  //   .yl-top{
  //     display: flex;
  //     height: 40px;
  //     line-height: 40px;
  //     text-align: center;
  //     font-size: 14px;
  //     .yl-title{
  //       flex: 1;
  //     }
  //     .yl-left, .yl-right{
  //       width: 60px;
  //     }
  //   }
  //   .yl-iframe{
  //     flex: 1;
  //     iframe{
  //       width: 100%;
  //       height: 100%;
  //       flex: 1;
  //     }
  //   }
  // }
</style>
