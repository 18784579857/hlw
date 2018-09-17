<template>
  <div>
    <mt-header class="header"
               :title="headerList.text">
      <!-- <router-link -->
      <!-- :to="headerList.path ? headerList.path : ''"
      slot="left"
      v-show="headerList.leftText"> -->
      <mt-button v-show="headerList.leftText"
                 slot="left"
                 icon="back"
                 @click="goBack">
        {{headerList.leftText}}
      </mt-button>
      <!-- </router-link> -->
      <mt-button v-show="headerList.righText"
                 slot="right"
                 @click="operation">
        {{headerList.righText}}
      </mt-button>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    headerList: {
      type: Object,
      default: null
    }
  },
  methods: {
    operation () {
      this.$emit('operation')
    },
    goBack () {
      if (this.headerList.type === 'goodList') {
        this.$emit('goBacknew')
      } else {
        let path = this.headerList.path
        let params = this.headerList.params
        if (path === '' || path === undefined) {
          this.$router.go(-1)
        } else {
          if (params === '' || params === undefined) {
            this.$router.push({
              path: path
            })
          } else {
            this.$router.push({
              path: path,
              query: {
                userId: params
              }
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .header{
    background:white;
    color: #222222;
  }
</style>
<style>
  .header .mint-header-title{
    font-size: 16px !important;
  }
  .is-right {
    color:#F4554D;
  }
</style>
