<template>
  <div class="">
    <Header :headerList="headerList"></Header>
    <el-form class="form" :label-position="labelPosition" :model="formData">
      <ul>
        <!-- <li>
          <span class="lable_name">银行卡绑定手机：</span>
          <input width="100%" v-model="formData.phone.value" type="tel" placeholder="请输入手机号">
        </li> -->
        <li>
          <span class="lable_name">姓名：</span>
          <input type="text" v-model="formData.userName.value" placeholder="请输入姓名">
        </li>
        <li>
          <span class="lable_name">开户银行：</span>
          <div @click="clickSetting" class="c_text">
            <div class="c_top"></div>
            <input type="text" v-model="formData.bankName.value" placeholder="请选择开户银行">
          </div>
          <div class="r_img">
            <img :src="ic_right" width="7" height="11">
          </div>
        </li>
        <li>
          <span class="lable_name">银行卡号：</span>
          <input type="tel" v-model="formData.bankAccount.value" placeholder="请填写银行卡号">
        </li>
        <li>
          <span class="lable_name">银行卡姓名：</span>
          <input type="text" v-model="formData.bankRealName.value" placeholder="请填写银行卡卡户姓名">
        </li>
        <!-- <li>
          <span class="lable_name">验证码：</span>
          <div class="verifyCodeInput">
            <input type="tel" v-model="formData.verifyCode.value" placeholder="请输入验证码">
          </div>
          <div class="verifyCode">
            <el-button @click="getCode" class="verifyCodeBtn" type="danger" size="small" :disabled="state">{{codeText}}</el-button>
          </div>
        </li> -->
        <!-- <li>
          <span>邮箱：</span>
          <input type="text" v-model="formData.email.value" placeholder="请填写邮箱">
        </li> -->
      </ul>
    </el-form>
    <el-button class="signin" :type="btnType" @click="submit">保存</el-button>
    <mt-popup
      style="width:100%"
      v-model="popupVisible"
      position="bottom">
      <div class="btns">
        <el-button class="leftBtn" @click="cancel" type="text">取消</el-button>
        <div class="text">开户银行</div>
        <el-button class="rightBtn" @click="isOK" type="text">确定</el-button>
      </div>
      <mt-picker valueKey="name" :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
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
        text: '修改用户信息'
      },
      state: true,
      labelPosition: 'left',
      formData: {
        // phone: {
        //   name: '银行卡绑定手机',
        //   value: ''
        // },
        userName: {
          name: '姓名',
          value: ''
        },
        bankName: {
          name: '开户银行',
          value: ''
        },
        bankAccount: {
          name: '银行卡号',
          value: ''
        },
        bankRealName: {
          name: '银行卡姓名',
          value: ''
        },
        // verifyCode: {
        //   name: '验证码',
        //   value: ''
        // },
        email: {
          name: '邮箱',
          value: ''
        }
      },
      slots: [{
        flex: 1,
        values: [{
          name: '中国银行',
          type: '1'
        }, {
          name: '平安银行',
          type: '2'
        }, {
          name: '招商银行',
          type: '3'
        }, {
          name: '工商银行',
          type: '4'
        }, {
          name: '农业银行',
          type: '5'
        }, {
          name: '邮政储蓄',
          type: '6'
        }, {
          name: '交通银行',
          type: '7'
        }, {
          name: '建设银行',
          type: '8'
        }],
        className: 'slot1',
        textAlign: ''
      }]
    }
  },
  methods: {
    getUser () {
      let formData = this.formData
      this.$get(allUrl.selectUserInfo).then(function (res) {
        if (res.success) {
          let data = res.data
          // formData.phone.value = data.bankMobile
          formData.userName.value = data.userName
          formData.bankName.value = data.bankName
          formData.bankAccount.value = data.bankAccount
          formData.bankRealName.value = data.bankRealName
          // formData.email.value = data.email
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    update () {
      let me = this
      let formData = this.formData
      this.$post(allUrl.changeInfo, {
        // phone: formData.phone.value,
        userName: formData.userName.value,
        bankName: formData.bankName.value,
        bankAccount: formData.bankAccount.value,
        bankRealName: formData.bankRealName.value
        // verifyCode: formData.verifyCode.value,
        // email: formData.email.value
      }).then(function (res) {
        if (res.success) {
          me.$toast({
            message: '修改成功！',
            iconClass: 'el-icon-success'
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
      let self = this
      let formData = this.formData
      for (let key in formData) {
        if (key !== 'email') {
          if (formData[key].value === '' || formData[key].value === null) {
            self.$toast({
              message: formData[key].name + '不能为空！',
              iconClass: 'el-icon-error'
            })
            return
          }
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
      let mobile = self.formData.phone.value
      self.$get(allUrl.getCode + mobile).then(function (res) {
        if (res.success) {
          self.state = true
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
            }
          }, 1000)
        } else {
          self.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    }
  },
  mounted () {
    this.getUser()
  },
  watch: {
    'formData.phone.value': function (val) {
      let reg = /^1[34578][0-9]{9}$/
      if (reg.test(val)) {
        this.state = false
      } else {
        this.state = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
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
