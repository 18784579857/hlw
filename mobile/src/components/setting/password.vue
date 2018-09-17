<template>
  <div class="">
    <Header :headerList="headerList"></Header>
    <el-form class="form" :label-position="labelPosition" :model="formData">
      <ul>
        <li>
          <span>原密码：</span>
          <input width="100%" v-model.trim="formData.beforePassword" type="password" placeholder="请填写原密码">
        </li>
        <li>
          <span>密码：</span>
          <input type="password" v-model.trim="formData.nowPassword" placeholder="请填写密码,至少6位数">
        </li>
        <li>
          <span>确认密码：</span>
          <input type="password" v-model.trim="formData.confirmPassword" placeholder="请填写确认密码,至少6位数">
        </li>
      </ul>
    </el-form>
    <el-button class="signin" :type="btnType" :disabled="disabled" @click="submit">保存</el-button>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
import { MessageBox } from 'mint-ui'
export default {
  name: 'password',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '修改密码'
      },
      disabled: true,
      btnType: 'info',
      labelPosition: 'left',
      formData: {
        beforePassword: '',
        nowPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    checkBtn () {
      let beforePassword = this.formData.beforePassword
      let nowPassword = this.formData.nowPassword
      let confirmPassword = this.formData.confirmPassword
      if (beforePassword !== '' && nowPassword !== '' && confirmPassword !== '') {
        if (nowPassword.length >= 6 && confirmPassword.length >= 6) {
          this.btnType = 'danger'
          this.disabled = false
        } else {
          this.btnType = 'info'
          this.disabled = true
        }
      } else {
        this.btnType = 'info'
        this.disabled = true
      }
    },
    updatePassword () {
      let beforePassword = this.formData.beforePassword
      let confirmPassword = this.formData.confirmPassword
      let me = this
      this.$post(allUrl.changePassword, {
        password: confirmPassword,
        oldPassword: beforePassword
      }).then(function (res) {
        if (res.success) {
          MessageBox.alert('修改成功,请重新登录！').then(action => {
            me.$router.push({
              name: 'Login'
            })
          })
        } else {
          me.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    submit () {
      let beforePassword = this.formData.beforePassword
      let nowPassword = this.formData.nowPassword
      let confirmPassword = this.formData.confirmPassword
      let pattern = /\s/
      if (pattern.test(beforePassword) || pattern.test(nowPassword) || pattern.test(confirmPassword)) {
        this.$toast({
          message: '密码输入不规范，不能输入空格！',
          iconClass: 'el-icon-error'
        })
        return false
      }
      if (nowPassword !== confirmPassword) {
        this.$toast({
          message: '确认密码和密码输入不一致',
          iconClass: 'el-icon-error'
        })
      } else if (beforePassword === nowPassword) {
        this.$toast({
          message: '密码不能和原密码一致',
          iconClass: 'el-icon-error'
        })
      } else {
        this.updatePassword()
      }
    }
  },
  watch: {
    'formData.beforePassword' (val) {
      this.checkBtn()
    },
    'formData.nowPassword' (val) {
      this.checkBtn()
    },
    'formData.confirmPassword' (val) {
      this.checkBtn()
    }
  }
}
</script>
<style lang="less" scoped>
  .signin{
    width: 90%;
    margin-top: 20px;
    margin-left: 5%;
    color: white;
    font-size: 18px;
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
        input{
          flex: 1;
          border:none;
          outline: none;
          height: auto;
        }
        span{
          line-height: 54px;
          font-size: 14px;
          color: #222222;
        }
      }
    }
  }
</style>
