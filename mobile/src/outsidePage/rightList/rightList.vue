<template>
  <div class="rightList">
    <div class="listContent">
      <div class="list"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <GoodsItem v-for="good in goods"
                   :key="good.id"
                   :goodsInfor="good" ref="goodsItemRef"></GoodsItem>
      </div>
      <div class="loading"
           v-if="loading">
        <i class="el-icon-loading"></i>加载中...</div>
      <div class="loading"
           v-else>没有更多</div>
    </div>
  </div>
</template>
<script>
import GoodsItem from '../goodsLists/goodsItemList'
import { allUrl } from '@/router/allUrl'
export default {
  components: { GoodsItem },
  props: ['leftSelected', 'userId'],
  data () {
    return {
      btnList: [],
      goods: [],
      loading: false,
      load_more: false,
      param: {
        sortWay: 'H',
        bussinessId: '',
        type: 'C',
        riseDown: 'D',
        pageNum: 1,
        pageSize: 10,
        userId: ''
      }
    }
  },
  methods: {
    getGoods (data) {
      // alert(data.userId)
      this.$post(allUrl.rightChoose, data).then((res) => {
        if (res.success) {
          this.loading = false
          if (res.data.pages >= this.param.pageNum) {
            this.load_more = true
            let obj = {}
            for (let item of res.data.list) {
              const imageUrl = this.changeImgUrl(item.indexImg, '_150x150')
              obj = {
                id: item.id,
                imgUrl: imageUrl,
                title: item.name,
                subtitle: item.subTitle,
                spec: item.spec,
                price: item.agentPrice.amount,
                salePrice: item.salePrice.amount,
                sale: item.inventory || '0'
              }
              this.goods.push(obj)
            }
          }
          if (res.data.pages <= this.param.pageNum) {
            this.load_more = false
            this.loading = false
          }
        }
      })
    },
    loadMore () {
      if (this.load_more) {
        this.loading = true
        this.param.pageNum += this.param.pageNum
        this.getGoods(this.param)
      }
    }
  },
  mounted () {
    // this.$emit('record', this.param.bussinessId)
  },
  created () {
    if (this.$store.state.flag === '') {
      this.$store.commit('clearGoods')
    }
  },
  watch: {
    'userId': function () {
      this.param.userId = this.$props.userId
    },
    'leftSelected': function () {
      this.param.bussinessId = this.$props.leftSelected.id
      this.goods = []
      this.getGoods(this.param)
    }
  }
}
</script>
<style lang="less" scoped>
  .rightList {
    height: 100%;
    box-sizing: border-box;
    flex: 2.75;
    // border-left: 1px solid #ECECEC;
    // padding: 4.5vw 4vw;
    background-color: #fff;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .listContent {
      overflow: auto;
      flex:1;
      .list {
        // margin-top: 10px;
      }
      .loading {
        text-align: center;
        margin-bottom: 5px;
      }
    }
  }
</style>
