<template>
  <div class="orderItem">
    <!-- <div> -->
    <div class="num">订单编号:{{orderInfor.num}}</div>
    <!-- </div> -->
    <div class="time">{{orderInfor.time}}</div>
    <div class="earn">订单赚：<span>{{orderInfor.orderTMM}}元</span></div>
    <div class="money">订单金额:<span>{{orderInfor.money}}元</span></div>
  </div>
</template>
<script>
export default {
  props: ['orderInfor']
}
</script>
<style lang="less" scoped>
  .orderItem {
    padding: 2.5vw 3.5vw;
    display: flex;
    flex-direction: column;
    .num {
      font-size: 4vw;
      line-height: 4vh;
      color: #666;
    }
    .time {
      font-size: 3.93vw;
      color: #999999;
      line-height: 4vh;
    }
    .money {
      font-size: 5vw;
      color: #222;
      font-weight: bold;
     line-height:5vh;
     span{
       float: right;
     }
    }
    .earn{
      color: #f4554d;
      font-size: 4.3vw;
     line-height: 4.3vh;
     span{
       float: right;
     }
    }
  }
</style>
