<template>
<div class="mybody">
  <div class="myheader">
    <Header :headerList="headerList"></Header>
  </div>
  <div class="mycontent">
    <Swipe></Swipe>
    <div class="myReward">
      <div class="reward" @click="goReward">
        <img :src="icon" alt="">
        <span class="rewardText">我的津贴：</span>
        <span class="rewardMoney">{{myReward}}</span>
        <span class="rewardRight">
          点击查看 ＞
          <!-- <img :src="ic_right" alt=""> -->
        </span>
      </div>
    </div>
    <!-- <div class="second_area" v-if="userbasic.isShow">
      <div class="ranking" @click="openRank" >
        <img :src="rank" alt="">
        <div>
          <div class="rewardText monthRank">月排名:{{userbasic.monthRank?userbasic.monthRank:"--"}}</div>
          <div class="rewardText yearRank">年排名:{{userbasic.yearRank?userbasic.yearRank:"--"}} </div>
        </div>
      </div>
      <div class="myReward1">
        <div class="reward" @click="ceshiopen">
          <img :src="zizhu" alt="">
          <div style="margin-left:10px;">
            <div class="rewardText monthRank">我的小店</div>
            <div class="rewardRight yearRank">分享GO＞ </div>
          </div>
        </div>
      </div>
    </div>
    <div class="myReward2" v-else> -->
      <div class="myReward2">
        <div class="reward" @click="ceshiopen">
          <img :src="zizhu" alt="">
          <span class="rewardText">我的小店</span>
          <span class="rewardRight">
            分享GO ＞
            </span>
        </div>
      </div>
    <div>
      <div class="myBtn">
        <div v-for="btn in btnList" class="myBtn_item" :key="btn.type">
          <MyBtn @handleClick="handleClick" :btn="btn"></MyBtn>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Header from 'base/header/header'
