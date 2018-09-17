<template>
  <div class="shopping-order">
    <div class="order-header">
      <Header :headerList="headerList"></Header>
      <ul>
        <li v-for="(item,index) in typeList" :key="index" :class="(index === typeActive) ? 'active' : ''"
        @click="typeClick(index)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="order-content">
      <ul
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="moreLoading"
      infinite-scroll-distance="0"
      infinite-scroll-immediate-check="false">
        <li v-for="(item,index) in orderList" :key="index" @click="order_details(item.code)">
          <div class="order-top">
            <div class="order-user">
               <span class="order-name">收货人：{{item.receName}}</span>
              <span class="order-phone">{{item.receMobile}}</span>
            </div>
            <!-- <div class="order-code">
              订单编号222：{{item.code}}
            </div> -->
            <div class="order-type">
              {{item.typeName}}
            </div>
          </div>
          <div class="order-middle">
            <ul>
              <li v-for="(goods,i) in item.goods" :key="i">
                <img
                :src="goods.goodsImg"
                alt="">
              </li>
            </ul>
          </div>
          <div class="order-bottom">
            <div class="order-money">
              应付金额：<span>{{'￥' + item.money}}</span>
            </div>
            <div class="order-btns">
              <mt-button size="small"
              v-for="(btn,i) in btns[item.state]"
              plain
              :key="i"
              :type="i > 0 ? 'danger' : 'default'" @click.stop="fns(item,i)">{{btn.text}}</mt-button>
            </div>
          </div>
        </li>
      </ul>
      <div class="loading" v-show="loadingIcon">
        <i class="el-icon-loading"></i>
        加载中...
      </div>
      <div class="loading" v-show="!loadingIcon">
        没有更多了
      </div>
    </div>
  <!-- 申请换货弹出框 -->
  <mt-popup
    style="width:100%;padding: 15px;"
    v-model="thlayer"
    :closeOnClickModal="closeOnClickModal"
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
        <!-- <el-steps direction="vertical" :active="jdData.stepActive">
          <el-step v-for="(item,index) in jdData.list" :key="index" icon="el-icon-upload">
            <div slot='icon'>
              <img style="vertical-align: middle" :src="ic_point1" v-show="jdData.stepActive !== index" width="16" alt="">
              <img style="vertical-align: middle" :src="ic_point2" v-show="jdData.stepActive === index" width="16" alt="">
            </div>
            <div slot='title' class="step_title">
              {{item.text}}
            </div>
            <div slot='description' class="step_description">
              {{item.time}}
            </div>
          </el-step>
        </el-steps> -->
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
        <!-- <el-steps direction="vertical" :active="jjthjjData.stepActive">
          <el-step v-for="(item,index) in jjthjjData.list" :key="index" icon="el-icon-upload">
            <div slot='icon'>
              <img style="vertical-align: middle" :src="ic_point1" v-show="jjthjjData.stepActive !== index" width="16" alt="">
              <img style="vertical-align: middle" :src="ic_point2" v-show="jjthjjData.stepActive === index" width="16" alt="">
            </div>
            <div slot='title' class="step_title">
              {{item.text}}
            </div>
            <div slot='description' class="step_description">
              <p>
                {{item.time}}
              </p>
              <p>
                {{item.remark}}
              </p>
            </div>
          </el-step>
        </el-steps> -->
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
  name: 'shopping-order',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '订单列表',
        path: '/home/personal'
      },
      moreLoading: false,
      closeOnClickModal: false,
      thsqData: {
        orderNo: '',
        remark: ''
      },
      ajax: true,
      pageNum: 1,
      pageSize: 10,
      typeActive: 0,
      loadingIcon: true,
      pages: 1,
      ic_cancel: require('@/assets/image/order/ic_cancel.png'),
      ic_confirm: require('@/assets/image/order/ic_confirm.png'),
      ic_close: require('@/assets/image/order/ic_close.png'),
      ic_point1: require('@/assets/image/order/ic_point1.png'),
      ic_point2: require('@/assets/image/order/ic_point2.png'),
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
      typeList: [{
        name: '全部'
      }, {
        name: '待支付'
      }, {
        name: '待收货'
      }, {
        name: '已完成'
      }, {
        name: '已取消'
      }, {
        name: '退货'
      }],
      orderList: [],
      btns: {
        'WAIT_PAY': [{ // 待支付
          text: '取消订单'
        }, {
          text: '立即付款'
        }],
        'WAIT_SEND': [{ // 待发货
          text: '取消订单'
        }],
        'WAIT_TAKE': [{ // 待收货
          text: '查看物流'
        }, {
          text: '确认收货'
        }],
        'TAKE': [{ // 已收货
          text: '申请退货'
        }],
        'FINISH': [// 交易完成
          // { // 交易完成
          //   text: '删除订单'
          // }
        ],
        'CLOSE': [{ // 交易关闭
          text: '删除订单'
        }],
        'WAIT_RETURN': [{ // 待退货
          text: '取消退货'
        }],
        'REFUSE_RETURN': [{ // 卖家拒绝退货
          text: '卖家备注'
        }],
        'RETURNING': [{ // 退货中
          text: '取消退货'
        }, {
          text: '退货进度'
        }],
        'TAKE_RETURN': [ // 卖家确认收货
          // {
          //   text: '删除订单'
          // }
        ],
        'CANCEL_RETURN': [ // 取消退货
          // {
          //   text: '删除订单'
          // }
        ]
        // 'WAIT_EXCHANGE': [{ // 待换货
        //   text: '取消换货'
        // }, {
        //   text: '换货进度'
        // }],
        // 'REFUSE_EXCHANGE': [{ // 卖家拒绝换货
        //   text: '卖家备注'
        // }],
        // 'EXCHANGING': [{ // 换货中
        //   text: '取消换货'
        // }, {
        //   text: '换货进度'
        // }],
        // 'SELLER_TAKE_EXCHANGE': [{ // 卖家确认收到换货
        //   text: '换货进度'
        // }],
        // 'SEND_EXCHANGE': [{ // 换货已发货
        //   text: '换货进度'
        // }, {
        //   text: '确认收货'
        // }],
        // 'TAKE_EXCHANGE': [{ // 买家收到换货
        //   text: '删除订单'
        // }, {
        //   text: '再次购买'
        // }],
        // 'CANCEL_EXCHANGE': [] // 买家取消换货
      }
    }
  },
  methods: {
    update () { // 获取订单列表
      let type = this.typeActive
      let pageNum = this.pageNum
      let pageSize = this.pageSize
      this.ajax = false
      this.$get(allUrl.findOrder + '/' + type + '/' + pageNum + '/' + pageSize).then(res => {
        if (res.success) {
          if (this.pageNum <= res.data.pages) {
            if (this.pageNum >= res.data.pages) {
              this.loadingIcon = false
            }
            let list = res.data.list
            list.forEach(e => {
              const orderImgList = e.goods
              let curImgList = []
              orderImgList.forEach(ele => {
                curImgList.push({
                  buyAmount: ele.buyAmount,
                  goodsId: ele.goodsId,
                  goodsImg: this.changeImgUrl(ele.goodsImg, '_150x150'),
                  retailPrice: ele.retailPrice,
                  salePrice: ele.salePrice
                })
              })
              this.orderList.push({
                id: e.id,
                code: e.orderNo,
                typeName: e.statusText,
                money: e.totalMoney.amount,
                state: e.status,
                goods: curImgList,
                receName: e.receName,
                receMobile: e.receMobile
              })
            })
            this.pageNum += 1
          } else {
            this.loadingIcon = false
          }
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
        this.ajax = true
      })
    },
    typeClick (index) {
      this.typeActive = index
      this.pageNum = 1
      this.loadingIcon = true
      this.orderList = []
      this.loadMore()
    },
    fns (item, btnIndex) {
      switch (item.state) {
        case 'WAIT_PAY': // 待支付
          btnIndex ? this.payment(item) : this.cancelOrder(item)
          break
        case 'WAIT_SEND': // 待发货
          this.cancelOrder(item)
          break
        case 'WAIT_TAKE': // 待收货
          btnIndex ? this.confirmSh(item) : this.lookLogistics(item)
          break
        case 'TAKE': // 已收货
          this.sqth(item)
          break
        case 'WAIT_RETURN': // 待退货
          this.cancelth(item)
          break
        case 'REFUSE_RETURN': // 拒绝退货
          this.remarks(item)
          break
        case 'FINISH': // 交易完成
          this.deleteOrder(item)
          break
        case 'CLOSE': // 交易关闭
          this.deleteOrder(item)
          break
        case 'CANCEL_RETURN': // 取消退货
          this.deleteOrder(item)
          break
        case 'TAKE_RETURN': // 买家确认收货
          this.deleteOrder(item)
          break
        case 'RETURNING': // 退货中
          btnIndex ? this.thjd(item) : this.cancelth(item)
          break
        default:
          break
      }
    },
    cancelOrder (item) { // 取消订单
      const orderNo = item.code
      MessageBox.confirm('是否取消该订单?', '').then(action => {
        this.cancelOrderData(orderNo)
      }).catch(action => {})
    },
    cancelOrderData (orderNo) {
      const self = this
      self.$get(allUrl.cancelOrder + '/' + orderNo).then(res => {
        if (res.success) {
          self.$toast({
            message: '取消订单成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          const index = self.typeActive
          self.typeClick(index)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    payment (item) { // 立即付款
      this.$router.push({
        path: '/paymenttype',
        query: {
          orderId: item.code
        }
      })
    },
    lookLogistics (item) { // 查看物流
      this.$router.push({
        path: '/expressDetails',
        query: {
          orderId: item.id
        }
      })
    },
    confirmSh (item) { // 确认收货
      const orderNo = item.code
      MessageBox.confirm('是否确认收货?').then(action => {
        this.confirmShData(orderNo)
      }).catch(action => {})
    },
    confirmShData (orderNo) {
      const self = this
      self.$get(allUrl.confirmSh + '/' + orderNo).then(res => {
        if (res.success) {
          self.$toast({
            message: '收货成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          const index = self.typeActive
          self.typeClick(index)
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
      this.thsqData.orderNo = item.code
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
      this.$get(allUrl.thConfirm + '/' + orderNo + '/' + remark).then(res => {
        if (res.success) {
          this.thlayer = false
          MessageBox({
            title: '退货申请成功',
            message: '<div style="text-align: left;line-height: 16px;font-size: 14px">退款会在商家确认收货后24小时内完成入账。退货邮寄地址请在订单【退货进度中查看】。</div>'
          })
          const index = this.typeActive
          this.typeClick(index)
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    thjd (item) { // 退货进度弹出框
      const orderNo = item.code
      this.thjdData(orderNo)
    },
    thjdData (orderNo) {
      this.$get(allUrl.thjd + '/' + orderNo).then(res => {
        if (res.success) {
          this.thjdlayer = true
          const data = res.data
          this.jdData = {
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
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    cancelth (item) { // 取消退货
      const orderNo = item.code
      MessageBox.confirm('是否取消退货?').then(action => {
        this.cancelthData(orderNo)
      }).catch(action => {})
    },
    cancelthData (orderNo) {
      this.$get(allUrl.cancelTh + '/' + orderNo).then(res => {
        if (res.success) {
          this.$toast({
            message: '取消退货成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          const index = this.typeActive
          this.typeClick(index)
        } else {
          this.$toast({
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
    remarks (item) { // 卖家备注
      const orderNo = item.code
      this.$get(allUrl.remarks + '/' + orderNo).then(res => {
        if (res.success) {
          this.jjthjdlayer = true
          this.jjthjjData = {
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
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    },
    order_details (code) { // 进入订单详情页面
      this.$router.push({
        path: '/orderdetails',
        query: {
          orderId: code
        }
      })
    },
    loadMore () {
      if (this.ajax) {
        if (this.loadingIcon) {
          this.update()
        }
      }
    },
    deleteOrder (item) {
      const orderNo = item.code
      MessageBox.confirm('是删除该订单?').then(action => {
        this.deleteOrderData(orderNo)
      }).catch(action => {})
    },
    deleteOrderData (orderNo) {
      this.$get(allUrl.deleteOrder + '/' + orderNo).then(res => {
        if (res.success) {
          this.$toast({
            message: '删除成功！',
            iconClass: 'el-icon-success',
            duration: 1000
          })
          const index = this.typeActive
          this.typeClick(index)
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1000
          })
        }
      })
    }
  },
  watch: {
  },
  mounted () {
    if (this.$route.params.type === undefined) {
      this.typeActive = 0
    } else {
      this.typeActive = this.$route.params.type
    }
    this.update()
  }
}
</script>
<style lang="less" scoped>
  .active{
    color: #F4554D !important;
    border-bottom: 2px solid #F4554D !important;
  }
  .shopping-order{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    height: 100%;
    ul{
      padding: 0;
      margin: 0;
      list-style: none;
    }
    .order-header{
      ul{
        display: flex;
        background-color: white;
        li{
          font-size: 15px;
          color:#222222;
          padding: 8px 0 8px 0;
          flex: 1;
          text-align: center;
          border-bottom: 2px solid white;
        }
      }
    }
    .order-content{
      flex: 1;
      overflow: auto;
      ul{
        li{
          .order-top{
            background-color: white;
            margin-top: 10px;
            display: flex;
            padding: 3vw;
            // .order-code{
            //   flex: 1;
            //   font-size: 13px;
            //   color: #222222;
            // }
            .order-user{
              flex: 1;
              font-weight: 600;
              font-size: 14px;
              color: #222222;
            }
            .order-phone{
              display: inline-block;
              text-align: right;
              width: 50%;
            }
            .order-type{
              font-size: 14px;
              color: #F4554D;
            }
          }
          .order-middle{
            padding: 10px 15px 10px 15px;
            background: #fff;
            border-bottom: 1px solid #EEEEEE;
            border-top: 1px solid #EEEEEE;
            ul{
              display: -webkit-box;
              overflow: auto;
              width: 100%;
              li{
                position: relative;
                width: 66px;
                padding-right: 10px;
                height: 66px;
                img{
                  width: 100%;
                  height: 100%;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
    .order-bottom{
      display: flex;
      padding: 3vw 0 3vw 3vw;
      background-color: white;
      align-items: center;
      .order-money{
        flex: 1;
        font-size: 13px;
        span{
          font-size: 15px;
          font-weight: 600;
        }
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
  .loading{
    text-align: center;
    padding: 10px;
    background-color: white;
  }
  .color1{
    color: #999999;
  }
</style>
<style lang="less">
  .order-bottom{
    .mint-button--small{
      height: 31px;
      padding: 0 6px;
      margin-right: 10px;
    }
  }
  .thjdlayer_middle{
    .el-step__head.is-finish{
      border-color: #999999;
      color: #999999;
    }
    .el-step__description.is-finish{
      color: #999999;
    }
    .el-step__title.is-finish{
      color: #999999;
    }
    .el-step__head.is-process{
      border-color: #F4554D;
    }
    .el-step.is-vertical .el-step__line{
      width: 1px;
      left: 12px;
      top: 2px;
    }
    .el-step__line-inner{
      display: none;
    }
    .el-step.is-vertical .el-step__icon.is-icon{
      height: 16px;
    }
  }
</style>
<style lang='less'>
.shopping-order{
  .mint-popup-bottom{
    bottom: 53px;
  }
}
</style>
