<template>
  <div class="flow">
    <el-steps :active="flow.active" align-center>
      <el-step icon="el-icon-location">
        <div slot="icon">
          <img v-if="flow.active==0" src="@/assets/express/ic_point2.png" alt="">
          <img v-else src="@/assets/express/ic_point1.png" alt="">
        </div>
        <div class="title" :class="flow.active==0?'active':''" slot="title"><span>已发货</span></div>
      </el-step>
      <el-step icon="el-icon-location">
        <div slot="icon">
          <img v-if="flow.active==1" src="@/assets/express/ic_point2.png" alt="">
          <img v-else src="@/assets/express/ic_point1.png" alt="">
        </div>
        <div class="title" :class="flow.active==1?'active':''" slot="title"><span>运输中</span></div>
      </el-step>
      <el-step icon="el-icon-location">
        <div slot="icon">
          <img v-if="flow.active==2" src="@/assets/express/ic_point2.png" alt="">
          <img v-else src="@/assets/express/ic_point1.png" alt="">
        </div>
        <div class="title" :class="flow.active==2?'active':''" slot="title"><span>派件中</span></div>
      </el-step>
      <el-step icon="el-icon-location">
        <div slot="icon">
          <img v-if="flow.active==3" src="@/assets/express/ic_point2.png" alt="">
          <img v-else src="@/assets/express/ic_point1.png" alt="">
        </div>
        <div class="title" :class="flow.active==3?'active':''" slot="title"><span>已签收</span></div>
      </el-step>
    </el-steps>
    <div class="address" v-if="flow.fahuo">
      <span>{{flow.fahuo}}</span>
      <span>{{flow.shouhuo}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['flow']
}
</script>
<style lang="less" scoped>
  .flow {
    padding: 2vw 4vw 4vw;
    background-color: #fff;
    .address {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #222;
      padding: 0 6.5vw;
    }
  }
</style>
<style lang="less">
  .flow {
    .title.active {
      span {
        padding: 2px 7px;
        color: #fff;
        font-weight: normal;
        background-color: #F4554D;
        border-radius: 15px;
        position: relative;
      }
      span:after {
        content: '';
        background-color: #F4554D;
        position: absolute;
        left: 50%;
        bottom: -3px;
        width: 6px;
        height: 6px;
        transform: translateX(-40%) rotate(45deg);
      }
    }
    .el-step.is-horizontal {
      display: flex;
      flex-direction: column-reverse;
      .el-step__title {
        font-size: 13px;
      }
      .el-step__icon {
        background: unset;
        div {
          display: flex;
          align-items: center;
          img {
            width: 13px;
          }
        }
      }
      .is-finish {
        color: #999;
        border-color: #999;
      }
      .is-process {
        color: #F4554D;
        border-color: #F4554D;
        div img {
          width: 15px;
        }
      }
      .is-wait {
        color: #999;
        border-color: #999;
      }
    }
  }
</style>
