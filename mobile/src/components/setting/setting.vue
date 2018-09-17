<template>
  <div class="">
    <Header :headerList="headerList"></Header>
    <ul class="setting">
      <li
      v-for="(item,index) in settingList"
      :key="index"
      @click="clickSetting(item.type)">
        <div class="text">
          {{item.text}}
        </div>
        <div class="rightImg">
          <img :src="ic_right" width="7" height="11">
        </div>
      </li>
    </ul>
    <el-button class="signin" round @click="signOut">退出登录</el-button>
    <mt-popup
      class="aboutView"
      v-model="popupVisible">
      <div class="content">
        <img :src="logoImg" alt="">
        <i class="el-icon-close" @click="closeAbout"></i>
        <p>微信公众号：亲民电子商务平台</p>
        <p>公司名称：四川亲民贸易有限公司</p>
        <p>客服电话：<span>028-86244073</span></p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { MessageBox } from 'mint-ui'
import { allUrl } from '@/router/allUrl'
export default {
  name: 'setting',
  components: {
    'Header': Header
  },
  data () {
    return {
      msg: '首页',
      popupVisible: false,
      logoImg: require('@/assets/logo400.png'),
      ic_right: require('@/assets/image/personal/ic_right.png'),
      headerList: {
        leftText: '返回',
        path: '/home/personal',
        text: '设置'
      },
      settingList: [{
        text: '关于我们',
        path: '',
        type: 'about'
      }, {
        text: '意见反馈',
        path: '',
        type: 'feedback'
      }, {
        text: '修改登录密码',
        path: '',
        type: 'password'
      }, {
        text: '解除微信绑定',
        path: '',
        type: 'wechatUnbind'
      }]
    }
  },
  methods: {
    clickSetting (type) {
      let self = this
      switch (type) {
        case 'about':
          self.popupVisible = true
          break
        case 'feedback':
          self.$router.push({
            name: 'Feedback'
          })
          break
        case 'password':
          self.$router.push({
            name: 'Password'
          })
          break
        case 'wechatUnbind':
          self.$router.push({
            name: 'WechatUnbind'
          })
          break
        default:
          self.$router.push({
            name: 'Setup'
          })
          break
      }
    },
    closeAbout () {
      this.popupVisible = false
    },
    signOut () {
      let self = this
      MessageBox.confirm('确定执行此操作?').then(action => {
        localStorage.removeItem('userInfo')
        this.$get(allUrl.logout).then(res => {
          self.$router.push({
            name: 'Login'
          })
        })
      }).catch(action => {})
    }
  }
}
</script>
<style lang="less" scoped>
  .aboutView{
    width: 90%;
    border-radius:10px;
    padding-top: 50px;
    .content{
      text-align: center;
      width: 250px;
      margin: auto;
      padding-bottom: 60px;
      img{
        margin: auto;
        text-align: center;
        width: 80px;
        padding-bottom: 25px;
      }
      p{
        color: black;
        font-size: 16px;
        text-align: left;
      }
      i{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
        color: #EF1754;
        font-weight: 800;
      }
    }
  }
  .setting{
    padding: 0;
    background-color: white;
    li{
      border-bottom: 1px solid #E6E6E6;
      display: flex;
      height: 50px;
      font-size: 16px;
      line-height: 50px;
      padding: 0 10px 0 10px;
      .leftImg{
        width: 35px;
        img{
          margin-top: 13px;
        }
      }
      .text{
        flex: 1;
      }
      .rightImg{
        font-size: 14px;
      }
    }
    li:last-child{
      border-bottom: 0;
    }
  }
  .signin{
    width: 90%;
    margin-top: 20px;
    margin-left: 5%;
    background-color: #F4554D;
    border: 1px solid #F4554D;
    color: white;
  }
</style>
