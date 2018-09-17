<template>
  <div class="sendSuccess">
    <Header :headerList="headerList"></Header>
    <div>
      <img :src="fasongchenggong"
           alt="">
    </div>
    <p>订单支付成功！</p>
    <div v-if="ifShow">
      <p style="color:rgb(244,85,77);font-size:20px;font-weight: 600;">您已满足申请{{key}}资格</p>
      <el-button class="register"
                 @click="goRegister">立即注册</el-button>
    </div>
    <div class="payDiv">
      <p>
        <img src="../assets/ic_payment.png">
        <span class="allMoney">支付金额：</span>
      </p>
      <span style="font-size:16px;flex:1">￥{{allMoney}}</span>
    </div>
    <div class="payDiv">
      <p>
        <img style="width:16px;height:16px;margin-top:0px;"
             src="../assets/ic_amount.png">
        <span style="font-size: 16px;color: rgb(102,102,102);">支付方式：</span>
      </p>
      <span style="color: rgb(34,34,34);font-size:16px;color:rgb(244,85,77);flex:1">微信支付</span>
    </div>
    <el-button class="check"
               @click="checkOrder">查看订单</el-button>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
export default {
  components: {
    'Header': Header
  },
  name: 'news',
  data () {
    return {
      allMoney: '',
      headerList: {
        text: '发送成功',
        leftText: '返回',
        path: '/outside/toOrder',
        params: ''
      },
      orderId: '',
      fasongchenggong: require('@/assets/goOrder/fasongchenggong.png'),
      ifShow: false,
      userId: '',
      userName: '',
      url: '',
      type: '',
      key: ''
    }
  },
  methods: {
    checkOrder () {
      this.$router.push({
        path: '/outside/toOrderDetails',
        query: {
          orderId: this.orderId
          // orderId: 'SC2018072614503616169'
        }
      })
    },
    goRegister () {
      window.location.href = this.url
    },
    getData () {
      this.$get(allUrl.getSuccess).then(res => {
        if (res.success) {
          this.allMoney = res.data.price.amount
          this.userId = res.data.userId
          this.userName = res.data.userName
          this.url = res.data.url
          this.type = res.data.type
          // this.type = 'isMember'
          this.headerList.params = res.data.userId
          switch (this.type) {
            case 'isStore':
              this.key = '店主'
              this.ifShow = true
              break
            case 'isMember':
              this.key = '会员'
              this.ifShow = true
              break
          }
          // let agencyPrice = res.data.agencyPrice.amount
          // if (agencyPrice !== null) {
          //   if (Number(this.allMoney) >= Number(agencyPrice)) {
          //     this.ifShow = true
          //   }
          // }
        }
      })
    }
    // getUrlCode (code) {
    //   let url = this.url
    //   var reg = new RegExp('(^|\\?|&)' + code + '=([^&]*)(\\s|&|$)', 'i')
    //   if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, ' '))
    //   return ''
    // }
  },
  mounted () {
    let allMoney = this.$route.params.allMoney
    this.allMoney = allMoney
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId
    }
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.sendSuccess{
  text-align: center;
  img{
     width:239px;
     height:190px;
    margin-top: 10vh;
  }
  .payDiv{
    text-align: left;
    display: flex;
    margin: 10px;
    p{
      flex: 1.3;
      margin: 0px;
      text-align: right;
      img{
        width: 16px;
        height: 16px;
        margin-top: 0px;
      }
    }
  }
  >p:first-of-type{
    font-size:20px;
    color:#F4554D;
  }
  .check{
    background: rgb(255,202,92);
    color: #fff;
    border: none;
    width: 180px;
    margin-bottom: 40px;
    margin-top: 15px;
    font-size: 16px;
  }
  .allMoney{
    color: rgb(102,102,102);
    font-size: 16px;
  }
  .register{
    background: rgb(244,85,77);
    color: #fff;
    border: none;
    width: 180px;
    margin-bottom: 15px;
    font-size: 16px;
  }
}
</style>
