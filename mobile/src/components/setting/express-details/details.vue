<template>
  <div class="exp">
    <div><div class="header"><span>物流详情</span></div></div>
    <div class="details">
      <div class="content">
        <StepList :lists="details"></StepList>
        <!-- <el-steps direction="vertical" :active="0" align-center>
          <el-step class="" v-for="(detail, index) in details" :key="index">
            <div class="icon" slot="icon" :class="index==0?'active':''">
              <img v-if="index==0" src="@/assets/express/ic_point2.png" alt="">
              <img v-else src="@/assets/express/ic_point1.png" alt="">
            </div>
            <div class="title" slot="title">{{detail.title}}</div>
            <div class="description" slot="description">{{detail.description}}</div>
          </el-step>
        </el-steps> -->
      </div>
    </div>
  </div>
</template>
<script>
import StepList from './stepList'
export default {
  props: ['details'],
  components: {StepList}
}
</script>
<style lang="less" scoped>
  .exp {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 100%;
    .header {
      padding: 4vw;
      font-size: 4vw;
      color: #222;
      border-bottom: 1px solid #ddd;
      // position: fixed;
      width: 92%;
      background-color: #fff;
      z-index: 99;
    }
  }
  .details {
    background-color: #fff;
    flex: 1;
    overflow: auto;
    .content {
      // margin-top: 51px;
      padding: 6vw 6vw 0;
    }
  }
</style>
<style lang="less">
  .details {
    .content {
      .el-steps.el-steps--horizontal {
        // flex-flow: unset !important;
        // flex-direction: column !important;
      }
    }
    .el-step__icon {
      border: none !important;
    }
    .icon img {
      width: 10px !important;
    }
    .icon.active img {
      width: 15px !important;
    }
    .title {
      font-size: 14px !important;
      line-height: 18px !important;
      font-weight: normal !important;
    }
    .is-process.el-step__head + div {
      padding-left: 14px !important;
    }
    .el-step__main {
      padding-left: 8px !important;
    }
    .is-process .title {
      color: #222 !important;
    }
    .description {
      font-size: 12px !important;
      margin-bottom: 20px !important;
    }
    .is-process .description {
      color: #222 !important;
    }
  }
</style>
