<template>
  <div class="leftContain"
       ref="orderLeftBtn">
    <div @touchend="handleClick(btn)"
         v-for="btn in btnList"
         :key="btn.id"
         :data-type="btn.id">
      <span>{{btn.name.substring(0,5)}}</span>
    </div>
  </div>
</template>
<script>
import { allUrl } from '@/router/allUrl'
export default {
  data () {
    return {
      btnList: []
    }
  },
  methods: {
    handleClick (el) {
      this.$emit('handleClickLeft', el)
      for (let key in this.$refs.orderLeftBtn.children) {
        if (this.$refs.orderLeftBtn.children.hasOwnProperty(key)) {
          this.$refs.orderLeftBtn.children[key].className = ''
          if (Number(this.$refs.orderLeftBtn.children[key].dataset.type) === Number(el.id)) {
            this.$store.state.orderflag = el.id
            this.$refs.orderLeftBtn.children[key].className = 'active'
          }
        }
      }
    },
    selected () {
      // this.$refs.orderLeftBtn.children[0].className = 'active'
    }
  },
  created () {
    this.$get(allUrl.leftChoose).then((res) => {
      if (res.success) {
        let arr = []
        if (res.data) {
          for (let item of res.data) {
            arr.push({
              id: item.id,
              name: item.name
            })
          }
        }
        this.btnList = arr
      }
    })
  },
  updated: function () {
    let index = 0
    if (this.$store.state.orderflag !== '') {
      for (let i = 0; i < this.btnList.length; i++) {
        if (this.btnList[i].id === this.$store.state.orderflag) {
          index = i
        }
      }
    }
    this.$emit('handleClickLeft', this.btnList[index])
    this.handleClick(this.btnList[index])
    this.selected()
  }
}
</script>
<style lang="less" scoped>
  .leftContain {
    background-color: #f5f5f5;
    flex: 1;
    overflow: auto;
    > div {
      height: 16vw;
      text-align: center;
      font-size: 14px;
      line-height: 16vw;
      // border-bottom: 1px solid #ECECEC;
    }
    .active {
      background-color: #fff;
      color: #EC4D4D;
      border-left: 3px solid #F4554D;
    }
  }
</style>
