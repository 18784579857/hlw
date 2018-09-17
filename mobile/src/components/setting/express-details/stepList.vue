<template>
  <div class="step">
    <ul>
      <li v-for="(detail, index) in lists" :key="index">
        <div class="step__head" slot="icon" >
          <div class="el-step__icon">
            <div class="icon" :class="index==0?'active':''">
              <img v-if="index==0" src="@/assets/express/ic_point2.png" alt="">
              <img v-else src="@/assets/express/ic_point1.png" alt="">
            </div>
          </div>
          <div class="el-step__line"><i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i></div>
        </div>
        <div class="step_body">
          <div class="title" slot="title">{{detail.title}}</div>
          <div class="description" slot="description">{{detail.description}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['lists'],
  updated () {
    // this.$nextTick(() => {
    //   alert(navigator.userAgent)
    // })
  }
}
</script>
<style lang="less" scoped>
  .step {
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        display: flex;
        .step__head {
          text-align: center;
          width: 24px;
          margin-right: 10px;
          position: relative;
          .el-step__line {
            left: 50%;
            right: -50%;
            width: 2px;
            top: 0;
            bottom: 0;
            left: 11px;
          }
        }
      }
      :first-child .step_body {
        margin-left: 7px;
      }
      :last-of-type .el-step__line {
        display: none;
      }
    }
  }
</style>
