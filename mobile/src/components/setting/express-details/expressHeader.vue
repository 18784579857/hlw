<template>
  <div class="expressHeader">
    <mt-header class="header" :title="title">
      <mt-button slot="left" icon="back" @click="goBack">
      </mt-button>
    </mt-header>
    <div class="order_express">
      <div class="icon">
        <img :src="orderExpress.goodsImgUrl" alt="商品图标">
        <div><span>{{orderExpress.goodsNum}}件商品</span></div>
      </div>
      <div class="express">
        <p>配送企业：{{orderExpress.expressCompany}}</p>
        <p>快递单号：{{orderExpress.expressNum}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['orderExpress'],
  data () {
    return {
      title: '物流详情'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .header{
    background-color:#F4554D;
    color: #fff;
  }
  .order_express {
    font-size: 15px;
    background-color:#F4554D;
    color: #fff;
    display: flex;
    padding: 6vw 4vw;
    // justify-content: flex-start;
    align-items: center;
    .icon {
      margin-right: 4vw;
      width: 17.6vw;
      height: 17.6vw;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        display: block;
        font-size: 12px;
        transform: scale(0.8);
      }
      > div {
        width: 100%;
        background-color: #000;
        opacity: 0.7;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
    .express p {
      margin: 10px 0;
    }
  }
</style>
<style lang="less">
  .header {
    .mint-header-title {
      font-size: 16px !important;
    }
  }
</style>
