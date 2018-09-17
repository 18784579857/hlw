<template>
  <div class="confirm_content">
    <div class="confirmOrder">
      <Header :headerList="headerList"></Header>
      <div class="orderoverflow">
        <div class="orderAddress">
          <div class="myorder">{{userName}}的小店</div>
          <el-form class="form"
                   :label-position="labelPosition"
                   :model="formData">
            <ul>
              <li>
                <span class="lable_name">收货人：</span>
                <input type="text"
                       v-model="formData.name.value"
                       placeholder="收货人">
              </li>
              <li>
                <span class="lable_name">联系方式：</span>
                <input type="tel"
                       maxlength="11"
                       v-model="formData.mobile.value"
                       placeholder="联系方式">
              </li>
              <li>
                <span class="lable_name">所在地区：</span>
                <div @click="clickSetting"
                     class="c_text">
                  <div class="c_top"></div>
                  <input type="text"
                         v-model="formData.areaName.value"
                         placeholder="所在地区">
                </div>
                <div class="r_img">
                  <img :src="ic_right"
                       width="7"
                       height="11">
                </div>
              </li>
              <li>
                <span class="lable_name">详细地址：</span>
                <input type="text"
                       v-model="formData.detailAddress.value"
                       placeholder="详细地址">
              </li>
            </ul>
          </el-form>
        </div>
        <div class="goodsShow">
          <div v-for="(item,index) in goodsData"
               :key="index"
               class="cangkuOrder"
               style="margin-top:3px;background:white;">
            <p>订单{{index+1}}：{{item.warehouseName}}</p>
            <li v-for="(it,index2) in item.goodsDetailModels"
                :key="index2"
                class="goodsdetail">
              <div><img :src="it.goodsImg"
                     alt=""></div>
              <div class="msg">
                <div class="title">
                  <span>{{it.goodsName}}</span>
                </div>
                <div class="spec">
                  <span v-if="it.spec"
                        class="sale"
                        style="flex:0.6"> {{it.spec}}g</span>
                  <span v-if="it.amount"
                        class="sale"
                        style="flex:0.4">库存 {{it.amount}}</span>
                </div>
                <div class="d_div">
                  <span>
                    <p style="font-size:16px">
                      <span style="font-size:12px">价格：￥</span> {{it.salePrice?it.salePrice.amount:undefined}}</p>
                  </span>
                  <span style="padding:16px 0; margin-right:auto;">
                    <span class="s_numText">数量：</span>
                    {{'X' + it.buyAmount}}
                  </span>
                </div>
              </div>
            </li>
            <div v-if="item.postage"
                 class="postage">运费：{{item.postage}}</div>
          </div>
        </div>
      </div>
    </div>
    <AddressPicker ref="addressPicker"
                   @addressSelected="addressSelected"></AddressPicker>
    <div class="paymentBottom">
      <div class="money">
        <p>
          应付金额:
          <span class="s_icon">{{totalMoney}}</span>
        </p>
      </div>
      <button @click="selectType"
              class="btn"
              v-bind:disabled="isdisabledFn">
        去支付
      </button>
    </div>

    <mt-popup style="width:70%;border-radius: 6px;"
    :closeOnClickModal='false'
              v-model="popupVisible">
      <div class="layer">
        <div class="layerTop">
          请确认支付是否已经完成
        </div>
        <!-- <div class="layerBottom"
             @click="againPay">
          支付遇到问题？请
          <span style="color:rgb(244,85,77)">重新支付</span>
        </div> -->
        <div class="layerMiddle"
             @click="payOk">
          确定
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { Indicator } from 'mint-ui'
import AddressPicker from 'base/addressPicker/addressPicker'
export default {
  name: 'confirmOrder',
  components: {
    'Header': Header,
    'AddressPicker': AddressPicker
  },
  data () {
    return {
      isdisabledFn: false,
      ic_right: require('@/assets/image/personal/ic_right.png'),
      labelPosition: 'left',
      headerList: {
        leftText: '返回',
        text: '确认下单'
      },
      calculatePostageListFormList: [],
      buildOrderFormList: [],
      goodsData: [],
      popupVisible: false,
      totalMoney: 0,
      userName: '',
      formData: {
        name: {
          name: '收货人',
          value: ''
        },
        mobile: {
          name: '联系方式',
          value: ''
        },
        areaName: {
          name: '所在地区',
          value: ''
        },
        areaCode: {
          name: '所在地区code',
          value: ''
        },
        detailAddress: {
          name: '详细地址',
          value: ''
        }
      },
      payment: {
        money: '0.00',
        orderId: ''
      }
      // }
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'ToOrder'
      })
    },
    addressSelected (params) {
      let areaName = ''
      params.forEach(e => {
        areaName += e.name + ' '
      })
      this.formData.areaName.value = areaName
      this.formData.areaCode.value = params[params.length - 1].code
      this.getpostage()
    },
    toSuccess () {
      this.$router.push({
        name: 'SendSuccess'
      })
    },
    /// 发送订单
    selectType () {
      this.isdisabledFn = true
      let self = this
      let params = {}
      for (let p in this.formData) {
        if (!this.formData[p].value) {
          this.$toast({
            message: '请填写' + this.formData[p].name,
            iconClass: 'el-icon-error'
          })
          this.isdisabledFn = false
          return
        }
      }
      let reg = /^1[3456789][0-9]{9}$/
      if (!reg.test(self.formData.mobile.value)) {
        this.$toast({
          message: '请填写正确的电话号码',
          iconClass: 'el-icon-error'
        })
        this.isdisabledFn = false
        return
      }
      params = {
        userId: this.$route.query.userId || '',
        userName: this.formData.name.value,
        mobile: this.formData.mobile.value,
        areaCode: this.formData.areaCode.value,
        area: this.formData.areaName.value,
        address: this.formData.detailAddress.value,
        buildOrderFormList: this.buildOrderFormList
      }
      Indicator.open()
      this.$post(allUrl.sendautoOrder, { ...params }).then(res => {
        if (res.success) {
          this.isdisabledFn = false
          var param = new FormData()
          self.payment.orderId = res.data
          param.append('orderNo', self.payment.orderId)
          this.$ajax.post(allUrl.wxpayApp, param).then(res => {
            if (res.success) {
              Indicator.close()
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
              Indicator.close()
              self.$toast({
                message: res.msg,
                iconClass: 'el-icon-error'
              })
            }
          })
          // Indicator.close()
          // this.$router.push({
          //   path: '/outside/sendSuccess',
          //   query: {
          //     orderId: self.payment.orderId
          //   }
          // })
        } else {
          Indicator.close()
          this.isdisabledFn = false
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
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
    againPay () {
      this.popupVisible = false
      this.isdisabledFn = false
    },
    payOk () {
      // debugger
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
                  path: '/outside/sendSuccess',
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
                  path: '/outside/sendSuccess',
                  query: {
                    orderId: orderNo
                  }
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
    clickSetting () {
      this.$refs.addressPicker.showAddressPicker()
    },
    /// 获取邮费
    getpostage () {
      let params = {}
      if (this.formData.areaCode.value) {
        params.areaCode = this.formData.areaCode.value
      } else {
        this.$toast({
          message: '请选择所在地区',
          iconClass: 'el-icon-error'
        })
        return
      }
      params.calculatePostageListFormList = this.calculatePostageListFormList
      this.$post(allUrl.getPostage, { ...params }).then(res => {
        Indicator.close()
        if (res.success) {
          Indicator.close()
          res.data.selfDetailMoneyModels.forEach((item) => {
            this.goodsData.forEach((it, index) => {
              if (it.warehouseId === item.storageId) {
                this.goodsData[index].postage = item.postage.amount || ''
              }
            })
          })
          this.totalMoney = res.data.totalMoney.amount
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    // getPurchase获取自助下单页面
    getPurchase (params) {
      this.$post(allUrl.autoPurchase, { shopingCarList: params }).then(res => {
        Indicator.close()
        if (res.success) {
          Indicator.close()
          this.goodsData = res.data
          res.data.forEach((it, index) => {
            it.goodsDetailModels.forEach((it) => {
              it.goodsImg = this.changeImgUrl(it.goodsImg, '_150x150')
            })
            let shopingCarModelFormList = it.goodsDetailModels.map((item) => {
              return { goodsId: item.goodsId, buyAmount: item.buyAmount }
            })
            this.calculatePostageListFormList.push({ storageId: it.warehouseId, shopingCarModelFormList: shopingCarModelFormList })
            // console.log(this.calculatePostageListFormList)
            this.buildOrderFormList.push({ warehouseId: it.warehouseId, shopingCarList: shopingCarModelFormList })
            this.getData()
          })
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    getData () {
      this.$get(allUrl.getHistory).then(res => {
        if (res.success) {
          if (res.data) {
            this.formData.name.value = res.data.userName
            this.formData.mobile.value = res.data.phone
            this.formData.areaName.value = res.data.addressId
            this.formData.areaCode.value = res.data.code
            this.formData.detailAddress.value = res.data.detail
            if (this.formData.areaCode.value) {
              this.getpostage()
            }
          }
        }
      })
    }
  },
  mounted () {
    this.isdisabledFn = false
    if (this.$route.query.userName) {
      this.userName = this.$route.query.userName
    }
    if (this.$route.query && this.$route.query.goods) {
      let params = []
      params = JSON.parse(this.$route.query.goods)
      this.getPurchase(params)
      // setTimeout(() => {
      //   this.getData()
      // }, 2000)
    }
  }
}
</script>
<style lang="less">
.confirm_content{
     .form{
    ul{
      padding: 0;
      margin: 0 0 0 0;
      background-color: white;
      li{
        display: flex;
        height: 54px;
        padding: 0 0 0 15px;
        border-bottom: 1px solid #E6E6E6;
        line-height: 54px;
        input{
          flex: 1;
          border:none;
          outline: none;
          height: auto;
          font-size: 16px;
        }
        span{
          line-height: 54px;
          font-size: 14px;
          color: #222222;
        }
        .lable_name::before{
          content:'*';
          color: red;
          margin-left: -5.44px;
          font-size: 16px;
        }
        .r_img{
          width: 20px;
        }
        .c_text{
          flex: 0.9;
          font-size: 14px;
          color: #757575;
          position: relative;
          .c_top{
            background: red;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
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
    .paymentBottom{
      display: flex;
      position: fixed;
      bottom:0;
      background-color: white;
      width:100%;
      border-top:1px solid #ECECEC;
      // margin-top:30px;
      .money{
        flex: 1;
        padding-left: 15px;
        color: #666666;
        font-size: 13px;
        display: flex;
        align-items: center;
        p{
          padding: 0;
          margin: 0;
          span{
          color: #F4554D;
          }
          .s_icon{
            font-size: 20px;
          }
          .s_icon::before{
            content: "￥";
            font-size: 12px;
          }
        }
      }
      .btn{
        width: 40vw;
        border: 0px;
        outline: 0;
        background-color: #F4554D !important;
        padding: 3vw 5vw 3vw 5vw;
        font-size: 6vw;
        color: white;
        text-align: center;
      }
    }
}
.confirmOrder{
    overflow: auto;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 54px;
  .orderoverflow{
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
  }
  .myorder{
   width:100%;
   min-height:35px;
   background:rgba(255, 189, 67, 0.89);
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   color:white;
  }
  .postage{
    height: 52px;
    line-height: 52px;
    padding: 0 0 0 10px;
  }
  .goodsShow{
    .cangkuOrder{
      margin-top:3px;
      background:white;
      >p{
       height:30px;
       padding: 7px 0 7px 10px;
       padding-left:10px;
       display:flex;
       align-items: center;
       border-bottom: solid 1px #e8e8e8;
        border-top: solid 1px #e8e8e8;
       margin-top:7px;
      }
    }
    .goodsdetail{
     list-style: none;
     display: flex;
     flex-direction: row;
     border-bottom:solid 1px #e8e8e8;
     padding:0 0 0 10px;
     margin-top: 20px;
      img{
        width: 66px;
        height: 66px;
        padding-right: 10px;
      }
      .msg{
        align-self: center;
      flex: 1;
      padding: 0 2vw 3vw 3vw;
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
        .sale{
          display: flex;
        }
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
  // .orderAddress{
  //   background: white;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content:center;
  //   ul{
  //     padding: 0 5px;
  //     margin: 0;
  //   }
  //   li{
  //     width: 100%;
  //     min-height:44px;
  //     align-items: center;
  //     // line-height: 100%;
  //     display: flex;
  //     list-style: none;
  //   border-bottom:solid 1px #e8e8e8
  //   }
  // }
}
</style>
