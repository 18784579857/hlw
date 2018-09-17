<template>
  <div>
    <div class="user">
      <div class="userImg">
        <img :src="headImg" alt="" class="imgDiv">
      </div>
      <div class="userInfo">
        <p class="userName">
          {{userName}}
          <!-- <img width="15" :src="bianji" alt="" @click="bianjiClick"> -->
        </p>
        <p class="userPhone">{{userPhone}}
        </p>
      </div>
      <div class="erweima" v-show="userTypeDesc">

        <img :src="zuanshi" alt="" >
        <span class="myQrcode">{{userTypeDesc}}</span>
      </div>
      <div class="order">
        <ul>
          <li v-for="(item,index) in orderList" :key="index" @click="goShoppingOrder(item.type)">
            <el-badge :value="item.num" :max="99" class="item">
              <img :src="item.img" alt="">
            </el-badge>
            <p>{{ item.text }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="operation">
      <ul class="setting">
        <li
        v-for="(item,index) in operation"
        :key="index"
        @click="clickSetting(item.type)">
          <div class="leftImg">
            <img :src="item.img" width="24" height="24">
          </div>
          <div class="text" :class="index===0?'firstLi':''">
            {{item.text}}
          </div>
          <div class="rightImg">
            <span style="margin-right:10px;color:#F4554D;">{{item.messageNum}}</span>
            <img :src="ic_right" width="7" height="11">
          </div>
        </li>
      </ul>
    </div>
    <div class="operation operation2">
      <ul class="setting">
        <li
        v-for="(item,index) in settingList"
        :key="index"
        @click="clickSetting(item.type)">
          <div class="leftImg">
            <img :src="item.img" width="24" height="24">
          </div>
          <div class="text">
            {{item.text}}
          </div>
          <div class="rightImg">
            {{item.type === 'service' ? phone : ''}}
            <img v-show="item.type !== 'service'" :src="ic_right" width="7" height="11">
          </div>
        </li>
      </ul>
    </div>
    <!-- 用户二维码大图 -->
    <mt-popup
    style="width:80%;border-radius: 8px;background: none;"
      v-model="appQrCodePopup"
      :closeOnClickModal="closeOnClickModal">
      <div class="appQrCodePopup">
        <div class="qrCodeTop">
          我的二维码
        </div>
        <div class="qrCodeImg">
          <img :src="appQrCode" alt="">
        </div>
        <div class="QrCodeClose">
          <img width="29" @click="QrCodeClose" :src="ic_close" alt="">
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { allUrl } from '@/router/allUrl'
export default {
  name: 'personal',
  data () {
    return {
      erweimaIcon: require('@/assets/myWallet/erweima.png'),
      headImg: '',
      myHeadImg: require('@/assets/myWallet/morentouxiang.png'),
      numCur: 12,
      appQrCodePopup: false,
      closeOnClickModal: false,
      appQrCode: allUrl.appQrCode,
      msg: '个人中心',
      logoImg: require('@/assets/logo400.png'),
      userImg: require('@/assets/ic_add.png'),
      ic_close: require('@/assets/image/order/ic_close.png'),
      bianji: require('@/assets/image/personal/bianji.png'),
      zuanshi: require('@/assets/image/personal/zuanshi.png'),
      userName: '',
      userPhone: '',
      userId: '',
      userTypeDesc: '',
      phone: '028-86244073',
      ic_right: require('@/assets/image/personal/ic_right.png'),
      orderList: [{
        img: require('@/assets/image/personal/ic_order.png'),
        text: '全部订单',
        num: '',
        type: 0
      }, {
        img: require('@/assets/image/personal/ic_pay.png'),
        text: '待支付',
        num: '',
        type: 1
      }, {
        img: require('@/assets/image/personal/ic_uncompleted.png'),
        text: '待完成',
        num: '',
        type: 2
      }, {
        img: require('@/assets/image/personal/ic_retreat.png'),
        text: '退货',
        num: '',
        type: 5
      }],
      settingList: [{
        text: '地址管理',
        img: require('@/assets/image/personal/ic_location.png'),
        type: 'addrss'
      }, {
        text: '设置',
        img: require('@/assets/image/personal/ic_set-up.png'),
        type: 'setting'
      },
      {
        text: '客服',
        img: require('@/assets/image/personal/ic_call.png'),
        type: 'service'
      }
      ],
      operation: [
        // {
        //   text: '邀请代理二维码',
        //   img: require('@/assets/image/personal/yinhangka.png'),
        //   type: 'erweima',
        //   messageNum: ''
        // },
        {
          text: '我要提现',
          img: require('@/assets/myWallet/wodeqianbao3@2x.png'),
          type: 'withdraw',
          messageNum: ''
        },
        {
          text: '直推团队人数',
          img: require('@/assets/image/personal/ic_team.png'),
          type: 'team',
          messageNum: ''
        },
        // {
        //   text: '添加代理',
        //   img: require('@/assets/image/personal/ic_add.png'),
        //   type: 'agent',
        //   messageNum: ''
        // },
        // {
        //   text: '下级代理审核进度',
        //   img: require('@/assets/image/personal/ic_progress.png'),
        //   type: 'verify',
        //   messageNum: ''
        // }, {
        //   text: '银行卡',
        //   img: require('@/assets/image/personal/yinhangka.png'),
        //   type: 'yinhangka',
        //   messageNum: ''
        // },
        {
          text: '消息',
          img: require('@/assets/image/personal/ic_news.png'),
          type: 'news',
          messageNum: ''
        }]
    }
  },
  methods: {
    clickSetting (type) {
      let self = this
      switch (type) {
        case 'erweima':
          self.$router.push({
            name: 'QrCode',
            query: {
              id: this.userId,
              phone: this.userPhone
            }
          })
          break
        case 'withdraw':
          self.$router.push({
            name: 'MyWallet'
          })
          break
        case 'setting':
          self.$router.push({
            name: 'Setup'
          })
          break
        case 'team':
          self.$router.push({
            name: 'Team'
          })
          break
        case 'agent':
          self.$router.push({
            name: 'Agent'
          })
          break
        case 'addrss':
          self.$router.push({
            name: 'Address'
          })
          break
        case 'news':
          self.$router.push({
            name: 'Message'
          })
          break
        case 'verify':
          self.$router.push({
            name: 'Audit'
          })
          break
        case 'service':
          window.location.href = 'tel:028-86244073'
          // self.$router.push({
          //   name: 'PaymentOk'
          // })
          // window.location.href = 'http://localhost:8080/#/paymentok?orderId=132131313'
          break
        case 'yinhangka':
          self.$router.push({
            name: 'User'
          })
          break
        default:
          break
      }
    },
    goUser () {
      // this.appQrCodePopup = true
      this.$router.push({
        name: 'QrCode',
        query: {
          id: this.userId,
          phone: this.userPhone
        }
      })
    },
    goShoppingOrder (type) {
      this.$router.push({
        name: 'ShoppingOrder',
        params: {
          type: type
        }
      })
    },
    getOrderNum () {
      this.$get(allUrl.getOrderNum).then(res => {
        if (res.success) {
          this.orderList[0].num = res.data.allNum === 0 ? '' : res.data.allNum
          this.orderList[1].num = res.data.waitPayNum === 0 ? '' : res.data.waitPayNum
          this.orderList[2].num = res.data.waitake === 0 ? '' : res.data.waitake
          this.orderList[3].num = res.data.returnNum === 0 ? '' : res.data.returnNum
        } else {
          this.$toast({
            message: '无法获取订单数量',
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    QrCodeClose () {
      this.appQrCodePopup = false
    },
    bianjiClick () { // 进入个人信息页面
      this.$router.push({
        name: 'User'
      })
    },
    updateUser () {
      let self = this
      this.$get(allUrl.selectUserInfo).then(function (res) {
        if (res.success) {
          self.userName = res.data.userName
          self.userPhone = res.data.mobile
          self.userId = res.data.id
          self.userTypeDesc = res.data.userTypeDesc
          //  <!--userTypeCode  1 经理 2 会员 3 店主    userLevelCode 0 普通经理  1 一星经理 2 2邢经理 -->
          if (res.data.userTypeCode) {
            if (res.data.userTypeCode === '2') {
              self.userTypeDesc = '会员'
            } else if (res.data.userTypeCode === '3') {
              self.userTypeDesc = '店主'
            } else {
              if (res.data.userLevelCode === '0') {
                self.userTypeDesc = '经理'
              } else if (res.data.userLevelCode === '1') {
                self.userTypeDesc = '一星经理'
              } else if (res.data.userLevelCode === '2') {
                self.userTypeDesc = '二星经理'
              } else if (res.data.userLevelCode === '3') {
                self.userTypeDesc = '三星经理'
              } else if (res.data.userLevelCode === '4') {
                self.userTypeDesc = '合伙人'
              } else {
                self.userTypeDesc = ''
              }
            }
          }

          // self.operation[6].messageNum = res.data.unreadNum === 0 ? '' : res.data.unreadNum
          // self.operation[4].messageNum = res.data.unreadNum === 0 ? '' : res.data.unreadNum
        } else {
          this.$toast({
            message: res.msg,
            iconClass: 'el-icon-error'
          })
        }
      })
    },
    // 获取团队人数
    getTeamNum () {
      let me = this
      me.$get(allUrl.getTimeNum).then(res => {
        if (res.success) {
          if (res.data !== 0) {
            // me.operation[2].messageNum = res.data
            me.operation[1].messageNum = res.data
          }
        } else {
          me.$toast({
            message: res.msg
          })
        }
      })
    },
    // 下级代理数量的请求
    getAgencyNum () {
      let me = this
      me.$get(allUrl.getAuditNum).then(res => {
        if (res.success) {
          if (res.data !== 0) {
            // me.operation[4].messageNum = res.data
            // me.operation[2].messageNum = res.data
          }
        } else {
          me.$toast({
            message: res.msg
          })
        }
      })
    },
    // 获取微信用户的信息
    getWechatuserInfo () {
      this.$get(allUrl.getWechatUserMsg).then(res => {
        if (res.success) {
          let curWechatUserMsg = res.data
          if (curWechatUserMsg.headimgurl) {
            this.headImg = curWechatUserMsg.headimgurl
          }
        } else {
          this.headImg = this.myHeadImg
        }
      })
    }
  },
  mounted () {
    this.getOrderNum()
    this.updateUser()
    this.getTeamNum()
    // this.getAgencyNum()
    // 是否绑定微信
    this.$get(allUrl.isBindWechat).then(res => {
      if (res.success) {
        this.isUnbind = res.data
        if (res.data) {
          this.getWechatuserInfo()
        } else {
          this.headImg = this.myHeadImg
        }
      } else {
        this.$toast({
          message: res.msg,
          iconClass: 'el-icon-error'
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .phoneColor{
    color:#222222;
    font-size: 14px;
  }
  .user{
    position: relative;
    font-family: 'PingFang SC';
    background: url(../../../assets/image/header/pic_bg.png) no-repeat;
    background-size: 100% 100%;
    height: 170px;
    display: flex;
    display: -webkit-flex;
    .userImg{
      width: 58px;
      height: 58px;
      margin-left: 5vw;
      margin-top: 48px;
      border-radius: 50%;
      background-color: white;
      text-align: center;
      img{
        width: 90%;
        height: 90%;
        margin-top: 5%;
        border-radius: 50%;
      }
    }
    .userInfo{
      flex: 1;
      height: 76px;
      margin-top: 37px;
      margin-left: 15px;
      p{
        margin: 0;
        color: white;
      }
      .userName{
        font-size: 18px;
        padding-top: 12px;
        img{
          margin-left: 20px;
        }
      }
      .userPhone{
        font-size: 12px;
        padding-top: 8px;
      }
    }
    .erweima {
      flex: 1;
      width: 136px;
      height: 35px;
      margin: auto 0;
      background-color: white;
      border-top-left-radius: 18px;
      border-bottom-left-radius: 18px;
      // background: url(../../../assets/myWallet/wodeerweima.png) no-repeat;
      // background-size: 100% 100%;
      img{
        width:16px;
        height:16px;
        padding-top: 7px;
        margin-left: 3vw;
        vertical-align:middle;
      }
      .myQrcode{
        color: #f4554d;
        font-size: 15px;
        padding-top: 7px;
        font-weight: bold;
        vertical-align:middle;
        display: inline-block;
      }
    }
    .order{
      width: 90%;
      height: 100px;
      background-color: white;
      border-radius: 6px;
      position: absolute;
      bottom: -60px;
      left: 5%;
      -webkit-box-shadow: #F5F5F5 0px 0px 5px;
      -moz-box-shadow: #F5F5F5 0px 0px 5px;
      box-shadow: #F5F5F5 0px 0px 5px;
      ul{
        display: flex;
        display: -webkit-flex;
        padding: 0 10px 0 10px;
        li{
          flex: 1;
          text-align: center;
          padding-top: 30px;
          font-size: 14px;
          color: #222222;
          img{
            width: 20px;
            height: 20px;
          }
          p{
            margin: 5px 0 0 0;
          }
          .el-badge__content{
            top:-10px !important;
          }
        }
      }
    }
  }
  // .operation:last-child{
  //   margin:15px auto 10px auto;
  // }

  .operation{
    margin-top: 75px;
    width: 90%;
    margin:75px auto 10px auto;
    background-color: white;
    border-radius: 6px;
    .setting{
      overflow: hidden;
      li{
        border-bottom: 1px solid #E6E6E6;
        margin:0 10px 0 10px;
        display: flex;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        .leftImg{
          width: 35px;
          img{
            margin-top: 13px;
          }
        }
        .text{
          flex: 1;
        }
        .firstLi{
          color:red !important;
        }
        .rightImg{
          font-size: 14px;
        }
      }
      li:last-child{
        border-bottom: 0;
      }
    }
  }
  .appQrCodePopup{
    width: 100%;
    border-radius: 10px;
    .qrCodeTop{
      height: 40px;
      color: white;
      background-color: #F4564D;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      text-align: center;
      line-height: 40px;
    }
    .qrCodeImg{
      text-align: center;
      padding: 30px;
      background-color: white;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      img{
        width: 100%;
      }
    }
    .QrCodeClose{
      text-align: center;
      img{
        vertical-align: middle;
        padding: 20px;
      }
    }
  }
  .operation2{
    margin-top: 20px;
  }
</style>
<style lang="less">
  .user .el-badge__content{
    top: -6px !important;
    right: 1px !important;
    background-color: #EB0303 !important;
    font-size: 12px !important;
    line-height: 12px !important;
    height: 14px !important;
    padding: 0 4px !important;
  }
  .user .mint-cell-wrapper{
    padding: 0 !important;
    .mint-cell-text{
      margin-left: 5px !important;
    }
  }
</style>
