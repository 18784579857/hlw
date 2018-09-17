<template>
  <div class="news">
    <div class="my-header">
      <Header :headerList="headerList"></Header>
    </div>
    <div class="news-content">
      <div class="contentBox"
           v-html="content"></div>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import { allUrl } from '@/router/allUrl'
export default {
  name: '',
  components: { Header },
  data () {
    return {
      headerList: {
        leftText: '返回',
        text: '文章'
      },
      content: ''
    }
  },
  methods: {
    getData () {
      this.$get(allUrl.articleDetail + this.$route.query.id).then((res) => {
        if (res.success) {
          this.content = res.data.news.context
        } else {
          this.content = ''
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .news{
    background-color: #f5f5f5 !important;
    height: 100%;
    display: flex;
    flex-direction: column;
    .news-content{
      flex: 1;
      // overflow: auto;
      padding: 0px 10px;
      .contentBox{
        img{
          width: 100%!important;
        }
      }
    }
    // img{
    //   width: 100%!important;
    // }
  }
</style>
<style>
  .contentBox img{
    width: 100%!important;
    overflow: hidden;
  }
  .ql-align-center{
  text-align: center;
}
.ql-align-right{
  text-align: right;
}
</style>
