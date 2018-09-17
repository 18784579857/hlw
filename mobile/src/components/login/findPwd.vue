<template>
  <div class="addAgent">
    <Header :headerList="headerList"></Header>
    <div class="container">
      <el-form class="form" :label-position="labelPosition" :model="formData">
        <ul>
          <li>
            <span class="lable_name">手机号：</span>
            <input width="100%" maxlength="11" v-model="formData.phone.value" type="tel" placeholder="请输入手机号">
          </li>
          <li>
            <span class="lable_name">验证码：</span>
            <div class="verifyCodeInput">
              <input type="tel" maxlength="6" v-model="formData.verifyCode.value" placeholder="请输入验证码">
            </div>
            <div class="verifyCode">
              <el-button @click="getCode" class="verifyCodeBtn" type="danger" size="small" :disabled="state">{{codeText}}</el-button>
            </div>
          </li>
          <li>
            <span class="lable_name">新密码：</span>
            <input width="100%" v-model="formData.password.value" type="password" placeholder="请输入账号密码">
          </li>
          <li>
            <span class="lable_name">确认密码：</span>
            <input width="100%" v-model="formData.okPassword.value" type="password" placeholder="请输入确认密码">
          </li>
        </ul>
      </el-form>
      <el-button class="signin" :type="btnType" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
export default {
  name: 'password',
  components: {
    'Header': Header
  },
  data () {
    return {
      ic_right: require('@/assets/image/personal/ic_right.png'),
      popupVisible: false,
      selectValue: {},
      btnType: 'danger',
      disabled: false,
      codeText: '获取验证码',
      codeTime: 60,
      headerList: {
        leftText: '返回',
        text: '找回密码'
      },
      state: true,
      labelPosition: 'left',
      formData: {
        phone: {
          name: '手机号',
          value: ''
        },
        verifyCode: {
          name: '验证码',
          value: ''
        },
        password: {
          name: '账号密码',
          value: ''
        },
        okPassword: {
          name: '确认密码',
          value: ''
        }
      }
    }
  },
  methods: {
    update () {
      let me = this
      let formData = this.formData
      this.$post(allUrl.checkPwd, {
        mobile: formData.phone.value,
        code: formData.verifyCode.value,
        password: formData.password.value
      }).then(function (res) {
        if (res.success) {
          me.$toast({
            message: '修改成功！',
            iconClass: 'el-icon-success'
          })
          me.$router.go(-1)
        } else {
          me.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    submit () {
      let self = this
      let formData = this.formData
      for (let key in formData) {
        console.log(key)
        if (formData.password.value !== formData.okPassword.value) {
          self.$toast({
            message: '密码输入不一致！',
            iconClass: 'el-icon-error'
          })
          return
        }
        if (formData.password.value.length < 6) {
          self.$toast({
            message: '密码长度不能小于6位数！',
            iconClass: 'el-icon-error'
          })
          return
        }
        if (formData.okPassword.value.length < 6) {
          self.$toast({
            message: '确认密码长度不能小于6位数！',
            iconClass: 'el-icon-error'
          })
          return
        }
      }
      self.update()
    },
    onValuesChange (picker, values) {
      this.selectValue = values[0]
    },
    cancel () {
      this.popupVisible = false
      this.selectValue = {}
    },
    isOK () {
      this.popupVisible = false
      this.formData.bankName.value = this.selectValue.name
    },
    clickSetting () {
      this.popupVisible = true
    },
    getCode () {
      let self = this
      self.state = true
      let mobile = self.formData.phone.value
      self.$get(allUrl.getCode + mobile).then(function (res) {
        if (res.success) {
          self.codeTime -= 1
          self.codeText = self.codeTime + '秒'
          const int = setInterval(function () {
            if (self.codeTime > 0) {
              self.codeTime -= 1
              self.codeText = self.codeTime + '秒'
            } else {
              window.clearInterval(int)
              self.codeText = '获取验证码'
              self.state = false
              self.codeTime = 60
              let reg = /^1[345789][0-9]{9}$/
              if (reg.test(self.formData.phone.value)) {
                self.state = false
              } else {
                self.state = true
              }
            }
          }, 1000)
        } else {
          self.state = false
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    }
  },
  watch: {
    'formData.phone.value': function (val) {
      let reg = /^1[345789][0-9]{9}$/
      if (reg.test(val)) {
        if (this.codeTime === 60) {
          this.state = false
        }
      } else {
        this.state = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .addAgent {
    display: flex;
    flex-direction: column;
    height: 100%;
    .container {
      flex: 1;
      overflow: auto;
      height: 100%;
    }
  }
  .btns{
    height: 45px;
    display: flex;
    display: -webkit-flex;
    background-color: #F5F5F5;
    padding: 0 10px 0 10px;
    .leftBtn{
      color: #D94242;
    }
    .text{
      flex: 1;
      text-align: center;
      line-height: 45px;
      color: #222222;
      font-size: 16px;
    }
    .rightBtn{
      color: #01B04B;
    }
  }
  .signin{
    width: 90%;
    margin-top: 20px;
    margin-left: 5%;
    color: white;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .form{
    ul{
      padding: 0;
      margin: 15px 0 0 0;
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
          flex: 1;
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
        .verifyCode{
          flex: 1;
          text-align: right;
          padding-right: 10px;
        }
        .verifyCodeInput{
          flex: 1;
          width: 100px;
        }
      }
    }
  }
</style>
