<template>
  <div class="eidtAddress">
    <Header :headerList="headerList"></Header>
    <el-form class="form" :label-position="labelPosition" :model="formData">
      <ul>
        <li>
          <span class="lable_name">收货人：</span>
          <input type="text" v-model="formData.name.value" placeholder="收货人">
        </li>
        <li>
          <span class="lable_name">联系方式：</span>
          <input type="tel" maxlength="11" v-model="formData.mobile.value" placeholder="联系方式">
        </li>
        <li>
          <span class="lable_name">所在地区：</span>
          <div @click="clickSetting" class="c_text">
            <div class="c_top"></div>
            <input type="text" v-model="formData.areaName.value" placeholder="所在地区">
          </div>
          <div class="r_img">
            <img :src="ic_right" width="7" height="11">
          </div>
        </li>
        <li>
          <span class="lable_name">详细地址：</span>
          <textarea v-model="formData.detailAddress.value" placeholder="详细地址"></textarea>
        </li>
      </ul>
    </el-form>
    <el-button class="signin" :type="btnType" @click="submit">保存</el-button>
    <AddressPicker ref="addressPicker" @addressSelected="addressSelected"></AddressPicker>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
import AddressPicker from 'base/addressPicker/addressPicker'
export default {
  name: 'editAddress',
  components: {
    'Header': Header,
    'AddressPicker': AddressPicker
  },
  data () {
    return {
      ic_right: require('@/assets/image/personal/ic_right.png'),
      id: '',
      btnType: 'danger',
      headerList: {
        leftText: '返回',
        text: '编辑地址'
      },
      state: true,
      labelPosition: 'left',
      formData: {
        name: {
          name: '收货人',
          value: ''
        },
        mobile: {
          name: '联系方式',
          value: ''
        },
        areaName: {
          name: '所在地区',
          value: ''
        },
        areaCode: {
          name: '所在地区code',
          value: ''
        },
        detailAddress: {
          name: '详细地址',
          value: ''
        }
      }
    }
  },
  methods: {
    getAddress (id) {
      let formData = this.formData
      this.$get(allUrl.selectById + '/' + id).then(function (res) {
        if (res.success) {
          const data = res.data
          formData.name.value = data.name
          formData.mobile.value = data.mobile
          formData.areaName.value = data.areaName
          formData.areaCode.value = data.areaCode
          formData.detailAddress.value = data.detailAddress
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    updateAddress () {
      let me = this
      let formData = this.formData
      this.$post(allUrl.updateAddress, {
        id: this.id,
        name: formData.name.value,
        mobile: formData.mobile.value,
        areaName: formData.areaName.value,
        areaCode: formData.areaCode.value,
        detailAddress: formData.detailAddress.value
      }).then(function (res) {
        if (res.success) {
          me.$toast({
            message: '编辑成功！',
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
    addAddress () {
      let me = this
      let formData = this.formData
      this.$post(allUrl.addAddress, {
        name: formData.name.value,
        mobile: formData.mobile.value,
        areaName: formData.areaName.value,
        areaCode: formData.areaCode.value,
        detailAddress: formData.detailAddress.value
      }).then(function (res) {
        if (res.success) {
          me.$toast({
            message: '新增成功！',
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
        if (formData[key].value === '' || formData[key].value === null) {
          self.$toast({
            message: formData[key].name + '不能为空！',
            iconClass: 'el-icon-error'
          })
          return
        }
      }
      let reg = /^1[3456789][0-9]{9}$/
      if (!reg.test(formData.mobile.value)) {
        self.$toast({
          message: '请输入正确联系方式！',
          iconClass: 'el-icon-error'
        })
        return
      }
      if (this.id === '') {
        self.addAddress()
      } else {
        self.updateAddress()
      }
    },
    clickSetting () {
      this.$refs.addressPicker.showAddressPicker()
    },
    addressSelected (params) {
      let areaName = ''
      params.forEach(e => {
        areaName += e.name + ' '
      })
      this.formData.areaName.value = areaName
      this.formData.areaCode.value = params[params.length - 1].code
    }
  },
  mounted () {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.getAddress(id)
    } else {
      this.headerList.text = '新增地址'
    }
  },
  watch: {
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
        input,textarea{
          flex: 1;
          border:none;
          outline: none;
          height: auto;
          font-size: 16px;
        }
        textarea{
          padding-top: 5px;
          color: #222222;
          font-family: 'PingFang-SC-Medium';
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
<style lang="less">
.eidtAddress{
  .addressPicker{
    .mint-popup-bottom{
      bottom: 54px;
    }
  }
}

</style>