import Swipe from './swiper/swiper'
import MyBtn from './my_btn/myBtn'
import {btnList} from './btnList'
import {allUrl} from '@/router/allUrl'
// import wx from 'weixin-js-sdk'
export default {
  name: 'my',
  components: {
    Header,
    Swipe,
    MyBtn
  },
  data () {
    return {
      shareOrderUrl: allUrl.getShareOrder,
      popupVisible: false,
      closeOnClickModal: false,
      ic_close: require('@/assets/image/order/ic_close.png'),
      headerList: {
        leftText: '',
        path: '',
        text: '亲民',
        righText: ''
      },
      // userbasic: {},
      icon: require('@/assets/my/ic_10.png'),
      zizhu: require('@/assets/goOrder/zizhu2.png'),
      rank: require('@/assets/my/paiming.png'),
      message: [],
      btnList: btnList,
      myReward: '0',
      userMsg: '',
      wxMsg: {
        appId: '',
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '' // 必填，签名，见附录1
      },
      lockMoney: '',
      extractMoney: ''
    }
  },
  methods: {

    // 自助下单
    CodeClose () {
      this.popupVisible = false
    },
    /// /获取user排行信息
    // getUserRank () {
    //   this.$get(allUrl.getuserRank).then((res) => {
    //     if (res.success) {
    //       console.log(res.data)
    //       this.userbasic = res.data
    //     }
    //   })
    // },
    handleClick (btn) {
      this.$router.push({
        path: btn.path
      })
    },
    // openRank () {
    //   this.$router.push({
    //     name: 'Ranking',
    //     query: {userMes: JSON.stringify(this.userbasic)}
    //   })
    // },
    ceshiopen () {
      this.$router.push({
        name: 'Shareorder'
      })
      // this.popupVisible = true
      // let onlineurl = '/#/'
      // window.open(onlineurl + 'outside/ToOrder?userId=' + this.userMsg)
    },
    assignment (type, count) {
      this.btnList.forEach(el => {
        if (el.type === type) {
          el.count = count
        }
      })
    },
    btnListSlice () {
      let temp = []
      this.btnList.forEach((item, index) => {
        if (item.type !== 'yesterday' && item.type !== 'firstHalf' && item.type !== 'current') {
          temp.push(item)
        }
      })
      return temp
    },
    getData () {
      // this.$get(allUrl.storeFenHong + '1/1/99').then((res) => {
      //   if (res.success) {
      //     if (!res.data.isShareholder) {
      //       this.btnList = this.btnListSlice()
      //     } else {
      //       this.assignment('yesterday', res.data.totalDividend.amount)
      //     }
      //   }
      // })
      // this.$get(allUrl.storeFenHong + '2/1/99').then((res) => {
      //   if (res.success && res.data.totalMoney) {
      //     this.assignment('firstHalf', res.data.totalMoney.amount)
      //   }
      // })
      // this.$get(allUrl.storeCurrent).then((res) => {
      //   if (res.success && res.data.totalMoney) {
      //     this.assignment('current', res.data.totalMoney.amount)
      //   }
      // })
      this.$get(allUrl.waitCheck).then(res => {
        if (res.success) {
          this.myReward = res.data.balance === null ? 0 : res.data.balance.amount
          this.extractMoney = res.data.extractMoney === null ? 0 : res.data.extractMoney.amount
          this.lockMoney = res.data.lockMoney === null ? 0 : res.data.lockMoney.amount
        }
      })
    },
    goReward () {
      this.$router.push({
        name: 'MyReward',
        query: {
          money: this.myReward,
          extractMoney: this.extractMoney,
          lockMoney: this.lockMoney
        }
      })
    },
    getUserMsg () {
      // this.$get(allUrl.getUserId).then(res => {
      //   if (res.success) {
      //     this.userMsg = res.data
      //     localStorage.setItem('userMsg', JSON.stringify(res.data))
      //   } else {
      //     this.$toast({
      //       message: res.msg,
      //       iconClass: 'el-icon-error',
      //       duration: 1500
      //     })
      //   }
      // })
    }
  },
  mounted () {

  },
  created () {
    this.getData()
    // this.getUserRank()
    this.getUserMsg()
  }
}
</script>
<style lang="less" scoped>
.sharePopup{
  width: 100%;
  border-radius: 10px;
  .sharePopupTop{
      height: 40px;
      color: white;
      background-color: #F4564D;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      text-align: center;
      line-height: 40px;
    }
    .sharePopupImg{
      text-align: center;
      padding: 30px;
      background-color: white;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      img{
        width: 100%;
      }
    }
    .sharePopupClose{
      text-align: center;
      img{
        vertical-align: middle;
        padding: 20px;
      }
    }
}
</style>
<style lang="less">
  .mybody {
    background-color: #f5f5f5 !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    .mycontent {
      border-top: 1px solid #E6E6E6;
      flex: 1;
      overflow: auto;
      .myBtn {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 2.7vw;
        .myBtn_item{
          width:100%;
        }
      }

      .myReward {
        padding: 0 2.7vw;
        padding-bottom: 3vw;
        .reward{
          background: url(../../../assets/my/jiangli.png) no-repeat;
          background-size: 100% 100%;
          height: 80px;
          line-height: 80px;
          padding-left: 10px;
          padding-right: 10px;
          font-size: 14px;
          color: white;
          img {
            width: 9.6vw;
            vertical-align: middle
          }
          .rewardText{
            margin-left: 8px;
          }
          .rewardText,.rewardMoney {
            font-size:17px;
            color:#333333;
            // font-weight: 600;
            font-weight: bold;
          }
          .rewardMoney::before {
            content: '￥';
            font-size: 15px;
          }
          .rewardRight {
            float: right;
            color:#333333;
            font-size:14px;
          }
        }
      }
      .second_area {
        padding: 0 2.7vw;
        padding-bottom: 3vw;
        display: flex;
        justify-content: space-between;
        .ranking {
          display: flex;
          border-radius: 8px;
          width: 40.5vw;
          padding: 0 2.7vw;
          background: url(../../../assets/my/paimingkapian.png) no-repeat;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: white;
          img {
            width: 9.6vw;
            vertical-align: middle
          }
          .rewardText {
            margin-left: 10px;
            color:#333333;
          }
          .monthRank{
            font-size:15px;
            // font-weight: 600;
            font-weight: bold;
          }
          .yearRank{
            font-size:13px;
          }
          .rewardMoney::before {
            content: '￥';
            font-size: 12px;
          }
          .rewardRight {
            float: right;
          }
        }
        .myReward1 {
          display: flex; // width: 40.5vw;
          height: 19.7vw;
          padding-left: 2.7vw;
          .reward {
            border-radius: 8px;
            background: url(../../../assets/goOrder/zizhu1.png) no-repeat;
            background-size: 100% 100%;
            width: 40.5vw; // height: 80px;
            // line-height: 80px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 14px;
            color: white;
            img {
              width: 9.6vw;
              vertical-align: middle
            }
            .rewardText {
              // margin-left: 10px;
              color:#333333;
            }
            .monthRank{
              font-size:15px;
             font-weight: bold;
            }
            .yearRank{
              font-size:13px;
            }
            .rewardMoney::before {
              content: '￥';
              font-size: 12px;
            }
            .rewardRight {
              float: right;
              color:#333333;
            }
          }
        }
      }
       .myReward2{
        padding: 0 2.7vw;
        padding-bottom: 3vw;
        .reward{
           background: url(../../../assets/goOrder/zizhu1.png) no-repeat;
          background-size: 100% 100%;
          height: 80px;
          line-height: 80px;
          padding-left: 10px;
          padding-right: 10px;
          font-size: 14px;
          color:#333333;
          img{
            width: 9.6vw;
            vertical-align: middle
          }
          .rewardText{
            margin-left: 10px;
            color:#333333;
            font-weight:bold;
            font-size:17px;
          }
          .rewardMoney::before{
            content:'￥';
            font-size: 12px;
          }
          .rewardRight{
            float: right;
          }
        }
      }
    }
  }
</style>
