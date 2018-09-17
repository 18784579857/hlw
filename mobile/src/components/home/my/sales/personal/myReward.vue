<template>
  <div class="yearSales">
    <div id="mescroll" class="mescroll">
    <headerTwo :headerList="headerList" @withdrawBtn="withdrawBtn"></headerTwo>
      <div class="content">
        <ul class="tab">
          <li v-for="(tab,index) in tabList"
          :key='index'
          class="tab-item"
          @click="tabClick(index)"
          >
          <span :class="(index === typeActive) ? 'active' : ''">{{tab.title}}</span>
          </li>
        </ul>
        <div id="tabContainer" v-cloak>
          <div class="tab-container-item" v-show='typeActive===0?true:false'>
            <h5 class="h5">已入账津贴总计：<span>{{extractMoney}}</span></h5>
            <div v-show="isShow" class="nodata">~暂无任何数据</div>
            <ul>
              <li v-for="(item,i) in salaryList" :key="i" class="salary_item">
                <div class="salary_box">
                  <div class="font-gray">订单编号：{{item.orderNo}}</div>
                  <div class="font-gray">{{item.gmtCreateStr}}</div>
                  <div class="h6">
                    <h6>{{item.typeStr}}</h6>
                    <h6 class="item_money" v-html="item.changeMoney===null?0:item.changeMoney.amount"></h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-container-item" v-show='typeActive===1?true:false'>
            <h5 class="h5">待入账津贴：<span>{{lockMoney}}</span></h5>
            <div v-show="isShow" class="nodata">~暂无任何数据</div>
            <ul>
              <li v-for="(key,i) in afterSalaryList" :key="i" class="salary_item">
                <div class="font-gray">订单编号：{{key.orderNo}}</div>
                <div class="h6">
                  <h6>{{key.typeStr}}</h6>
                  <h6 class="item_money" v-html="key.changeMoney===null?0:key.changeMoney.amount"></h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import headerTwo from 'base/headerTwo/headerTwo'
import {allUrl} from '@/router/allUrl'

export default {
  components: {headerTwo},
  data () {
    return {
      headerList: {
        titleText: '我的津贴',
        path: '',
        leftText: '返回',
        money: '',
        // moneyText: '待转入津贴',
        isShowBtn: true
      },
      isShow: false,
      typeActive: 0,
      tabList: [{
        title: '津贴明细'
      }, {
        title: '待入账津贴'
      }],
      activeTabShow: true,
      mescroll: null,
      totalPage: '',
      type: 1,
      lockMoney: '',
      extractMoney: '',
      salaryList: [],
      afterSalaryList: []
    }
  },
  methods: {
    tabClick (index) {
      this.typeActive = index
      if (index === 0) {
        this.type = 1
      } else {
        this.type = 2
      }
      this.isShow = false
      this.getData()
    },
    // 我要提现
    withdrawBtn () {
      this.$router.push({
        name: 'MyWallet'
      })
    },
    getData () {
      const self = this
      self.getMoney()
      if (self.mescroll) self.mescroll.destroy()
      self.mescroll = new MeScroll('mescroll', {
        up: {
          callback: self.upCallback, // 上拉回调
          // 以下参数可删除,不配置
          isBounce: true, // 此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
          page: {size: 10}, // 可配置每页8条数据,默认10
          // empty: { // 配置列表无任何数据的提示
          //   warpId: 'tabContainer'
          //   // icon: './../../assets/image/empty.png'
          // },
          htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>'
        }
      })
    },
    getMoney () {
      const self = this
      self.$get(allUrl.waitCheck).then(res => {
        if (res.success) {
          self.headerList.money = res.data.balance === null ? 0 : res.data.balance.amount
          self.extractMoney = res.data.extractMoney === null ? 0 : res.data.extractMoney.amount
          self.lockMoney = res.data.lockMoney === null ? 0 : res.data.lockMoney.amount
        }
      })
    },
    upCallback (page) {
      const self = this
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        if (self.type === 1) {
          if (page.num === 1) self.salaryList = []
          self.salaryList = self.salaryList.concat(curPageData)
        } else {
          if (page.num === 1) self.afterSalaryList = []
          self.afterSalaryList = self.afterSalaryList.concat(curPageData)
        }
        self.mescroll.endByPage(curPageData.length, self.totalPage)
      })
    },
    getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
      const self = this
      self.$get(allUrl.getSalaryDetail + '/' + pageNum + '/' + pageSize + '/' + self.type).then(res => {
        if (res.success) {
          self.totalPage = res.data.pages
          let list = res.data.list
          if (list.length === 0) {
            self.isShow = true
          }
          successCallback && successCallback(list)// 成功回调
        }
      })
    }
  },
  mounted () {
    const self = this
    self.getData()
    if (this.$route.query) {
      self.headerList.money = this.$route.query.money
      self.extractMoney = this.$route.query.extractMoney
      self.lockMoney = this.$route.query.lockMoney
    }
    self.getMoney()
  }
}
</script>
<style lang="less" scoped>
  .yearSales {
    height: 100%;
    background-color: #fff;
    .content {
      ul{
        list-style: none;
        margin: 0px;
        padding: 0px;
      }
      .tab{
        display: flex;
        display: -webkit-box;
        display: -ms-flexbox;
        border-bottom: 1px solid #f2f2f2;
      }
      .tab-item{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        // border-bottom: 2px solid white;
        span{
          color: #222222;
          font-size: 4.3vw;
          font-weight: bold;
          display: inline-block;
          padding: 1.5vh;
        }
      }
      .active{
        color: #F4554D !important;
        border-bottom: 2px solid #F4554D !important;
      }
      .tab-container-item{
        .h5{
          font-size: 4.3vw;
          padding: 2.5vh;
          margin: 0px;
          border-bottom: 1px solid #f2f2f2;
          span{
            float: right;
          }
        }
        .font-gray{
          font-size: 3.5vw;
          color: #666666;
          line-height: 3.5vh;
        }
        .salary_item{
          width:92%;
          padding:2% 4%;
          margin: 0px;
          border-bottom: 1px solid #f2f2f2;

        }
        .h6{
          display: flex;
          display: -webkit-box;
          display: -ms-flexbox;
          h6{
            flex: 1;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            line-height: 3.8vh;
            font-size: 3.8vw;
            padding: 0px;
            margin: 0px;
          }
          .item_money{
            text-align: right;
          }
        }
        .nodata{
          text-align: center;
          padding: 10vh 0px;
        }
      }
    }
  }
</style>
