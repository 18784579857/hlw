<template>
  <div class="view">
    <mt-header class="header" :title="headerList.titleText">
      <!-- <router-link
      :to="headerList.path ? headerList.path : '/'"
      slot="left"
      v-show="headerList.leftText">
        <mt-button icon="back">
          {{headerList.leftText}}
        </mt-button>
      </router-link> -->
      <mt-button
      v-show="headerList.leftText"
      slot="left" icon="back" @click="goBack">
        {{headerList.leftText}}
      </mt-button>
      <mt-button class="rightBtn" style="color:#fff;" v-show="headerList.righText" slot="right" @click="operation">
        {{headerList.righText}}
      </mt-button>
    </mt-header>
    <p class="money"><span>￥</span>{{headerList.money}}</p>
    <p class="moneyText">{{headerList.moneyText}}</p>
    <div class="tixian" v-show="headerList.isShowBtn" @click="withdrawBtn">
      <img :src="tixianIcon" alt="">
      <span class="myQrcode">我要提现</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerTwo',
  props: {
    headerList: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tixianIcon: require('@/assets/myWallet/wodeqianbao1.png')
    }
  },
  methods: {
    operation () {
      this.$emit('operation')
    },
    withdrawBtn () {
      this.$emit('withdrawBtn')
    },
    goBack () {
      let path = this.headerList.path
      if (path === '' || path === undefined) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          path: path
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .view{
    background: url(../../assets/image/header/pic_bg.png) no-repeat;
    background-size: 100% 100%;
    height: 170px;
    .header{
      background-color: transparent;
      color: white;
    }
    p{
      text-align: center;
      color: white;
      padding: 0;
      margin: 0;
    }
    .money{
      font-size: 40px;
      text-align: center;
      margin-top: 30px;
      span{
        font-size: 20px;
      }
    }
    .moneyText{
      font-size: 14px;
    }
    .tixian{
      float: right;
      width: 30%;
      height: 35px;
      margin: auto 0;
      background-color: white;
      border-top-left-radius: 18px;
      border-bottom-left-radius: 18px;
      // background: url(../../assets/myWallet/wodeerweima.png) no-repeat;
      // background-size: 100% 100%;
      margin-top: -5px;
      img{
        width: 14px;
        height: 13px;
        padding-top: 7px;
        margin-left: 3vw;
        vertical-align:middle;
      }
      span{
        color: #f4554d;
        font-size: 15px;
        padding-top: 7px;
        vertical-align:middle;
        display: inline-block;
        margin-left: 3px;
        font-weight: bold;
      }
    }
  }
</style>
<style>
  .header .mint-header-title{
    font-size: 17px !important;
  }
</style>
