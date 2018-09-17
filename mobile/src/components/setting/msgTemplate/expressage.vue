<template>
  <div class="expressage">
    <div class="title"><span>{{expressage.name}}</span><span class="time">{{time}}</span></div>
    <div class="content">
      <div><span class="expressCompany">物流企业：{{expressInfor.expressCompany}}</span><span>运单号：{{expressInfor.expressNum}}</span></div>
      <div><span>发货时间：{{expressInfor.sendTime}}</span></div>
      <div v-if="0"><span>发货方：{{expressInfor.sendMsg}}</span></div>
    </div>
    <div class="details" @click="handlerClick">
      <span>查看详情</span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ['expressage'],
  data () {
    return {
      time: '',
      expressInfor: ''
    }
  },
  created () {
    let time = this.$props.expressage.gmtCreate.replace(/-/g, '/')
    this.time = new Date(time).getHours() + ':' + new Date(time).getMinutes()
    this.expressInfor = JSON.parse(this.$props.expressage.content)
  },
  methods: {
    handlerClick () {
      this.$router.push({
        path: '/expressDetails',
        query: {
          orderId: this.expressInfor.orderId
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .expressage {
    background-color: #fff;
    .title {
      padding: 4.5vw 4vw 3.5vw;
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
      padding: 0 4vw;
      font-size: 3.73vw;
      color: #666;
      :first-child {
        margin-bottom: 5px;
        :first-child {
          margin-right: 6vw;
        }
      }
      :last-child {
        margin-top: 5px;
      }
    }
    .details {
      border-top: 1px solid #e6e6e6;
      margin-top: 4vw;
      padding: 2.5vw 4vw;
      font-size: 3.73vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
