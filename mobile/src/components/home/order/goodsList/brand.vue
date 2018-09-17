<template>
  <div class="brand_list">
    <ul>
      <li v-for="brand in brands" :key="brand.id" :class="selectedBrandId==brand.id?'active':''" @click="handlerTouchend(brand.id)">{{brand.name}}</li>
    </ul>
  </div>
</template>
<script>
import {allUrl} from '@/router/allUrl'
export default {
  data () {
    return {
      brands: [],
      selectedBrandId: ''
    }
  },
  methods: {
    handlerTouchend (id) {
      // debugger
      this.selectedBrandId = id
      this.$emit('brandHandlerTouchend', id)
    }
  },
  created () {
    // console.log(this.$route.query.id)
    let self = this
    if (this.$route.query.parentId) {
      if (this.$route.query.type === 'C') {
        this.$get(allUrl.childClassify + this.$route.query.parentId).then((res) => {
          if (res.success) {
            self.brands = res.data
            self.selectedBrandId = self.$route.query.id
          }
        })
      } else {
        this.$get(allUrl.allBrand).then((res) => {
          if (res.success) {
            self.brands = res.data
            self.selectedBrandId = self.$route.query.id
          }
        })
      }
    } else {
      if (this.$route.query.type === 'C') {
        this.$get(allUrl.childClassify + this.$route.query.id).then((res) => {
          if (res.success) {
            self.brands = res.data
            self.selectedBrandId = self.brands[0].id
            self.handlerTouchend(self.brands[0].id)
          }
        })
      } else {
        this.$get(allUrl.allBrand).then((res) => {
          if (res.success) {
            self.brands = res.data
            self.selectedBrandId = self.brands[0].id
            self.handlerTouchend(self.brands[0].id)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .brand_list {
    background-color: #fff;
    padding: 3.2vw 4vw 2.5vw;
    font-size: 15px;
    ul {
      padding: 0;
      margin: 0;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      color: #222;
      li {
        list-style: none;
        display: inline-block;
        margin-right: 6.67vw;
      }
      :last-child {
        margin-right: 0;
      }
      .active {
        color: #F4554D;
      }
    }
  }
</style>
