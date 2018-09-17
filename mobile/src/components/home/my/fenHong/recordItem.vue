<template>
  <div class="record">
    <div class="time"><span>{{recordItem.time}}</span></div>
    <div class="list">
      <div class="item" v-for="(item, index) in recordItem.list" :key="index">
        <div class="name">{{item.storeName}}</div>
        <div class="money">
          <span>销售金额:{{item.sales}}</span>
          <span>分红金额:{{item.fenhong}}</span>
        </div>
      </div>
    </div>
    <div class="total">
      <span>分红合计:</span>
      <span>{{recordItem.total}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['recordItem']
}
</script>
<style lang="less" scoped>
  .record {
    .time {
      padding: 2vw 4vw;
    }
    .list {
      background-color: #fff;
      .item {
        padding: 4vw 4vw;
        border-bottom: 1px solid #e6e6e6;
        .name {
          font-size: 4vw;
          color: #222;
          margin-bottom: 2.5vw;
        }
        .money {
          font-size: 3.73vw;
          color: #666;
          :first-child {
            margin-right: 8vw;
          }
        }
      }
    }
    .total {
      padding: 4vw 4vw;
      background-color: #fff;
      font-size: 4.27vw;
      color: #222;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
