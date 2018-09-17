<template>
  <div class="refund">
    <div class="title"><span>{{refund.name}}</span><span class="time">{{time}}</span></div>
    <div class="content">您申请退款订单号：<span class="name">{{refund.content.split('&')[0]}}</span>，退款金额￥{{refund.content.split('&')[1]}}已到账。</div>
  </div>
</template>
<script>
export default {
  props: ['refund'],
  data () {
    return {
      time: ''
    }
  },
  created () {
    let time = this.$props.refund.gmtCreate.replace(/-/g, '/')
    this.time = new Date(time).getHours() + ':' + new Date(time).getMinutes()
  }
}
</script>
<style lang="less" scoped>
  .refund {
    padding: 4.5vw 4vw;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 4.5vw;
      font-weight: bold;
      color: #222;
      .time {
        font-size: 12px;
        font-weight: normal;
        color: #999;
      }
    }
    .content {
      font-size: 3.73vw;
      color: #666;
      margin-top: 3.5vw;
      .name {
        color: #222;
      }
    }
  }
</style>
