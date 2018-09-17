<template>
  <div class="nav-view">
    <ul class="box-shadow">
      <li v-for="(item,index) in dataList"
          :key="index"
          @click="changeRoute(index,item)"
          :class="{ 'active': changeBar == index}">
        <!-- <i :class="item.icon"></i> -->
        <img :src="changeBar === index ? item.activeImg : item.Img" alt="">
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'bottom-nav',
  props: {
    dataList: {
      type: Array,
      default: null
    },
    boxShadow: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      changeBar: 0
    }
  },
  methods: {
    routeChange () {
      let self = this
      let path = this.$route.path
      let menu = this.dataList
      menu.forEach((element, index) => {
        if (path === element.path) {
          self.changeBar = index
        }
      })
    },
    changeRoute (index, item) {
      // this.changeBar = index
      if (parseInt(index) === parseInt(1)) {
        this.$store.state.orderflag = ''
      }
      this.$router.push({
        path: item.path
      })
    }
  },
  watch: {
    '$route': 'routeChange'
  },
  created () {
    this.routeChange()
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/xlsicon/iconfont.css";
  .active{
    color: #F4554D !important;
  }
  .nav-view{
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // z-index: 100;
    border-top: 1px solid #ECECEC;
    width: 100%;
    background-color: white;
    ul{
      list-style: none;
      display: flex;
      display: -webkit-flex;
      padding: 6px 0 5px 0;
      margin: 0;
      color: #444444;
      li{
        flex: 1;
        text-align: center;
        font-size: 18px;
        p{
          padding: 0;
          margin: 0;
          font-size: 13px;
        }
        i{
          font-size: 18px;
        }
        img {
          width: 20px;
          height: 22px;
        }
      }
    }
  }
</style>
