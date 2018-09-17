<template>
  <div class="item">
    <span class="name">代理人:{{item.name}}</span>
    <span class="money">销售金额:{{item.money}}元</span>
  </div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style lang="less" scoped>
  .item {
    display: flex;
    justify-content: space-between;
    padding: 4.5vw;
    font-size: 4vw;
    color: #222;
    border-bottom: 1px solid #e6e6e6;
  }
</style>
