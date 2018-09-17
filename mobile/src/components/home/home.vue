<template>
  <div class="home">
    <div class="homeContent">
      <router-view/>
    </div>
    <div class="homeBottom">
      <bottom-nav :dataList="dataList"></bottom-nav>
    </div>
  </div>
</template>
<script>
import BottomNav from '@/components/bottom-nav/bottom-nav'
import {allUrl} from '@/router/allUrl'
export default {
  name: 'home',
  components: {
    'bottom-nav': BottomNav
  },
  data () {
    return {
      msg: '首页',
      dataList: [],
      isbindWechat: false,
      userMsg: '',
      userId: ''
    }
  },
  methods: {
    goLogin () {
      this.$router.push({
        name: 'login'
      })
    }
  },
  created () {
    let userState = this.$store.state.userState
    let menu = this.$store.state.menu
    if (userState === '1') {
      this.dataList = menu
    } else {
      const newMenu = []
      menu.forEach((element, index) => {
        if (index !== 0) {
          newMenu.push(element)
        }
      })
      this.dataList = newMenu
    }
  },

  mounted () {
    // 分享给微信朋友和朋友圈
    this.userId = JSON.parse(localStorage.getItem('userMsg'))
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
            'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
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
            title: allData.userName + allData.title, // 分享标题
            desc: allData.desc, // 分享描述
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
          wx.onMenuShareTimeline({
            title: allData.userName + allData.title, // 分享标题
            link: allData.goUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: allData.img, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              // logUtil.printLog('分享到朋友圈成功返回的信息为:', res)
              // _this.showMsg('分享成功!')
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              // logUtil.printLog('取消分享到朋友圈返回的信息为:', res)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style lang="less" scoped>
  // .home{
  //   display: flex;
  //   flex-direction:column;
  //   justify-content: space-between;
  //   height: 100%;
  //   position: relative;
  //   .homeContent{
  //     flex:1;
  //     overflow: auto;
  //     height: 100%;
  //   }
  //   .homeBottom{
  //     width: 100%;
  //   }
  // }
// </style> -->
<style lang="less" scoped>
  .home{
    .homeContent{
      // margin-bottom: 47px;
      overflow: auto;
      position: absolute;
      width: 100%;
      top: 0;
      bottom:54px;
    }
    .homeBottom{
      position: fixed;
      left: 0;
      bottom: -2px;
      width: 100%;
      z-index: 10000;
    }
  }
  .layer{
    font-family: 'PingFang-SC-Medium';
    font-size: 17px;
    .layerTop{
      padding: 20px;
      line-height: 24px;
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
