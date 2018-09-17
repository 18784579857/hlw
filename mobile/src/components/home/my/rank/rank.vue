<template>
<div class="rank_div">
  <Header :headerList="headerList"></Header>
  <div id="mescroll" class="mescroll">
  <div class="rank_basic">
    <div class="basic_left">
      <div>{{userbasic.userName}}</div>
      <div>本月销售额：{{userbasic.saleMonthMoney?userbasic.saleMonthMoney.amount+'元':'0元'}}</div>
    </div>
    <div class="basic_right">
      <div>月排名：{{userbasic.monthRank?userbasic.monthRank:"--"}}</div>
      <div>年排名：{{userbasic.yearRank?userbasic.yearRank:"--"}}</div>
    </div>
  </div>
  <div class="rank_tabs">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="业绩排行榜" name="first">
        <div class="year_show">
          <el-row style="padding:10px 8px">
            <el-col :span="8">排名</el-col>
            <el-col :span="8">姓名</el-col>
            <el-col :span="8">销售额</el-col>
          </el-row>
          <!-- <div  id="mescroll" class="mescroll"> -->
            <ul id="dataList" class="data-list" v-cloak>
              <li v-for="(it,index) in yeardata" :key="index">
                <el-row v-if="it.rank===1" class="rankfirst_row">
                  <el-col :span="8">
                    <img :src="first_rank" alt="">
                  </el-col>
                  <el-col :span="8">{{it.userName}}</el-col>
                  <el-col :span="8">{{it.totalMoney.amount}}</el-col>
                </el-row>
                <el-row v-else-if="it.rank===2" class="ranksecond_row">
                  <el-col :span="8">
                    <img :src="second_rank" alt="">
                  </el-col>
                  <el-col :span="8">{{it.userName}}</el-col>
                  <el-col :span="8">{{it.totalMoney.amount}}</el-col>
                </el-row>
                <el-row v-else-if="it.rank===3" class="rankthird_row">
                  <el-col :span="8">
                    <img :src="third_rank" alt="">
                  </el-col>
                  <el-col :span="8">{{it.userName}}</el-col>
                  <el-col :span="8">{{it.totalMoney.amount}}</el-col>
                </el-row>
                <el-row v-else style="padding:8px 0;margin:0 10px">
                  <el-col :span="8">{{it.rank}}</el-col>
                  <el-col :span="8">{{it.userName}}</el-col>
                  <el-col :span="8">{{it.totalMoney.amount}}</el-col>
                </el-row>
              </li>
            </ul>
          <!-- </div> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
  name: 'rank',
  components: {
    'Header': Header
  },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '业绩排行'
      },
      yearrank: new Date().getFullYear(),
      monthrank: new Date().getMonth() + 1,
      // yearloading: false,
      // monthloading: false,
      yearsstatus: 1,
      first_rank: require('@/assets/rank/1.png'),
      second_rank: require('@/assets/rank/2.png'),
      third_rank: require('@/assets/rank/3.png'),
      activeName: 'first',
      userbasic: {},
      yeardata: [],
      mescroll: null
    }
  },
  methods: {
    upCallback (page) {
      const self = this
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        if (page.num === 1) self.yeardata = []

        //   // 更新列表数据
        console.log(self.yeardata)
        self.yeardata = self.yeardata.concat(curPageData)
        self.mescroll.endByPage(curPageData.length, self.totalPage)
        // debugger
        // if (document.getElementsByClassName('upwarp-nodata')[0]) {
        //   document.getElementsByClassName('upwarp-nodata')[0].innerHTML = '-- 暂无更多 --'
        // }
      })
    },
    getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
      const self = this
      setTimeout(function () {
        self.$get(allUrl.getrankdata + '/' + self.yearsstatus + '/' + pageNum + '/' + pageSize).then(res => {
          if (res.success) {
            self.totalPage = res.data.pages
            let list = res.data.list
            successCallback && successCallback(list)// 成功回调
          }
        })
      }, 500)
    }
    // loadBottom () {
    //   this.loadMore()
    // },
    // handleClick () {

    // },
    // getData () {
    //   this.$get(allUrl.getrankdata + '/' + this.yearsstatus + '/' + this.yearcontrol.pageNum + '/' + this.pageSize).then((res) => {
    //     if (res.success) {
    //       if (this.yeardata.length === 0) {
    //         this.yeardata = res.data.list
    //       } else {
    //         res.data.list.forEach((item) => {
    //           this.yeardata.push(item)
    //         })
    //       }
    //       if (this.yearcontrol.pageNum >= res.data.pages) {
    //         this.yearcontrol.yearpages = false
    //       }
    //       this.yearloading = false
    //     }
    //   })
    // },
    // loadMore () {
    //   if (this.yearcontrol.yearpages) {
    //     this.yearcontrol.pageNum += 1
    //     this.getData()
    //   }
    // }
  },
  mounted () {
    if (this.$route.query && this.$route.query.userMes) {
      this.userbasic = JSON.parse(this.$route.query.userMes)
      this.yearsstatus = JSON.parse(this.$route.query.userMes).type
      console.log(this.yearsstatus)
    }
    const self = this
    self.mescroll = new MeScroll('mescroll', {
      up: {
        callback: self.upCallback, // 上拉回调
        // 以下参数可删除,不配置
        isBounce: true, // 此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        page: {size: 10}, // 可配置每页10条数据,默认10
        empty: { // 配置列表无任何数据的提示
          warpId: 'dataList'
        },
        htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据~ --</p>'
      }
    })

    // this.getData()
  }

}
</script>
<style lang="less">
.rank_div{
    display: flex;
    flex-direction: column;
    height: 100%;
    .rankfirst_row,.ranksecond_row,.rankthird_row{
    height:67px;
    border-radius: 8px;
    display:flex;
    align-items: center;
    border: 0;
    margin:0 10px;
    color:white;
    img{
      width:34px;
    }
  }
  .rankfirst_row,.ranksecond_row{
     margin-bottom: 7px;
   }
   .rankfirst_row{
    background: url(../../../../assets/rank/diyi.png) no-repeat;
  }
  .ranksecond_row{
    background: url(../../../../assets/rank/dier.png) no-repeat;
  }
   .rankthird_row{
    background: url(../../../../assets/rank/disan.png) no-repeat;
  }
  .rank_basic{
    height: 100px;
    background: white;
    margin-top: 12px;
    display:flex;
    align-items: center;
    .basic_left{
      flex:0.6;
      padding-left: 10px;
      border-right: solid 1px #e8e8e8;
      >div:first-child{
      font-size: 20px;
      font-weight: bold;
      margin-bottom:8px;
      }
    }
    .basic_right{
      flex:0.4;
       padding-left: 10px;
       color:red;
       padding-left: 5%;
       >div:first-child{
         margin-bottom: 8px;
       }
    }
  }
  .rank_tabs{
    margin-top: 12px;
    flex:1;
    display: flex;
    flex-direction: column;
    // overflow: scroll;
    .el-tabs__nav{
      width: 100%;
      background: white;
      >div{
        width:100%;
        text-align: center;
      }
      .el-tabs__item{
        font-size: 16px;
        min-height: 47px;
        line-height: 47px;
      }
    }
    .el-tabs__header{
      margin: 0;
      border-bottom: solid 1px #e8e8e8;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #fff;
    background: rgb(255, 110,117);
    color: white;
    transition: all 0.3s
}
  .year_show,.month_show{
    height:auto;
    ul{
      padding: 0;
      margin: 0;
      list-style: none;
      li{
        text-align: center;
        .el-row{
        border-bottom:solid 1px #e8e8e8;
        height:60px;
        display:flex;
        align-items: center;
        }
      }
    }
    background: white;
    text-align: center;
  }
 .el-tabs__nav-wrap{
   border-bottom: solid 1px #e8e8e8;
 }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-bottom: 0
  }
  }
//  .el-tabs,.el-tabs__content,#pane-first,.year_show{
//     height:100%;
//   }

}
</style>
