<template>
  <div class="express">
    <div>
      <ExpressHeader :orderExpress="orderExpress"></ExpressHeader>
      <div class="order-user">
        <div class="address_l">
          <p class="p_name">
            收货人：{{user.receName}}
            <span class="s_phone">{{user.receMobile}}</span>
          </p>
          <div class="d_address">
            <div class="d_img">
              <img :src="ic_location" width="9" alt="">
            </div>
            <div class="d_text">
              收货地址：{{user.address}}
            </div>
        </div>
      </div>
      </div>
      <!-- <ExpressFlow :flow="flow"></ExpressFlow> -->
    </div>
    <Details class="detail" :details="details" v-show="!noexpressmsgShow"></Details>
    <p class="noexpressmsg" v-show="noexpressmsgShow">{{expressMsg}}</p>
    <div :class="{'noexpress-btn':!noexpressmsgShow}" v-show="isBtnShow">
       <mt-button size="small" plain type="danger" v-show="!noexpressmsgShow" @click="confirmSh">确认收货</mt-button>
    </div>
  </div>
</template>
<script>
import ExpressHeader from './expressHeader'
import ExpressFlow from './expressFlow'
import Details from './details'
import {allUrl} from '@/router/allUrl'
import { Indicator, MessageBox } from 'mint-ui' // 按需引入部分组件
export default {
  components: {ExpressHeader, ExpressFlow, Details},
  data () {
    return {
      noexpressmsgShow: false,
      expressMsg: '',
      orderExpress: {},
      flow: {
        active: 0, // 0-4
        fahuo: '',
        shouhuo: ''
      },
      ic_location: require('@/assets/image/payment/ic_location.png'),
      details: [],
      user: '',
      isBtnShow: false
    }
  },
  methods: {
    getExpressData () {
      Indicator.open({
        text: '正在查询...',
        spinnerType: 'fading-circle'
      })
      const self = this
      self.$get(allUrl.getExpress + self.$route.query.orderId).then((res) => {
      // this.$get(allUrl.getExpress + '100092').then((res) => {
        if (res.success) {
          self.orderExpress = {
            goodsImgUrl: res.data.goods[0].goodsImg,
            goodsNum: res.data.countAmount || res.data.goods.length,
            expressCompany: res.data.express.result.expName,
            expressNum: res.data.express.result.number

          }
          self.user = {
            receName: res.data.receName,
            receMobile: res.data.receMobile,
            address: res.data.address
          }
          let num = 0
          if (res.data.express) {
            num = Number(res.data.express.result.deliverystatus)
          } else {
            num = 0
          }
          self.flow = {
            active: num, // 0-4
            fahuo: '',
            shouhuo: ''
          }
          let arr = []
          if (res.data.express.result.list) {
            res.data.express.result.list.forEach(element => {
              arr.push({
                title: element.status,
                description: element.time
              })
            })
            self.details = arr
            if (self.$route.query.orderNo) {
              self.isBtnShow = true
            }
          } else {
            self.noexpressmsgShow = true
            self.expressMsg = '暂无物流信息！'
          }
          Indicator.close()
        }
      })
    },
    confirmSh () { // 确认收货
      const slef = this
      const orderNo = slef.$route.query.orderNo
      MessageBox.confirm('是否确认收货?').then(action => {
        slef.confirmShData(orderNo)
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
  created () {
    this.getExpressData()
  }
}
</script>
<style lang="less" scoped>
  .express {
    height: 100%;
    display: flex;
    flex-direction: column;
    .order-user{
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
          align-items: center;//子元素垂直居中
          // justify-content: center;//子元素水平居中
          .d_img{
            margin-right: 10px;
            // margin-top: -1px;

          }
          .d_text{
            font-size: 14px;
            color: #222222;
            margin-bottom: 5px;
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
    .detail {
      flex: 1;
      overflow: auto;
      height: 100%;
    }
  }
  .noexpressmsg{
    padding-left: 20px;
  }
  .noexpress-btn{
    margin-top: 5px;
    background: #fff;
    padding: 10px 10px 15px 0px;
    text-align: right;
  }
</style>
