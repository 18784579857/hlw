<template>
  <div class="arrangement">
    <div class="btn" :class="selectedBtn===btn.type?'active':''" v-for="btn in btnList" :key="btn.type" @click="handlerClick(btn)">
      <div class="text"><span>{{btn.name}}</span></div>
      <div class="icon">
        <img v-if="btn.up_down==='up'" src="@/assets/goodsList/ic_up_red.png" height="5px" width="8px" slot="icon">
        <img v-if="btn.up_down==='down' || btn.up_down===''" src="@/assets/goodsList/ic_up_gray.png" height="5px" width="8px" slot="icon">
        <img v-if="btn.up_down==='down'" src="@/assets/goodsList/ic_down_red.png" height="5px" width="8px" slot="icon">
        <img v-if="btn.up_down==='up' || btn.up_down===''" src="@/assets/goodsList/ic_down_gray.png" height="5px" width="8px" slot="icon">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      btnList: [{
        type: 'popularity',
        up_down: 'down',
        name: '人气排序'
      }, {
        type: 'price',
        up_down: '',
        name: '价格排序'
      }],
      selectedBtn: 'popularity'
    }
  },
  methods: {
    handlerClick (btn) {
      if (this.selectedBtn === btn.type) {
        for (let ele of this.btnList) {
          if (ele.type === btn.type) {
            ele.up_down = ele.up_down === 'up' ? 'down' : 'up'
          }
        }
      } else {
        this.selectedBtn = btn.type
        for (let el of this.btnList) {
          el.up_down = ''
          if (el.type === btn.type) {
            el.up_down = 'down'
          }
        }
      }
      this.$emit('goodsSort', this.btnList, this.selectedBtn)
    }
  }
}
</script>
<style lang="less" scoped>
  .arrangement {
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    .btn {
      display: flex;
      align-items: center;
      padding: 13px;
      padding-top: 10px;
      font-size: 15px;
      color: #222;
      .icon {
        padding-top: 3px;
        margin-left: 5px;
        img {
          display: block;
        }
        :first-child {
          margin-bottom: 2px;
        }
        :nth-child(2) {
          margin-bottom: 2px;
        }
      }
    }
    .active {
      color: #F4554D;
      padding-bottom: 11px !important;
      border-bottom: 2px solid #F4554D;
    }
  }
</style>
