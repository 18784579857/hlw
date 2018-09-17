<template>
  <div class="login">
    <p class="title">{{headerText}}</p>
    <div class="content">
      <p class="contentTitle">{{msg}}</p>
      <el-input class="username"
                placeholder="请输入手机号"
                type="tel"
                :maxlength="11"
                v-model="username">
        <i slot="prefix"
           class="el-input__icon el-icon-xls-msnui-tel"></i>
      </el-input>
      <el-input class="password"
                placeholder="请输入密码"
                type="password"
                v-model="password">
        <i slot="prefix"
           class="el-input__icon el-icon-xls-icon2"></i>
      </el-input>
      <el-button class="signin"
                 round
                 @click="goHome">登录</el-button>
      <div class="findPwd">
        <span @click="findPwd">找回密码</span>
      </div>
    </div>
    <div class="bottom_footer"></div>
  </div>
</template>

<script>
import { allUrl } from '@/router/allUrl'
import { Indicator } from 'mint-ui'
// import { Toast } from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      headerText: '亲民商城',
      msg: '账号密码登录',
      username: '',
      password: '',
      code: '',
      imgsrc: allUrl.appimgcode + '?timestamp=' + new Date().getTime()
    }
  },
  methods: {
    getImgCode () {
      this.imgsrc = allUrl.appimgcode + '?timestamp=' + new Date().getTime()
    },
    findPwd () {
      this.$router.push({ path: '/findPwd' })
    },
    goHome () {
      let me = this
      this.$post(allUrl.login, {
        userName: me.username,
        password: me.password
      }).then(function (res) {
        if (res.success) {
          me.$toast({
            message: '登录成功',
            duration: 1500
          })
          me.getCurUserId()
          let obj = {
            userName: me.username,
            password: me.password,
            id: res.data.id
          }
          localStorage.setItem('userInfo', JSON.stringify(obj))
          me.$router.push({ name: 'My' })
        } else {
          me.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      }).catch(action => {
        Indicator.close()
        localStorage.removeItem('userInfo')
      })
    },
    // 编码
    b64EncodeUnicode (str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes (match, p1) {
          return String.fromCharCode('0x' + p1)
        }))
    },
    // 解码
    b64DecodeUnicode (str) {
      return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
    },
    // 获取当前用户的id
    getCurUserId () {
      this.$get(allUrl.getUserId).then(res => {
        if (res.success) {
          this.userMsg = res.data
          localStorage.setItem('userMsg', JSON.stringify(res.data))
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error',
            duration: 1500
          })
        }
      })
    },
    automatic () {
      let me = this
      // setTimeout(function () {
      //   Indicator.close()
      // }, 2000)
      if (!JSON.parse(localStorage.getItem('userMsg'))) {
        me.getCurUserId()
      }
      let codeName = JSON.parse(localStorage.getItem('userInfo')).userName
      let codePwd = JSON.parse(localStorage.getItem('userInfo')).password
      this.$post(allUrl.login, {
        userName: codeName,
        password: codePwd
      }).then(function (res) {
        if (res.success) {
          let obj = {
            userName: codeName,
            password: codePwd,
            id: res.data.id
          }
          localStorage.setItem('userInfo', JSON.stringify(obj))
          setTimeout(() => {
            me.$router.push({ name: 'My' })
            Indicator.close()
          }, 2000)
        } else {
          Indicator.close()
          localStorage.removeItem('userInfo')
          me.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      }).catch(action => {
        Indicator.close()
        localStorage.removeItem('userInfo')
      })
    }
  },
  mounted: function () {
    let checkuser = localStorage.getItem('userInfo')
    if (checkuser !== null && checkuser !== undefined && checkuser !== '') {
      Indicator.open({
        text: '自动登录中...',
        spinnerType: 'double-bounce'// snake、fading-circle、triple-bounce、double-bounce
      })
      this.automatic()
    }
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/xlsicon/iconfont.css";
  .title{
    text-align: center;
    color: white;
    font-size: 18px;
  }
  .login{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/image/login/bg_Signin.jpg) no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    .title{
      flex: 1;
      padding: 0;
      margin: 0;
      line-height: 50px;
    }
    .bottom_footer{
      flex: 1;
    }
    .content{
      padding: 0 50px 0 50px;
      .contentTitle{
        margin: 0;
        text-align: center;
        color: white;
        padding-bottom: 30px;
      }
      .signin{
        margin-top: 35px;
        width: 100%;
        background-color: #F4554D;
        border: 1px solid #F4554D;
        color: white;
      }
      .password{
        margin-top: 20px;
      }
      .el-icon-xls-msnui-tel, .el-icon-xls-icon2{
        font-size: 20px;
        margin-left: 10px;
        color: #999999;
      }
      .el-icon-xls-icon2{
        font-size: 16px;
      }
    }
  }
  .findPwd{
    text-align: right;
    color: #fff;
    margin-top: 10px;
    font-size: 13px;
  }
</style>
<style>
  .username input, .password input{
    border-radius: 50px;
    padding-left: 40px !important;
  }
  .mint-indicator-text{
    font-size: 14px;
  }
</style>
