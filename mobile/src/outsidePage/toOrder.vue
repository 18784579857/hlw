<template>
  <div class="order">
    <div class="header">
      <p>{{userName}}的小店</p>
    </div>
    <Swiper></Swiper>
    <!-- <Header :headerList="headerList"></Header> -->
    <!-- <div class="orderAddress">
      <div class="myorder">{{userName}}的小店</div>
    </div> -->
    <div class="order_body">
      <div>
        <Left @handleClickLeft="handleClickLeft"></Left>
        <!-- <Right @handleClickRight="handleClickRight"></Right> -->
        <Right :leftSelected="leftSelected" :userId="userId" ref="rightList"></Right>
      </div>
    </div>
    <div class="bottomBtn">
      <div class="count_price"
           @click="showCartDetails"
           v-loading.fullscreen.lock="fullscreenLoading"
           >
        <el-badge :value="shopCartCount"
                  :max="99"
                  class="item">
          <img src="@/assets/goodsList/ic_shopping-cart.png"
               alt="购物车">
        </el-badge>
        <span class="text">总价:</span>
        <span>￥</span>
        <span class="price">{{shopCartTotalPrice}}</span>
      </div>
      <div class="settlementBtn"
           @click="settlement">
        <span>确认订单</span>
      </div>
    </div>
    <mt-popup v-model="popupVisible"
              position="bottom"
              class="cart-popup">
      <ul class="cart-list">
        <li class="delete-cart-all">
          <el-button type="text"
                     @click="handleDeleteCartAll"
                     icon="el-icon-delete">清空购物车</el-button>
        </li>
        <li v-for="(item,$index) in cartList"
            :key="$index">
          <span class="inline-block item-name">{{item.name}}</span>
          <span class="inline-block item-price">￥{{item.salePrice}}</span>
          <div class="btn inline-block item-count">
            <!--  @touchend="handleCount('subtract',item,$index)" -->
            <img @touchend="handleCount('subtract',item,$index)"
            v-loading.fullscreen.lock="fullscreenLoading"
                 src="@/assets/goodsList/ic_reduce.png"
                 alt="">
            <span class="">{{item.count}}</span>
            <img @touchend="handleCount('add',item,$index)"
            v-loading.fullscreen.lock="fullscreenLoading"
                 src="@/assets/goodsList/ic_add.png"
                 alt="">
          </div>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import Header from 'base/header/header'
