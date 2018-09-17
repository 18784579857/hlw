<template>
  <div class="system">
    <div class="title"><span>{{system.name}}</span><span class="time">{{time}}</span></div>
    <div class="content">{{system.content}}</div>
  </div>
</template>
<script>
export default {
  props: ['system'],
  data () {
    return {
      time: ''
    }
  },
  created () {
    let time = this.$props.system.gmtCreate.replace(/-/g, '/')
    this.time = new Date(time).getHours() + ':' + new Date(time).getMinutes()
  }
}
</script>
<style lang="less" scoped>
  .system {
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
    }
  }
</style>
