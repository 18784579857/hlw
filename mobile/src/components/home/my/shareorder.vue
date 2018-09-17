<template>
  <div class="contentBox">
    <div class="teamHeader">
      <Header :headerList="headerList"
              @operation="operation"></Header>
    </div>
    <div class="contentBox1">
      <!-- <img :src="url" alt="" class="imgCls"> -->
      <img :src="url + '?userId=' + userId + '&timestamp=' + new Date().getTime()" alt="" class="imgCls">
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
      url: allUrl.getShareOrder,
      userId: '',
      userName: '',
      headerList: {
        leftText: '返回',
        text: '我的小店'
      }
    }
  },
  methods: {
    operation () {
    }
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.userId = JSON.parse(localStorage.getItem('userMsg'))
    setTimeout(function () {
      Indicator.close()
    }, 1000)
    this.$get(allUrl.getUserMsg + '/' + this.userId).then(res => {
      if (res.success) {
        let allData = res.data
        wx.config({
          debug: false, // 开启调试模式
          appId: allData.appId, // 必填，公众号的唯一标识
          timestamp: allData.timestamp, // 必填，生成签名的时间戳
          nonceStr: allData.noncestr, // 必填，生成签名的随机串
          signature: allData.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareAppMessage' // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            // 'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            // 'onMenuShareQQ', // 分享到QQ
            // 'onMenuShareQZone' // 分享到QQ空间
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        // 处理验证失败的信息
        wx.error(function (res) {
          // logUtil.printLog('验证失败返回的信息:', res)
        })
        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: allData.userName + '的店铺欢迎下单', // 分享标题
            desc: allData.userName + '的店铺，欢迎您下单，下单后请联系我', // 分享描述
            link: allData.goUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: allData.img, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              // logUtil.printLog('分享给朋友成功返回的信息为:', res)
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              // logUtil.printLog('取消分享给朋友返回的信息为:', res)
            }
          })
        })
      } else {
        console.log(res.msg)
      }
    })
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