import Left from './leftBtn/leftBtn'
import Right from './rightList/rightList'
import { Toast } from 'mint-ui'
import Swiper from './swiper/swiper'
// import { Toast, Indicator } from 'mint-ui'
import { allUrl } from '@/router/allUrl'
export default {
  name: 'order',
  components: { Header, Left, Right, Swiper },
  data () {
    return {
      userName: '',
      headerList: {
        leftText: '',
        path: '',
        text: '欢迎下单',
        righText: ''
      },
      leftSelected: {},
      userId: '',
      userMsg: '',
      popupVisible: false,
      cartList: [],
      countNum: 0,
      goodsItemList: [],
      fullscreenLoading: false
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'ConfirmOrder'
      })
    },
    toB () {
      this.$router.push({
        name: 'ConfirmOrder'
      })
    },
    handleClickLeft (leftBtn) {
      this.leftSelected = leftBtn
      // console.log(leftBtn)
    },
    handleClickRight () {
      console.log('1')
    },
    showCartDetails () {
      const self = this
      self.fullscreenLoading = true
      self.$get(allUrl.carInfo).then((res) => {
        if (res.success) {
          self.fullscreenLoading = false
          self.cartList = []
          if (res.data.goods.length > 0) {
            self.popupVisible = !self.popupVisible
            res.data.goods.forEach(element => {
              self.cartList.push({
                name: element.goodsName,
                salePrice: element.price.amount,
                id: element.goodsId,
                count: element.goodsNum
              })
            })
          }
          console.log(self.cartList)
        } else {
          self.fullscreenLoading = false
          self.cartList = []
          self.popupVisible = false
          Toast({
            message: res.msg,
            position: 'center',
            duration: 2000
          })
        }
      })
    },
    handleCount (type, item, index) {
      const self = this
      self.fullscreenLoading = true
      self.countNum = this.$store.state.goodsSelectedCount[index].count
      if (type === 'add') {
        self.countNum++
      } else {
        if (self.countNum > 0) {
          self.countNum--
        }
      }
      self.$get(allUrl.handleGoods + '/' + item.id + '/' + self.countNum).then(res => {
        if (res.success) {
          self.fullscreenLoading = false
          if (self.$refs.rightList) {
            let rightList = self.$refs.rightList
            self.goodsItemList = rightList.$refs.goodsItemRef
          }
          if (type === 'add') {
            self.cartList[index].count++
            self.$store.commit('addGoods', item)
            self.getGoodsItem(self.cartList[index].count, self.goodsItemList, item)
            // goodsItem[index].buyCount = self.cartList[index].count
            // self.getGoodsItem(index, self)
          } else {
            if (item.count === 1) {
              if (self.cartList.length === 1) {
                self.popupVisible = false
                self.getGoodsItem(0, self.goodsItemList, item)
                self.cartList = []
              } else {
                self.cartList.splice(index, 1)
                self.getGoodsItem(0, self.goodsItemList, item)
              }
            } else {
              self.cartList[index].count--
              self.getGoodsItem(self.cartList[index].count, self.goodsItemList, item)
            }
            self.$store.commit('subtractGoods', item)

            // self.getGoodsItem(index, self)
          }
        } else {
          self.fullscreenLoading = false
          Toast({
            message: res.msg,
            iconClass: 'icon icon-error',
            duration: 3000
          })
        }
      })
      //  slef.handleCountOptions(type, slef, item,index)
      // }else{
      //   slef.handleCountOptions('subtractGoods', slef, item,index)
      // }
      // if (type === 'add') {
      //   slef.cartList[index].count++
      //   slef.handleCountOptions('addGoods', slef, item)
      //   // slef.$store.commit('addGoods', item)
      // } else {
      //   if (item.count === 1) {
      //     if (slef.cartList.length === 1) {
      //       slef.popupVisible = false
      //     }
      //     console.log(slef.cartList)
      //     slef.cartList.splice(index, 1)
      //   } else {
      //     slef.cartList[index].count--
      //   }
      //   slef.handleCountOptions('subtractGoods', slef, item)
      //   // slef.$store.commit('subtractGoods', item)
      // }
    },
    // handleCountOptions (option, self, goodsInfor) {

    //   self.$get(allUrl.handleGoods + '/' + goodsInfor.id + '/' + goodsInfor.count).then(res => {
    //     if (res.success) {
    //       self.$store.commit(option, goodsInfor)
    //     } else {
    //       Toast({
    //         message: res.msg,
    //         duration: 3000
    //       })
    //     }
    //   })
    // },
    getGoodsItem (count, goodsItem, item) {
      if (item === 'all') {
        goodsItem.forEach(element => {
          element.buyCount = 0
        })
      } else {
        goodsItem.forEach(element => {
          if (element.goodsInfor.id === item.id) {
            element.buyCount = count
          }
        })
      }
    },
    handleDeleteCartAll () { // 清空购物车
      const self = this
      self.$get(allUrl.clearCartAll).then((res) => {
        if (res.success) {
          Toast({
            message: '清空购物车成功',
            iconClass: 'icon icon-success',
            duration: 2000
          })
          self.cartList = []
          self.popupVisible = false
          self.$store.commit('clearGoods')
          if (self.goodsItemList.length === 0) {
            let rightList = self.$refs.rightList
            self.goodsItemList = rightList.$refs.goodsItemRef
          }
          self.getGoodsItem(0, self.goodsItemList, 'all')
        } else {
          Toast({
            message: res.msg,
            iconClass: 'icon icon-error',
            duration: 2000
          })
        }
      })
    },
    settlement () {
      let data = {
        shopingCarList: []
      }
      for (let item of this.$store.state.goodsSelectedCount) {
        let obj = {}
        if (item.count > 0) {
          obj = {
            goodsId: item.infor.id,
            buyAmount: item.count
          }
          data.shopingCarList.push(obj)
        }
      }
      if (!data.shopingCarList.length) {
        Toast({
          message: '请选择商品',
          position: 'center',
          duration: 2000
        })
        return
      }
      // Indicator.open('加载中...')
      this.$router.push({
        path: '/outside/ConfirmOrder',
        query: {
          goods: JSON.stringify(data.shopingCarList),
          userName: this.userName,
          userId: this.userId
        }
      })
      // this.$post(allUrl.addShopCart, data).then((res) => {
      //   if (res.success) {
      //     this.$store.commit('clearGoods')
      //     Indicator.close()
      //     Toast({
      //       message: '添加成功',
      //       position: 'center',
      //       duration: 2000
      //     })
      //     this.$router.push({
      //       path: '/outside/ConfirmOrder',
      //       query: {
      //         goods: JSON.stringify(data.shopingCarList)
      //       }
      //     })
      //     this.$store.state.flag = ''
      //   } else {
      //     Indicator.close()
      //     Toast({
      //       message: '添加失败，稍后再试',
      //       position: 'center',
      //       duration: 2000
      //     })
      //   }
      // })
    },
    getUrlCode (code) {
      let url = window.location.href
      var reg = new RegExp('(^|\\?|&)' + code + '=([^&]*)(\\s|&|$)', 'i')
      if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, ' '))
      return ''
    },
    getData () {
      let me = this
      this.userId = this.getUrlCode('userId')
      // this.userId = '4306794435b93cd3'
      this.$get(allUrl.getUserMsg + '/' + this.userId).then(res => {
        if (res.success) {
          let allData = res.data
          this.userMsg = res.data
          me.userName = res.data.userName
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
      // this.$get(allUrl.getUserName + '?id=' + this.userId).then(res => {
      //   if (res.success) {
      //     me.userName = res.data
      //   }
      // })
      this.$get(allUrl.carInfo).then(res => {
        if (res.success) {
          // me.userName = res.data
          if (res.data.goods.length > 0) {
            res.data.goods.forEach(element => {
              me.cartList.push({
                name: element.goodsName,
                salePrice: element.price.amount,
                id: element.goodsId,
                count: element.goodsNum
              })
            })
            me.$store.commit('totalCart', me.cartList)
          } else {
            me.cartList = []
            me.popupVisible = false
          }
        } else {
          me.cartList = []
          me.popupVisible = false
          // Toast({
          //   message: res.msg,
          //   iconClass: 'icon icon-error',
          //   duration: 2000
          // })
        }
      })
    }
  },
  mounted () {
    document.title = '亲民商城'
    this.getData()
  },
  computed: {
    shopCartCount: function () {
      let arr = []
      for (let element of this.$store.state.goodsSelectedCount) {
        if (element.count > 0) {
          arr.push(element)
        }
      }
      return arr.length
    },
    shopCartTotalPrice: function () {
      let count = 0
      for (let element of this.$store.state.goodsSelectedCount) {
        if (element.count > 0) {
          // count = count + (element.count * element.infor.price)
          count = count + (element.count * element.infor.salePrice)
          count = Number(parseFloat(count).toFixed(2))
        }
      }
      return count
    }
  }
}
</script>
<style lang="less" scoped>
  .header{
    color: #222222;
    font-size: 18px;
    line-height: 16px;
    text-align: center;
    background-color: white;
    p{
      margin: 10px 0;
    }
  }
  .order {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .orderAddress{
      background: white;
      display: flex;
      flex-direction: column;
      justify-content:center;
      .myorder{
        width:100%;
        min-height:35px;
        background:rgba(255, 189, 67, 0.89);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color:white;
      }
    }
    .order_body {
      height: calc(100% - 41px);
      flex: 1;
      overflow: auto;
      border-top: 1px solid #ECECEC;
      > div {
        display: flex;
        height: 100%;
      }
    }
    .bottomBtn {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ddd;
      z-index: 30000;
      .count_price {
        box-sizing: border-box;
        padding-left: 5vw;
        width: 69vw;
        // width: 30.67vw;
        img {
          width: 13.33vw;
          height: 13.33vw;
          position: relative;
          bottom: 5px;
        }
        span {
          font-size: 13px;
          color: #F4554D;
          font-weight: bold;
        }
        .text {
          font-size: 15px;
          color: #222;
          margin-left: 10px;
          font-weight: normal;
        }
        .price {
          font-size: 6vw;
          font-weight: bold;
        }
      }
      .settlementBtn {
        width: 30.67vw;
        height: 14.4vw;
        text-align: center;
        line-height: 14.4vw;
        background-color: #F4554D;
        font-size: 17px;
        color: #fff;
      }
    }
    .cart-popup{
      width: 100%;
      .cart-list{
        max-height: 276px;
        overflow: scroll;
        // padding-top: 5px;
      }
      .delete-cart-all{
        height: 36px;
        line-height: 36px;
        text-align: right;
         background: rgb(238,238,238);
        .el-button--text{
           font-weight: 400;
          font-size: 15px;
          color: rgb(102,102,102);
        }
      }
      ul,li{
        list-style: none;
        padding: 0px;
        margin: 0px;
      }
      // ul{
      //   box-sizing: border-box;
      //   padding: 10px 0px;
      // }
      li{
        display: block;
        height: 52px;
        line-height: 52px;
        padding: 0px 10px;
        border-bottom: 1px solid #ddd;
      }
      li:last-child{
        border-bottom:none;
      }
      .inline-block{
        display: inline-block;
        float: left;
        font-weight: 400;
        color: rgb(34,34,34);
      }
      .item-name{
        width: 53%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size: 15px;
      }
      .item-price{
        width: 20%;
        font-size: 14px;

      }
      .btn {
        width: 27%;
        justify-content: flex-end;
        // margin-right: 5px;
        text-align: center;
        img {
          width: 23px;
          height: 23px;
          vertical-align: middle;
        }
        span {
          width: 8vw;
          display: inline-block;
          line-height: 23px;
        }
      }
    }
    .mint-popup-bottom{
      bottom: 53px;
    }
  }

</style>
<style lang="less" >
  .el-loading-mask{
    background-color: rgba(255,255,255,.1);
  }
</style>
