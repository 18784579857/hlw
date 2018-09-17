<template>
  <div class="withdrawDeposit">
    <Header :headerList="headerList"></Header>
    <div class="withdrawDepositContent">
      <ul>
        <li>提现到：微信钱包</li>
        <li>
          <p>提现金额：</p>
          <p>
            <span>￥</span>
            <input type="number" @blur="moneyBlur" placeholder="" min="1" v-model="withdrawMoney" autofocus="autofocus" :max="money">
          </p>
          <!-- <InputNum
            :inputVal="inputVal"
            :value="money"
            @inputNumBlur="inputNumBlur"
            @inputNumFocus="inputNumFocus"
            @inputTyping="inputTyping"></InputNum> -->
        </li>
      </ul>
      <div class="textBox">
        <p>钱包余额￥{{money}}, <span style="color: rgb(88,114,161)" @click="allWithdraw">全部提现</span></p>
        <p>请确保系统名称与微信实名认证一致</p>
        <p style="color:#f4554d;">{{hintMsg}}</p>
        <button class="tixianBtn" @click="WithdrawDepositBtn" :disabled="btnIsDisabled">提现</button>
      </div>
    </div>
    <mt-popup
      style="width:70%;border-radius: 6px;"
      v-model="isbindWechat">
      <div class="layer">
        <div class="layerTop">

          <!-- 为保证您的账户正常登录和账
          户余额的安全，请授权本系统
          绑定您的微信号 -->
        </div>
        <div class="layerButtom" @click="authorizationBtn">
          授权
        </div>
      </div>
    </mt-popup>
    <mt-popup
      style="width:70%;border-radius: 6px;"
      v-model="isShow">
      <div class="layer">
        <div class="layerTop">
          {{showText}}
          <!-- 您的提现申请已提交，请耐心等待审核。 -->
        </div>
        <div class="layerButtom" @click="confirmBtn">
          确定
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
import { MessageBox } from 'mint-ui'
export default {
  components: {
    'Header': Header
  },
  data () {
    return {
      hintMsg: '',
      isbindWechat: false,
      msg: '提现',
      withdrawMoney: '',
      headerList: {
        leftText: '返回',
        text: '提现'
      },
      money: '',
      inputVal: {
        placeholder: '请输入提现金额',
        spotShow: true,
        stopShow: true
      },
      isShow: false,
      showText: '',
      btnIsDisabled: false
    }
  },
  methods: {
    // 全部提现
    allWithdraw () {
      this.withdrawMoney = this.money
    },
    // 提现按钮
    WithdrawDepositBtn () {
      this.btnIsDisabled = true
      const tixianMoney = this.withdrawMoney
      this.hintMsg = ''
      if (tixianMoney < 1) {
        this.hintMsg = '提现金额不能低于1.00元'
        this.btnIsDisabled = false
        return
      } else if (parseInt(tixianMoney) > parseInt(this.money)) {
        this.hintMsg = '提现金额不能大于钱包余额'
        this.btnIsDisabled = false
        return
      }
      let ajaxData = {
        extractMoney: this.withdrawMoney
      }
      this.$post(allUrl.withdrawDeposit, ajaxData).then(res => {
        if (res.success) {
          const statusCode = res.data
          this.isShow = true
          switch (statusCode) {
            case 'AMOUNT_LIMIT':
              this.showText = '金额超限'
              break
            case 'NOTENOUGH':
              this.showText = '待审核中'
              break
            case 'SYSTEMERROR':
              this.showText = '待审核中'
              break
            case 'NAME_MISMATCH':
              this.showText = '姓名校验出错，提现失败！'
              break
            case 'FREQ_LIMIT':
              this.showText = '待审核中'
              break
            case 'MONEY_LIMIT':
              this.showText = '待审核中'
              break
            case 'V2_ACCOUNT_SIMPLE_BAN':
              this.showText = '无法给非实名用户付款'
              break
            case 'SENDNUM_LIMIT':
              this.showText = '待审核中'
              break
            case 'FAIL':
              this.showText = '待审核中'
              break
            case 'SUCCESS':
              this.showText = '提现成功'
              break
            case 'AUDIT':
              this.showText = '提现金额过大，等待后台审核'
              break
            default:
              break
          }
        } else {
          if (res.code === '1005') {
            this.btnIsDisabled = false
            MessageBox({
              title: '提示',
              message: res.msg + '，请授权绑定',
              showCancelButton: false
            }).then(action => {
              this.authorizationBtn()
            })
          } else {
            this.btnIsDisabled = false
            MessageBox({
              title: '提示',
              message: res.msg,
              showCancelButton: false
            })
          }
        }
      })
    },
    // 提现金额失去焦点
    moneyBlur () {
      this.withdrawMoney = Number(this.withdrawMoney).toFixed(2)
    },
    // 确认按钮
    confirmBtn () {
      this.isShow = false
      this.$router.back(-1)
    },
    // 给未授权的授权
    authorizationBtn () {
      this.$get(allUrl.bindWechat).then(res => {
        if (res.success) {
          this.isbindWechat = false
          this.$toast({
            message: '授权成功！'
          })
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    }
  },
  mounted () {
    this.money = this.$route.query.balance
  }
  // watch: {
  //   withdrawMoney: 'moneyBlur'
  // }
}
</script>
<style lang="less" scoped>
.withdrawDepositContent{
  margin-top: 10px;
  background-color: white;
  font-family: 'PingFang-SC-Medium';
  padding-bottom: 38px;
  ul{
    padding: 0;
    margin: 0 18px;
    li{
      list-style: none;
      border-bottom: 1px solid #e6e6e6;
      padding: 26px 0 22px 0;
      font-size: 18px;
      color: #222222;
      font-weight: 500;
      p{
        margin: 0
      }
      span,input{
        margin-top: 10px;
        font-size: 22px;
        font-weight: bold;
        color: #333333;
      }
      span{
        margin-left: 25%;
      }
      input{
        width: 50%;
        border: 0;
        outline: 0;
        font-size: 36px;
      }
    }
  }
  .textBox{
    p{
      text-align: center;
      font-size: 15px;
      color: #666666;
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
.layer{
    font-family: 'PingFang-SC-Medium';
    font-size: 17px;
    .layerTop{
      padding: 20px;
      line-height: 24px;
      color: #222222;
    }
    .layerButtom{
      border-top: 1px solid #dddddd;
      text-align: center;
      color: #01b04b;
      line-height: 15px;
      padding-top: 17px;
      padding-bottom: 17px;
    }
  }
</style>
