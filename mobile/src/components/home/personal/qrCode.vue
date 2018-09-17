<template>
  <div class="contentBox">
    <div class="teamHeader">
      <Header :headerList="headerList"
              @operation="operation"></Header>
    </div>
    <div class="contentBox1">
      <!-- <img :src="appQrCode"
           alt=""
           class="imgCls"> -->
           <img :src="url + '?id=' + this.id + '&phone=' + this.phone + '&timestamp=' + new Date().getTime()" alt="" class="imgCls">
    </div>
  </div>
</template>
<script>
// import img from '@/assets/image/header/pic_bg.png'
import Header from '@/base/header/header'
import { allUrl } from '@/router/allUrl'
import { Indicator } from 'mint-ui'
export default {
  components: {
    'Header': Header
  },
  data () {
    return {
      msg: '二维码分享页',
      id: window.location.href.split('?')[1].split('&')[0].split('=')[1],
      phone: window.location.href.split('?')[1].split('&')[1].split('=')[1],
      url: allUrl.getSharePage,
      // appQrCode: allUrl.getSharePage + '?id=' + this.id + '&phone=' + this.phone,
      headerList: {
        leftText: '返回',
        text: '邀请代理'
      }
    }
  },
  methods: {
    operation () {
      alert(1234)
    },
    b64DecodeUnicode (str) {
      return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    if (JSON.parse(localStorage.getItem('userInfo')).id === undefined) {
      this.$router.push({
        name: 'Login'
      })
      return
    }
    let curId = JSON.parse(localStorage.getItem('userInfo')).id
    let curPhone = JSON.parse(localStorage.getItem('userInfo')).userName
    this.id = curId
    this.phone = curPhone
    setTimeout(function () {
      Indicator.close()
    }, 2000)
  }
}
</script>
<style scoped>
.contentBox1{
  position: relative;
  width: 100%;
  height: 100%;
}
.imgCls {
  width: 100%;
  height: 100%;
}
</style>
