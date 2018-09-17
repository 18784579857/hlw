<template>
  <div>
    <Header :headerList="headerList"></Header>
    <div class="unbindBox">
      <p class="yiBindText"><span v-if="isUnbind">已绑定微信号</span> <span v-else>您的账户未绑定微信号</span></p>
      <!-- <p class="yiBindText">已绑定微信号</p> -->
      <img :src="heading" v-if="isUnbind" alt="">
      <img :src="disconnectImgIcon" alt="" v-else>
      <p v-show="isUnbind" style="color:#222222;font-size:18px;">{{userName}}</p>
    </div>
    <button class="tixianBtn" @click="bindBtn">{{isUnbind?BindBtnText:unBindbtnText}}</button>
  </div>
</template>
<script>
import Header from 'base/header/header'
import {allUrl} from '@/router/allUrl'
export default {
  components: {
    'Header': Header
  },
  data () {
    return {
      msg: '解绑微信号',
      isUnbind: false,
      ismoren: false,
      isImg: '',
      headerList: {
        leftText: '返回',
        text: '解除微信绑定'
      },
      disconnectImgIcon: require('@/assets/myWallet/weibangding@2x.png'),
      heading: '',
      morenHeadImg: require('@/assets/myWallet/morentouxiang.png'),
      userName: '',
      BindBtnText: '解绑微信号',
      unBindbtnText: '授权绑定'
    }
  },
  methods: {
    bindBtn () {
      if (this.isUnbind) {
        this.$get(allUrl.unBindWechat).then(res => {
          if (res.success) {
            this.isBindWechat()
          } else {
            this.$toast({
              message: res.msg
            })
          }
        })
      } else {
        this.$get(allUrl.bindWechat).then(res => {
          if (res.success) {
            this.isBindWechat()
          } else {
            this.$toast({
              message: res.msg
            })
          }
        })
      }
    },
    // 获取当前绑定用户的微信信息
    getWechatMsg () {
      this.$get(allUrl.getWechatUserMsg).then(res => {
        if (res.success) {
          let curWechatUserMsg = res.data
          if (curWechatUserMsg.headimgurl) {
            // const headImg = curWechatUserMsg.headimgurl
            // var ImgObj = new Image()
            // ImgObj.src = headImg
            // if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
            //   this.isImg = true
            // } else {
            //   this.isImg = false
            // }
            this.heading = curWechatUserMsg.headimgurl
            this.userName = curWechatUserMsg.nickname
          }
        }
      })
    },
    // 用户是否绑定微信
    isBindWechat () {
      this.$get(allUrl.isBindWechat).then(res => {
        if (res.success) {
          this.isUnbind = res.data
          if (res.data) {
            this.getWechatMsg()
          }
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
    this.isBindWechat()
  }
}
</script>
<style lang="less" scoped>
.unbindBox{
  margin-top: 10px;
  background-color: white;
  text-align: center;
  padding-bottom: 43px;
  p{
    margin: 0;
  }
  .yiBindText{
    font-size: 18px;
    color: #222222;
    padding-top: 45px;
    padding-bottom: 42px;
  }
  img{
    width: 56px;
    height: 56px;
    padding-bottom: 10px;
    border-radius: 50%;
    // margin: 0 auto 43px auto;
  }
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
</style>
