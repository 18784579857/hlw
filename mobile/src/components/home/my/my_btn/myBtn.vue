<template>
  <div class="operation_btn" @click="operation(btn)">
    <div class="icon"><img :src="btn.icon" alt="图标"></div>
    <div class="right">
      <div class="typeName"><span>{{btn.typeName}}</span></div>
      <div class="count" v-if="btn.count"><span>￥</span><span>{{btn.count}}</span></div>
      <div class="clickShow" v-else>点击查看<i class="el-icon-arrow-right"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['btn'],
  methods: {
    operation (btn) {
      this.$emit('handleClick', btn)
    }
  }
}
</script>
<style lang="less" scoped>
  .operation_btn {
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    // width: 40.5vw;
    height: 19.7vw;
    margin-bottom: 2.7vw;
    font-size: 14px;
    color: #999;
    padding:0px 2.7vw;
    .icon {
      width: 9.6vw;
      img {
        width: 100%;
      }
    }
    .right {
      margin-left: 2.7vw;
      width:90vw ;
      display: flex;
      align-items: center;
      .typeName {
        // margin-bottom: 2.7vw;
         flex:1 ;
        span{
          display: block;
          font-size: 15px;
          color:#333333;
          font-weight: bold;
        }
      }
      .count {
        color: #222;
         :first-child {
           font-size: 13px;
         }
         :last-child {
           font-size: 17px;
         }
      }
      .clickShow {
        flex:1 ;
        text-align: right;
        color: #999999;
        font-size: 14px;
      }
    }
  }
</style>
