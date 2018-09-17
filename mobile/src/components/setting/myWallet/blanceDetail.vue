<template>
  <div id="rank_div1" class="rank_div1_specical">
 <Header :headerList="headerList" ></Header>
    <div id="mescroll" class="mescroll">
      <div class="detailsContent">
        <ul id="dataList" class="data-list" v-cloak>
          <li v-for="(item,index) in list" :key='index' class="content">
              <div class="left">
                <span class="title">{{item.statusStr}}</span>
                <span class="time">{{item.gmtCreateStr}}</span>
              </div>
              <div class="right">
                <span>{{item.extractMoney.amount}}</span>
                </div>

          </li>
        </ul>
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
  components: {
    'Header': Header
  },
  data () {
    return {
      msg: '余额明细',
      headerList: {
        leftText: '返回',
        text: '钱包明细'
      },
      list: [],
      pageNum: 1,
      pageSize: 10,
      mescroll: null,
      totalPage: '',
      clientWidth: ''
    }
  },
  methods: {
    upCallback (page) {
      const self = this
      self.getListDataFromNet(page.num, page.size, (curPageData) => {
        if (page.num === 1) self.list = []

        //   // 更新列表数据
        self.list = self.list.concat(curPageData)
        self.mescroll.endByPage(curPageData.length, self.totalPage)
      })
    },
    getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
      const self = this
      setTimeout(function () {
        self.$get(allUrl.getBlanceDetails + pageNum + '/' + pageSize).then(res => {
          if (res.success) {
            self.totalPage = res.data.pages
            let list = res.data.list
            successCallback && successCallback(list)// 成功回调
          }
        })
      }, 500)
    }
  },
  mounted () {
    const self = this
    self.mescroll = new MeScroll('mescroll', {
      up: {
        callback: self.upCallback, // 上拉回调
        // 以下参数可删除,不配置
        isBounce: true, // 此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
        page: {size: 10}, // 可配置每页8条数据,默认10
        empty: { // 配置列表无任何数据的提示
          warpId: 'dataList',
          tip: '暂无相关数据~'
          // icon: './../../assets/image/empty.png'
        },
        htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据~ --</p>'
      }
    })
  }
}
</script>
<style lang="less" scoped>
// [v-cloak] {
//     display: none;
//   }
  #rank_div1,.rank_div1_specical{
    height: calc(100% - 40px);
.detailsContent {
  margin-top:10px;
  font-family: 'PingFang-SC-Bold';
  // height: 100%;
  width: 100%;
  background-color: white;
  .data-list{
    list-style: none;
    padding: 0px;
    margin: 10px 0px 0px 0px;
  }
  li{
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #cccccc;
    .left{
      flex: 3;
      .title{
          color: #222222;
          font-size: 16px;
          font-weight: bold;
          display:block;
        }
        .time{
          font-size: 12px;
          color: #666666;
        }
    }
    .right{
      flex: 1;
    }
  }
  .addColor{
    color: #f4554d;
  }
  .greyColor{
    color: #666666;
  }
}
  }

</style>
