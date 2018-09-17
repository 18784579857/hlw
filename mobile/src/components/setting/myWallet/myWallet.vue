<template>
  <div class="myWallet">
    <Header :headerList="headerList" @operation ="operation"></Header>
    <div class="myWalletContent">
      <img :src="walletIcon" alt="">
      <p class="myBlance">我的津贴</p>
      <p class="myBalanceNum"><span style="font-size: 24px;font-weight:500;">￥</span>{{myBalanceNum}}</p>
      <p class="promptMsg">钱包津贴可提现至微信钱包</p>
      <p class="promptMsg">请确保系统名称与微信实名认证一致</p>
      <button class="tixianBtn" @click="WithdrawDepositBtn">提现</button>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
export default {
  components: {
    'Header': Header
  },
  data () {
    return {
      msg: '我的津贴',
      walletIcon: require('@/assets/myWallet/wodeqianbao2@2x.png'),
      headerList: {
        leftText: '返回',
        text: '我的提现',
        righText: '明细'
      },
      myBalanceNum: '0.00'
    }
  },
  methods: {
    operation () {
      this.$router.push({
        name: 'BlanceDetails'
      })
    },
    // 提现
    WithdrawDepositBtn () {
      this.$router.push({
        name: 'WithdrawDeposit',
        query: {
          balance: this.myBalanceNum
        }
      })
    }
  },
  mounted () {
    this.$get(allUrl.getBlanceNum).then(res => {
      if (res.success) {
        this.myBalanceNum = res.data.balance === null ? '0.00' : res.data.balance.amount
      } else {
        this.$toast({
          message: res.msg,
          iconClass: 'el-icon-error'
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
.myWallet {
  // background-color: white;
  height: 100%;
  .myWalletContent {
    margin-top: 9px;
    background-color: white;
    font-family: "PingFang-SC-Medium";
    padding-bottom: 33px;
    height: calc(100% - 83px);
    img {
      width:130px;
      height: 88px;
      display: block;
      margin: 0px auto 0px auto;
      padding-top:25px;
      padding-bottom: 23px;
    }
    p{
      margin: 0px;
    }
    .myBlance{
      font-size: 18px;
      color: #222222;
      text-align: center;
    }
    .myBalanceNum{
      font-size: 36px;
      color: #f4554d;
      text-align: center;
      padding-top:20px;
      padding-bottom: 35px;
      font-weight: bold;
    }
    .promptMsg{
      font-size: 14px;
      color:#666666;
      padding-bottom: 10px;
      text-align: center;
    }
    .tixianBtn{
      width: 90%;
      color: white;
      background-color: #f4554d;
      text-align: center;
      font-size: 18px;
      border-radius: 5px;
      height: 45px;
      margin: 0 auto;
      display: block;
      border: 1px solid #f4554d;
      margin-top: 18px;
    }
  }
}
</style>
