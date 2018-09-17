<template>
  <div class="payment">
    <div class="paymentHeader">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="order_details">
      <div class="order_state">
        <img :src="ic_done" alt="" width="20">
        {{orderDetail.orderStatus}}
      </div>
      <p>订单编号：<span>{{orderDetail.orderNo}}</span></p>
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
      <ul class="g_ul">
        <li>
          <div class="goods">
            <ul>
              <li v-for="(item,index) in orderDetail.goodsList" :key="index">
                <img :src="item.goodsImg" width="65" height="65" alt="">
              </li>
            </ul>
            <div @click="goGoodsDetails" class="goodsNum">
              共{{orderDetail.countNum}}件
              <img :src="ic_right" width="7" alt="">
            </div>
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            商品合计
          </div>
          <div class="d_value">
            ￥{{orderDetail.goodsMoney}}
          </div>
        </li>
        <li class="g_li" style="color:#f4554d">
          <div class="d_name">
            本单津贴
          </div>
          <div class="d_value">
            ￥{{orderDetail.earn}}
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            运费
          </div>
          <div class="d_value">
            ￥{{orderDetail.postFee}}
          </div>
        </li>
        <li class="g_li">
          <div class="d_name">
            订单总价
          </div>
          <div class="d_value">
            ￥{{orderDetail.totalMoney}}
          </div>
        </li>
      </ul>
      <div class="allmoney">
        订单实付款：￥{{orderDetail.totalMoney}}
        <p class="needMoney">需收款：￥{{marketAllMoney}}</p>
      </div>
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
       <div class="orderDetai-btns" v-show="isBtnShow">
        <mt-button size="small" v-for="(btn,i) in btns[orderDetail.orderStatusCode]"
        plain
        :key="i"
        :type="i > 0 ? 'danger' : 'default'"  @click="orderDetailFns(orderDetail,i)">{{btn.text}}</mt-button>
    </div>
    </div>
    <!-- 申请换货弹出框 -->
  <mt-popup
    style="width:100%;padding: 15px;"
    v-model="thlayer"
    :closeOnClickModal="closeOnClickModal"
    class="shenqingtuihuo"
    position="bottom">
    <div class="layer">
      <div class="layerTop">
        <div class="cancel" @click="thCancel">
          <img :src="ic_cancel" width="21" alt="">
        </div>
        <div class="headerText">
          退货申请
        </div>
        <div class="confirm">
          <img :src="ic_confirm" @click="thConfirm" width="21" alt="">
        </div>
      </div>
      <p>
        亲爱的用户，申请退货请填写退货原因，如商品质量问题、卖家发错货、与商品描述不符等。
      </p>
      <textarea v-model="thsqData.remark" placeholder="请填写退货原因"></textarea>
    </div>
  </mt-popup>
  <!-- 同意退货进度弹出框 -->
  <mt-popup
    style="width:80%;border-radius: 8px;background:none;"
    v-model="thjdlayer"
    :closeOnClickModal="closeOnClickModal">
    <div class="thjdlayer">
      <div class="thjdlayer_top">
        退货进度
      </div>
      <div class="thjdlayer_middle">
        <ul>
          <li v-for="(item,index) in jdData.list" :key="index" :class="jdData.stepActive !== index ? 'color1' : ''">
            <div class="ic_point">
              <div class="ic_point1" v-show="jdData.stepActive !== index">
                <img style="vertical-align: middle" :src="ic_point1"  width="16" alt="">
              </div>
              <img style="vertical-align: middle" :src="ic_point2" v-show="jdData.stepActive === index" width="16" alt="">
            </div>
            <p>{{item.text}}</p>
            <p class="p_time">{{item.time}}</p>
          </li>
        </ul>
      </div>
      <div class="thjdlayer_bottom">
        <p class="p_text">
          邮寄地址：
        </p>
        <p class="p_content">
          <span>{{jdData.name}}</span>
          <span class="s_phone">{{jdData.phone}}</span>
          <span class="s_code">{{jdData.code}}</span>
        </p>
        <p class="p_address">
          {{jdData.address}}
        </p>
      </div>
      <div class="close" @click="thjdClose">
        <img :src="ic_close" width="29" alt="">
      </div>
    </div>
  </mt-popup>
  <!-- 拒绝退货进度弹出框 -->
  <mt-popup
    style="width:80%;border-radius: 8px;background:none;"
    v-model="jjthjdlayer"
    :closeOnClickModal="closeOnClickModal">
    <div class="thjdlayer">
      <div class="thjdlayer_top">
        退货进度
      </div>
      <div class="thjdlayer_middle"
      style="border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;">
        <ul>
          <li v-for="(item,index) in jjthjjData.list" :key="index" :class="jdData.stepActive !== index ? 'color1' : ''">
            <div class="ic_point">
              <div class="ic_point1" v-show="jjthjjData.stepActive !== index">
                <img style="vertical-align: middle" :src="ic_point1"  width="16" alt="">
              </div>
              <img style="vertical-align: middle" :src="ic_point2" v-show="jjthjjData.stepActive === index" width="16" alt="">
            </div>
            <p>{{item.text}}</p>
            <p class="p_time">{{item.time}}</p>
            <p class="p_remark" v-show="jjthjjData.stepActive === index">
              卖家备注：{{item.remark}}
            </p>
          </li>
        </ul>
      </div>
      <div class="close" @click="thjdClose">
        <img :src="ic_close" width="29" alt="">
      </div>
    </div>
  </mt-popup>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import { MessageBox } from 'mint-ui'
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
      isBtnShow: false,
      marketAllMoney: '',
      ic_done: require('@/assets/image/order/ic_done.png'),
      ic_right: require('@/assets/image/personal/ic_right.png'),
      ic_location: require('@/assets/image/payment/ic_location.png'),
      ic_cancel: require('@/assets/image/order/ic_cancel.png'),
      ic_confirm: require('@/assets/image/order/ic_confirm.png'),
      ic_close: require('@/assets/image/order/ic_close.png'),
      ic_point1: require('@/assets/image/order/ic_point1.png'),
      ic_point2: require('@/assets/image/order/ic_point2.png'),
      orderDetail: {},
      btns: {
        'A1': [{ // 待支付
          text: '取消订单'
        }, {
          text: '立即付款'
        }],
        'A2': [{ // 待发货
          text: '取消订单'
        }],
        'A3': [{ // 待收货
          text: '查看物流'
        }, {
          text: '确认收货'
        }],
        'A4': [{ // 已收货
          text: '申请退货'
        }],
        'A6': [{ // 交易关闭
          text: '删除订单'
        }],
        'B1': [{ // 待退货
          text: '取消退货'
        }],
        'B2': [{ // 卖家拒绝退货
          text: '卖家备注'
        }],
        'B3': [{ // 退货中
          text: '取消退货'
        }, {
          text: '退货进度'
        }]
      },
      thlayer: false,
      thjdlayer: false,
      jjthjdlayer: false,
      jdData: {
        stepActive: 0,
        name: '',
        phone: '',
        code: '',
        address: '',
        list: [{
          text: '',
          time: ''
        }, {
          text: '',
          time: ''
        }]
      },
      jjthjjData: {
        stepActive: 0,
        list: [{
          text: '',
          time: ''
        }, {
          text: '',
          time: ''
        }]
      },
      closeOnClickModal: false,
      thsqData: {
        orderNo: '',
        remark: ''
      }
    }
  },
  methods: {
    goGoodsDetails () { // 进入商品详情页面
      let shopingCarList = []
      this.orderDetail.goodsList.forEach(e => {
        shopingCarList.push({
          goodsId: e.goodsId,
          buyAmount: e.buyAmount
        })
      })
      this.$router.push({
        path: '/goodsdetails',
        query: {
          goods: JSON.stringify(shopingCarList)
        }
      })
    },
    orderDetailFns (item, btnIndex) {
      switch (item.orderStatusCode) {
        case 'A1': // 待支付
          btnIndex ? this.payment(item) : this.cancelOrder(item)
          break
        case 'A2': // 待发货
          this.cancelOrder(item)
          break
        case 'A3': // 待收货
          btnIndex ? this.confirmSh(item) : this.lookLogistics(item)
          break
        case 'A4': // 已收货
          this.sqth(item)
          break
        case 'B1': // 待退货
          this.cancelth(item)
          break
        case 'B2': // 拒绝退货
          this.remarks(item)
          break
        case 'A5': // 交易完成
          this.deleteOrderFn(item)
          break
        case 'A6': // 交易关闭
          this.deleteOrderFn(item)
          break
        case 'B5': // 取消退货
          this.deleteOrderFn(item)
          break
        case 'C4': // 买家确认收货
          this.deleteOrderFn(item)
          break
        case 'B3': // 退货中
          btnIndex ? this.thjd(item) : this.cancelth(item)
          break
        default:
          break
      }
    },
    update (orderId) {
      const self = this
      self.$get(allUrl.getOrder + '/' + orderId).then(res => {
        if (res.success) {
          const data = res.data
          // let finish = new Date(data.gmtFinish).getTime()
          // let thisTime = Date.parse(new Date())
          const imgList = data.goods
          this.marketAllMoney = data.customerPay.amount
          let goodsImgList = []
          imgList.forEach(element => {
            goodsImgList.push({
              buyAmount: element.buyAmount,
              goodsId: element.goodsId,
              goodsImg: this.changeImgUrl(element.goodsImg, '_150x150'),
              retailPrice: element.retailPrice,
              salePrice: element.salePrice
            })
          })
          self.orderDetail = {
            countNum: data.goods.length,
            orderStatus: data.orderStatus,
            orderNo: data.orderNo,
            receUserName: data.receUserName,
            receUserMobile: data.receUserMobile,
            receAddress: data.receAddress,
            postFee: data.postFee.amount,
            goodsMoney: data.goodsMoney.amount,
            totalMoney: data.totalMoney.amount,
            orderStatusCode: data.orderStatusCode,
            id: data.orderId,
            earn: data.earn.amount,
            allTime: [{
              name: '下单时间:',
              time: data.gmtCreate
            }, {
              name: '支付时间:',
              time: data.gmtPay
            }, {
              name: '发货时间:',
              time: data.gmtSend
            }, {
              name: '完成时间:',
              time: data.orderStatusCode === 'A5' ? data.gmtFinish : ''
            }, {
              name: '取消时间:',
              time: data.gmtClose
            }],
            goodsList: goodsImgList
          }
          if (self.orderDetail.orderNo) {
            self.isBtnShow = true
          }
        } else {

        }
      })
    },
    payment (item) { // 立即付款
      this.$router.push({
        path: '/paymenttype',
        query: {
          orderId: item.orderNo
        }
      })
    },
    cancelOrder (item) { // 取消订单
      const orderNo = item.orderNo
      const self = this
      MessageBox.confirm('是否取消该订单?', '').then(action => {
        self.cancelOrderData(orderNo)
      }).catch(action => {})
    },
    cancelOrderData (orderNo) { // 取消订单 确认
      const self = this
      self.$get(allUrl.cancelOrder + '/' + orderNo).then(res => {
        if (res.success) {
          self.$toast({
            message: '取消订单成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          self.update(orderNo)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    confirmSh (item) { // 确认收货
      const orderNo = item.orderNo
      const self = this
      MessageBox.confirm('是否确认收货?').then(action => {
        self.confirmShData(orderNo)
      }).catch(action => {})
    },
    lookLogistics (item) { // 查看物流
      this.$router.push({
        path: '/expressDetails',
        query: {
          orderId: item.id,
          orderNo: item.orderNo
        }
      })
    },
    confirmShData (orderNo) { // 确认收货 确认
      const self = this
      self.$get(allUrl.confirmSh + '/' + orderNo).then(res => {
        if (res.success) {
          self.$toast({
            message: '收货成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          self.update(orderNo)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    sqth (item) { // 申请退货弹出框
      this.thlayer = true
      this.thsqData.orderNo = item.orderNo
    },
    thCancel () { // 关闭申请退货弹出框
      this.thlayer = false
      this.thsqData = {
        orderNo: '',
        remark: ''
      }
    },
    thConfirm () { // 提交退货信息
      if (this.thsqData.remark === '') {
        this.$toast({
          message: '请填写退货申请！',
          iconClass: 'el-icon-error',
          duration: 1000
        })
      } else {
        this.thConfirmData()
        this.thsqData = {
          orderNo: '',
          remark: ''
        }
      }
    },
    thConfirmData () {
      const orderNo = this.thsqData.orderNo
      const remark = this.thsqData.remark
      const self = this
      self.$get(allUrl.thConfirm + '/' + orderNo + '/' + remark).then(res => {
        if (res.success) {
          self.thlayer = false
          MessageBox({
            title: '退货申请成功',
            message: '<div style="text-align: left;line-height: 16px;font-size: 14px">退款会在商家确认收货后24小时内完成入账。退货邮寄地址请在订单【退货进度中查看】。</div>'
          })
          // const index = this.typeActive
          // this.typeClick(index)
          self.update(orderNo)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    thjd (item) { // 退货进度弹出框
      const orderNo = item.orderNo
      this.thjdData(orderNo)
    },
    thjdData (orderNo) {
      const self = this
      self.$get(allUrl.thjd + '/' + orderNo).then(res => {
        if (res.success) {
          self.thjdlayer = true
          const data = res.data
          self.jdData = {
            stepActive: 1,
            name: data.sellerName,
            phone: data.sellerMobile,
            code: data.expressNo,
            address: data.sellerAreaAame + data.sellerAddress,
            list: [{
              text: '退货申请',
              time: data.progress[0]['退货申请']
            }, {
              text: '卖家同意退货',
              time: data.progress[1]['卖家同意退货']
            }]
          }
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    cancelth (item) { // 取消退货
      const orderNo = item.orderNo
      const self = this
      MessageBox.confirm('是否取消退货?').then(action => {
        self.cancelthData(orderNo)
      }).catch(action => {})
    },
    cancelthData (orderNo) {
      const self = this
      self.$get(allUrl.cancelTh + '/' + orderNo).then(res => {
        if (res.success) {
          self.$toast({
            message: '取消退货成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          self.update(orderNo)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    remarks (item) { // 卖家备注
      const orderNo = item.orderNo
      const self = this
      self.$get(allUrl.remarks + '/' + orderNo).then(res => {
        if (res.success) {
          self.jjthjdlayer = true
          self.jjthjjData = {
            stepActive: 1,
            list: [{
              text: '退货申请',
              time: res.data.progress[0]['退货申请']
            }, {
              text: '卖家拒绝退货',
              time: res.data.progress[1]['卖家拒绝退货'],
              remark: res.data.sellerRemark
            }]
          }
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    thjdClose () { // 关闭退货进度弹出框
      this.thjdlayer = false
      this.jjthjdlayer = false
    },
    deleteOrderFn (item) { // 删除订单
      const orderNo = item.orderNo
      const self = this
      MessageBox.confirm('是删除该订单?').then(action => {
        self.deleteOrderData(orderNo)
      }).catch(action => {})
    },
    deleteOrderData (orderNo) {
      const self = this
      self.$get(allUrl.deleteOrder + '/' + orderNo).then(res => {
        if (res.success) {
          self.$toast({
            message: '删除成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          self.$router.go(-1)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    }
  },

  mounted () {
    if (this.$route.query.orderId) {
      let orderId = this.$route.query.orderId
      this.update(orderId)
    }
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
        padding-left: 15px;
        li{
          padding: 15px 0 15px 0;
        }
        .g_li{
          display: flex;
          padding-right: 15px;
          font-size: 15px;
          padding: 5px 15px 5px 0;
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
<style>
.shenqingtuihuo {
  bottom: 53px;
}
</style>
