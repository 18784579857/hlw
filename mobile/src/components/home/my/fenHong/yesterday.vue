<template>
  <div class="yesterday">
    <FenHong :fenHong="fenHong"></FenHong>
  </div>
</template>
<script>
import FenHong from './fenHong'
export default {
  components: {FenHong},
  data () {
    return {
      fenHong: {
        title: '昨日店铺预期分红',
        type: '1'
      }
    }
  }
}
</script>
<style lang="less">
  .yesterday {
    height: 100%;
  }
</style>
