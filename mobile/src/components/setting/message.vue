<template>
  <div class="message">
    <Header :headerList="headerList"></Header>
    <div class="content">
      <DayMsg v-for="msg in msgs" :key="msg.time" :msg="msg"></DayMsg>
      <div class="nomore">没有更多...</div>
    </div>
  </div>
</template>
<script>
import Header from 'base/header/header'
import DayMsg from './msgTemplate/dayMsg'
import {allUrl} from '@/router/allUrl'
export default {
  components: {Header, DayMsg},
  data () {
    return {
      headerList: {
        leftText: '返回',
        path: '',
        text: '消息',
        righText: ''
      },
      msgs: []
    }
  },
  created () {
    this.$get(allUrl.getMsg).then((res) => {
      if (res.success) {
        let arr = []
        res.data.forEach(element => {
          if (element.mode.length) {
            arr.push(element)
          }
        })
        this.msgs = arr
      }
    })
  }
}
</script>
<style lang="less" scoped>
  .message {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      overflow: auto;
      border-top: 1px solid #e6e6e6;
      .nomore {
        color: #666;
        font-size: 13px;
        text-align: center;
        padding: 2.5vw;
      }
    }
  }
</style>
